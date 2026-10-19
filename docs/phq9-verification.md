# Ozarbox PHQ-9 module — source and verification report

**Status (updated 19 October 2026):** The module is merged into `main` at commit `f0b0bd10fc48699d9ccbdb2e32281b42ff66f471`. For that commit, the Build check, production Build, CodeQL Advanced and GitHub Pages deployment workflows all completed successfully. The Build check steps included `npm test`, `npm run check` and `npm run build`. The current Node test suite contains 23 test cases across the scoring and source-level accessibility files. CI and static checks do not prove interactive browser behaviour or clinical validity. The Pages deployment action succeeded, but a direct end-to-end live-browser test was not available during this audit. Manual keyboard, VoiceOver/NVDA, contrast, zoom/reflow, mobile/iPad, print and clinical-safety evaluation remain outstanding. This report does not certify clinical validity, WCAG conformance, regulatory compliance, or suitability for institutional deployment.

## 1. Source and permissions review

### Instrument and exact wording
The nine English items, two-week recall instruction, four response options, and functional-difficulty follow-up are transcribed from the appendix of:

- Kroenke K, Spitzer RL, Williams JBW. *The PHQ-9: Validity of a brief depression severity measure.* Journal of General Internal Medicine. 2001;16:606–613. DOI: https://doi.org/10.1046/j.1525-1497.2001.016009606.x

The implementation keeps the official nine item prompts and response labels unchanged. The optional functional-difficulty question is not included in the 0–27 score.

### Permission basis
- Pfizer's 21 July 2010 announcement states that the PHQ and GAD assessment tools were made available for public access without copyright restriction and at no charge: https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care
- The U.S. National Library of Medicine Common Data Elements record for PHQ-9 identifies the copyright field as “No” and reproduces the instrument statement that no permission is required to reproduce, translate, display or distribute: https://cde.nlm.nih.gov/formView?tinyId=mJsGoMU1m
- NIH's PHQ-9 resource page provides the instrument and translations and identifies the instrument's purpose as measuring depressive symptoms over the past two weeks: https://www.nih.gov/node/19946

**Determination:** These published sources support reproducing the English PHQ-9 instrument and its scoring on Ozarbox without obtaining a separate instrument licence. The site includes attribution and does not claim endorsement. This is an instrument-use determination, not legal advice for a particular institutional procurement or regulatory context.

## 2. Scoring and validation boundaries

- Each of nine items accepts exactly one integer response: 0, 1, 2 or 3.
- The total is the sum of all nine values (0–27).
- No total is calculated if any core item is unanswered; there is no prorating or imputation.
- Published symptom-severity bands: 0–4 minimal; 5–9 mild; 10–14 moderate; 15–19 moderately severe; 20–27 severe.
- Any item 9 value above zero triggers a separate safety follow-up, independently of total score.
- A separate “immediate danger / might act now” question branches to urgent support guidance for “Yes” or “I'm not sure”; “No” still prompts timely contact with a professional or trusted person. The module does not infer immediate danger from total score.
- The functional-difficulty question is not included in the total score.
- The PHQ-9 is a screening and symptom-severity measure, not a standalone diagnosis.

The original paper's published performance estimates relate to its study sample and do not validate this web implementation. Ozarbox's implementation has not been clinically validated, psychometrically evaluated, or endorsed by the instrument developers.

## Clinical safety guidance and non-negotiable limitation

A non-zero PHQ-9 item 9 response must not be treated as a complete suicide-risk assessment. The website now explicitly states that it does not alert clinicians, monitor patient responses, or provide a validated suicide-risk assessment. A “No” answer to its simple immediate-safety prompt does not establish safety or rule out risk. In clinical use, the responsible clinician must review a positive response and follow the organisation's validated brief suicide safety assessment, documentation, escalation, and follow-up pathway. This module is not suitable as the sole tool for clinical triage or risk disposition.

Clinical references:
- Clinical Pathway for Suicide Risk Screening in Adult Primary Care Settings: Special Recommendations: https://pmc.ncbi.nlm.nih.gov/articles/PMC9489622/
- NIMH Adult Outpatient Brief Suicide Safety Assessment Guide: https://www.nimh.nih.gov/research/research-conducted-at-nimh/asq-toolkit-materials/adult-outpatient/adult-outpatient-brief-suicide-safety-assessment-guide

## 3. Data minimization

- All answers and score calculations are handled in the browser.
- No answer payload is intentionally sent to an Ozarbox server; no AI model is involved.
- No direct identifier is requested.
- No score history is saved by default. After explicit consent, optional local browser storage keeps only date, total score and severity band, with a 30-entry cap.
- Item-level answers and item 9 status are not saved in the history.
- Users can delete saved history from the page. Browser local storage is not encrypted and is not a clinical record system.

## 4. Automated verification included

The Node test suite covers:
- Exact English item text and all four response labels are locked by regression tests.
- All ten endpoints of the five severity bands: 0, 4, 5, 9, 10, 14, 15, 19, 20 and 27.
- Minimum and maximum score.
- Each of the nine missing-item positions, multiple missing items and the rule that incomplete responses never produce a total.
- Invalid response count, type, and range.
- Item 9 positive at a low total, item 9 positive at a high total, item 9 zero at a high total, and the pending / urgent / prompt-support safety branches.
- Source-level accessibility/disclosure checks for fieldsets and legends, labelled native radio controls, progress and live-region semantics, focus visibility, responsive breakpoints, reduced-motion support, consent, privacy copy, source attribution and emergency-support references.

GitHub Actions ran `npm test` (21 passed, 0 failed), `npm run check`, and `npm run build` successfully on the safety-correction pull request. CodeQL Advanced completed successfully. The GitHub Pages deployment workflow for the merged safety correction also completed successfully. Build and static-analysis results do not substitute for manual interaction, accessibility, or clinical review.

## 5. Accessibility and release verification status

**Automated source checks are not a substitute for a full accessibility audit.** Before institutional use, conduct manual keyboard-only testing, VoiceOver and NVDA screen-reader testing, browser/device checks on iPad and mobile, contrast testing, usability testing with disabled users, and a clinical safety review. Confirm the final deployed page URL, local-storage behavior, print/PDF behavior, and emergency-resource details in target countries.

No formal WCAG conformance claim is made. No clinical validation, institutional endorsement, or medical-device status is claimed.

## 6. Safety resources included

- India emergency response: 112 — Government of India ERSS: https://112.gov.in/
- India Tele-MANAS mental-health support: 14416 or 1800-89-14416 — Directorate General of Health Services, Ministry of Health and Family Welfare: https://www.dghs.mohfw.gov.in/national-mental-health-programme.php

The page also directs users outside India to their local emergency number or a verified crisis service in their country. It explicitly warns that the immediate-safety prompt is not a validated risk assessment and that the website does not alert clinicians.
