export type BriefAssessmentResult = Readonly<{
  instrumentId: string;
  complete: boolean;
  missingItems: readonly number[];
  total: number | null;
  maxScore?: number;
  interpretation: string | null;
  band?: string | null;
  screenPositive: boolean | null;
  positiveThreshold?: number;
}>;

export type BriefAssessment = Readonly<{
  id: string;
  officialName: string;
  purpose: string;
  instructions: string;
  recallPeriod: string;
  items: readonly string[];
  responseOptions: readonly Readonly<{ value: number; label: string }>[];
  maxScore: number;
  scoringMethod: string;
  positiveThreshold: number;
  positiveThresholdLabel: string;
  limitations: string;
  lowResult: string;
  highResult?: string;
  nextSteps: string;
  sources: readonly string[];
  statusText: string;
  bands?: readonly Readonly<{ min: number; max: number; label: string }>[];
  functionalImpact?: Readonly<{ label: string; options: readonly string[]; note: string }>;
}>;

export const BRIEF_RESPONSE_OPTIONS: readonly Readonly<{ value: number; label: string }>[];
export const BRIEF_ASSESSMENTS: Readonly<Record<string, BriefAssessment>>;
export function getBriefAssessment(instrumentId: string): BriefAssessment;
export function scoreBriefAssessment(instrumentId: string, responses: Array<number | null | undefined | "">): BriefAssessmentResult;
