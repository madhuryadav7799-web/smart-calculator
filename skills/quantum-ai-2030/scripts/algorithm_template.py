#!/usr/bin/env python3
"""
algorithm_template.py - Quantum Algorithm Template

A boilerplate for building quantum circuits. Copy this file and customize.

Supports:
- Qiskit (IBM Quantum)
- Cirq (Google Quantum)
- PennyLane (ML-focused)

Usage:
    python algorithm_template.py              # Run Qiskit example
    python algorithm_template.py --cirq       # Run Cirq example
    python algorithm_template.py --pennylane  # Run PennyLane example
"""

import sys
import argparse

# ============================================================================
# QISKIT EXAMPLE
# ============================================================================

def qiskit_example():
    """Qiskit: Simple quantum circuit with measurements"""
    print("\n" + "="*60)
    print("  QISKIT EXAMPLE: Bell State (Entanglement)")
    print("="*60 + "\n")

    from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
    try:
        from qiskit_aer import AerSimulator
    except ImportError:
        from qiskit.providers.aer import AerSimulator

    # Create quantum and classical registers
    qreg = QuantumRegister(2, 'q')
    creg = ClassicalRegister(2, 'c')

    # Create quantum circuit
    qc = QuantumCircuit(qreg, creg)

    # Build Bell state (entangled pair)
    qc.h(qreg[0])                        # Hadamard on qubit 0
    qc.cx(qreg[0], qreg[1])              # CNOT: qubit 0 controls qubit 1
    qc.measure(qreg, creg)               # Measure both qubits

    print("Quantum Circuit:")
    print(qc)

    # Simulate
    simulator = AerSimulator()
    job = simulator.run(qc, shots=1000)
    result = job.result()

    # Results
    counts = result.get_counts()
    print(f"\nMeasurement Results (1000 shots):")
    for outcome, count in sorted(counts.items()):
        print(f"  {outcome}: {count} ({100*count/1000:.1f}%)")

    print("\nInterpretation:")
    print("  Bell state entangles two qubits.")
    print("  Measurement always gives 00 or 11 (perfectly correlated).")
    print("  This demonstrates quantum entanglement!")

    return qc

# ============================================================================
# CIRQ EXAMPLE
# ============================================================================

def cirq_example():
    """Cirq: Parametrized quantum circuit"""
    print("\n" + "="*60)
    print("  CIRQ EXAMPLE: Variational Circuit")
    print("="*60 + "\n")

    import cirq
    import numpy as np

    # Create qubits
    q0, q1 = cirq.LineQubit.range(2)

    # Parametrized circuit (for VQE/QAOA-like algorithms)
    def parametrized_circuit(theta):
        circuit = cirq.Circuit(
            cirq.Rx(theta)(q0),           # Rotation around X-axis
            cirq.Ry(theta/2)(q1),         # Rotation around Y-axis
            cirq.CNOT(q0, q1),            # Entanglement
            cirq.Rz(theta)(q0),           # Phase rotation
        )
        return circuit

    # Test with theta = 0.5
    theta = 0.5
    circuit = parametrized_circuit(theta)

    print(f"Parametrized Circuit (θ = {theta}):")
    print(circuit)

    # Simulate and get statevector
    simulator = cirq.Simulator()
    result = simulator.simulate(circuit)

    print(f"\nFinal State Vector:")
    print(f"  {result.final_state_vector}")

    # Measure expectation value
    def measure_observable(circuit, observable):
        """Measure expectation value of observable"""
        result = simulator.simulate(circuit)
        # For simplicity, measure Z on qubit 0
        return np.real(np.conj(result.final_state_vector) @ observable @ result.final_state_vector)

    Z0 = cirq.Z(q0)._unitary_()  # Pauli Z matrix
    expectation = measure_observable(circuit, Z0)
    print(f"\nExpectation value ⟨Z₀⟩: {expectation:.4f}")

    return circuit

# ============================================================================
# PENNYLANE EXAMPLE
# ============================================================================

def pennylane_example():
    """PennyLane: Quantum Neural Network"""
    print("\n" + "="*60)
    print("  PENNYLANE EXAMPLE: Trainable Quantum Neural Network")
    print("="*60 + "\n")

    import pennylane as qml
    from pennylane import numpy as pnp

    # Create device
    dev = qml.device("default.qubit", wires=2)

    # Define QNN
    @qml.qnode(dev)
    def qnn(weights, x):
        """
        Quantum Neural Network with:
        - Feature encoding (classical input x)
        - Trainable ansatz (weights)
        - Measurement (expectation value)
        """
        # Feature encoding
        qml.RX(x[0], wires=0)
        qml.RY(x[1], wires=1)

        # Trainable ansatz
        qml.RZ(weights[0], wires=0)
        qml.CNOT(wires=[0, 1])
        qml.RZ(weights[1], wires=1)

        # Measurement
        return qml.expval(qml.PauliZ(0) @ qml.PauliZ(1))

    # Initialize parameters
    weights = pnp.array([0.1, 0.2], requires_grad=True)
    x = pnp.array([0.5, 0.7])

    print("Initial weights:", weights)
    print("Input x:", x)

    # Evaluate
    output = qnn(weights, x)
    print(f"\nInitial output: {output:.4f}")

    # Compute gradients
    grad_fn = qml.grad(qnn)
    gradients = grad_fn(weights, x)
    print(f"Gradients: {gradients}")

    # Training step (gradient descent)
    print("\nTraining (5 steps, learning rate=0.1):")
    opt = qml.GradientDescentOptimizer(stepsize=0.1)

    for step in range(5):
        weights = opt.step(lambda w: qnn(w, x), weights)
        output = qnn(weights, x)
        print(f"  Step {step+1}: output = {output:.4f}, weights = {weights}")

    print("\n✓ QNN trained successfully!")

# ============================================================================
# CUSTOM ALGORITHM TEMPLATE
# ============================================================================

def custom_vqe_template():
    """Template: Implement your own VQE algorithm"""
    print("\n" + "="*60)
    print("  TEMPLATE: Custom VQE Implementation")
    print("="*60 + "\n")

    print("""
    To implement your own VQE:

    1. Define the problem Hamiltonian:
       H = a₀I + a₁Z₀ + a₂Z₁ + ...

    2. Create parametrized ansatz:
       |ψ(θ)⟩ = U(θ) |0⟩

    3. Compute cost function:
       E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩

    4. Optimize parameters:
       θ* = argmin E(θ)

    5. Extract result:
       E₀ = E(θ*)

    EXAMPLE (Qiskit):
    ────────────────

    from qiskit.algorithms import VQE
    from qiskit.algorithms.optimizers import COBYLA
    from qiskit.primitives import Estimator
    from qiskit.circuit.library import TwoLocal
    from qiskit.quantum_info import SparsePauliOp

    # Define Hamiltonian
    H = SparsePauliOp.from_list([
        ("II", -1.0),
        ("ZI", 0.5),
        ("IZ", 0.5),
        ("ZZ", 0.25),
    ])

    # Create ansatz
    ansatz = TwoLocal(num_qubits=2, rotation_blocks='ry',
                      entanglement_blocks='cz', reps=2)

    # Run VQE
    vqe = VQE(Estimator(), ansatz, COBYLA())
    result = vqe.compute_minimum_eigenvalue(H)

    print(f"Ground state energy: {result.eigenvalue.real:.6f}")
    print(f"Optimal parameters: {result.x}")
    """)

# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Quantum Algorithm Template Examples"
    )
    parser.add_argument("--cirq", action="store_true", help="Run Cirq example")
    parser.add_argument("--pennylane", action="store_true", help="Run PennyLane example")
    parser.add_argument("--template", action="store_true", help="Show VQE template")
    parser.add_argument("--all", action="store_true", help="Run all examples")

    args = parser.parse_args()

    # Default: Qiskit
    run_qiskit = not (args.cirq or args.pennylane or args.template) or args.all
    run_cirq = args.cirq or args.all
    run_pennylane = args.pennylane or args.all
    run_template = args.template or args.all

    # Header
    print("\n" + "#"*60)
    print("  Quantum Algorithm Template")
    print("  Copy & customize for your experiments!")
    print("#"*60)

    try:
        if run_qiskit:
            qiskit_example()
    except ImportError as e:
        print(f"✗ Qiskit not available: {e}")
        print("  Install: pip install qiskit qiskit-aer\n")

    try:
        if run_cirq:
            cirq_example()
    except ImportError as e:
        print(f"✗ Cirq not available: {e}")
        print("  Install: pip install cirq\n")

    try:
        if run_pennylane:
            pennylane_example()
    except ImportError as e:
        print(f"✗ PennyLane not available: {e}")
        print("  Install: pip install pennylane\n")

    if run_template:
        custom_vqe_template()

    print("\n" + "="*60)
    print("  Next Steps")
    print("="*60 + "\n")
    print("1. Copy this file: cp algorithm_template.py my_algorithm.py")
    print("2. Modify the circuit for your problem")
    print("3. Run: python my_algorithm.py")
    print("4. Reference documentation in:")
    print("   - references/quantum_algorithms.md")
    print("   - references/frameworks.md")
    print("\nGood luck! 🚀\n")

if __name__ == "__main__":
    main()
