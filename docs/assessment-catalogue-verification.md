# Ozarbox psychological assessment catalogue — verification and permission report

**Status:** Master catalogue and three additional short-screen implementations are on branch `feat/assessment-catalogue-and-core-screens`; they are not yet merged. PHQ-9 remains the existing route. The new modules are PHQ-2, GAD-7 and GAD-2. All four are marked `implemented-unvalidated`, not clinically validated. Other measures remain catalogue-only or permission-review entries until instrument-specific evidence, content rights, intended use and clinical governance are completed.

## What the catalogue means

The machine-readable register is `src/data/assessment-registry.json`. It currently indexes **178 unique instruments across 13 domains** from the supplied assessment list. Each record has an ID, official name, purpose, domain, version status, intended population, administration mode, language-validation status, recall-period status, author/developer status, permission/licence status, scoring version, source links where verified, safety rules, deployment status and software-validation status.

The catalogue is an implementation-control record, not a claim that every test has been fully researched or licensed. Where the exact edition, author, language norms, scoring rules or rights are not yet verified, the record says so. No score is produced for catalogue-only entries.

## Implemented brief screens

### PHQ-2 — Patient Health Questionnaire-2

- **Purpose:** brief depression-symptom screening.
- **Recall period / responses:** past two weeks; frequency response choices scored 0–3.
- **Scoring:** deterministic sum of two items, range 0–6; a score of 3 or above is a commonly used threshold for further assessment. Other settings may select another threshold depending on whether sensitivity or specificity is prioritised.
- **Interpretation limit:** a positive screen is not a diagnosis; a negative screen does not rule out depression when symptoms or concerns persist.
- **Sources:** [original validation study, PubMed](https://pubmed.ncbi.nlm.nih.gov/14583691/); [NIH/NLM PHQ-2 data element record](https://www.nih.gov/node/19936); [Pfizer public-access announcement for the PHQ family](https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care).

### GAD-7 — Generalized Anxiety Disorder-7

- **Purpose:** self-report measurement and screening of generalized anxiety symptoms.
- **Recall period / responses:** past two weeks; seven items scored 0–3.
- **Scoring:** deterministic sum, range 0–21. Common symptom bands are 0–4 minimal, 5–9 mild, 10–14 moderate and 15–21 severe. A total of 10 or higher is often used to identify people who may need further evaluation; cut points depend on population and context.
- **Functional impact:** an optional standard impact follow-up is presented separately and is excluded from the score.
- **Interpretation limit:** symptoms and impairment require contextual evaluation; the result does not establish a diagnosis.
- **Sources:** [original validation study, PubMed](https://pubmed.ncbi.nlm.nih.gov/16717171/); [primary-care use review](https://pmc.ncbi.nlm.nih.gov/articles/PMC7306644/); [2025 diagnostic-accuracy review](https://pmc.ncbi.nlm.nih.gov/articles/PMC11934853/); [Pfizer public-access announcement](https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care).

### GAD-2 — Generalized Anxiety Disorder-2

- **Purpose:** brief anxiety screen made from the first two GAD-7 items.
- **Recall period / responses:** past two weeks; two items scored 0–3.
- **Scoring:** deterministic sum, range 0–6; 3 or above is a commonly used threshold for further evaluation.
- **Interpretation limit:** this is a short screen, not a diagnostic result, and it covers fewer symptoms than the GAD-7.
- **Sources:** [primary-care validation study, PubMed](https://pubmed.ncbi.nlm.nih.gov/17339617/); [NICE guideline appendix with GAD-2 items, score threshold and reproduction note](https://www.ncbi.nlm.nih.gov/books/NBK92248/); [recent diagnostic-accuracy review](https://pmc.ncbi.nlm.nih.gov/articles/PMC11934853/).

### Existing PHQ-9

- The current implementation and its safety guidance are documented in [the PHQ-9 verification report](phq9-verification.md). Item 9 triggers a separate follow-up regardless of total score; the website's immediate-safety prompt is not a validated suicide-risk assessment. The site does not monitor responses or alert clinicians.
- Sources: [original validation paper](https://doi.org/10.1046/j.1525-1497.2001.016009606.x); [NLM PHQ-9 record](https://cde.nlm.nih.gov/formView?tinyId=mJsGoMU1m); [Pfizer public-access announcement](https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care).

## Measures that remain gated

- **PCL-5, PC-PTSD-5 and LEC-5:** official National Center for PTSD pages state these are public domain/not copyrighted, but also state professional-use expectations. Since this is a public static site with no clinician authentication or role-based permissions, these entries remain catalogue-only rather than open public clones. Official pages: [PCL-5](https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp), [PC-PTSD-5](https://www.ptsd.va.gov/professional/assessment/screens/pc-ptsd.asp), [LEC-5](https://www.ptsd.va.gov/professional/assessment/te-measures/life_events_checklist.asp).
- **WHO measures (including WHO-5, WHODAS 2.0, AUDIT and ASSIST):** the source and scoring materials are useful, but exact reuse rights for this website context must be checked. WHO distinguishes material covered by open-access licences from other material and says commercial uses can require permission. See [WHO copyright/licensing guidance](https://www.who.int/about/policies/publishing/copyright) and the official [WHO-5 product page](https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01), [WHODAS 2.0](https://www.who.int/classifications/international-classification-of-functioning-disability-and-health/who-disability-assessment-schedule), [AUDIT manual](https://www.who.int/publications/i/item/WHO-MSD-MSB-01.6a) and [ASSIST manual](https://tdr.who.int/publications/i/item/978924159938-2). These tools are not enabled on this public page until intended reuse is cleared.
- **Commercial/proprietary measures:** BDI-II, BAI, MMPI-3, WAIS, WISC, ADOS-2, ADI-R and other rights-controlled materials remain catalogue entries only. The register must be updated with the exact rights-holder, edition, acquisition path and use permissions before any implementation.
- **Structured interviews, clinician-rated measures and cognitive tests:** a public page cannot reliably enforce clinician qualifications, role-based access, secure stimulus protection, clinical record retention or local workflow accountability. They must remain disabled/catalogue-only unless an authorised clinician workflow and controls are supplied.
- **Other instruments with incomplete source verification:** do not assume that their use, translation, norms or cutoffs are free to reproduce. A missing permission statement is not permission.

## Automated coverage

The pull request adds deterministic scoring tests for:
- exact item wording and response labels in the three short screens;
- score minima/maxima and threshold boundaries;
- all GAD-7 symptom bands;
- every missing-answer position, invalid response values, and array-length errors;
- no scoring by imputation or prorating;
- optional GAD-7 functional-impact question exclusion from the total;
- catalogue completeness, registry schema, unique IDs, deployment gates, and routes;
- essential semantic and safety-focused page structure.

These tests are automated software checks only. They are not clinical validation or proof of WCAG conformance.

## Deployment and governance gate

Do not label any module clinically validated because its source instrument has validation evidence. Before patient-care use, a qualified clinical lead must approve the intended population, result language, clinical workflow, referral/escalation route, record handling and responsibilities. A privacy/security reviewer must assess hosting/logging and relevant data-protection requirements. A qualified accessibility evaluator must conduct manual screen-reader, keyboard, reflow, contrast, mobile and print testing.

**Current decision:** the three new short screens are available on the pull-request branch for code review and automated testing, but are not yet deployed from `main`. The live PHQ-9 remains a screening-only tool and is not ready to be represented as clinically validated for institutional patient care.


## Additional official permissions findings checked for this catalogue build

- **GAD-2:** the NICE guideline appendix to *Common Mental Health Disorders: Identification and Pathways to Care* states that no permission is required to reproduce, translate, display or distribute the GAD-2 tool. The underlying guideline publication retains its own copyright; this note is not a licence to reproduce the full publication. See [NICE guideline appendix](https://www.ncbi.nlm.nih.gov/books/NBK92248/).
- **SDQ:** the official SDQ information site says the questionnaire is copyright protected, must not be modified, and electronic versions require prior authorisation. The catalogue remains link-only pending rights-holder permission. See [SDQ official site](https://www.sdqinfo.org/).
- **M-CHAT-R/F:** the official permissions page says website posting or electronic distribution requires a licence agreement. The catalogue remains link-only pending licence. See [M-CHAT-R/F permissions](https://www.mchatscreen.com/mchat-rf/).
- **WHO-5:** the WHO-published 2024 form specifies CC BY-NC-SA 3.0 IGO, which allows non-commercial use, not assumed use in a commercial website. Ozarbox therefore does not embed the items pending legal clearance or permission. See [official WHO PDF](https://cdn.who.int/media/docs/default-source/mental-health/who-5_english-original4da539d6ed4b49389e3afe47cda2326a.pdf) and [WHO copyright policy](https://www.who.int/about/policies/publishing/copyright).
- **Pearson clinical tests:** Pearson Clinical Assessment India requires written consent for reproduction of its test materials and describes qualification restrictions; the catalogue does not reproduce those instruments or norms. See [Pearson permissions](https://www.pearsonclinical.in/legal/permissions-and-licensing.html) and [BDI-II product/qualification page](https://www.pearsonclinical.in/products/programs/beck-depression-inventory.html).
