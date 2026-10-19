/**
 * Deterministic scoring for the separately governed PHQ-2, GAD-7 and GAD-2 brief screens.
 * Items are not paraphrased in this file. No network, AI, local storage or diagnostic inference.
 * PHQ/GAD public-access source: Pfizer 2010 announcement linked in the instrument registry.
 */
export type BriefAssessmentResult = {
  instrumentId: string;
  complete: boolean;
  missingItems: readonly number[];
  total: number | null;
  maxScore?: number;
  interpretation: string | null;
  band?: string | null;
  screenPositive?: boolean | null;
  positiveThreshold?: number;
};

export const BRIEF_RESPONSE_OPTIONS = Object.freeze([
  Object.freeze({ value: 0, label: "Not at all" }),
  Object.freeze({ value: 1, label: "Several days" }),
  Object.freeze({ value: 2, label: "More than half the days" }),
  Object.freeze({ value: 3, label: "Nearly every day" }),
]);

const commonInstructions = "Over the last 2 weeks, how often have you been bothered by any of the following problems?";

export const BRIEF_ASSESSMENTS = Object.freeze({
  "phq-2": Object.freeze({
    id: "phq-2",
    officialName: "Patient Health Questionnaire-2 (PHQ-2)",
    purpose: "Brief screening for depressive symptoms",
    instructions: commonInstructions,
    recallPeriod: "Past two weeks",
    items: Object.freeze([
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
    ]),
    responseOptions: BRIEF_RESPONSE_OPTIONS,
    maxScore: 6,
    scoringMethod: "Sum the two item responses (0–3 each).",
    positiveThreshold: 3,
    positiveThresholdLabel: "A score of 3 or higher is a commonly used threshold for further assessment.",
    limitations: "The PHQ-2 is a brief screen, not a diagnosis. A score below the commonly used threshold does not rule out depression, especially when symptoms, impairment or concerns persist. A positive result should be followed by a fuller clinical assessment, often including PHQ-9 and an interview.",
    lowResult: "This score is below a commonly used PHQ-2 screening threshold. It does not rule out depression or other mental-health concerns.",
    highResult: "This score is at or above a commonly used PHQ-2 screening threshold. It suggests that further assessment may be useful; it does not establish a depressive disorder.",
    nextSteps: "Consider discussing your symptoms, duration, daily functioning, medical history and any concerns with a qualified health professional. A clinician may use PHQ-9 or another appropriate assessment as part of a broader evaluation.",
    sources: Object.freeze([
      "https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care",
      "https://pubmed.ncbi.nlm.nih.gov/14583691/",
      "https://cde.nlm.nih.gov/formView?tinyId=mJsGoMU1m"
    ]),
    statusText: "English self-report screen. The instrument family has public-access documentation; this particular website module has not been independently clinically validated."
  }),
  "gad-7": Object.freeze({
    id: "gad-7",
    officialName: "Generalized Anxiety Disorder-7 (GAD-7)",
    purpose: "Screening and measurement of generalized anxiety symptoms",
    instructions: commonInstructions,
    recallPeriod: "Past two weeks",
    items: Object.freeze([
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen",
    ]),
    responseOptions: BRIEF_RESPONSE_OPTIONS,
    maxScore: 21,
    scoringMethod: "Sum the seven item responses (0–3 each). Do not impute missing answers.",
    bands: Object.freeze([
      Object.freeze({ min: 0, max: 4, label: "Minimal symptom range" }),
      Object.freeze({ min: 5, max: 9, label: "Mild symptom range" }),
      Object.freeze({ min: 10, max: 14, label: "Moderate symptom range" }),
      Object.freeze({ min: 15, max: 21, label: "Severe symptom range" }),
    ]),
    positiveThreshold: 10,
    positiveThresholdLabel: "A total of 10 or higher is commonly used to identify people who may need further evaluation; thresholds depend on context and population.",
    functionalImpact: Object.freeze({
      label: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
      options: Object.freeze([
        "Not difficult at all",
        "Somewhat difficult",
        "Very difficult",
        "Extremely difficult"
      ]),
      note: "This is a functional-impact follow-up and is not included in the GAD-7 score."
    }),
    limitations: "The GAD-7 measures self-reported anxiety symptoms; it cannot establish an anxiety disorder or explain the cause of symptoms. Physical health conditions, medications, stressors, other mental-health conditions, culture and language can affect responses. A clinician evaluates duration, impairment, context and alternative explanations.",
    lowResult: "This total is below a commonly used threshold for further assessment. The symptom-range label above may still indicate mild symptoms; it does not rule out an anxiety condition or other concerns if symptoms, impairment or worry persist.",
    nextSteps: "Review how long the symptoms have been present and whether they affect sleep, work, study, relationships or daily activities. Consider discussing ongoing symptoms or impairment with a qualified health professional.",
    sources: Object.freeze([
      "https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care",
      "https://pubmed.ncbi.nlm.nih.gov/16717171/"
    ]),
    statusText: "English self-report measure. The GAD-7 has public-access documentation; this particular website module has not been independently clinically validated."
  }),
  "gad-2": Object.freeze({
    id: "gad-2",
    officialName: "Generalized Anxiety Disorder-2 (GAD-2)",
    purpose: "Brief screening for generalized anxiety symptoms",
    instructions: commonInstructions,
    recallPeriod: "Past two weeks",
    items: Object.freeze([
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
    ]),
    responseOptions: BRIEF_RESPONSE_OPTIONS,
    maxScore: 6,
    scoringMethod: "Sum the first two GAD-7 symptom responses (0–3 each). Do not impute missing answers.",
    positiveThreshold: 3,
    positiveThresholdLabel: "A score of 3 or higher is a commonly used threshold for further assessment.",
    limitations: "GAD-2 is a brief screen, not a diagnosis. It covers only two anxiety symptoms and can miss other symptom patterns. A score below the threshold does not rule out an anxiety condition or other concern.",
    lowResult: "This score is below a commonly used GAD-2 screening threshold. It does not rule out anxiety or other concerns if symptoms or impairment persist.",
    highResult: "This score is at or above a commonly used GAD-2 screening threshold. Further assessment may be appropriate; this result does not diagnose an anxiety disorder.",
    nextSteps: "If symptoms continue, affect everyday life or concern you, consider a fuller assessment such as GAD-7 and a conversation with a qualified health professional.",
    sources: Object.freeze([
      "https://www.pfizer.com/news/press-release/press-release-detail/pfizer_to_offer_free_public_access_to_mental_health_assessment_tools_to_improve_diagnosis_and_patient_care",
      "https://pubmed.ncbi.nlm.nih.gov/17339617/"
    ]),
    statusText: "English two-item screen derived from the GAD-7 items. This website implementation has not been independently clinically validated and still requires local clinical governance and evaluation."
  })
});

export function getBriefAssessment(instrumentId) {
  const instrument = BRIEF_ASSESSMENTS[instrumentId];
  if (!instrument) throw new RangeError("Unknown brief assessment: " + instrumentId);
  return instrument;
}

/**
 * Scores one brief screen without imputation. Returns complete:false for unanswered items.
 * Values must be integer response codes 0 through 3.
 */
export function scoreBriefAssessment(instrumentId, responses) {
  const instrument = getBriefAssessment(instrumentId);
  if (!Array.isArray(responses) || responses.length !== instrument.items.length) {
    throw new TypeError(instrument.officialName + " requires exactly " + instrument.items.length + " response positions.");
  }
  const missingItems = [];
  responses.forEach((value, index) => {
    if (value === null || value === undefined || value === "") {
      missingItems.push(index + 1);
    } else if (!Number.isInteger(value) || value < 0 || value > 3) {
      throw new RangeError("Response for item " + (index + 1) + " must be an integer from 0 to 3.");
    }
  });
  if (missingItems.length) {
    return Object.freeze({ instrumentId, complete: false, missingItems: Object.freeze(missingItems), total: null, interpretation: null, screenPositive: null });
  }
  const total = responses.reduce((sum, value) => sum + value, 0);
  const band = instrument.bands?.find((candidate) => total >= candidate.min && total <= candidate.max) ?? null;
  const screenPositive = total >= instrument.positiveThreshold;
  const interpretation = band?.label ?? (screenPositive ? "At or above common screening threshold" : "Below common screening threshold");
  return Object.freeze({
    instrumentId,
    complete: true,
    missingItems: Object.freeze([]),
    total,
    maxScore: instrument.maxScore,
    interpretation,
    band: band?.label ?? null,
    screenPositive,
    positiveThreshold: instrument.positiveThreshold
  });
}
