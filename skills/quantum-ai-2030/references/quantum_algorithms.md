# Quantum Algorithms for AI Development

Deep dive into algorithms that power quantum AI applications.

---

## 1. VQE (Variational Quantum Eigensolver)

### Overview

VQE finds the ground state energy of a quantum system. It's the workhorse of NISQ quantum computing.

**Use Cases:**
- Chemistry: Molecular ground states, reaction energies
- Materials science: Band structure, phonon spectra
- Optimization: Finding low-energy solutions

### How It Works

1. **Ansatz:** Parametrized quantum circuit |ψ(θ)⟩
2. **Cost Function:** E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩
3. **Optimizer:** Classical gradient descent to minimize E(θ)
4. **Measurement:** Extract energy eigenvalue

### Qiskit Implementation

```python
from qiskit import QuantumCircuit, QuantumRegister
from qiskit.algorithms import VQE
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Estimator
from qiskit.circuit.library import TwoLocal
from qiskit.quantum_info import SparsePauliOp

# Define Hamiltonian (e.g., H2 molecule)
H2_op = SparsePauliOp.from_list([
    ("II", -1.052373245772859),
    ("IZ", 0.39793742484318045),
    ("ZI", -0.39793742484318045),
    ("ZZ", -0.01128010425623538),
    ("XX", 0.18093119978423156)
])

# Create ansatz
ansatz = TwoLocal(rotation_blocks='ry', entanglement_blocks='cz', reps=2)

# Run VQE
vqe = VQE(Estimator(), ansatz, COBYLA())
result = vqe.compute_minimum_eigenvalue(H2_op)

print(f"Ground state energy: {result.eigenvalue.real:.6f}")
```

### Performance Notes

- **NISQ friendly:** Works on 5–50 qubits
- **Convergence:** Often 100–1000 classical iterations
- **Bottleneck:** Barren plateaus in deep circuits; parameter noise
- **Best practice:** Use shallow circuits (depth ≤ 10) for NISQ

---

## 2. QAOA (Quantum Approximate Optimization Algorithm)

### Overview

QAOA approximates solutions to combinatorial optimization problems. It alternates between problem Hamiltonian and mixing Hamiltonian.

**Use Cases:**
- MaxCut: Partition graph into two clusters
- Graph coloring: Assign colors to vertices
- Portfolio optimization: Select assets to maximize return
- Supply chain: Route optimization

### How It Works

```
|+⟩⟨+|  (initial state, uniform superposition)
   ↓
H_C (problem Hamiltonian, e^(-iγH_C))
   ↓
H_M (mixer Hamiltonian, e^(-iβH_M))
   ↓
Repeat p times
   ↓
Measure basis
   ↓
Classical optimizer adjusts γ, β
```

### Cirq Implementation

```python
import cirq
import numpy as np
from scipy.optimize import minimize

# Define MaxCut problem on graph
qubits = cirq.LineQubit.range(4)

def qaoa_circuit(gamma, beta):
    circuit = cirq.Circuit()
    # Initial state: Hadamard on all qubits
    circuit += cirq.H.on_each(*qubits)
    
    # Problem Hamiltonian (MaxCut example)
    # Apply ZZ interactions for each edge
    for q0, q1 in [(0,1), (1,2), (2,3), (3,0)]:
        circuit += cirq.ZZPowGate(exponent=gamma/np.pi)(qubits[q0], qubits[q1])
    
    # Mixer Hamiltonian
    for q in qubits:
        circuit += cirq.XPowGate(exponent=beta/np.pi)(q)
    
    return circuit

def cost_function(params):
    gamma, beta = params
    circuit = qaoa_circuit(gamma, beta)
    # Measure and compute cost
    # (simplified; full version uses simulator)
    return np.random.random()  # Placeholder

# Optimize
result = minimize(cost_function, [0.5, 0.5], method='COBYLA')
print(f"Optimal angles: gamma={result.x[0]:.4f}, beta={result.x[1]:.4f}")
```

### Performance Notes

- **Depth:** p = 1, 2, 3 typical (small depth = NISQ-friendly)
- **Approximation ratio:** p=1 gives ~0.75 for MaxCut; improves with p
- **Classical hardness:** Finding optimal γ, β is hard; heuristic optimization works well
- **Scalability:** Works up to 100+ qubits on simulators; hardware limited by coherence

---

## 3. Quantum Neural Networks (QNN)

### Overview

Quantum circuits as trainable models. Parametrized gates act as weights; measurements give predictions.

**Use Cases:**
- Classification: Binary/multi-class
- Regression: Continuous output prediction
- Generative models: Quantum GANs
- Feature mapping: Encode classical data quantum-natively

### Architecture

```
Classical Data Input (x)
        ↓
Feature Encoding (encode x as |ψ(x)⟩)
        ↓
Trainable Parametrized Ansatz (θ)
        ↓
Measurement (projective or expectation value)
        ↓
Classical Post-processing
        ↓
Predicted Output (ŷ)
```

### PennyLane Implementation

```python
import pennylane as qml
from pennylane import numpy as pnp
import numpy as np

# Define device
dev = qml.device("default.qubit", wires=2)

# QNN with 2 qubits
@qml.qnode(dev)
def qnn(params, x):
    # Encoding
    qml.RY(x[0], wires=0)
    qml.RY(x[1], wires=1)
    
    # Trainable ansatz
    qml.RZ(params[0], wires=0)
    qml.CNOT(wires=[0, 1])
    qml.RZ(params[1], wires=1)
    
    # Measurement
    return qml.expval(qml.PauliZ(0))

# Training data
X_train = np.array([[0.1, 0.2], [0.3, 0.4], [0.5, 0.6], [0.7, 0.8]])
y_train = np.array([0, 1, 0, 1])

# Initialize parameters
params = pnp.array([0.1, 0.2])

# Optimizer
opt = qml.GradientDescentOptimizer(stepsize=0.1)

# Cost function
def cost(params):
    loss = 0
    for x, y in zip(X_train, y_train):
        pred = qnn(params, x)
        loss += (pred - y)**2
    return loss / len(X_train)

# Training loop
for epoch in range(100):
    params = opt.step(cost, params)
    if epoch % 20 == 0:
        print(f"Epoch {epoch}: Loss = {cost(params):.4f}")

print(f"Final params: {params}")
```

### Performance Notes

- **Expressivity:** Limited by circuit depth and qubit count
- **Training:** Barren plateaus, SAT problem for large circuits
- **Data encoding:** Amplitude encoding (exponential) vs angle encoding (polynomial)
- **Advantage:** Quantum advantage in high-dimensional feature spaces (unproven for practical data)

---

## 4. Quantum Fourier Transform (QFT)

### Overview

Quantum version of classical Fourier transform. Enables period-finding for factoring (Shor's algorithm).

**Use Cases:**
- Shor's algorithm: Integer factorization (cryptography)
- Period finding: Hidden subgroup problems
- Phase estimation: Eigenvalue extraction

### How It Works

```
Input: |x⟩ (superposition of integers)
   ↓
Apply controlled phase rotations
   ↓
Swap qubits and apply QFT recursively
   ↓
Measure
   ↓
Output: Period (if hidden subgroup problem)
```

### Qiskit Implementation

```python
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT

# Create QFT circuit for 5 qubits
qft = QFT(num_qubits=5, approximation_degree=0, do_swaps=True)
circuit = QuantumCircuit(5)
circuit.append(qft, range(5))

print(circuit)
```

### Performance Notes

- **Depth:** O(n²) gates for n qubits (classically O(n log n))
- **Quantum advantage:** Enables factoring in polynomial time (huge!)
- **NISQ feasibility:** NOT NISQ-friendly; requires fault tolerance
- **2030 timeline:** Expected to be practical by ~2028–2030

---

## 5. Quantum Walk Algorithms

### Overview

Quantum analog of classical random walks. Explores graph structure amplitude-amplified.

**Use Cases:**
- Search: Unstructured database search (faster than classical)
- Graph algorithms: Shortest path, connectivity
- Optimization: Local search acceleration

### Continuous-Time Quantum Walk

```
State: |ψ(t)⟩
Evolution: d|ψ⟩/dt = -iH|ψ⟩ (Schrödinger equation)
Search: Mark target vertex; interfere to amplify amplitude
Speedup: √N for N vertices
```

---

## 6. Grover's Algorithm (Quantum Search)

### Overview

Searches unstructured database of N items in O(√N) time (vs O(N) classical).

**Use Cases:**
- Database search
- SAT solving (2-SAT practical)
- Optimization (when you can check solutions)

### Circuit Structure

```
Initialize superposition |+⟩
   ↓
Repeat √N times:
   - Oracle (mark solution)
   - Diffusion operator (amplify marked state)
   ↓
Measure
   ↓
Output: Solution with high probability
```

### Qiskit Example

```python
from qiskit import QuantumCircuit
from qiskit.algorithms import Grover
from qiskit.circuit.library import GroverOperator

# Oracle for marking solution
oracle = QuantumCircuit(2)
oracle.cz(0, 1)  # Mark |11⟩

# Grover operator
grover_op = GroverOperator(oracle)

# Run Grover
grover = Grover(oracle=oracle, iterations=2)
result = grover.run()
print(f"Solution: {result}")
```

### Performance Notes

- **Speedup:** √N is real; ~100x faster for large N
- **NISQ friendly:** Shallow circuits; works on near-term hardware
- **Limitation:** Requires oracle; SAT instances are hard to encode
- **Practical impact:** Most useful for structured search problems

---

## Algorithm Selection Guide

| Problem Type | Best Algorithm | NISQ? | Hybrid? |
|--------------|----------------|-------|--------|
| Ground state energy | VQE | ✅ | ✅ |
| Combinatorial optimization | QAOA | ✅ | ✅ |
| Classification | QNN | ✅ | ✅ |
| Unstructured search | Grover | ✅ | ✅ |
| Integer factorization | Shor | ❌ | ❌ |
| Phase estimation | QPE | ⚠️ | ✅ |
| Quantum walk | Quantum walk | ✅ | ✅ |

---

## 🚀 Implementation Checklist

- [ ] Install Qiskit, Cirq, PennyLane
- [ ] Run `quantum_setup.py`
- [ ] Test VQE on H2 molecule (Qiskit tutorial)
- [ ] Implement QAOA for MaxCut (Cirq)
- [ ] Train QNN classifier on toy data (PennyLane)
- [ ] Benchmark on real hardware (IBM Quantum experience)
- [ ] Document hyperparameters and convergence
- [ ] Compare classical vs quantum speedup

---

**Next:** See `frameworks.md` for setup instructions.
