# Quantum Frameworks Setup Guide

Get Qiskit, Cirq, and PennyLane running in your environment.

---

## 📋 Requirements

- **Python:** 3.9+ (3.11 recommended for 2026)
- **pip:** Latest version
- **Virtual environment:** Recommended (venv or conda)
- **Jupyter:** Optional but useful

---

## 1. Qiskit (IBM Quantum)

### Installation

```bash
# Create virtual environment
python3 -m venv qiskit_env
source qiskit_env/bin/activate  # or 'qiskit_env\Scripts\activate' on Windows

# Install Qiskit
pip install qiskit qiskit-aer qiskit-ibm-runtime

# Optional: Jupyter for notebooks
pip install jupyter ipython matplotlib numpy scipy
```

### Verify Installation

```python
import qiskit
from qiskit_ibm_runtime import QiskitRuntimeService

print(f"Qiskit version: {qiskit.__version__}")

# Optional: Initialize IBM Quantum account
# service = QiskitRuntimeService.save_account(channel="ibm_quantum", token="YOUR_TOKEN")
```

### First Circuit

```python
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator

# Create circuit
qc = QuantumCircuit(2, 2)
qc.h(0)  # Hadamard on qubit 0
qc.cx(0, 1)  # CNOT (entangle)
qc.measure([0, 1], [0, 1])

# Simulate
simulator = AerSimulator()
job = simulator.run(qc, shots=1000)
result = job.result()

# Print results
counts = result.get_counts()
print(f"Measurement results: {counts}")
```

### Key Classes

- **QuantumCircuit:** Build circuits
- **AerSimulator:** Fast simulator (statevector, unitary, density matrix)
- **QiskitRuntimeService:** Access IBM quantum hardware
- **VQE, QAOA:** High-level algorithm classes
- **Transpiler:** Optimize circuits for hardware

### Documentation

- Official: https://qiskit.org/documentation
- Tutorials: https://qiskit.org/ecosystem
- Community: https://github.com/Qiskit

---

## 2. Cirq (Google Quantum)

### Installation

```bash
# Create virtual environment
python3 -m venv cirq_env
source cirq_env/bin/activate

# Install Cirq
pip install cirq cirq-google

# Optional dependencies
pip install jupyter matplotlib numpy scipy sympy
```

### Verify Installation

```python
import cirq

print(f"Cirq version: {cirq.__version__}")

# Quick test
q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.measure(q0, q1, key='result')
)
print(circuit)
```

### First Circuit

```python
import cirq
import numpy as np

# Define qubits
q0, q1 = cirq.LineQubit.range(2)

# Create circuit
circuit = cirq.Circuit(
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.measure(q0, q1, key='result')
)

# Simulate
simulator = cirq.Simulator()
result = simulator.simulate(circuit)
print(result)

# Sample
samples = simulator.run(circuit, repetitions=1000)
print(samples.histogram(key='result'))
```

### Key Classes

- **LineQubit, GridQubit:** Qubit labeling
- **Circuit:** Build circuits
- **Simulator:** Fast simulation
- **Sampler, Sampler.run:** Distributed sampling
- **OperationTarget, QAOA:** Algorithm building blocks

### Documentation

- Official: https://quantumai.google/cirq
- GitHub: https://github.com/quantumlib/Cirq
- Tutorials: https://quantumai.google/cirq/tutorials

---

## 3. PennyLane (Xanadu, ML-Focused)

### Installation

```bash
# Create virtual environment
python3 -m venv pennylane_env
source pennylane_env/bin/activate

# Install PennyLane
pip install pennylane

# Optional: Plugins for different backends
pip install pennylane-qiskit pennylane-cirq pennylane-sf

# ML & optimization
pip install autograd tensorflow torch
```

### Verify Installation

```python
import pennylane as qml

print(f"PennyLane version: {qml.__version__}")

# Quick test
dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def circuit(params):
    qml.RX(params[0], wires=0)
    qml.RY(params[1], wires=1)
    return qml.expval(qml.PauliZ(0) @ qml.PauliZ(1))

from pennylane import numpy as pnp
params = pnp.array([0.5, 0.7])
print(f"Expectation value: {circuit(params)}")
```

### First Quantum Neural Network

```python
import pennylane as qml
from pennylane import numpy as pnp
import numpy as np

# Device
dev = qml.device("default.qubit", wires=2)

# QNN
@qml.qnode(dev)
def qnn(weights, x):
    # Encoding
    qml.RX(x[0], wires=0)
    qml.RY(x[1], wires=1)
    
    # Ansatz
    qml.RZ(weights[0], wires=0)
    qml.CNOT(wires=[0, 1])
    qml.RZ(weights[1], wires=1)
    
    return qml.expval(qml.PauliZ(0))

# Training
weights = pnp.array([0.1, 0.2], requires_grad=True)
x = np.array([0.5, 0.7])

# Gradient
grad = qml.grad(qnn)(weights, x)
print(f"Gradients: {grad}")

# Optimize (manual SGD)
opt = qml.GradientDescentOptimizer(stepsize=0.1)
for i in range(10):
    weights = opt.step(lambda w: qnn(w, x), weights)
    print(f"Step {i}: {qnn(weights, x):.4f}")
```

### Key Classes

- **device:** Backend (default.qubit, qiskit, cirq, sf)
- **qnode:** Quantum function decorator
- **expval, probs, sample:** Measurement functions
- **grad, jacobian:** Automatic differentiation
- **GradientDescentOptimizer, AdamOptimizer:** Trainers

### Documentation

- Official: https://pennylane.ai
- Docs: https://pennylane.readthedocs.io
- Tutorials: https://pennylane.ai/qml/

---

## Framework Comparison

| Feature | Qiskit | Cirq | PennyLane |
|---------|--------|------|-----------|
| **Best for** | Production, enterprise | Research, Google | ML, differentiable |
| **Hardware access** | IBM Quantum | Google Sycamore | Multiple backends |
| **Simulator speed** | Fast (Aer) | Moderate | Slow |
| **Ease of use** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Community** | Large | Growing | Growing |
| **Automatic differentiation** | Partial | No | ✅ |
| **Quantum ML** | Via Terra | Via custom | Native |
| **Learning curve** | Moderate | High | Low |

---

## Installation Checklist

### All Frameworks (Integrated Environment)

```bash
# Single environment with all three
python3 -m venv quantum_full
source quantum_full/bin/activate

pip install qiskit qiskit-aer qiskit-ibm-runtime
pip install cirq cirq-google
pip install pennylane pennylane-qiskit pennylane-cirq

pip install jupyter ipython matplotlib numpy scipy autograd

# Verify
python scripts/quantum_setup.py
```

### Jupyter Notebook

```bash
# Start Jupyter
jupyter notebook

# Create cell:
import qiskit
import cirq
import pennylane as qml

print("All frameworks loaded!")
```

---

## Hardware Access

### IBM Quantum (Qiskit)

1. Register: https://quantum.ibm.com
2. Get API token from account
3. Save token:
   ```python
   from qiskit_ibm_runtime import QiskitRuntimeService
   QiskitRuntimeService.save_account(channel="ibm_quantum", token="YOUR_TOKEN")
   ```
4. Use hardware:
   ```python
   from qiskit_ibm_runtime import QiskitRuntimeService
   service = QiskitRuntimeService(channel="ibm_quantum")
   backend = service.backend("ibmq_jakarta")  # 127 qubits
   ```

### Google Quantum (Cirq)

1. Register: https://quantumai.google/cirq
2. Apply for access to Sycamore
3. Set up credentials
4. Use via Cirq-Google plugin

### Xanadu PennyLane

1. Create account: https://www.xanadu.ai/
2. Access cloud QPU (Photonics)
3. Configure in PennyLane

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'qiskit'"

**Solution:** Verify virtual environment is active; reinstall:
```bash
source venv/bin/activate
pip install --upgrade qiskit
```

### Issue: "ImportError: Cannot import AerSimulator"

**Solution:** Install Aer separately:
```bash
pip install qiskit-aer
```

### Issue: "Connection timeout to IBM Quantum"

**Solution:** Check internet; verify API token; use local simulator for development.

### Issue: "Barren plateaus / gradients all zero"

**Solution:** Use shallow circuits (depth ≤ 10); initialize parameters carefully; use parameter-shift rule.

---

## 🚀 Next Steps

1. ✅ Install one or more frameworks
2. ✅ Run `quantum_setup.py` to verify
3. ✅ Follow algorithm tutorials in `quantum_algorithms.md`
4. ✅ Test on simulators first
5. ✅ Request hardware access (IBM, Google)
6. ✅ Deploy to real quantum computers

---

**Happy quantum computing! 🚀**
