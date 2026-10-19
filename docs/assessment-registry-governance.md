# Ozarbox psychological assessment registry and governance

**Status: foundation only — not a clinical approval register.** The registry records the present evidence/permission state of modules. A module may only be enabled after instrument-specific review; the presence of an entry does not authorize reproduction.

## Registry status meanings
- `catalogue-only`: describe the instrument and link to authoritative acquisition/use instructions; no test content or score calculation.
- `implementation-pending-evidence`: implementation is blocked until official wording/version, scoring, population, permissions, and reference calculations are documented.
- `restricted`: content or administration is restricted to appropriately authorized professionals or purchasers. Do not expose secure materials.
- `disabled`: unavailable for administration until all blockers are resolved.
- `implemented-unvalidated`: software exists and automated checks may pass, but the particular website is not clinically validated.

## Minimum gate before an instrument can be implemented
1. Confirm official instrument, edition/version, original publication, official manual and permitted reproduction/translation/commercial use.
2. Record intended population, respondent, administrator qualification, recall period, language and local validation/norms.
3. Store exact item text only if authorized. Never paraphrase validated items while presenting them as official.
4. Record deterministic item mappings, reverse-coded items, domains, missing-data policy, cutoffs and supported interpretation. Never fill in missing answers unless the official manual specifies an approved rule.
5. Validate calculations against independently sourced manual examples or clinician-verified reference calculations.
6. Add tests for all response mappings, extrema, boundary cutoffs, missing and invalid data, conditional paths, repeat sessions, storage and deletion.
7. Review privacy, security, accessibility and relevant safety pathways.
8. Obtain sign-off from an appropriately qualified clinician/clinical safety lead and the necessary institutional, privacy/security, legal and regulatory reviewers for the intended context.
9. Publish a dated instrument verification report and exact commit/specification version.
10. Leave the module disabled if any safety-critical requirement is unresolved.

## Current catalogue state
The machine-readable source of truth is `src/data/assessment-registry.json`.

| Instrument | Current state | Reason |
|---|---|---|
| PHQ-9 | implemented-unvalidated | Existing module has deterministic scoring and documented safety disclaimers; clinical, manual accessibility and institutional review remain outstanding. |
| GAD-7 | implementation-pending-evidence | Public-access documentation exists, but this repository has not yet verified the exact version, sources, scoring reference cases or completed module tests. |
| PHQ-2 | implementation-pending-evidence | Exact version, official wording and independently verified scoring test coverage must be established first. |
| Other instruments | disabled by default | Must undergo instrument-specific source, permissions, scoring, administration and safety review. |

## Authoritative PHQ-9 source record
- Original validation publication: https://doi.org/10.1046/j.1525-1497.2001.016009606.x
- NIH/NLM Common Data Elements PHQ-9 record, whose terms state that no permission is required to reproduce, translate, display or distribute: https://cde.nlm.nih.gov/formView?tinyId=mJsGoMU1m
- Pfizer public-access announcement for PHQ and GAD tools: https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care

The original instrument's validation is not validation of this software. Passing build, tests, deployment or security scans does not establish clinical accuracy, usability, clinical effectiveness, formal WCAG conformance, regulatory compliance or institutional readiness.

## Clinical safety gate for PHQ-9
PHQ-9 item 9 alone is not a complete suicide-risk assessment. The extra immediate-safety question in the website is not a validated risk assessment. A “No” response does not establish safety or rule out suicide risk. The site does not monitor responses or alert clinicians. In clinical use, the responsible organisation must define clinician review, an appropriate follow-up assessment, documentation, escalation, emergency response and follow-up. This website must not be used alone for suicide triage or risk disposition.

Clinical background:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC9489622/
- https://www.nimh.nih.gov/research/research-conducted-at-nimh/asq-toolkit-materials/adult-outpatient/adult-outpatient-brief-suicide-safety-assessment-guide

## Accessibility and privacy
Automated source tests are not a WCAG conformance evaluation. Complete keyboard-only testing, visible-focus review, VoiceOver and NVDA, zoom/reflow, contrast and target-size measurement, mobile and iPad checks, error/focus-management tests, hidden-state tests, reduced-motion review and print/PDF review. Document issues and retest.

The PHQ-9 implementation states that responses are processed locally; optional score history requires explicit consent and stores date/total/severity only in local storage, which is not encrypted. Review built JavaScript and hosting/network behavior to verify this claim; review the privacy policy against the actual hosting configuration. Avoid claims about hosting logs or browser extensions beyond evidence.

## Institutional go/no-go
**No-go for standalone clinical triage, diagnosis, or emergency monitoring.** Before any patient-care deployment, obtain documented intended-use and population review, clinical workflow ownership, positive item-9 escalation protocol, informed consent and privacy/retention approval, security assessment, accessibility evaluation, language/cultural suitability review, usability/validation study appropriate to claims, and review of applicable local medical-software and data-protection requirements.
