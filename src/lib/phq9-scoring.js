/**
 * PHQ-9 scoring rules based on Kroenke, Spitzer & Williams (2001).
 * Deterministic only: no AI, network requests, or diagnosis.
 * Source: https://doi.org/10.1046/j.1525-1497.2001.016009606.x
 */
export const PHQ9_RESPONSE_OPTIONS = Object.freeze([
  Object.freeze({ value: 0, label: "Not at all" }),
  Object.freeze({ value: 1, label: "Several days" }),
  Object.freeze({ value: 2, label: "More than half the days" }),
  Object.freeze({ value: 3, label: "Nearly every day" }),
]);

export const PHQ9_ITEMS = Object.freeze([
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
]);

const SEVERITY_BANDS = Object.freeze([
  Object.freeze({ min: 0, max: 4, label: "Minimal" }),
  Object.freeze({ min: 5, max: 9, label: "Mild" }),
  Object.freeze({ min: 10, max: 14, label: "Moderate" }),
  Object.freeze({ min: 15, max: 19, label: "Moderately severe" }),
  Object.freeze({ min: 20, max: 27, label: "Severe" }),
]);

/**
 * Do not prorate or produce a total when any item is unanswered.
 * @param {Array<number|null|undefined>} responses Item 1 through item 9, each 0-3.
 */
export function scorePhq9(responses) {
  if (!Array.isArray(responses) || responses.length !== 9) {
    throw new TypeError("PHQ-9 requires exactly nine response positions.");
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
    return Object.freeze({
      complete: false,
      missingItems: Object.freeze(missingItems),
      total: null,
      severity: null,
      item9Positive: responses[8] !== null && responses[8] !== undefined && responses[8] !== "" && responses[8] > 0,
      requiresSafetyFollowUp: responses[8] !== null && responses[8] !== undefined && responses[8] !== "" && responses[8] > 0,
    });
  }

  const total = responses.reduce((sum, value) => sum + value, 0);
  const band = SEVERITY_BANDS.find((candidate) => total >= candidate.min && total <= candidate.max);
  const item9Positive = responses[8] > 0;

  return Object.freeze({
    complete: true,
    missingItems: Object.freeze([]),
    total,
    severity: band.label,
    item9Positive,
    requiresSafetyFollowUp: item9Positive,
  });
}

/**
 * Item 9 triggers follow-up independently of total score.
 * This helper does not estimate or diagnose suicide risk.
 * @param {number} item9Score
 * @param {"yes"|"no"|"unsure"|null|undefined} immediateSafetyAnswer
 */
export function getSafetyFollowUp(item9Score, immediateSafetyAnswer) {
  if (!Number.isInteger(item9Score) || item9Score < 0 || item9Score > 3) {
    throw new RangeError("Item 9 score must be an integer from 0 to 3.");
  }
  if (item9Score === 0) {
    return Object.freeze({ required: false, status: "not-triggered" });
  }
  if (immediateSafetyAnswer === null || immediateSafetyAnswer === undefined || immediateSafetyAnswer === "") {
    return Object.freeze({ required: true, status: "pending" });
  }
  if (immediateSafetyAnswer === "yes" || immediateSafetyAnswer === "unsure") {
    return Object.freeze({ required: true, status: "urgent" });
  }
  if (immediateSafetyAnswer === "no") {
    return Object.freeze({ required: true, status: "prompt-support" });
  }
  throw new TypeError("Safety answer must be yes, no, or unsure.");
}
