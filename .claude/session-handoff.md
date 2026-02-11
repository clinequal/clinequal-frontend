# Session Handoff - Bias List Implementation

## Current Task (COMPLETED)
✅ Implemented Nicola's bias list (74 biases) in BiasScrollSection with:
1. ✅ Color-coded categories (9 categories)
2. ✅ Legend explaining categories
3. Future: weight-based sizing (waiting for weight data from Nicola)

## Bias List from Excel (74 total)
```
Acceptability/unacceptability bias, Adherence/compliance bias, Admission rate (Berkson) bias,
Age mimicry bias, Algorithmic bias, Allocation bias, Apprehension bias, Ascertainment bias,
Attrition bias, Availability bias, Baseline imbalance bias, Channeling bias, Chronological bias,
Collider bias, Collider-stratification bias, Confounding bias, Confounding by indication bias,
Consent/non-consent bias, Data-dredging bias, Detection bias, Detection signal (unmasking) bias,
Diagnostic suspicion bias, Disease latency bias, Exposure bias, Exposure suspicion bias,
Family information bias, Gender bias, Healthy worker bias, Immortal time bias, Incorporation bias,
Indication bias, Information bias, Intervention bias, Interviewer bias, Investigator bias,
Language bias, Lead-time bias, Length time bias, Loss-to-follow-up bias, Measurement bias,
Membership bias, Missing data bias, Non-contemporaneous/non-concurrent control bias, Observer bias,
Overfitting bias, Participation bias, Perception bias, Population stratification bias,
Prevalence-incidence (Neyman) bias, Protopathic bias, Publication bias, Racial(ized)/ethnic bias,
Recall bias, Recruitment bias, Regression dilution bias, Reporting bias, Respondent bias,
Response/non-response bias, Risk perception bias, Sample bias, Sampling bias, Selection bias,
Simpson's paradox, Small-study effect bias, Sociodemographic bias, Spectrum effect bias,
Stratification bias, Survival/survivor(ship) bias, Social desirability bias, Temporal bias,
Testing bias, Unknown bias, Verification bias, Volunteer (self-selection) bias,
Wash-in/wash-out effect bias
```

## Proposed Categories (based on research)
1. **Selection & Sampling** (blue) - How participants are chosen
   - Selection bias, Sampling bias, Sample bias, Volunteer bias, Recruitment bias, Participation bias,
   - Admission rate (Berkson) bias, Healthy worker bias, Membership bias, Consent/non-consent bias,
   - Response/non-response bias, Loss-to-follow-up bias, Attrition bias, Survival bias

2. **Information & Measurement** (amber) - How data is collected/measured
   - Information bias, Measurement bias, Observer bias, Interviewer bias, Investigator bias,
   - Detection bias, Ascertainment bias, Recall bias, Reporting bias, Respondent bias,
   - Perception bias, Social desirability bias, Apprehension bias, Acceptability bias

3. **Confounding & Causation** (red) - Spurious associations
   - Confounding bias, Confounding by indication bias, Collider bias, Collider-stratification bias,
   - Simpson's paradox, Channeling bias, Indication bias, Protopathic bias

4. **Time-Related** (purple) - Temporal issues
   - Immortal time bias, Lead-time bias, Length time bias, Temporal bias, Chronological bias,
   - Disease latency bias, Prevalence-incidence (Neyman) bias, Wash-in/wash-out effect bias

5. **Analysis & Statistical** (green) - Data analysis issues
   - Data-dredging bias, Overfitting bias, Regression dilution bias, Small-study effect bias,
   - Missing data bias, Stratification bias, Population stratification bias, Baseline imbalance bias

6. **Publication & Reporting** (slate) - What gets published
   - Publication bias, Language bias, Reporting bias, Small-study effect bias

7. **Study Design** (cyan) - Trial design issues
   - Allocation bias, Intervention bias, Non-contemporaneous control bias, Testing bias,
   - Verification bias, Incorporation bias, Spectrum effect bias, Diagnostic suspicion bias,
   - Detection signal (unmasking) bias, Exposure bias, Exposure suspicion bias

8. **Demographic** (pink) - Population-specific
   - Gender bias, Racial/ethnic bias, Age mimicry bias, Sociodemographic bias, Family information bias

9. **Other/Emerging** (orange)
   - Algorithmic bias, Availability bias, Risk perception bias, Unknown bias, Adherence/compliance bias

## Files to Modify
- `src/components/sections/BiasScrollSection.tsx` - Main implementation
- Update biasTypes array with 74 biases + categories
- Add legend component below the bias pills

## Recent Changes Completed
1. ✅ Backend API refactor - new flag-based format (publicationConcerns, methodologicalLimitations, generalizabilityNotes)
2. ✅ MetadataBiasView updated with expanded trial fields
3. ✅ Collapsible sections for Interventions/Outcomes/Eligibility
4. ✅ BackButton component for better visibility
5. ✅ Search state persistence in DemoApp
6. ✅ FlagSectionHeader with clear concern indicators

## Key Files
- `/src/components/sections/BiasScrollSection.tsx` - Bias word cloud on homepage
- `/src/components/demo/MetadataBiasView.tsx` - Trial analysis view
- `/src/lib/demo/datasets/metadata-example.ts` - Types and mock data
- `/frontend-handoff-bias-refactor.md` - Backend API documentation

## Branch
Currently on `dev` branch. Preview URL: https://clinequal-frontend-git-dev-clinequal.vercel.app
