#!/usr/bin/env python3
"""
quantum_setup.py - Quantum Development Environment Setup Validator

Checks that your quantum development environment is properly configured.
Installs missing dependencies if needed.

Usage:
    python quantum_setup.py                    # Check all frameworks
    python quantum_setup.py --install-all      # Install missing packages
    python quantum_setup.py --framework qiskit # Check specific framework
"""

import sys
import subprocess
import importlib.util

# Color codes for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def print_section(title):
    """Print section header"""
    print(f"\n{BLUE}{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}{RESET}\n")

def check_python_version():
    """Check Python version (3.9+ required)"""
    version = sys.version_info
    if version.major == 3 and version.minor >= 9:
        print(f"{GREEN}✓ Python {version.major}.{version.minor}.{version.micro}{RESET}")
        return True
    else:
        print(f"{RED}✗ Python 3.9+ required; you have {version.major}.{version.minor}{RESET}")
        return False

def check_package(package_name, display_name=None):
    """Check if package is installed"""
    display_name = display_name or package_name
    try:
        importlib.import_module(package_name)
        print(f"{GREEN}✓ {display_name}{RESET}")
        return True
    except ImportError:
        print(f"{RED}✗ {display_name} (missing){RESET}")
        return False

def check_framework(framework_name, packages):
    """Check if framework and dependencies are installed"""
    print(f"\n{YELLOW}Checking {framework_name}...{RESET}")
    all_ok = True
    for package, display in packages:
        if not check_package(package, display):
            all_ok = False
    return all_ok

def install_package(package_name):
    """Install package via pip"""
    print(f"Installing {package_name}...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])

def main():
    """Main setup validation"""
    print(f"\n{BLUE}{'#'*60}")
    print("  Quantum Development Environment Setup Validator")
    print(f"{'#'*60}{RESET}")

    # Parse arguments
    install_all = "--install-all" in sys.argv
    framework = None
    if "--framework" in sys.argv:
        idx = sys.argv.index("--framework")
        if idx + 1 < len(sys.argv):
            framework = sys.argv[idx + 1]

    # Check Python version
    print_section("Python Version")
    if not check_python_version():
        print(f"\n{RED}Please upgrade to Python 3.9+{RESET}")
        return 1

    # Core dependencies
    print_section("Core Dependencies")
    core_packages = [
        ("numpy", "NumPy"),
        ("matplotlib", "Matplotlib"),
        ("scipy", "SciPy"),
    ]
    core_ok = all(check_package(pkg, name) for pkg, name in core_packages)

    # Qiskit
    qiskit_packages = [
        ("qiskit", "Qiskit"),
        ("qiskit_aer", "Qiskit Aer (simulator)"),
    ]

    # Cirq
    cirq_packages = [
        ("cirq", "Cirq"),
    ]

    # PennyLane
    pennylane_packages = [
        ("pennylane", "PennyLane"),
    ]

    # Additional tools
    print_section("Optional Tools")
    optional_packages = [
        ("jupyter", "Jupyter Notebook"),
        ("ipython", "IPython"),
    ]
    optional_ok = all(check_package(pkg, name) for pkg, name in optional_packages)

    # Check specific framework or all
    print_section("Quantum Frameworks")

    if framework == "qiskit" or not framework:
        qiskit_ok = check_framework("Qiskit (IBM Quantum)", qiskit_packages)
    else:
        qiskit_ok = None

    if framework == "cirq" or not framework:
        cirq_ok = check_framework("Cirq (Google Quantum)", cirq_packages)
    else:
        cirq_ok = None

    if framework == "pennylane" or not framework:
        pennylane_ok = check_framework("PennyLane (Xanadu, ML)", pennylane_packages)
    else:
        pennylane_ok = None

    # Summary
    print_section("Summary")
    
    status_items = [
        ("Python 3.9+", True),  # Already checked
        ("Core dependencies", core_ok),
    ]
    
    if qiskit_ok is not None:
        status_items.append(("Qiskit", qiskit_ok))
    if cirq_ok is not None:
        status_items.append(("Cirq", cirq_ok))
    if pennylane_ok is not None:
        status_items.append(("PennyLane", pennylane_ok))

    all_ok = all(status for _, status in status_items)

    for name, status in status_items:
        symbol = f"{GREEN}✓{RESET}" if status else f"{RED}✗{RESET}"
        print(f"{symbol} {name}")

    # Offer to install missing packages
    if not all_ok and install_all:
        print(f"\n{YELLOW}Installing missing packages...{RESET}")
        packages_to_install = []
        
        if not core_ok:
            packages_to_install.extend(["numpy", "scipy", "matplotlib"])
        
        if qiskit_ok is not None and not qiskit_ok:
            packages_to_install.append("qiskit")
            packages_to_install.append("qiskit-aer")
        
        if cirq_ok is not None and not cirq_ok:
            packages_to_install.append("cirq")
        
        if pennylane_ok is not None and not pennylane_ok:
            packages_to_install.append("pennylane")
        
        if not optional_ok:
            packages_to_install.extend(["jupyter", "ipython"])
        
        for package in packages_to_install:
            try:
                install_package(package)
            except Exception as e:
                print(f"{RED}Failed to install {package}: {e}{RESET}")

    # Final recommendations
    print_section("Next Steps")
    
    if all_ok:
        print(f"{GREEN}✓ Your quantum development environment is ready!{RESET}\n")
        print("1. Explore quantum algorithms:")
        print("   - Read: references/quantum_algorithms.md")
        print("   - Copy: cp scripts/algorithm_template.py my_algorithm.py")
        print("   - Run: python my_algorithm.py\n")
        print("2. Benchmark performance:")
        print("   - python scripts/benchmark.py --framework qiskit --algorithm vqe\n")
        print("3. Access hardware:")
        print("   - IBM Quantum: https://quantum.ibm.com")
        print("   - IonQ: https://aws.amazon.com/braket\n")
    else:
        print("Missing packages detected. Install with:")
        print(f"  python quantum_setup.py --install-all\n")
        print("Or install individual frameworks:")
        print("  pip install qiskit qiskit-aer")
        print("  pip install cirq cirq-google")
        print("  pip install pennylane\n")

    return 0 if all_ok else 1

if __name__ == "__main__":
    sys.exit(main())
