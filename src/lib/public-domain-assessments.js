/**
 * Public-domain National Center for PTSD assessment forms.
 * Sources and scoring notes are on each instrument record and in the catalogue report.
 * No network access, AI scoring or client-side persistence. This module's implementation
 * has not been independently clinically validated.
 */
export const PTSD_LIKERT_OPTIONS = Object.freeze([
  Object.freeze({ value: 0, label: "Not at all" }),
  Object.freeze({ value: 1, label: "A little bit" }),
  Object.freeze({ value: 2, label: "Moderately" }),
  Object.freeze({ value: 3, label: "Quite a bit" }),
  Object.freeze({ value: 4, label: "Extremely" }),
]);

export const PTSD_YES_NO_OPTIONS = Object.freeze([
  Object.freeze({ value: "no", label: "No" }),
  Object.freeze({ value: "yes", label: "Yes" }),
]);

export const LEC5_RESPONSE_OPTIONS = Object.freeze([
  Object.freeze({ value: "personal", label: "Happened to me" }),
  Object.freeze({ value: "witnessed", label: "Witnessed it" }),
  Object.freeze({ value: "learned", label: "Learned about it happening to a close family member or close friend" }),
  Object.freeze({ value: "job", label: "Part of my job" }),
  Object.freeze({ value: "unsure", label: "Not sure if it fits" }),
  Object.freeze({ value: "doesnt-apply", label: "Doesn't apply" }),
]);

export const PUBLIC_DOMAIN_ASSESSMENTS = Object.freeze({
  "pcl-5": Object.freeze({
    id: "pcl-5",
    kind: "likert",
    officialName: "PTSD Checklist for DSM-5 (PCL-5), Past Month",
    purpose: "Self-report measure of 20 PTSD symptoms for screening and symptom monitoring",
    instructions: "Below is a list of problems that people sometimes have in response to a very stressful experience. Keeping your worst event in mind, please read each problem carefully and then select one of the numbers to the right to indicate how much you have been bothered by that problem in the past month.",
    recallPeriod: "Past month",
    items: Object.freeze([
      "Repeated, disturbing, and unwanted memories of the stressful experience?",
      "Repeated, disturbing dreams of the stressful experience?",
      "Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?",
      "Feeling very upset when something reminded you of the stressful experience?",
      "Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?",
      "Avoiding memories, thoughts, or feelings related to the stressful experience?",
      "Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?",
      "Trouble remembering important parts of the stressful experience?",
      "Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?",
      "Blaming yourself or someone else for the stressful experience or what happened after it?",
      "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
      "Loss of interest in activities that you used to enjoy?",
      "Feeling distant or cut off from other people?",
      "Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?",
      "Irritable behavior, angry outbursts, or acting aggressively?",
      "Taking too many risks or doing things that could cause you harm?",
      "Being “superalert” or watchful or on guard?",
      "Feeling jumpy or easily startled?",
      "Having difficulty concentrating?",
      "Trouble falling or staying asleep?",
    ]),
    responseOptions: PTSD_LIKERT_OPTIONS,
    maxScore: 80,
    scoringMethod: "Sum all 20 item responses (0–4 each) for a total of 0–80. Also calculate DSM-5 symptom-cluster sums: B items 1–5, C items 6–7, D items 8–14, and E items 15–20. No missing answers are imputed.",
    thresholdRange: Object.freeze({ min: 31, max: 33 }),
    limitations: "The National Center for PTSD says interpretation should be made by a clinician. A total-score cut-point between 31 and 33 has been suggested in research for probable PTSD across samples, but the appropriate threshold depends on population and purpose. A score is not a diagnosis and does not replace a structured clinical interview such as CAPS-5. A score below this range does not rule out PTSD. The PCL-5 is intended for use by qualified health professionals and researchers.",
    lowResult: "This score is below the commonly cited 31–33 screening cut-point range. That does not rule out PTSD, and it should not override a person's concerns, impairment or clinical presentation.",
    nextSteps: "A qualified professional can review which symptoms were endorsed, the context and nature of the stressful event, duration and functional impact, and possible alternative explanations. When diagnostic clarification is needed, the VA identifies a structured clinical interview such as CAPS-5 as the gold-standard assessment.",
    safetyNotice: "Trauma questions can bring up difficult feelings. You do not need to describe the event to use this questionnaire. Pause or leave at any time. This site is not monitored; if someone is currently harming you or you are in immediate danger, leave the tool and seek immediate local emergency or in-person support.",
    audienceNotice: "The National Center for PTSD states that the PCL-5 is intended for qualified health professionals and researchers. The content is public domain; this Ozarbox implementation is an independent, unvalidated software version.",
    sources: Object.freeze([
      "https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp",
      "https://www.ptsd.va.gov/professional/assessment/documents/PCL5_Standard_form.PDF",
      "https://doi.org/10.1002/jts.22059"
    ]),
    statusText: "Public-domain English PCL-5, Past Month form (version date 29 August 2023). Official guidance states clinician interpretation is required. Ozarbox has not been independently clinically validated."
  }),
  "pc-ptsd-5": Object.freeze({
    id: "pc-ptsd-5",
    kind: "yes-no-branch",
    officialName: "Primary Care PTSD Screen for DSM-5 (PC-PTSD-5)",
    purpose: "Brief screen for probable PTSD in primary-care settings",
    instructions: "Sometimes things happen to people that are unusually or especially frightening, horrible, or traumatic. For example: a serious accident or fire; a physical or sexual assault or abuse; an earthquake or flood; a war; seeing someone be killed or seriously injured; having a loved one die through homicide or suicide. Have you ever experienced this kind of event?",
    recallPeriod: "Lifetime exposure question, followed by symptom questions about the past month only if exposure is endorsed",
    items: Object.freeze([
      "Had nightmares about the event(s) or thought about the event(s) when you did not want to?",
      "Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?",
      "Been constantly on guard, watchful, or easily startled?",
      "Felt numb or detached from people, activities, or your surroundings?",
      "Felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the events may have caused?",
    ]),
    responseOptions: PTSD_YES_NO_OPTIONS,
    maxScore: 5,
    scoringMethod: "Answer the lifetime exposure question first. If No, stop and the screen total is 0. If Yes, count Yes responses to the five symptom questions about the past month (0–5). The exposure question is not included in the 0–5 symptom total.",
    positiveThreshold: 4,
    limitations: "The National Center for PTSD says a cut-point of 4 balanced false negatives and false positives for its overall primary-care sample and men, but this can result in many false negatives for women; lower thresholds may be appropriate in some settings. The cut-point depends on population and screening purpose. A positive screen is not a diagnosis; further assessment, preferably a structured interview such as CAPS-5, is recommended.",
    lowResult: "This result is below the commonly used threshold in some primary-care settings. It does not rule out PTSD or other trauma-related concerns, especially if symptoms or impairment persist.",
    nextSteps: "A positive screen or ongoing concern should be followed by a fuller assessment with a qualified health professional. A clinician may use PCL-5 for additional symptom measurement or a structured interview such as CAPS-5 when appropriate.",
    safetyNotice: "You do not need to describe a traumatic event to complete this brief screen. You may pause or exit at any point. This site is not monitored and does not notify clinicians. If you are currently unsafe or in immediate danger, exit and seek immediate local emergency or in-person support.",
    audienceNotice: "The National Center for PTSD states that PC-PTSD-5 is intended for qualified health professionals and researchers. It is public domain and not copyrighted; this Ozarbox software implementation is independent and has not been clinically validated.",
    sources: Object.freeze([
      "https://www.ptsd.va.gov/professional/assessment/screens/pc-ptsd.asp",
      "https://www.ptsd.va.gov/professional/assessment/documents/pc-ptsd5-screen.pdf",
      "https://doi.org/10.1007/s11606-016-3703-5"
    ]),
    statusText: "Public-domain English PC-PTSD-5 screen. The official page states a Yes to the lifetime exposure question ends the screen if No; symptoms refer to the past month. Ozarbox software implementation is not clinically validated."
  }),
  "lec-5": Object.freeze({
    id: "lec-5",
    kind: "exposure-checklist",
    officialName: "Life Events Checklist for DSM-5 (LEC-5), Standard Self-Report",
    purpose: "Lifetime screening inventory of potentially traumatic events; it is not a symptom-severity test",
    instructions: "Listed below are a number of difficult or stressful things that sometimes happen to people. For each event check one or more boxes to indicate that it happened to you personally, you witnessed it happen to someone else, you learned about it happening to a close family member or close friend, you were exposed to it as part of your job (for example, paramedic, police, military, or other first responder), you are not sure if it fits, or it doesn't apply to you. Consider your entire life (growing up as well as adulthood).",
    recallPeriod: "Entire lifetime",
    events: Object.freeze([
      "Natural disaster (for example, flood, hurricane, tornado, earthquake)",
      "Fire or explosion",
      "Transportation accident (for example, car accident, boat accident, train wreck, plane crash)",
      "Serious accident at work, home, or during recreational activity",
      "Exposure to toxic substance (for example, dangerous chemicals, radiation)",
      "Physical assault (for example, being attacked, hit, slapped, kicked, beaten up)",
      "Assault with a weapon (for example, being shot, stabbed, threatened with a knife, gun, bomb)",
      "Sexual assault (rape, attempted rape, made to perform any type of sexual act through force or threat of harm)",
      "Other unwanted or uncomfortable sexual experience",
      "Combat or exposure to a war-zone (in the military or as a civilian)",
      "Captivity (for example, being kidnapped, abducted, held hostage, prisoner of war)",
      "Life-threatening illness or injury",
      "Severe human suffering",
      "Sudden violent death (for example, homicide, suicide)",
      "Sudden accidental death",
      "Serious injury, harm, or death you caused to someone else",
      "Any other very stressful event or experience",
    ]),
    responseOptions: LEC5_RESPONSE_OPTIONS,
    scoringMethod: "The LEC-5 exposure checklist does not have an overall total symptom score or universal severity bands. The response summary records types of lifetime event exposure and how they were experienced; a qualified professional determines relevance to subsequent assessment.",
    limitations: "LEC-5 assesses potential event exposure, not PTSD symptoms, diagnosis or severity. The National Center for PTSD notes that psychometrics for the LEC-5 itself are not currently available and that it is often used alongside measures such as PCL-5 or CAPS-5 to assess exposure to a potentially qualifying event. Selecting an event does not prove that diagnostic criteria are met; not selecting one does not rule out distress or need for support.",
    lowResult: "This is an exposure checklist, not a scored symptom test. No total or diagnosis is generated.",
    nextSteps: "If an experience continues to distress you or affects daily life, consider discussing it with a qualified health professional. You do not need to provide graphic details or complete this checklist to deserve support.",
    safetyNotice: "This checklist includes sensitive experiences. You can skip any item, pause or exit without explaining why. Do not enter names or identifying details. Answers stay in this browser session and are not saved or monitored. If someone is currently harming you or you are in immediate danger, exit and seek immediate local emergency or in-person support.",
    audienceNotice: "The National Center for PTSD describes LEC-5 as a self-report exposure measure and states its instruments are intended for qualified health professionals and researchers. The public-domain measure is not a diagnostic interview; this page deliberately provides only the standard exposure checklist, with no trauma narrative or extended-interview module.",
    sources: Object.freeze([
      "https://www.ptsd.va.gov/professional/assessment/te-measures/life_events_checklist.asp",
      "https://www.ptsd.va.gov/professional/assessment/documents/LEC5_Extended_Self-report.PDF",
      "https://doi.org/10.1177/1073191104269954"
    ]),
    statusText: "Public-domain English standard self-report exposure checklist. No total symptom score is generated. Ozarbox implementation is independent and unvalidated."
  }),
  "gds-15": {
  "id": "gds-15",
  "kind": "likert",
  "scoreType": "gds",
  "officialName": "Geriatric Depression Scale (GDS-15)",
  "purpose": "Public-domain yes/no screening questionnaire for depressive symptoms in older adults",
  "instructions": "Choose the answer that best describes how you have felt over the past week. Answer every item. This screen is intended for older adults and does not diagnose depression.",
  "recallPeriod": "Past week",
  "items": [
    "Are you basically satisfied with your life?",
    "Have you dropped many of your activities and interests?",
    "Do you feel that your life is empty?",
    "Do you often get bored?",
    "Are you in good spirits most of the time?",
    "Are you afraid that something bad is going to happen to you?",
    "Do you feel happy most of the time?",
    "Do you often feel helpless?",
    "Do you prefer to stay at home, rather than going out and doing new things?",
    "Do you feel you have more problems with memory than most?",
    "Do you think it is wonderful to be alive now?",
    "Do you feel pretty worthless the way you are now?",
    "Do you feel full of energy?",
    "Do you feel that your situation is hopeless?",
    "Do you think that most people are better off than you are?"
  ],
  "responseOptions": [
    {
      "value": "no",
      "label": "No"
    },
    {
      "value": "yes",
      "label": "Yes"
    }
  ],
  "depressionKeys": [
    2,
    3,
    4,
    6,
    8,
    9,
    10,
    12,
    14,
    15
  ],
  "positiveThreshold": 6,
  "maxScore": 15,
  "scoringMethod": "Count one point for each depression-keyed response. GDS-15: items 2,3,4,6,8,9,10,12,14,15 = Yes; items 1,5,7,11,13 = No. GDS-30 uses the original Stanford answer key.",
  "limitations": "A screening score is not a diagnosis. The GDS is designed for older adults; cognitive, medical, cultural and language context matter. A low score does not rule out depression. Persistent distress, functional decline or safety concerns warrant professional assessment.",
  "lowResult": "This score is below the commonly used follow-up threshold. It does not rule out depression or another health concern.",
  "highResult": "This score is at or above a commonly used follow-up threshold. Arrange a fuller assessment with a qualified health professional; this is not a diagnosis.",
  "nextSteps": "Discuss persistent low mood, loss of interest, changes in daily functioning or any safety concerns with a qualified health professional. If there is immediate danger, seek urgent local emergency or in-person support.",
  "safetyNotice": "This questionnaire is not monitored and does not assess suicide risk. You may stop at any time. If you may act on thoughts of harming yourself or someone else, or are in immediate danger, seek immediate local emergency or in-person help.",
  "audienceNotice": "Public-domain English GDS. Intended for screening older adults; not a diagnostic instrument. Ozarbox software implementation is independent and has not been clinically validated.",
  "sources": [
    "https://www.apa.org/depression-guideline/assessment/",
    "https://web.stanford.edu/~yesavage/GDS",
    "https://web.stanford.edu/~yesavage/GDS.english.long.html"
  ],
  "statusText": "Public-domain English GDS form, transcribed from Stanford University source. Original instrument is public domain. Ozarbox software implementation is not independently clinically validated."
},
  "gds-30": {
  "id": "gds-30",
  "kind": "likert",
  "scoreType": "gds",
  "officialName": "Geriatric Depression Scale (GDS-30)",
  "purpose": "Public-domain yes/no screening questionnaire for depressive symptoms in older adults",
  "instructions": "Choose the answer that best describes how you have felt over the past week. Answer every item. This screen is intended for older adults and does not diagnose depression.",
  "recallPeriod": "Past week",
  "items": [
    "Are you basically satisfied with your life?",
    "Have you dropped many of your activities and interests?",
    "Do you feel that your life is empty?",
    "Do you often get bored?",
    "Are you hopeful about the future?",
    "Are you bothered by thoughts you can’t get out of your head?",
    "Are you in good spirits most of the time?",
    "Are you afraid that something bad is going to happen to you?",
    "Do you feel happy most of the time?",
    "Do you often feel helpless?",
    "Do you often get restless and fidgety?",
    "Do you prefer to stay at home, rather than going out and doing new things?",
    "Do you frequently worry about the future?",
    "Do you feel you have more problems with memory than most?",
    "Do you think it is wonderful to be alive now?",
    "Do you often feel downhearted and blue?",
    "Do you feel pretty worthless the way you are now?",
    "Do you worry a lot about the past?",
    "Do you find life very exciting?",
    "Is it hard for you to get started on new projects?",
    "Do you feel full of energy?",
    "Do you feel that your situation is hopeless?",
    "Do you think that most people are better off than you are?",
    "Do you frequently get upset over little things?",
    "Do you frequently feel like crying?",
    "Do you have trouble concentrating?",
    "Do you enjoy getting up in the morning?",
    "Do you prefer to avoid social gatherings?",
    "Is it easy for you to make decisions?",
    "Is your mind as clear as it used to be?"
  ],
  "responseOptions": [
    {
      "value": "no",
      "label": "No"
    },
    {
      "value": "yes",
      "label": "Yes"
    }
  ],
  "depressionKeys": [
    2,
    3,
    4,
    6,
    8,
    10,
    11,
    12,
    13,
    14,
    16,
    17,
    18,
    20,
    22,
    23,
    24,
    25,
    26,
    28
  ],
  "positiveThreshold": 10,
  "maxScore": 30,
  "scoringMethod": "Count one point for each depression-keyed response. GDS-15: items 2,3,4,6,8,9,10,12,14,15 = Yes; items 1,5,7,11,13 = No. GDS-30 uses the original Stanford answer key.",
  "limitations": "A screening score is not a diagnosis. The GDS is designed for older adults; cognitive, medical, cultural and language context matter. A low score does not rule out depression. Persistent distress, functional decline or safety concerns warrant professional assessment.",
  "lowResult": "This score is below the commonly used follow-up threshold. It does not rule out depression or another health concern.",
  "highResult": "This score is at or above a commonly used follow-up threshold. Arrange a fuller assessment with a qualified health professional; this is not a diagnosis.",
  "nextSteps": "Discuss persistent low mood, loss of interest, changes in daily functioning or any safety concerns with a qualified health professional. If there is immediate danger, seek urgent local emergency or in-person support.",
  "safetyNotice": "This questionnaire is not monitored and does not assess suicide risk. You may stop at any time. If you may act on thoughts of harming yourself or someone else, or are in immediate danger, seek immediate local emergency or in-person help.",
  "audienceNotice": "Public-domain English GDS. Intended for screening older adults; not a diagnostic instrument. Ozarbox software implementation is independent and has not been clinically validated.",
  "sources": [
    "https://www.apa.org/depression-guideline/assessment/",
    "https://web.stanford.edu/~yesavage/GDS",
    "https://web.stanford.edu/~yesavage/GDS.english.long.html"
  ],
  "statusText": "Public-domain English GDS form, transcribed from Stanford University source. Original instrument is public domain. Ozarbox software implementation is not independently clinically validated."
},
  "scared": {
  "id": "scared",
  "kind": "likert",
  "scoreType": "scared",
  "officialName": "Screen for Child Anxiety Related Emotional Disorders (SCARED) — Parent Report",
  "purpose": "41-item parent-report screen for anxiety symptoms in children and adolescents",
  "instructions": "For each statement, choose how true it has been for your child over the last 3 months. This is the parent-report form. PhenX recommends collecting both parent and child reports where possible.",
  "recallPeriod": "Last 3 months",
  "items": [
    "When my child feels frightened, it is hard for him/her to breathe.",
    "My child gets headaches when he/she is at school.",
    "My child doesn’t like to be with people he/she doesn’t know well.",
    "My child gets scared if he/she sleeps away from home.",
    "My child worries about other people liking him/her.",
    "When my child gets frightened, he/she feels like passing out.",
    "My child is nervous.",
    "My child follows me wherever I go.",
    "People tell me that my child looks nervous.",
    "My child feels nervous with people he/she doesn’t know well.",
    "My child gets stomachaches at school.",
    "When my child gets frightened, he/she feels like he/she is going crazy.",
    "My child worries about sleeping alone.",
    "My child worries about being as good as other kids.",
    "When my child gets frightened, he/she feels like things are not real.",
    "My child has nightmares about something bad happening to his/her parents.",
    "My child worries about going to school.",
    "When my child gets frightened, his/her heart beats fast.",
    "My child gets shaky.",
    "My child has nightmares about something bad happening to him/her.",
    "My child worries about things working out for him/her.",
    "When my child gets frightened, he/she sweats a lot.",
    "My child is a worrier.",
    "My child gets really frightened for no reason at all.",
    "My child is afraid to be alone in the house.",
    "It is hard for my child to talk with people he/she doesn’t know well.",
    "When my child gets frightened, he/she feels like he/she is choking.",
    "People tell me that my child worries too much.",
    "My child doesn’t like to be away from his/her family.",
    "My child is afraid of having anxiety (or panic) attacks.",
    "My child worries that something bad might happen to his/her parents.",
    "My child feels shy with people he/she doesn’t know well.",
    "My child worries about what is going to happen in the future.",
    "When my child gets frightened, he/she feels like throwing up.",
    "My child worries about how well he/she does things.",
    "My child is scared to go to school.",
    "My child worries about things that have already happened.",
    "When my child gets frightened, he/she feels dizzy.",
    "My child feels nervous when he/she is with other children or adults and he/she has to do something while they watch him/her (for example: read aloud, speak, play a game, play a sport).",
    "My child feels nervous when he/she is going to parties, dances, or any place where there will be people that he/she doesn’t know well.",
    "My child is shy."
  ],
  "responseOptions": [
    {
      "value": 0,
      "label": "Not true or hardly ever true"
    },
    {
      "value": 1,
      "label": "Somewhat true or sometimes true"
    },
    {
      "value": 2,
      "label": "Very true or often true"
    }
  ],
  "positiveThreshold": 25,
  "maxScore": 82,
  "scoringMethod": "Sum all 41 items (0–2). A total score of 25 or more may indicate an anxiety disorder and warrants further assessment. Subscales: Panic/Somatic items 1,6,9,12,15,18,19,22,24,27,30,34,38 (threshold 7); Generalized Anxiety items 5,7,14,21,23,28,33,35,37 (9); Separation Anxiety items 4,8,13,16,20,25,29,31 (5); Social Anxiety items 3,10,26,32,39,40,41 (8); School Avoidance items 2,11,17,36 (3).",
  "limitations": "This is the parent-report SCARED form for children/adolescents, not the child self-report version. Scores are screening indicators, not diagnoses. The source recommends both parent and child reports when possible; language, age, context and impairment require professional interpretation.",
  "lowResult": "The total is below the commonly used screening threshold of 25. This does not rule out anxiety or the need for support.",
  "highResult": "The total is at or above the commonly used screening threshold. Arrange further assessment with a qualified child/adolescent mental-health professional; this is not a diagnosis.",
  "nextSteps": "Discuss persistent anxiety, avoidance, school attendance problems, physical complaints or impairment with a qualified child/adolescent professional. Consider obtaining the child's self-report version as well, following the source protocol.",
  "safetyNotice": "This screen is not monitored and does not assess immediate safety. Do not use it alone to make school, treatment or diagnostic decisions. If a child is in immediate danger, seek urgent local emergency or in-person support.",
  "audienceNotice": "Freely available PhenX SCARED Parent Report protocol; permission not required for use according to PhenX. This is the parent form, not a substitute for clinical assessment.",
  "sources": [
    "https://www.phenxtoolkit.org/protocols/view/121801?origin=browse",
    "https://pubmed.ncbi.nlm.nih.gov/10517055/"
  ],
  "statusText": "SCARED Parent Report form based on PhenX protocol 121801. PhenX states the protocol is freely available and permission is not required. Ozarbox software implementation is not independently clinically validated."
}
});

export function getPublicDomainAssessment(instrumentId) {
  const instrument = PUBLIC_DOMAIN_ASSESSMENTS[instrumentId];
  if (!instrument) throw new RangeError("Unknown public-domain assessment: " + instrumentId);
  return instrument;
}

export function scorePublicDomainAssessment(instrumentId, responses) {
  const instrument = getPublicDomainAssessment(instrumentId);

  if (instrument.scoreType === "gds") {
    if (!Array.isArray(responses) || responses.length !== instrument.items.length) throw new TypeError(instrument.officialName + " requires exactly " + instrument.items.length + " responses.");
    const missingItems=[]; responses.forEach((v,i)=>{if(v!=="yes"&&v!=="no") missingItems.push(i+1);});
    if(missingItems.length) return Object.freeze({instrumentId,kind:instrument.kind,complete:false,missingItems:Object.freeze(missingItems),total:null,interpretation:null});
    const total=responses.reduce((sum,v,i)=>sum+((instrument.depressionKeys.includes(i+1)?v==="yes":v==="no")?1:0),0);
    const screenPositive=total>=instrument.positiveThreshold;
    return Object.freeze({instrumentId,kind:instrument.kind,complete:true,missingItems:Object.freeze([]),total,maxScore:instrument.maxScore,screenPositive,positiveThreshold:instrument.positiveThreshold,interpretation:screenPositive?"At or above a commonly used follow-up threshold":"Below a commonly used follow-up threshold"});
  }
  if (instrument.scoreType === "scared") {
    if (!Array.isArray(responses) || responses.length !== instrument.items.length) throw new TypeError(instrument.officialName + " requires exactly " + instrument.items.length + " responses.");
    const missingItems=[]; responses.forEach((v,i)=>{if(!Number.isInteger(v)||v<0||v>2) missingItems.push(i+1);});
    if(missingItems.length) return Object.freeze({instrumentId,kind:instrument.kind,complete:false,missingItems:Object.freeze(missingItems),total:null,interpretation:null});
    const total=responses.reduce((a,b)=>a+b,0); const screenPositive=total>=instrument.positiveThreshold;
    return Object.freeze({instrumentId,kind:instrument.kind,complete:true,missingItems:Object.freeze([]),total,maxScore:instrument.maxScore,screenPositive,positiveThreshold:instrument.positiveThreshold,interpretation:screenPositive?"At or above the commonly used screening threshold":"Below the commonly used screening threshold"});
  }
  if (instrument.kind === "likert") {
    if (!Array.isArray(responses) || responses.length !== instrument.items.length) {
      throw new TypeError(instrument.officialName + " requires exactly " + instrument.items.length + " response positions.");
    }
    const missingItems = [];
    responses.forEach((value, index) => {
      if (value === null || value === undefined || value === "") missingItems.push(index + 1);
      else if (!Number.isInteger(value) || value < 0 || value > 4) throw new RangeError("Response for item " + (index + 1) + " must be an integer from 0 to 4.");
    });
    if (missingItems.length) return Object.freeze({ instrumentId, kind: instrument.kind, complete: false, missingItems: Object.freeze(missingItems), total: null, interpretation: null });
    const total = responses.reduce((sum, value) => sum + value, 0);
    const clusters = Object.freeze({
      B: responses.slice(0, 5).reduce((sum, value) => sum + value, 0),
      C: responses.slice(5, 7).reduce((sum, value) => sum + value, 0),
      D: responses.slice(7, 14).reduce((sum, value) => sum + value, 0),
      E: responses.slice(14, 20).reduce((sum, value) => sum + value, 0),
    });
    let interpretation;
    if (total < instrument.thresholdRange.min) interpretation = "Below the commonly cited 31–33 cutoff range";
    else if (total <= instrument.thresholdRange.max) interpretation = "Within a commonly cited 31–33 cutoff range";
    else interpretation = "Above the commonly cited 31–33 cutoff range";
    return Object.freeze({ instrumentId, kind: instrument.kind, complete: true, missingItems: Object.freeze([]), total, maxScore: instrument.maxScore, clusters, interpretation, thresholdRange: instrument.thresholdRange });
  }

  if (instrument.kind === "yes-no-branch") {
    if (!Array.isArray(responses) || responses.length !== 1 + instrument.items.length) {
      throw new TypeError(instrument.officialName + " requires the exposure response and five symptom-response positions.");
    }
    const exposure = responses[0];
    if (exposure === null || exposure === undefined || exposure === "") {
      return Object.freeze({ instrumentId, kind: instrument.kind, complete: false, missingItems: Object.freeze([1]), total: null, interpretation: null });
    }
    if (exposure !== "yes" && exposure !== "no") throw new RangeError("The lifetime exposure response must be yes or no.");
    if (exposure === "no") {
      return Object.freeze({ instrumentId, kind: instrument.kind, complete: true, missingItems: Object.freeze([]), exposure: "no", total: 0, maxScore: instrument.maxScore, interpretation: "Exposure not endorsed; official instructions stop here", symptomResponses: Object.freeze([]), screenPositive: false });
    }
    const symptomResponses = responses.slice(1);
    const missingItems = [];
    symptomResponses.forEach((value, index) => {
      if (value === null || value === undefined || value === "") missingItems.push(index + 2);
      else if (value !== "yes" && value !== "no") throw new RangeError("Symptom response for item " + (index + 1) + " must be yes or no.");
    });
    if (missingItems.length) return Object.freeze({ instrumentId, kind: instrument.kind, complete: false, missingItems: Object.freeze(missingItems), total: null, interpretation: null });
    const total = symptomResponses.filter((value) => value === "yes").length;
    return Object.freeze({
      instrumentId, kind: instrument.kind, complete: true, missingItems: Object.freeze([]),
      exposure: "yes", total, maxScore: instrument.maxScore,
      interpretation: total >= instrument.positiveThreshold ? "At or above a commonly used screening threshold" : "Below a commonly used screening threshold",
      screenPositive: total >= instrument.positiveThreshold, positiveThreshold: instrument.positiveThreshold,
      symptomResponses: Object.freeze(symptomResponses)
    });
  }

  if (instrument.kind === "exposure-checklist") {
    if (!Array.isArray(responses) || responses.length !== instrument.events.length) {
      throw new TypeError(instrument.officialName + " requires exactly " + instrument.events.length + " event-response positions.");
    }
    const missingItems = [];
    const normalised = responses.map((selected, index) => {
      if (!Array.isArray(selected) || selected.length === 0) {
        missingItems.push(index + 1);
        return [];
      }
      if (selected.some((value) => !instrument.responseOptions.some((option) => option.value === value))) {
        throw new RangeError("Event " + (index + 1) + " contains an invalid response.");
      }
      if (new Set(selected).size !== selected.length) throw new RangeError("Event " + (index + 1) + " contains duplicate responses.");
      if (selected.includes("doesnt-apply") && selected.length > 1) throw new RangeError("‘Doesn't apply’ cannot be selected with another response.");
      if (selected.includes("unsure") && selected.length > 1) throw new RangeError("‘Not sure if it fits’ cannot be selected with another response.");
      return [...selected];
    });
    if (missingItems.length) return Object.freeze({ instrumentId, kind: instrument.kind, complete: false, missingItems: Object.freeze(missingItems), total: null, interpretation: null });
    const summary = Object.freeze(normalised.map((selected, index) => Object.freeze({
      event: instrument.events[index],
      responses: Object.freeze(selected.map((value) => instrument.responseOptions.find((option) => option.value === value).label))
    })));
    return Object.freeze({
      instrumentId, kind: instrument.kind, complete: true, missingItems: Object.freeze([]), total: null,
      interpretation: "Exposure summary only — no total score or severity band is defined",
      summary
    });
  }
  throw new RangeError("No scoring handler is configured for " + instrumentId);
}
