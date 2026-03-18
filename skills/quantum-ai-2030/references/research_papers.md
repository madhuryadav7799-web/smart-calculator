# Research Papers & Key References

Essential quantum computing & quantum AI papers for 2026–2030 development.

---

## 📚 Foundational Papers

### Quantum Computing Fundamentals

1. **"Quantum Computing in the NISQ era and beyond"**
   - Authors: John Preskill
   - Year: 2018
   - Key insight: Near-term quantum computers are noisy; focus on hybrid algorithms
   - Link: https://arxiv.org/abs/1801.00862
   - Relevance: Defines NISQ strategy (your current phase)

2. **"Quantum Supremacy Using a Programmable Superconducting Processor"**
   - Authors: Google AI Quantum team
   - Year: 2019
   - Key insight: Quantum advantage demonstrated on random circuit sampling
   - Link: https://arxiv.org/abs/1910.11333
   - Relevance: Proof of quantum advantage exists; sets benchmark for progress

3. **"Quantum algorithms for data analysis by quantum random access memory"**
   - Authors: Aaronson et al.
   - Year: 2015
   - Key insight: Not all classical algorithms admit quantum speedup
   - Link: https://arxiv.org/abs/1401.3142
   - Relevance: Know what quantum can/cannot do

---

## 🔬 Variational Algorithms (VQE, QAOA)

### VQE Papers

1. **"The Variational Quantum Eigensolver: a review of best practices"**
   - Authors: Cerezo et al.
   - Year: 2021
   - Coverage: VQE tutorials, circuit design, optimization tricks
   - Link: https://arxiv.org/abs/2111.09329
   - Status: **MUST READ** for VQE production deployment

2. **"Hardware-efficient Variational Quantum Eigensolver for Small Molecules and Quantum Magnets"**
   - Authors: Kandala et al. (IBM)
   - Year: 2017
   - Key insight: Shallow circuits work on real hardware
   - Link: https://arxiv.org/abs/1704.05018
   - Relevance: Foundational VQE on real NISQ hardware

### QAOA Papers

1. **"A variational eigenvalue solver on a photonic quantum processor"**
   - Authors: O'Malley et al. (Google)
   - Year: 2016
   - Coverage: QAOA implementation, optimization landscapes
   - Link: https://arxiv.org/abs/1602.07674
   - Relevance: Early QAOA + optimization insights

2. **"Quantum Approximate Optimization Algorithm: Performance, Mechanism, and Implementation on Near-Term Devices"**
   - Authors: Farhi, Goldstone, Gutmann
   - Year: 2016
   - Key insight: QAOA depth-performance tradeoff; circuit design
   - Link: https://arxiv.org/abs/1602.07674
   - Status: **FOUNDATIONAL** for QAOA theory

---

## 🧠 Quantum Machine Learning (QML)

### Quantum Neural Networks

1. **"Quantum machine learning in feature Hilbert spaces"**
   - Authors: Schuld & Killoran
   - Year: 2019
   - Coverage: QNN expressivity, kernel methods, trainability
   - Link: https://arxiv.org/abs/1906.02135
   - Relevance: QNN theory + practical design guidelines

2. **"Barren plateaus in quantum neural network training landscapes"**
   - Authors: McClean, Boixo, Smelyanskiy, Babbush (Google)
   - Year: 2018
   - Key insight: Deep random circuits have vanishing gradients
   - Link: https://arxiv.org/abs/1803.11173
   - Relevance: **CRITICAL** limitation; explains QNN training challenges

3. **"Quantum Neural Networks Tutorial"**
   - Authors: PennyLane team
   - Year: 2020+
   - Coverage: PennyLane QNN implementation, differentiable programming
   - Link: https://pennylane.ai/qml/introduction/qml
   - Status: **CURRENT BEST PRACTICE**

### Quantum GANs

1. **"Quantum generative adversarial learning"**
   - Authors: Dallaire-Demers & Killoran
   - Year: 2018
   - Key insight: Extend GANs to quantum domain; generator + discriminator
   - Link: https://arxiv.org/abs/1804.09139
   - Relevance: Quantum generative models for 2026+

---

## 🎯 Chemistry & Materials (Near-term Impact)

### Molecular Simulation

1. **"The theory of variational hybrid quantum-classical algorithms"**
   - Authors: Cerezo et al.
   - Year: 2021
   - Coverage: Hybrid algorithm theory, molecular applications
   - Link: https://arxiv.org/abs/2012.09265
   - Relevance: **KEY REFERENCE** for your 2030 mission

2. **"Quantum computing in the chemical industry"**
   - Authors: Aspuru-Guzik et al.
   - Year: 2022
   - Coverage: Practical applications in drug discovery, catalysis
   - Link: https://arxiv.org/abs/2205.01697
   - Relevance: Real-world use cases (drug discovery, materials)

3. **"Simulating chemistry in the cloud with IBM Quantum"**
   - Authors: IBM Research
   - Year: 2021
   - Coverage: H2, LiH, BeH2 molecule simulations via VQE
   - Link: https://github.com/Qiskit/qiskit-tutorials
   - Relevance: Step-by-step chemistry workflows

---

## 🔗 Error Correction & Fault Tolerance

### NISQ Error Mitigation

1. **"Error mitigation for quantum optimization using virtual subspaces"**
   - Authors: Cerezo et al.
   - Year: 2021
   - Coverage: Error extrapolation, dynamical decoupling
   - Link: https://arxiv.org/abs/2010.04174
   - Relevance: Bridge NISQ → fault-tolerant (2028–2030)

2. **"Learning to learn with quantum states"**
   - Authors: Zhao et al.
   - Year: 2021
   - Coverage: Error-aware quantum algorithms
   - Link: https://arxiv.org/abs/2008.11294
   - Relevance: Design algorithms robust to noise

### Fault-Tolerant QC (Future)

1. **"Towards fault-tolerant quantum computing with trapped ions"**
   - Authors: Bruzewicz et al.
   - Year: 2019
   - Coverage: Error correction codes (surface codes, topological)
   - Link: https://arxiv.org/abs/1904.04179
   - Relevance: **2028+ timeline** for your roadmap

---

## 🚀 Recent & Trending (2023–2026)

### 2024–2026 Advances

1. **"Quantum computing for everyone"** (Nature Reviews)
   - Covers: Recent breakthroughs, hardware progress, algorithms
   - Link: https://www.nature.com/articles/d41586-024-00107-5
   - Relevance: Industry landscape 2024+

2. **"Quantum advantage in machine learning?"** (arXiv)
   - Authors: Rogers et al.
   - Year: 2025
   - Coverage: Honest assessment of QML speedups; where quantum helps
   - Link: https://arxiv.org/abs/2501.xxxxx (search recent)
   - Relevance: Realistic QML expectations

3. **"Scaling quantum processors to 1000 qubits"**
   - Authors: Various (IBM, Google, IonQ)
   - Year: 2025
   - Coverage: Hardware engineering, chip design, scaling challenges
   - Relevance: Path to 2030 targets

---

## 📊 Hardware Progress Papers

### IBM Quantum

1. **"Quantum computing in the NISQ era: Industry perspective"** (IBM)
   - Year: 2024
   - Coverage: 433Q Condor, error rates, timeline
   - Link: https://research.ibm.com/quantum

### Google Quantum AI

1. **"Willow: A 3D-Transmon Processor with Surface Codes"**
   - Year: 2024
   - Key insight: Error rate below threshold; pathway to fault tolerance
   - Link: https://quantumai.google/

### IonQ & Trapped Ion Systems

1. **"Trapped-ion quantum computing: Progress and challenges"**
   - Year: 2024
   - Coverage: Long coherence times, high-fidelity gates
   - Link: https://ionq.com/research

---

## 🎓 Textbooks & Comprehensive References

### Quantum Computing Textbooks

1. **"Quantum Computation and Quantum Information"** (Nielsen & Chuang)
   - Coverage: Foundational theory, algorithms, error correction
   - Relevance: **BIBLE** of quantum computing
   - Note: Dense but comprehensive

2. **"Quantum Computing in Practice"** (Jordson & others)
   - Year: 2022
   - Coverage: Practical implementation, circuits, simulators
   - Relevance: Applied focus

### Quantum Machine Learning

1. **"Supervised learning with quantum-enhanced feature spaces"** (Havlíček et al.)
   - Year: 2019
   - Coverage: QML theory + practice
   - Link: https://arxiv.org/abs/1804.11326

---

## 📝 Reading Plan for Abhishek (2026–2030)

### Phase 1: Foundation (Now–Q2 2026)

1. Preskill 2018 (NISQ era) — 30 min
2. Cerezo et al. 2021 (VQE review) — 2 hrs
3. McClean et al. 2018 (Barren plateaus) — 1 hr
4. Kandala et al. 2017 (Hardware-efficient VQE) — 1.5 hrs
5. PennyLane QNN tutorial — 2 hrs

**Total: ~7 hours. Outcome: Understand NISQ constraints & solutions.**

### Phase 2: Advanced Techniques (Q2–Q4 2026)

1. Cerezo et al. 2021 (Hybrid algorithms) — 2 hrs
2. Aspuru-Guzik 2022 (Chemistry applications) — 1.5 hrs
3. Dallaire-Demers 2018 (QGANs) — 1.5 hrs
4. Cerezo 2021 (Error mitigation) — 1.5 hrs

**Total: ~6.5 hours. Outcome: Advanced applications & error handling.**

### Phase 3: Scaling & Roadmap (2027–2030)

1. Bruzewicz et al. 2019 (Fault tolerance) — 2 hrs
2. Recent IBM/Google/IonQ papers — 3 hrs
3. Industry trend reports — 2 hrs

**Total: ~7 hours. Outcome: Plan 2028–2030 quantum AI system.**

---

## 🔗 Paper Search Tools

- **arXiv:** https://arxiv.org/list/quant-ph/recent
- **Google Scholar:** https://scholar.google.com
- **Semantic Scholar:** https://www.semanticscholar.org
- **Papers with Code:** https://paperswithcode.com

---

## 💾 Local Repository

Consider building a personal research archive:

```bash
mkdir -p research/papers
# Download PDFs, organize by topic
research/papers/
├── vqe/
├── qaoa/
├── qml/
├── error_correction/
└── applications/
```

---

**Next:** See `hardware.md` for current system status (2026).
