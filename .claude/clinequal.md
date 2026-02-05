# CLAUDE.md - Clinequal Context

## Company

Clinequal is a healthcare AI startup that detects, quantifies, and corrects bias in clinical trial data.

## Problem

Over 80% of clinical trials have biased datasets. This goes far beyond demographic underrepresentation—there are 67 documented bias types that can compromise trial validity.

This causes:

- Drugs that pass trials but fail in real-world populations
- Protocol amendments costing €500K+ each
- Blocked or delayed regulatory approval
- Perpetuated healthcare inequalities

Current tools (EDC software, data cleaning utilities) are not designed to detect or address these biases. The problem remains invisible until it becomes expensive.

## The 67 Documented Bias Types

This is Clinequal's core differentiator. Most competitors check for 5-10 common biases. Clinequal systematically detects all 67:

1. Adherence bias
2. Admission rate bias (Berkson's bias)
3. All's well literature bias
4. Allocation bias
5. Apprehension bias
6. Ascertainment bias
7. Attrition bias
8. Availability bias
9. Biases of rhetoric
10. Centripetal bias
11. Chronological bias
12. Collider bias
13. Compliance bias
14. Confirmation bias
15. Confounding
16. Confounding by indication
17. Data-dredging bias
18. Detection bias
19. Diagnostic access bias
20. Diagnostic suspicion bias
21. Differential reference bias
22. Early stopping bias
23. Hawthorne effect
24. Hot stuff bias
25. Hypothetical bias
26. Immortal time bias
27. Incorporation bias
28. Industry sponsorship bias
29. Information bias
30. Informed presence bias
31. Insensitive measure bias
32. Lack of blinding
33. Language bias
34. Lead time bias
35. Length time bias
36. Mimicry bias
37. Misclassification bias
38. Non-contemporaneous control bias
39. Non-response bias
40. Novelty bias
41. Observer bias
42. One-sided reference bias
43. Outcome reporting bias
44. Partial reference bias
45. Perception bias
46. Performance bias
47. Popularity bias
48. Positive results bias
49. Prevalence-incidence (Neyman) bias
50. Previous opinion bias
51. Publication bias
52. Racial bias
53. Recall bias
54. Referral filter bias
55. Reporting biases
56. Review biases
57. Selection bias
58. Spectrum bias
59. Spin bias
60. Starting time bias
61. Substitution game bias
62. Unacceptability bias
63. Unacceptable disease bias
64. Unmasking (detection signal) bias
65. Verification bias
66. Volunteer bias
67. Wrong sample size bias

**Technical note**: Bias detection algorithms are transversal—they work across all therapeutic areas and trial phases. Epidemiological baselines are fetched at runtime based on trial type. The platform is intentionally generic, not narrowed to specific diseases.

## Solution

End-to-end platform for clinical trial bias management across ALL phases and ALL therapeutic areas:

- **Detect** 67 documented bias types automatically
- **Quantify** bias severity with statistical fairness metrics
- **Explain** where and why bias exists (explainable AI)
- **Correct** through evidence-based strategies and steering recommendations
- **Simulate** what-if scenarios before committing resources
- **Report** audit-ready documentation for EMA/FDA compliance

## Product Certainties (confirmed for development)

- Continuous/daily bias monitoring (not one-time audit)
- XAI-driven explanations for why bias exists and how to correct
- Simulation: tweak parameters, see bias impact before acting
- Benchmark comparisons (trial vs. average for same disease/phase)
- Spider graphs and visualization tools
- Datasets live in Clinequal with daily fetching

## Product Uncertainties (requires customer discovery)

- Exact dashboard layout and UX
- Specific report formats
- Workflow details (who sees what, when)
- Alert frequency preferences (real-time vs. daily digest)
- Integration points with existing EDC systems

## Customer Discovery Questions

**Workflow:**
- "Walk me through what happens when you discover a bias issue mid-trial today."
- "Who needs to see bias information? Just biostatisticians, or also clinical ops, regulatory?"
- "How do you currently document bias-related decisions for regulatory submission?"

**Pain points:**
- "What's the most expensive bias-related problem you've encountered?"
- "When in the trial lifecycle do you wish you'd known about bias earlier?"
- "What data do you already export from your EDC that we could analyze?"

**Feature validation:**
- "If you could simulate a protocol change and see bias impact—how valuable is that 1-10?"
- "Would you want alerts pushed to you, or prefer to check a dashboard?"
- "How often would 'daily' bias updates actually be useful vs. noise?"

## Customers

Primary: Pharmaceutical companies and Contract Research Organizations (CROs) who run clinical trials and bear the cost of failures.

Secondary: Academic medical centers, hospital research departments, regulatory bodies.

## Business Model

SaaS subscription per clinical trial. Pricing validated through customer conversations (anchor to regulatory delay cost, not compute cost). Premium justified by computational intensity and systematic coverage.

## Strategic Moat

The moat is weak early but compounds over time:
- Each trial analyzed adds training data
- Detection accuracy improves with volume
- Customer relationships create switching costs
- At 50+ trials: real moat. At 200+ trials: acquisition-worthy.

Likely exit path: Acquisition by IQVIA, Medidata, Veeva, or Oracle Health Sciences rather than standalone $10B company.

## Market

- TAM: €143B global clinical trial data analytics by 2030
- SAM: €29.4B European segment
- Target: €100M ARR in 5 years (5,000 trials)

## Differentiation

Competitors like CluePoints, Inato, and Unlearn.AI offer monitoring or recruitment optimization. None provide:
- Systematic detection of 67 bias types
- Continuous monitoring (not one-time audit)
- XAI-driven steering recommendations
- What-if simulation before protocol changes

## Stage

Pre-seed. MVP validated on public datasets. University of Naples Federico II partnership. Fit4Start finalist (top 15 of 495). Meeting scheduled with Alfasigma.

## Team

Six co-founders:
- CEO: PhD Industrial Engineering (KTH), 10+ years AI/ML, serial entrepreneur, Oxford entrepreneurship academy
- CPO: MSc Bioinformatics (Imperial), MBA, 10+ years healthcare data science
- CSO: MD, PhD, 1,000+ publications, top 2% most cited scientists, Cochrane Reviewer
- CTO: BSc Computer Science, technical architect
- CCO: Doctor in Design for Community, branding & digital marketing
- CFO: Master's Economics, Management & Sustainability, ESG specialist

Academic collaborations: Politecnico di Milano, Federico II Naples, LIST Luxembourg, Linköping, Oxford, Luxembourg, KTH, Karolinska.

## Website Messaging Principles

- **Minimal, not repetitive**: Mention 67 biases once with impact (scroll component), don't repeat across sections
- **Concrete over abstract**: Say what users GET, not marketing-speak
- **Comprehensive scope**: All phases, all diseases, all 67 bias types—don't artificially narrow
- **Specific about capabilities, vague about UI**: Can promise "continuous monitoring" without showing exact dashboard

## One-Liner

Your trial data, monitored daily for 67 documented bias types. When issues emerge, explainable AI shows the root cause and how to correct course.
