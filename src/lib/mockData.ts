import { Patient, Referral, PharmacyOrder } from "./types";

export const patients: Patient[] = [
  {
    "id": "GV-001",
    "name": "Ramesh Patil",
    "age": 54,
    "gender": "M",
    "village": "Shirpur, Dhule",
    "phone": "98XXXXX210",
    "diabetesYears": 11,
    "diabetesType": "Type 2",
    "bp": "148/92",
    "hbA1c": 9.2,
    "familyHistory": true,
    "symptoms": [
      "blurred vision",
      "floaters"
    ],
    "riskScore": 86,
    "glucose": [
      {
        "date": "2026-03-01",
        "fasting": 168,
        "postMeal": 242
      },
      {
        "date": "2026-04-01",
        "fasting": 182,
        "postMeal": 268
      },
      {
        "date": "2026-05-01",
        "fasting": 176,
        "postMeal": 251
      },
      {
        "date": "2026-06-01",
        "fasting": 189,
        "postMeal": 274
      },
      {
        "date": "2026-07-01",
        "fasting": 174,
        "postMeal": 259
      },
      {
        "date": "2026-08-15",
        "fasting": 191,
        "postMeal": 281
      }
    ],
    "visits": [
      {
        "id": "v1",
        "date": "2026-02-10",
        "drStage": 2,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 42,
            "y": 38,
            "r": 18,
            "label": "exudates"
          }
        ],
        "notes": "Moderate NPDR, scattered exudates",
        "imageQuality": 92,
        "analysis": {
          "summary": "Moderate NPDR \u2014 1 exudates at 92/100 quality, 87% confidence. Risk 86/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "1 focal lesions: exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (87%) \u2014 quality 92/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.2%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.2% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "148/92",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 148 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "11y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 11y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision, floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 92/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "right"
      },
      {
        "id": "v1-other",
        "date": "2026-02-10",
        "drStage": 2,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 42,
            "y": 38,
            "r": 18,
            "label": "exudates"
          }
        ],
        "notes": "Moderate NPDR, scattered exudates (left eye)",
        "imageQuality": 92,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 1 exudates at 92/100 quality, 87% confidence. Risk 86/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "1 focal lesions: exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (87%) \u2014 quality 92/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.2%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.2% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "148/92",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 148 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "11y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 11y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision, floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 92/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "lastScreened": "2026-02-10",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Telmisartan 40mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-02-10",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-02-10",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-02-10",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-02-10",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-02-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-02-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-02-10",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-02-10",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-02-10",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-002",
    "name": "Sunita Devi",
    "age": 47,
    "gender": "F",
    "village": "Bhainsa, Adilabad",
    "phone": "98XXXXX342",
    "diabetesYears": 6,
    "diabetesType": "Type 2",
    "bp": "132/84",
    "hbA1c": 7.1,
    "familyHistory": false,
    "symptoms": [],
    "riskScore": 34,
    "glucose": [
      {
        "date": "2026-04-01",
        "fasting": 128,
        "postMeal": 182
      },
      {
        "date": "2026-05-15",
        "fasting": 122,
        "postMeal": 171
      },
      {
        "date": "2026-07-01",
        "fasting": 131,
        "postMeal": 188
      },
      {
        "date": "2026-08-20",
        "fasting": 126,
        "postMeal": 176
      }
    ],
    "visits": [
      {
        "id": "v2",
        "date": "2026-04-12",
        "drStage": 0,
        "confidence": 0.94,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina",
        "imageQuality": 95,
        "analysis": {
          "summary": "No DR \u2014 no lesions at 95/100 quality, 94% confidence. Risk 34/100.",
          "lesionsDetected": [
            {
              "type": "none",
              "count": 0,
              "locations": "entire retina clear",
              "severity": "none"
            }
          ],
          "stageJustification": "No microaneurysms, haemorrhages, or exudates detected. Retina shows uniform reflex, sharp disc margins. Absence of lesions across all quadrants confirms No DR (ETDRS 10).",
          "confidenceExplanation": "High confidence (94%) because image quality 95/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.1%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "132/84",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 132 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "6y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 6y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "asymptomatic",
              "contribution": "Asymptomatic \u2014 typical early DR, screening still essential"
            }
          ],
          "imageQualityAssessment": "Excellent 95/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "No DR is clinically significant as a true negative \u2014 confirms good metabolic control is protecting retina. No referral, but annual rescreen essential as 11y DM still at risk.",
          "recommendedActions": [
            "Continue annual screening",
            "Maintain HbA1c <7%, BP <130/80",
            "Annual foot check + lipid control"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-normal.jpg",
        "dietPlan": {
          "summary": "Balanced plate to keep sugar steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups)",
            "Dal + veg daily, 2 tsp oil",
            "Fruit: 1 small guava/papaya",
            "Walk 30 min daily"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets",
            "Avoid fried snacks",
            "Avoid skipping meals"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Annual eye check"
        },
        "eye": "left"
      },
      {
        "id": "v2-other",
        "date": "2026-04-12",
        "drStage": 0,
        "confidence": 0.93,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina (right eye)",
        "imageQuality": 95,
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Balanced plate to keep sugar steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups)",
            "Dal + veg daily, 2 tsp oil",
            "Fruit: 1 small guava/papaya",
            "Walk 30 min daily"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets",
            "Avoid fried snacks",
            "Avoid skipping meals"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Annual eye check"
        },
        "analysis": {
          "summary": "No DR \u2014 no lesions at 95/100 quality, 94% confidence. Risk 34/100.",
          "lesionsDetected": [
            {
              "type": "none",
              "count": 0,
              "locations": "entire retina clear",
              "severity": "none"
            }
          ],
          "stageJustification": "No microaneurysms, haemorrhages, or exudates detected. Retina shows uniform reflex, sharp disc margins. Absence of lesions across all quadrants confirms No DR (ETDRS 10).",
          "confidenceExplanation": "High confidence (94%) because image quality 95/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.1%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "132/84",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 132 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "6y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 6y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "asymptomatic",
              "contribution": "Asymptomatic \u2014 typical early DR, screening still essential"
            }
          ],
          "imageQualityAssessment": "Excellent 95/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "No DR is clinically significant as a true negative \u2014 confirms good metabolic control is protecting retina. No referral, but annual rescreen essential as 11y DM still at risk.",
          "recommendedActions": [
            "Continue annual screening",
            "Maintain HbA1c <7%, BP <130/80",
            "Annual foot check + lipid control"
          ],
          "urgency": "routine"
        }
      }
    ],
    "lastScreened": "2026-04-12",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-12",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-12",
        "indication": "BP control",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg"
    ]
  },
  {
    "id": "GV-003",
    "name": "Arjun Yadav",
    "age": 62,
    "gender": "M",
    "village": "Lakhna, Etawah",
    "phone": "98XXXXX781",
    "diabetesYears": 15,
    "diabetesType": "Type 2",
    "bp": "162/98",
    "hbA1c": 10.1,
    "familyHistory": true,
    "symptoms": [
      "blurred vision",
      "eye pain"
    ],
    "riskScore": 92,
    "glucose": [
      {
        "date": "2026-02-01",
        "fasting": 201,
        "postMeal": 298
      },
      {
        "date": "2026-03-20",
        "fasting": 212,
        "postMeal": 312
      },
      {
        "date": "2026-05-10",
        "fasting": 198,
        "postMeal": 287
      },
      {
        "date": "2026-08-28",
        "fasting": 221,
        "postMeal": 334
      }
    ],
    "visits": [
      {
        "id": "v3",
        "date": "2026-01-18",
        "drStage": 3,
        "confidence": 0.91,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 22,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, intraretinal haemorrhages",
        "imageQuality": 88,
        "analysis": {
          "summary": "Severe NPDR \u2014 1 haemorrhage at 88/100 quality, 91% confidence. Risk 92/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 1 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (91%) \u2014 quality 88/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10.1%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "162/98",
              "contribution": "high \u2014 HTN accelerates DR; systolic 162 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "15y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 15y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision, eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 88/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "left"
      },
      {
        "id": "v3-other",
        "date": "2026-01-18",
        "drStage": 3,
        "confidence": 0.9,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 22,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, intraretinal haemorrhages (right eye)",
        "imageQuality": 88,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 1 haemorrhage at 88/100 quality, 91% confidence. Risk 92/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 1 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (91%) \u2014 quality 88/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10.1%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "162/98",
              "contribution": "high \u2014 HTN accelerates DR; systolic 162 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "15y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 15y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision, eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 88/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "lastScreened": "2026-01-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-01-18",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-01-18",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Insulin Glargine",
        "dosage": "10U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-01-18",
        "indication": "Basal add-on for HbA1c 10%+",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-18",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-18",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-18",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-18",
        "indication": "Antiplatelet if no bleed risk",
        "status": "discontinued"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-01-18",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-01-18",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-18",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-01-18",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Insulin Glargine"
    ]
  },
  {
    "id": "GV-004",
    "name": "Lakshmi Rao",
    "age": 38,
    "gender": "F",
    "village": "Kothapally, Warangal",
    "phone": "98XXXXX903",
    "diabetesYears": 3,
    "diabetesType": "Type 2",
    "bp": "118/76",
    "hbA1c": 6.4,
    "familyHistory": false,
    "symptoms": [],
    "riskScore": 18,
    "glucose": [
      {
        "date": "2026-06-01",
        "fasting": 108,
        "postMeal": 142
      },
      {
        "date": "2026-08-01",
        "fasting": 112,
        "postMeal": 148
      }
    ],
    "visits": [
      {
        "id": "vGV-004-auto-1",
        "date": "2026-08-20",
        "drStage": 0,
        "confidence": 0.93,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina \u2014 annual rescreen",
        "imageQuality": 92,
        "analysis": {
          "summary": "No DR \u2014 no lesions at 92/100 quality, 93% confidence. Risk 18/100.",
          "lesionsDetected": [
            {
              "type": "none",
              "count": 0,
              "locations": "entire retina clear",
              "severity": "none"
            }
          ],
          "stageJustification": "No microaneurysms, haemorrhages, or exudates detected. Retina shows uniform reflex, sharp disc margins. Absence of lesions across all quadrants confirms No DR (ETDRS 10).",
          "confidenceExplanation": "High confidence (93%) because image quality 92/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.4%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.4% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "118/76",
              "contribution": "low \u2014 HTN accelerates DR; systolic 118 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "3y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 3y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "asymptomatic",
              "contribution": "Asymptomatic \u2014 typical early DR, screening still essential"
            }
          ],
          "imageQualityAssessment": "Excellent 92/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "No DR is clinically significant as a true negative \u2014 confirms good metabolic control is protecting retina. No referral, but annual rescreen essential as 11y DM still at risk.",
          "recommendedActions": [
            "Continue annual screening",
            "Maintain HbA1c <7%, BP <130/80",
            "Annual foot check + lipid control"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-normal.jpg",
        "dietPlan": {
          "summary": "Balanced plate to keep sugar steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups)",
            "Dal + veg daily, 2 tsp oil",
            "Fruit: 1 small guava/papaya",
            "Walk 30 min daily"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets",
            "Avoid fried snacks",
            "Avoid skipping meals"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Annual eye check"
        },
        "eye": "left"
      },
      {
        "id": "vGV-004-auto-1-other",
        "date": "2026-08-20",
        "drStage": 0,
        "confidence": 0.94,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina \u2014 annual rescreen (right eye)",
        "imageQuality": 92,
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Balanced plate to keep sugar steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups)",
            "Dal + veg daily, 2 tsp oil",
            "Fruit: 1 small guava/papaya",
            "Walk 30 min daily"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets",
            "Avoid fried snacks",
            "Avoid skipping meals"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Annual eye check"
        },
        "analysis": {
          "summary": "No DR \u2014 no lesions at 92/100 quality, 93% confidence. Risk 18/100.",
          "lesionsDetected": [
            {
              "type": "none",
              "count": 0,
              "locations": "entire retina clear",
              "severity": "none"
            }
          ],
          "stageJustification": "No microaneurysms, haemorrhages, or exudates detected. Retina shows uniform reflex, sharp disc margins. Absence of lesions across all quadrants confirms No DR (ETDRS 10).",
          "confidenceExplanation": "High confidence (93%) because image quality 92/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.4%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.4% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "118/76",
              "contribution": "low \u2014 HTN accelerates DR; systolic 118 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "3y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 3y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "asymptomatic",
              "contribution": "Asymptomatic \u2014 typical early DR, screening still essential"
            }
          ],
          "imageQualityAssessment": "Excellent 92/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "No DR is clinically significant as a true negative \u2014 confirms good metabolic control is protecting retina. No referral, but annual rescreen essential as 11y DM still at risk.",
          "recommendedActions": [
            "Continue annual screening",
            "Maintain HbA1c <7%, BP <130/80",
            "Annual foot check + lipid control"
          ],
          "urgency": "routine"
        }
      }
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Maintenance",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg"
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-005",
    "name": "Priya Sharma",
    "age": 32,
    "gender": "F",
    "village": "Kothapally, Warangal",
    "phone": "98XXXXX180",
    "diabetesYears": 1,
    "diabetesType": "Type 2",
    "bp": "127/79",
    "hbA1c": 9.8,
    "familyHistory": false,
    "symptoms": [
      "fluctuating vision",
      "blurred vision"
    ],
    "riskScore": 76,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 184,
        "postMeal": 264
      },
      {
        "date": "2026-03-20",
        "fasting": 168,
        "postMeal": 245
      },
      {
        "date": "2026-07-28",
        "fasting": 174,
        "postMeal": 261
      }
    ],
    "visits": [
      {
        "id": "vGV-005-0",
        "date": "2026-05-10",
        "drStage": 2,
        "confidence": 0.93,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 72,
            "r": 17,
            "label": "microaneurysm"
          },
          {
            "x": 45,
            "y": 37,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR, exudates",
        "imageQuality": 78,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 microaneurysm, microaneurysm at 78/100 quality, 93% confidence. Risk 76/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (38%,72%)",
              "severity": "moderate"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (45%,37%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: microaneurysm, microaneurysm within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "High confidence (93%) because image quality 78/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.8%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.8% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "127/79",
              "contribution": "low \u2014 HTN accelerates DR; systolic 127 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "1y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 1y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "fluctuating vision, blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 78/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "right"
      },
      {
        "id": "vGV-005-1",
        "date": "2026-02-20",
        "drStage": 2,
        "confidence": 0.8,
        "heatmapRegions": [
          {
            "x": 50,
            "y": 50,
            "r": 20,
            "label": "microaneurysm"
          },
          {
            "x": 30,
            "y": 57,
            "r": 19,
            "label": "haemorrhage"
          }
        ],
        "notes": "Moderate NPDR, exudates",
        "imageQuality": 81,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 microaneurysm, haemorrhage at 81/100 quality, 80% confidence. Risk 76/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (50%,50%) near macula",
              "severity": "moderate"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (30%,57%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: microaneurysm, haemorrhage within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Lower confidence (80%) due to quality 81/100 (soft focus at periphery), 1 haemorrhage near disc obscured by glare. Lesion count borderline between stages 2/3. Advise repeat capture in 2 weeks.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.8%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.8% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "127/79",
              "contribution": "low \u2014 HTN accelerates DR; systolic 127 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "1y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 1y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "fluctuating vision, blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 81/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "right"
      }
    ],
    "lastScreened": "2026-05-10",
    "footLastCheck": "2026-08-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-05-10",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-05-10",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-05-10",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      },
      {
        "drug": "Mupirocin 2% ointment",
        "dosage": "thin layer",
        "frequency": "BD",
        "duration": "7d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Foot care \u2014 post-screening",
        "status": "completed"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Atorvastatin 10mg"
    ]
  },
  {
    "id": "GV-006",
    "name": "Vikram Singh",
    "age": 58,
    "gender": "M",
    "village": "Amrity, Malda",
    "phone": "98XXXXX758",
    "diabetesYears": 7,
    "diabetesType": "Type 2",
    "bp": "114/93",
    "hbA1c": 9.6,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 89,
    "glucose": [
      {
        "date": "2026-03-20",
        "fasting": 187,
        "postMeal": 233
      },
      {
        "date": "2026-04-18",
        "fasting": 173,
        "postMeal": 257
      },
      {
        "date": "2026-05-22",
        "fasting": 175,
        "postMeal": 261
      },
      {
        "date": "2026-06-25",
        "fasting": 172,
        "postMeal": 248
      },
      {
        "date": "2026-07-28",
        "fasting": 186,
        "postMeal": 268
      },
      {
        "date": "2026-08-20",
        "fasting": 196,
        "postMeal": 281
      }
    ],
    "visits": [
      {
        "id": "vGV-006-0",
        "date": "2026-04-08",
        "drStage": 2,
        "confidence": 0.9,
        "heatmapRegions": [
          {
            "x": 42,
            "y": 30,
            "r": 16,
            "label": "neovascularization"
          },
          {
            "x": 45,
            "y": 32,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR, exudates",
        "imageQuality": 79,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 neovascularization, microaneurysm at 79/100 quality, 90% confidence. Risk 89/100.",
          "lesionsDetected": [
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "inferonasal (42%,30%)",
              "severity": "moderate"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (45%,32%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: neovascularization, microaneurysm within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (90%) \u2014 quality 79/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.6%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.6% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "114/93",
              "contribution": "low \u2014 HTN accelerates DR; systolic 114 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "7y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 7y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 79/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "right"
      },
      {
        "id": "vGV-006-0-other",
        "date": "2026-04-08",
        "drStage": 2,
        "confidence": 0.92,
        "heatmapRegions": [
          {
            "x": 42,
            "y": 30,
            "r": 16,
            "label": "neovascularization"
          }
        ],
        "notes": "Moderate NPDR, exudates (left eye)",
        "imageQuality": 79,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 neovascularization, microaneurysm at 79/100 quality, 90% confidence. Risk 89/100.",
          "lesionsDetected": [
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "inferonasal (42%,30%)",
              "severity": "moderate"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (45%,32%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: neovascularization, microaneurysm within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (90%) \u2014 quality 79/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.6%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.6% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "114/93",
              "contribution": "low \u2014 HTN accelerates DR; systolic 114 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "7y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 7y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 79/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "lastScreened": "2026-04-08",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Atorvastatin 10mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-04-08",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-04-08",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-04-08",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-007",
    "name": "Anita Deshmukh",
    "age": 45,
    "gender": "F",
    "village": "Sangamner, Ahmednagar",
    "phone": "98XXXXX880",
    "diabetesYears": 18,
    "diabetesType": "Type 2",
    "bp": "159/90",
    "hbA1c": 8.7,
    "familyHistory": false,
    "symptoms": [
      "floaters"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 185,
        "postMeal": 270
      },
      {
        "date": "2026-03-20",
        "fasting": 172,
        "postMeal": 252
      },
      {
        "date": "2026-04-18",
        "fasting": 174,
        "postMeal": 249
      },
      {
        "date": "2026-06-25",
        "fasting": 168,
        "postMeal": 245
      },
      {
        "date": "2026-07-28",
        "fasting": 162,
        "postMeal": 228
      },
      {
        "date": "2026-08-20",
        "fasting": 173,
        "postMeal": 253
      }
    ],
    "visits": [
      {
        "id": "vGV-007-0",
        "date": "2026-05-10",
        "drStage": 1,
        "confidence": 0.92,
        "heatmapRegions": [
          {
            "x": 35,
            "y": 46,
            "r": 17,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms",
        "imageQuality": 88,
        "analysis": {
          "summary": "Mild NPDR \u2014 1 exudates at 88/100 quality, 92% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (35%,46%)",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 35%/46% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "High confidence (92%) because image quality 88/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.7%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.7% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "159/90",
              "contribution": "high \u2014 HTN accelerates DR; systolic 159 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "18y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 18y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 88/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-007-0-other",
        "date": "2026-05-10",
        "drStage": 1,
        "confidence": 0.92,
        "heatmapRegions": [
          {
            "x": 35,
            "y": 46,
            "r": 17,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms (right eye)",
        "imageQuality": 88,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "analysis": {
          "summary": "Mild NPDR \u2014 1 exudates at 88/100 quality, 92% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (35%,46%)",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 35%/46% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "High confidence (92%) because image quality 88/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.7%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.7% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "159/90",
              "contribution": "high \u2014 HTN accelerates DR; systolic 159 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "18y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 18y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 88/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        }
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Metformin 500mg",
      "Sitagliptin 100mg",
      "Telmisartan 40mg"
    ],
    "footLastCheck": "2026-08-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "First-line",
        "status": "active"
      },
      {
        "drug": "Sitagliptin 100mg",
        "dosage": "100mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "DPP4 add-on",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Mupirocin 2% ointment",
        "dosage": "thin layer",
        "frequency": "BD",
        "duration": "7d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Foot care \u2014 post-screening",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-008",
    "name": "Suresh Kumar",
    "age": 59,
    "gender": "M",
    "village": "Khatra, Bankura",
    "phone": "98XXXXX775",
    "diabetesYears": 17,
    "diabetesType": "Type 2",
    "bp": "121/83",
    "hbA1c": 9.1,
    "familyHistory": true,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 175,
        "postMeal": 220
      },
      {
        "date": "2026-04-18",
        "fasting": 175,
        "postMeal": 253
      },
      {
        "date": "2026-07-28",
        "fasting": 198,
        "postMeal": 245
      }
    ],
    "visits": [
      {
        "id": "vGV-008-auto-1",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.84,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          },
          {
            "x": 42,
            "y": 38,
            "r": 16,
            "label": "exudates"
          },
          {
            "x": 60,
            "y": 30,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages",
        "imageQuality": 80,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.1%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "121/83",
              "contribution": "low \u2014 HTN accelerates DR; systolic 121 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "17y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 17y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "left"
      },
      {
        "id": "vGV-008-auto-1-other",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.82,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages (right eye)",
        "imageQuality": 80,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.1%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "121/83",
              "contribution": "low \u2014 HTN accelerates DR; systolic 121 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "17y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 17y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Atorvastatin 10mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-08-20",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-08-20",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-009",
    "name": "Meena Patel",
    "age": 49,
    "gender": "F",
    "village": "Shahada, Nandurbar",
    "phone": "98XXXXX132",
    "diabetesYears": 17,
    "diabetesType": "Type 2",
    "bp": "139/102",
    "hbA1c": 10.5,
    "familyHistory": false,
    "symptoms": [
      "eye pain",
      "headache"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 191,
        "postMeal": 270
      },
      {
        "date": "2026-05-22",
        "fasting": 191,
        "postMeal": 237
      },
      {
        "date": "2026-06-25",
        "fasting": 194,
        "postMeal": 237
      },
      {
        "date": "2026-07-28",
        "fasting": 191,
        "postMeal": 233
      },
      {
        "date": "2026-08-20",
        "fasting": 202,
        "postMeal": 279
      }
    ],
    "visits": [
      {
        "id": "vGV-009-auto-1",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.84,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          },
          {
            "x": 42,
            "y": 38,
            "r": 16,
            "label": "exudates"
          },
          {
            "x": 60,
            "y": 30,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages",
        "imageQuality": 80,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10.5%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10.5% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "139/102",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 139 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "17y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 17y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain, headache",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "left"
      },
      {
        "id": "vGV-009-auto-1-other",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.84,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages (right eye)",
        "imageQuality": 80,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10.5%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10.5% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "139/102",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 139 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "17y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 17y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain, headache",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Insulin Glargine"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-08-20",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Insulin Glargine",
        "dosage": "10U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-08-20",
        "indication": "Basal add-on for HbA1c 10%+",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "BP control",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Antiplatelet if no bleed risk",
        "status": "discontinued"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-08-20",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-010",
    "name": "Rajesh Gupta",
    "age": 51,
    "gender": "M",
    "village": "Sangamner, Ahmednagar",
    "phone": "98XXXXX848",
    "diabetesYears": 9,
    "diabetesType": "Type 2",
    "bp": "125/89",
    "hbA1c": 9.4,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 203,
        "postMeal": 291
      },
      {
        "date": "2026-03-20",
        "fasting": 189,
        "postMeal": 260
      },
      {
        "date": "2026-04-18",
        "fasting": 188,
        "postMeal": 276
      },
      {
        "date": "2026-05-22",
        "fasting": 196,
        "postMeal": 279
      },
      {
        "date": "2026-07-28",
        "fasting": 177,
        "postMeal": 262
      },
      {
        "date": "2026-08-20",
        "fasting": 179,
        "postMeal": 224
      }
    ],
    "visits": [
      {
        "id": "vGV-010-0",
        "date": "2026-04-08",
        "drStage": 4,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 39,
            "r": 15,
            "label": "neovascularization"
          },
          {
            "x": 43,
            "y": 32,
            "r": 18,
            "label": "haemorrhage"
          },
          {
            "x": 31,
            "y": 69,
            "r": 19,
            "label": "haemorrhage"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 82,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 neovascularization, haemorrhage, haemorrhage at 82/100 quality, 88% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "posterior pole (55%,39%) near macula",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (43%,32%)",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (31%,69%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "Moderate confidence (88%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 3/4. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.4%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.4% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "125/89",
              "contribution": "low \u2014 HTN accelerates DR; systolic 125 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "9y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 9y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "right"
      },
      {
        "id": "vGV-010-1",
        "date": "2026-02-20",
        "drStage": 4,
        "confidence": 0.95,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 54,
            "r": 18,
            "label": "neovascularization"
          },
          {
            "x": 41,
            "y": 53,
            "r": 11,
            "label": "exudates"
          },
          {
            "x": 52,
            "y": 28,
            "r": 17,
            "label": "microaneurysm"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 85,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 neovascularization, exudates, microaneurysm at 85/100 quality, 95% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "posterior pole (38%,54%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (41%,53%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (52%,28%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "High confidence (95%) because image quality 85/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.4%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.4% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "125/89",
              "contribution": "low \u2014 HTN accelerates DR; systolic 125 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "9y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 9y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 85/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-laser.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "left"
      }
    ],
    "lastScreened": "2026-04-08",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Atorvastatin 10mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-04-08",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-04-08",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-04-08",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-04-08",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Ranibizumab 0.5mg intravitreal",
        "dosage": "0.5mg/0.05mL",
        "frequency": "single injection",
        "duration": "1 dose, review 4w",
        "prescribedBy": "Dr. Mehta, Retina Specialist",
        "prescribedOn": "2026-02-20",
        "indication": "PDR stage 4 \u2014 neovascularization on 2026-02-20",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-02-20",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-011",
    "name": "Kavita Joshi",
    "age": 37,
    "gender": "F",
    "village": "Adilabad, Telangana",
    "phone": "98XXXXX140",
    "diabetesYears": 5,
    "diabetesType": "Type 2",
    "bp": "125/102",
    "hbA1c": 6.8,
    "familyHistory": false,
    "symptoms": [
      "eye pain",
      "blurred vision"
    ],
    "riskScore": 57,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 168,
        "postMeal": 225
      },
      {
        "date": "2026-03-20",
        "fasting": 143,
        "postMeal": 228
      },
      {
        "date": "2026-04-18",
        "fasting": 153,
        "postMeal": 202
      },
      {
        "date": "2026-05-22",
        "fasting": 171,
        "postMeal": 249
      },
      {
        "date": "2026-06-25",
        "fasting": 168,
        "postMeal": 221
      },
      {
        "date": "2026-08-20",
        "fasting": 143,
        "postMeal": 223
      }
    ],
    "visits": [
      {
        "id": "vGV-011-auto-1",
        "date": "2026-08-20",
        "drStage": 1,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Mild NPDR, single microaneurysm",
        "imageQuality": 85,
        "analysis": {
          "summary": "Mild NPDR \u2014 1 microaneurysm at 85/100 quality, 88% confidence. Risk 57/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (38%,42%) near macula",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 38%/42% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "Moderate confidence (88%) \u2014 quality 85/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 0/1. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.8%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.8% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "125/102",
              "contribution": "low \u2014 HTN accelerates DR; systolic 125 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "5y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 5y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain, blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 85/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-011-auto-1-other",
        "date": "2026-08-20",
        "drStage": 1,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Mild NPDR, single microaneurysm (right eye)",
        "imageQuality": 85,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "analysis": {
          "summary": "Mild NPDR \u2014 1 microaneurysm at 85/100 quality, 88% confidence. Risk 57/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (38%,42%) near macula",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 38%/42% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "Moderate confidence (88%) \u2014 quality 85/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 0/1. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.8%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.8% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "125/102",
              "contribution": "low \u2014 HTN accelerates DR; systolic 125 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "5y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 5y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain, blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 85/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        }
      }
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Maintenance",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg"
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-012",
    "name": "Amit Verma",
    "age": 57,
    "gender": "M",
    "village": "Bankadaha, Bishnupur",
    "phone": "98XXXXX666",
    "diabetesYears": 9,
    "diabetesType": "Type 2",
    "bp": "157/82",
    "hbA1c": 6.9,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 82,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 152,
        "postMeal": 226
      },
      {
        "date": "2026-04-18",
        "fasting": 148,
        "postMeal": 224
      },
      {
        "date": "2026-05-22",
        "fasting": 175,
        "postMeal": 239
      },
      {
        "date": "2026-06-25",
        "fasting": 174,
        "postMeal": 231
      },
      {
        "date": "2026-07-28",
        "fasting": 154,
        "postMeal": 204
      },
      {
        "date": "2026-08-20",
        "fasting": 174,
        "postMeal": 220
      }
    ],
    "visits": [
      {
        "id": "vGV-012-0",
        "date": "2026-05-10",
        "drStage": 2,
        "confidence": 0.89,
        "heatmapRegions": [
          {
            "x": 28,
            "y": 70,
            "r": 19,
            "label": "microaneurysm"
          },
          {
            "x": 70,
            "y": 34,
            "r": 13,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR, exudates",
        "imageQuality": 94,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 microaneurysm, microaneurysm at 94/100 quality, 89% confidence. Risk 82/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (28%,70%)",
              "severity": "moderate"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "superotemporal quadrant (70%,34%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: microaneurysm, microaneurysm within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (89%) \u2014 quality 94/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.9%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.9% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "157/82",
              "contribution": "high \u2014 HTN accelerates DR; systolic 157 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "9y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 9y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 94/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-012-0-other",
        "date": "2026-05-10",
        "drStage": 2,
        "confidence": 0.9,
        "heatmapRegions": [
          {
            "x": 28,
            "y": 70,
            "r": 19,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR, exudates (right eye)",
        "imageQuality": 94,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 microaneurysm, microaneurysm at 94/100 quality, 89% confidence. Risk 82/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (28%,70%)",
              "severity": "moderate"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "superotemporal quadrant (70%,34%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: microaneurysm, microaneurysm within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (89%) \u2014 quality 94/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.9%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.9% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "157/82",
              "contribution": "high \u2014 HTN accelerates DR; systolic 157 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "9y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 9y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 94/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Amlodipine 5mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-05-10",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-05-10",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-013",
    "name": "Sunita Reddy",
    "age": 38,
    "gender": "F",
    "village": "Olakkur, Vilupuram",
    "phone": "98XXXXX954",
    "diabetesYears": 11,
    "diabetesType": "Type 2",
    "bp": "152/99",
    "hbA1c": 6.9,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 88,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 156,
        "postMeal": 208
      },
      {
        "date": "2026-03-20",
        "fasting": 161,
        "postMeal": 238
      },
      {
        "date": "2026-04-18",
        "fasting": 165,
        "postMeal": 252
      },
      {
        "date": "2026-06-25",
        "fasting": 148,
        "postMeal": 197
      },
      {
        "date": "2026-08-20",
        "fasting": 171,
        "postMeal": 241
      }
    ],
    "visits": [
      {
        "id": "vGV-013-auto-1",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.84,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          },
          {
            "x": 42,
            "y": 38,
            "r": 16,
            "label": "exudates"
          },
          {
            "x": 60,
            "y": 30,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages",
        "imageQuality": 80,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 88/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.9%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.9% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "152/99",
              "contribution": "high \u2014 HTN accelerates DR; systolic 152 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "11y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 11y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "right"
      },
      {
        "id": "vGV-013-auto-1-other",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.83,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages (left eye)",
        "imageQuality": 80,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 88/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.9%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.9% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "152/99",
              "contribution": "high \u2014 HTN accelerates DR; systolic 152 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "11y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 11y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Amlodipine 5mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-08-20",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-014",
    "name": "Deepak Yadav",
    "age": 66,
    "gender": "M",
    "village": "Jawadhu Hills, TN",
    "phone": "98XXXXX785",
    "diabetesYears": 5,
    "diabetesType": "Type 2",
    "bp": "135/100",
    "hbA1c": 6,
    "familyHistory": true,
    "symptoms": [
      "floaters"
    ],
    "riskScore": 59,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 148,
        "postMeal": 205
      },
      {
        "date": "2026-04-18",
        "fasting": 171,
        "postMeal": 223
      },
      {
        "date": "2026-05-22",
        "fasting": 169,
        "postMeal": 222
      },
      {
        "date": "2026-07-28",
        "fasting": 163,
        "postMeal": 252
      }
    ],
    "visits": [
      {
        "id": "vGV-014-0",
        "date": "2026-06-18",
        "drStage": 0,
        "confidence": 0.92,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina",
        "imageQuality": 91,
        "analysis": {
          "summary": "No DR \u2014 no lesions at 91/100 quality, 92% confidence. Risk 59/100.",
          "lesionsDetected": [
            {
              "type": "none",
              "count": 0,
              "locations": "entire retina clear",
              "severity": "none"
            }
          ],
          "stageJustification": "No microaneurysms, haemorrhages, or exudates detected. Retina shows uniform reflex, sharp disc margins. Absence of lesions across all quadrants confirms No DR (ETDRS 10).",
          "confidenceExplanation": "High confidence (92%) because image quality 91/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "135/100",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 135 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "5y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 5y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 91/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "No DR is clinically significant as a true negative \u2014 confirms good metabolic control is protecting retina. No referral, but annual rescreen essential as 11y DM still at risk.",
          "recommendedActions": [
            "Continue annual screening",
            "Maintain HbA1c <7%, BP <130/80",
            "Annual foot check + lipid control"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-normal.jpg",
        "dietPlan": {
          "summary": "Balanced plate to keep sugar steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups)",
            "Dal + veg daily, 2 tsp oil",
            "Fruit: 1 small guava/papaya",
            "Walk 30 min daily"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets",
            "Avoid fried snacks",
            "Avoid skipping meals"
          ],
          "dailyCalories": "1600-1800 kcal",
          "followUp": "Annual eye check"
        },
        "eye": "right"
      },
      {
        "id": "vGV-014-0-other",
        "date": "2026-06-18",
        "drStage": 0,
        "confidence": 0.93,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina (left eye)",
        "imageQuality": 91,
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Balanced plate to keep sugar steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups)",
            "Dal + veg daily, 2 tsp oil",
            "Fruit: 1 small guava/papaya",
            "Walk 30 min daily"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets",
            "Avoid fried snacks",
            "Avoid skipping meals"
          ],
          "dailyCalories": "1600-1800 kcal",
          "followUp": "Annual eye check"
        },
        "analysis": {
          "summary": "No DR \u2014 no lesions at 91/100 quality, 92% confidence. Risk 59/100.",
          "lesionsDetected": [
            {
              "type": "none",
              "count": 0,
              "locations": "entire retina clear",
              "severity": "none"
            }
          ],
          "stageJustification": "No microaneurysms, haemorrhages, or exudates detected. Retina shows uniform reflex, sharp disc margins. Absence of lesions across all quadrants confirms No DR (ETDRS 10).",
          "confidenceExplanation": "High confidence (92%) because image quality 91/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "135/100",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 135 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "5y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 5y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 91/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "No DR is clinically significant as a true negative \u2014 confirms good metabolic control is protecting retina. No referral, but annual rescreen essential as 11y DM still at risk.",
          "recommendedActions": [
            "Continue annual screening",
            "Maintain HbA1c <7%, BP <130/80",
            "Annual foot check + lipid control"
          ],
          "urgency": "routine"
        }
      }
    ],
    "lastScreened": "2026-06-18",
    "footLastCheck": "2026-08-02",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-06-18",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-06-18",
        "indication": "BP control",
        "status": "active"
      },
      {
        "drug": "Mupirocin 2% ointment",
        "dosage": "thin layer",
        "frequency": "BD",
        "duration": "7d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-06-18",
        "indication": "Foot care \u2014 post-screening",
        "status": "completed"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Mupirocin 2% ointment"
    ]
  },
  {
    "id": "GV-015",
    "name": "Geeta Nair",
    "age": 44,
    "gender": "F",
    "village": "Manawar, MP",
    "phone": "98XXXXX211",
    "diabetesYears": 4,
    "diabetesType": "Type 2",
    "bp": "114/99",
    "hbA1c": 7.9,
    "familyHistory": false,
    "symptoms": [
      "eye pain"
    ],
    "riskScore": 67,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 182,
        "postMeal": 228
      },
      {
        "date": "2026-03-20",
        "fasting": 165,
        "postMeal": 224
      },
      {
        "date": "2026-05-22",
        "fasting": 163,
        "postMeal": 227
      },
      {
        "date": "2026-08-20",
        "fasting": 185,
        "postMeal": 276
      }
    ],
    "visits": [
      {
        "id": "vGV-015-0",
        "date": "2026-06-18",
        "drStage": 1,
        "confidence": 0.95,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 39,
            "r": 20,
            "label": "microaneurysm"
          }
        ],
        "notes": "Mild NPDR, microaneurysms",
        "imageQuality": 81,
        "analysis": {
          "summary": "Mild NPDR \u2014 1 microaneurysm at 81/100 quality, 95% confidence. Risk 67/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (44%,39%) near macula",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 44%/39% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "High confidence (95%) because image quality 81/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.9%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.9% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "114/99",
              "contribution": "low \u2014 HTN accelerates DR; systolic 114 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "4y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 4y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 81/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-015-0-other",
        "date": "2026-06-18",
        "drStage": 1,
        "confidence": 0.93,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 39,
            "r": 20,
            "label": "microaneurysm"
          }
        ],
        "notes": "Mild NPDR, microaneurysms (right eye)",
        "imageQuality": 81,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "analysis": {
          "summary": "Mild NPDR \u2014 1 microaneurysm at 81/100 quality, 95% confidence. Risk 67/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (44%,39%) near macula",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 44%/39% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "High confidence (95%) because image quality 81/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.9%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.9% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "114/99",
              "contribution": "low \u2014 HTN accelerates DR; systolic 114 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "4y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 4y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 81/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        }
      }
    ],
    "lastScreened": "2026-06-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-06-18",
        "indication": "First-line",
        "status": "active"
      },
      {
        "drug": "Sitagliptin 100mg",
        "dosage": "100mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-06-18",
        "indication": "DPP4 add-on",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Sitagliptin 100mg"
    ]
  },
  {
    "id": "GV-016",
    "name": "Manoj Tiwari",
    "age": 61,
    "gender": "M",
    "village": "Bankadaha, Bishnupur",
    "phone": "98XXXXX318",
    "diabetesYears": 14,
    "diabetesType": "Type 2",
    "bp": "144/75",
    "hbA1c": 9.1,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 184,
        "postMeal": 245
      },
      {
        "date": "2026-04-18",
        "fasting": 180,
        "postMeal": 242
      },
      {
        "date": "2026-05-22",
        "fasting": 182,
        "postMeal": 231
      },
      {
        "date": "2026-08-20",
        "fasting": 177,
        "postMeal": 238
      }
    ],
    "visits": [
      {
        "id": "vGV-016-0",
        "date": "2026-03-14",
        "drStage": 3,
        "confidence": 0.81,
        "heatmapRegions": [
          {
            "x": 71,
            "y": 39,
            "r": 20,
            "label": "microaneurysm"
          },
          {
            "x": 53,
            "y": 63,
            "r": 11,
            "label": "microaneurysm"
          },
          {
            "x": 46,
            "y": 41,
            "r": 17,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, haemorrhages",
        "imageQuality": 90,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 microaneurysm, microaneurysm, microaneurysm at 90/100 quality, 81% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "superotemporal quadrant (71%,39%)",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (53%,63%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (46%,41%) near macula",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Lower confidence (81%) due to quality 90/100 (soft focus at periphery), 1 haemorrhage near disc obscured by glare. Lesion count borderline between stages 3/4. Advise repeat capture in 2 weeks.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.1%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "144/75",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 144 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "14y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 14y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 90/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "right"
      },
      {
        "id": "vGV-016-0-other",
        "date": "2026-03-14",
        "drStage": 3,
        "confidence": 0.82,
        "heatmapRegions": [
          {
            "x": 71,
            "y": 39,
            "r": 20,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, haemorrhages (left eye)",
        "imageQuality": 90,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 microaneurysm, microaneurysm, microaneurysm at 90/100 quality, 81% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "superotemporal quadrant (71%,39%)",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (53%,63%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (46%,41%) near macula",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Lower confidence (81%) due to quality 90/100 (soft focus at periphery), 1 haemorrhage near disc obscured by glare. Lesion count borderline between stages 3/4. Advise repeat capture in 2 weeks.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "9.1%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 9.1% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "144/75",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 144 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "14y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 14y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 90/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "lastScreened": "2026-03-14",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Telmisartan 40mg"
    ],
    "footLastCheck": "2026-08-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-03-14",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-03-14",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-03-14",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Mupirocin 2% ointment",
        "dosage": "thin layer",
        "frequency": "BD",
        "duration": "7d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "Foot care \u2014 post-screening",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-03-14",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-017",
    "name": "Pooja Singh",
    "age": 32,
    "gender": "F",
    "village": "Manawar, MP",
    "phone": "98XXXXX812",
    "diabetesYears": 3,
    "diabetesType": "Type 2",
    "bp": "154/92",
    "hbA1c": 7.3,
    "familyHistory": true,
    "symptoms": [],
    "riskScore": 70,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 168,
        "postMeal": 250
      },
      {
        "date": "2026-03-20",
        "fasting": 162,
        "postMeal": 234
      },
      {
        "date": "2026-05-22",
        "fasting": 173,
        "postMeal": 227
      },
      {
        "date": "2026-07-28",
        "fasting": 157,
        "postMeal": 228
      },
      {
        "date": "2026-08-20",
        "fasting": 174,
        "postMeal": 265
      }
    ],
    "visits": [
      {
        "id": "vGV-017-0",
        "date": "2026-03-14",
        "drStage": 1,
        "confidence": 0.9,
        "heatmapRegions": [
          {
            "x": 34,
            "y": 55,
            "r": 14,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms",
        "imageQuality": 78,
        "analysis": {
          "summary": "Mild NPDR \u2014 1 exudates at 78/100 quality, 90% confidence. Risk 70/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (34%,55%)",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 34%/55% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "Moderate confidence (90%) \u2014 quality 78/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 0/1. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.3%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "154/92",
              "contribution": "high \u2014 HTN accelerates DR; systolic 154 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "3y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 3y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "asymptomatic",
              "contribution": "Asymptomatic \u2014 typical early DR, screening still essential"
            }
          ],
          "imageQualityAssessment": "Good 78/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "eye": "right"
      },
      {
        "id": "vGV-017-0-other",
        "date": "2026-03-14",
        "drStage": 1,
        "confidence": 0.89,
        "heatmapRegions": [
          {
            "x": 34,
            "y": 55,
            "r": 14,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms (left eye)",
        "imageQuality": 78,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "analysis": {
          "summary": "Mild NPDR \u2014 1 exudates at 78/100 quality, 90% confidence. Risk 70/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (34%,55%)",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 34%/55% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "Moderate confidence (90%) \u2014 quality 78/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 0/1. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.3%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "154/92",
              "contribution": "high \u2014 HTN accelerates DR; systolic 154 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "3y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 3y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "asymptomatic",
              "contribution": "Asymptomatic \u2014 typical early DR, screening still essential"
            }
          ],
          "imageQualityAssessment": "Good 78/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        }
      }
    ],
    "lastScreened": "2026-03-14",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-03-14",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Amlodipine 5mg"
    ]
  },
  {
    "id": "GV-018",
    "name": "Rohit Meena",
    "age": 66,
    "gender": "M",
    "village": "Sangamner, Ahmednagar",
    "phone": "98XXXXX179",
    "diabetesYears": 4,
    "diabetesType": "Type 2",
    "bp": "163/86",
    "hbA1c": 8.3,
    "familyHistory": true,
    "symptoms": [
      "fluctuating vision"
    ],
    "riskScore": 90,
    "glucose": [
      {
        "date": "2026-03-20",
        "fasting": 170,
        "postMeal": 261
      },
      {
        "date": "2026-04-18",
        "fasting": 186,
        "postMeal": 261
      },
      {
        "date": "2026-05-22",
        "fasting": 188,
        "postMeal": 270
      },
      {
        "date": "2026-06-25",
        "fasting": 186,
        "postMeal": 243
      },
      {
        "date": "2026-07-28",
        "fasting": 177,
        "postMeal": 259
      },
      {
        "date": "2026-08-20",
        "fasting": 176,
        "postMeal": 234
      }
    ],
    "visits": [
      {
        "id": "vGV-018-auto-1",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.84,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          },
          {
            "x": 42,
            "y": 38,
            "r": 16,
            "label": "exudates"
          },
          {
            "x": 60,
            "y": 30,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages",
        "imageQuality": 80,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 90/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.3%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "163/86",
              "contribution": "high \u2014 HTN accelerates DR; systolic 163 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "4y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 4y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "fluctuating vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "left"
      },
      {
        "id": "vGV-018-auto-1-other",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.83,
        "heatmapRegions": [
          {
            "x": 55,
            "y": 45,
            "r": 20,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, 4-quadrant haemorrhages (right eye)",
        "imageQuality": 80,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 haemorrhage, exudates, microaneurysm at 80/100 quality, 84% confidence. Risk 90/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (55%,45%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (42%,38%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (60%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 80/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.3%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "163/86",
              "contribution": "high \u2014 HTN accelerates DR; systolic 163 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "4y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 4y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "fluctuating vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 80/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "First-line",
        "status": "active"
      },
      {
        "drug": "Sitagliptin 100mg",
        "dosage": "100mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "DPP4 add-on",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-08-20",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Sitagliptin 100mg",
      "Telmisartan 40mg"
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-019",
    "name": "Sarita Devi",
    "age": 52,
    "gender": "F",
    "village": "Bankadaha, Bishnupur",
    "phone": "98XXXXX488",
    "diabetesYears": 11,
    "diabetesType": "Type 2",
    "bp": "117/76",
    "hbA1c": 10.6,
    "familyHistory": false,
    "symptoms": [
      "floaters",
      "fluctuating vision"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 181,
        "postMeal": 271
      },
      {
        "date": "2026-05-22",
        "fasting": 193,
        "postMeal": 284
      },
      {
        "date": "2026-06-25",
        "fasting": 207,
        "postMeal": 275
      },
      {
        "date": "2026-07-28",
        "fasting": 199,
        "postMeal": 285
      },
      {
        "date": "2026-08-20",
        "fasting": 199,
        "postMeal": 265
      }
    ],
    "visits": [
      {
        "id": "vGV-019-0",
        "date": "2026-07-22",
        "drStage": 4,
        "confidence": 0.93,
        "heatmapRegions": [
          {
            "x": 62,
            "y": 62,
            "r": 20,
            "label": "exudates"
          },
          {
            "x": 59,
            "y": 42,
            "r": 15,
            "label": "neovascularization"
          },
          {
            "x": 59,
            "y": 29,
            "r": 17,
            "label": "microaneurysm"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 91,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 exudates, neovascularization, microaneurysm at 91/100 quality, 93% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (62%,62%) near macula",
              "severity": "severe"
            },
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "posterior pole (59%,42%) near macula",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (59%,29%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "High confidence (93%) because image quality 91/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10.6%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10.6% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "117/76",
              "contribution": "low \u2014 HTN accelerates DR; systolic 117 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "11y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 11y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "floaters, fluctuating vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 91/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-laser.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1200-1300 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "right"
      },
      {
        "id": "vGV-019-1",
        "date": "2026-07-22",
        "drStage": 4,
        "confidence": 0.91,
        "heatmapRegions": [
          {
            "x": 36,
            "y": 67,
            "r": 19,
            "label": "haemorrhage"
          },
          {
            "x": 53,
            "y": 65,
            "r": 20,
            "label": "haemorrhage"
          },
          {
            "x": 33,
            "y": 69,
            "r": 17,
            "label": "exudates"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 92,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 haemorrhage, haemorrhage, exudates at 92/100 quality, 91% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (36%,67%)",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (53%,65%)",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (33%,69%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "Moderate confidence (91%) \u2014 quality 92/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 3/4. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10.6%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10.6% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "117/76",
              "contribution": "low \u2014 HTN accelerates DR; systolic 117 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "11y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 11y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "floaters, fluctuating vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 92/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1200-1300 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "right"
      }
    ],
    "lastScreened": "2026-07-22",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Insulin Glargine"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-07-22",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Insulin Glargine",
        "dosage": "10U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-07-22",
        "indication": "Basal add-on for HbA1c 10%+",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "Antiplatelet if no bleed risk",
        "status": "discontinued"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-07-22",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-07-22",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Ranibizumab 0.5mg intravitreal",
        "dosage": "0.5mg/0.05mL",
        "frequency": "single injection",
        "duration": "1 dose, review 4w",
        "prescribedBy": "Dr. Mehta, Retina Specialist",
        "prescribedOn": "2026-07-22",
        "indication": "PDR stage 4 \u2014 neovascularization on 2026-07-22",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-07-22",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-020",
    "name": "Harish Rao",
    "age": 47,
    "gender": "M",
    "village": "Bankadaha, Bishnupur",
    "phone": "98XXXXX362",
    "diabetesYears": 13,
    "diabetesType": "Type 2",
    "bp": "165/85",
    "hbA1c": 7.3,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 84,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 164,
        "postMeal": 215
      },
      {
        "date": "2026-03-20",
        "fasting": 175,
        "postMeal": 232
      },
      {
        "date": "2026-05-22",
        "fasting": 160,
        "postMeal": 244
      },
      {
        "date": "2026-06-25",
        "fasting": 152,
        "postMeal": 202
      },
      {
        "date": "2026-07-28",
        "fasting": 151,
        "postMeal": 194
      }
    ],
    "visits": [
      {
        "id": "vGV-020-auto-1",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 38,
            "r": 16,
            "label": "haemorrhage"
          },
          {
            "x": 52,
            "y": 45,
            "r": 12,
            "label": "exudates"
          }
        ],
        "notes": "Moderate NPDR, haemorrhage + exudates",
        "imageQuality": 82,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 haemorrhage, exudates at 82/100 quality, 86% confidence. Risk 84/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (44%,38%) near macula",
              "severity": "moderate"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (52%,45%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: haemorrhage, exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (86%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.3%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "165/85",
              "contribution": "high \u2014 HTN accelerates DR; systolic 165 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "13y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 13y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-020-auto-1-other",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.85,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 38,
            "r": 16,
            "label": "haemorrhage"
          }
        ],
        "notes": "Moderate NPDR, haemorrhage + exudates (right eye)",
        "imageQuality": 82,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 haemorrhage, exudates at 82/100 quality, 86% confidence. Risk 84/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (44%,38%) near macula",
              "severity": "moderate"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (52%,45%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: haemorrhage, exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (86%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.3%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "165/85",
              "contribution": "high \u2014 HTN accelerates DR; systolic 165 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "13y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 13y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Amlodipine 5mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      }
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-021",
    "name": "Usha Rani",
    "age": 59,
    "gender": "F",
    "village": "Kothapally, Warangal",
    "phone": "98XXXXX256",
    "diabetesYears": 6,
    "diabetesType": "Type 2",
    "bp": "118/90",
    "hbA1c": 11,
    "familyHistory": false,
    "symptoms": [
      "headache",
      "fluctuating vision"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-03-20",
        "fasting": 209,
        "postMeal": 294
      },
      {
        "date": "2026-06-25",
        "fasting": 185,
        "postMeal": 271
      },
      {
        "date": "2026-07-28",
        "fasting": 206,
        "postMeal": 267
      }
    ],
    "visits": [
      {
        "id": "vGV-021-0",
        "date": "2026-01-12",
        "drStage": 2,
        "confidence": 0.84,
        "heatmapRegions": [
          {
            "x": 70,
            "y": 51,
            "r": 12,
            "label": "microaneurysm"
          },
          {
            "x": 28,
            "y": 54,
            "r": 18,
            "label": "haemorrhage"
          }
        ],
        "notes": "Moderate NPDR, exudates",
        "imageQuality": 91,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 microaneurysm, haemorrhage at 91/100 quality, 84% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "superotemporal quadrant (70%,51%)",
              "severity": "moderate"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (28%,54%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: microaneurysm, haemorrhage within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 91/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "11%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 11% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "118/90",
              "contribution": "low \u2014 HTN accelerates DR; systolic 118 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "6y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 6y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "headache, fluctuating vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 91/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-021-0-other",
        "date": "2026-01-12",
        "drStage": 2,
        "confidence": 0.82,
        "heatmapRegions": [
          {
            "x": 70,
            "y": 51,
            "r": 12,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR, exudates (right eye)",
        "imageQuality": 91,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 microaneurysm, haemorrhage at 91/100 quality, 84% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "superotemporal quadrant (70%,51%)",
              "severity": "moderate"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (28%,54%)",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: microaneurysm, haemorrhage within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (84%) \u2014 quality 91/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "11%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 11% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "118/90",
              "contribution": "low \u2014 HTN accelerates DR; systolic 118 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "6y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 6y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "headache, fluctuating vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 91/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "lastScreened": "2026-01-12",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Insulin Glargine"
    ],
    "footLastCheck": "2026-08-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-01-12",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-01-12",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Insulin Glargine",
        "dosage": "10U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-01-12",
        "indication": "Basal add-on for HbA1c 10%+",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-12",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-12",
        "indication": "Antiplatelet if no bleed risk",
        "status": "discontinued"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-01-12",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-01-12",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      },
      {
        "drug": "Mupirocin 2% ointment",
        "dosage": "thin layer",
        "frequency": "BD",
        "duration": "7d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-12",
        "indication": "Foot care \u2014 post-screening",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-01-12",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-022",
    "name": "Naresh Chandra",
    "age": 48,
    "gender": "M",
    "village": "Shahada, Nandurbar",
    "phone": "98XXXXX514",
    "diabetesYears": 18,
    "diabetesType": "Type 2",
    "bp": "141/85",
    "hbA1c": 10,
    "familyHistory": true,
    "symptoms": [
      "floaters"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-03-20",
        "fasting": 198,
        "postMeal": 260
      },
      {
        "date": "2026-05-22",
        "fasting": 171,
        "postMeal": 244
      },
      {
        "date": "2026-06-25",
        "fasting": 177,
        "postMeal": 241
      },
      {
        "date": "2026-07-28",
        "fasting": 196,
        "postMeal": 254
      },
      {
        "date": "2026-08-20",
        "fasting": 176,
        "postMeal": 249
      }
    ],
    "visits": [
      {
        "id": "vGV-022-0",
        "date": "2026-05-10",
        "drStage": 4,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 40,
            "y": 33,
            "r": 14,
            "label": "neovascularization"
          },
          {
            "x": 59,
            "y": 63,
            "r": 14,
            "label": "neovascularization"
          },
          {
            "x": 69,
            "y": 59,
            "r": 18,
            "label": "haemorrhage"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 94,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 neovascularization, neovascularization, haemorrhage at 94/100 quality, 88% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "inferonasal (40%,33%)",
              "severity": "severe"
            },
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "posterior pole (59%,63%) near macula",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "superotemporal quadrant (69%,59%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "Moderate confidence (88%) \u2014 quality 94/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 3/4. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "141/85",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 141 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "18y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 18y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 94/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "right"
      },
      {
        "id": "vGV-022-0-other",
        "date": "2026-05-10",
        "drStage": 4,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 40,
            "y": 33,
            "r": 14,
            "label": "neovascularization"
          }
        ],
        "notes": "Proliferative DR, neovascularization (left eye)",
        "imageQuality": 94,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only",
            "Extra: no sugar at all"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment",
            "HB high, avoid sweets"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "analysis": {
          "summary": "Proliferative DR \u2014 3 neovascularization, neovascularization, haemorrhage at 94/100 quality, 88% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "inferonasal (40%,33%)",
              "severity": "severe"
            },
            {
              "type": "neovascularization",
              "count": 1,
              "locations": "posterior pole (59%,63%) near macula",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "superotemporal quadrant (69%,59%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "Moderate confidence (88%) \u2014 quality 94/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 3/4. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "10%",
              "contribution": "high \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 10% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "141/85",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 141 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "18y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 18y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "floaters",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 94/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        }
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg",
      "Insulin Glargine"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "1g",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni, PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Glycemic control \u2014 HbA1c 9%+",
        "status": "active"
      },
      {
        "drug": "Glimipride 2mg",
        "dosage": "2mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "Dr. Kulkarni",
        "prescribedOn": "2026-05-10",
        "indication": "Sulfonylurea add-on",
        "status": "active"
      },
      {
        "drug": "Insulin Glargine",
        "dosage": "10U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-05-10",
        "indication": "Basal add-on for HbA1c 10%+",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "discontinued"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-05-10",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-05-10",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Ranibizumab 0.5mg intravitreal",
        "dosage": "0.5mg/0.05mL",
        "frequency": "single injection",
        "duration": "1 dose, review 4w",
        "prescribedBy": "Dr. Mehta, Retina Specialist",
        "prescribedOn": "2026-05-10",
        "indication": "PDR stage 4 \u2014 neovascularization on 2026-05-10",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-05-10",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-023",
    "name": "Rekha Patel",
    "age": 35,
    "gender": "F",
    "village": "Amrity, Malda",
    "phone": "98XXXXX993",
    "diabetesYears": 16,
    "diabetesType": "Type 1",
    "bp": "134/85",
    "hbA1c": 8.8,
    "familyHistory": true,
    "symptoms": [
      "headache"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 166,
        "postMeal": 255
      },
      {
        "date": "2026-03-20",
        "fasting": 185,
        "postMeal": 238
      },
      {
        "date": "2026-04-18",
        "fasting": 169,
        "postMeal": 224
      },
      {
        "date": "2026-07-28",
        "fasting": 180,
        "postMeal": 270
      }
    ],
    "visits": [
      {
        "id": "vGV-023-0",
        "date": "2026-05-10",
        "drStage": 3,
        "confidence": 0.96,
        "heatmapRegions": [
          {
            "x": 46,
            "y": 42,
            "r": 16,
            "label": "exudates"
          },
          {
            "x": 47,
            "y": 28,
            "r": 19,
            "label": "exudates"
          },
          {
            "x": 45,
            "y": 30,
            "r": 11,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, haemorrhages",
        "imageQuality": 84,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 exudates, exudates, microaneurysm at 84/100 quality, 96% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (46%,42%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (47%,28%)",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (45%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "High confidence (96%) because image quality 84/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.8%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.8% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "134/85",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 134 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "16y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 16y Type 1"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "headache",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 84/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "left"
      },
      {
        "id": "vGV-023-0-other",
        "date": "2026-05-10",
        "drStage": 3,
        "confidence": 0.96,
        "heatmapRegions": [
          {
            "x": 46,
            "y": 42,
            "r": 16,
            "label": "exudates"
          }
        ],
        "notes": "Severe NPDR, haemorrhages (right eye)",
        "imageQuality": 84,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 exudates, exudates, microaneurysm at 84/100 quality, 96% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (46%,42%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (47%,28%)",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (45%,30%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "High confidence (96%) because image quality 84/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.8%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.8% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "134/85",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 134 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "16y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 16y Type 1"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "headache",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 84/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Insulin Glargine",
      "Insulin Aspart",
      "Laser photocoagulation (PRP)"
    ],
    "prescriptions": [
      {
        "drug": "Insulin Glargine",
        "dosage": "16U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta, GMC Dhule",
        "prescribedOn": "2026-05-10",
        "indication": "Basal insulin \u2014 Type 1 DM",
        "status": "active"
      },
      {
        "drug": "Insulin Aspart",
        "dosage": "6U",
        "frequency": "TID pre-meal",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-05-10",
        "indication": "Bolus insulin",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-05-10",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-024",
    "name": "Vinod Kumar",
    "age": 62,
    "gender": "M",
    "village": "Adilabad, Telangana",
    "phone": "98XXXXX561",
    "diabetesYears": 15,
    "diabetesType": "Type 2",
    "bp": "115/80",
    "hbA1c": 7.6,
    "familyHistory": true,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 95,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 156,
        "postMeal": 213
      },
      {
        "date": "2026-03-20",
        "fasting": 173,
        "postMeal": 253
      },
      {
        "date": "2026-05-22",
        "fasting": 161,
        "postMeal": 252
      },
      {
        "date": "2026-06-25",
        "fasting": 157,
        "postMeal": 234
      },
      {
        "date": "2026-07-28",
        "fasting": 179,
        "postMeal": 260
      },
      {
        "date": "2026-08-20",
        "fasting": 178,
        "postMeal": 246
      }
    ],
    "visits": [
      {
        "id": "vGV-024-0",
        "date": "2026-07-22",
        "drStage": 3,
        "confidence": 0.83,
        "heatmapRegions": [
          {
            "x": 67,
            "y": 34,
            "r": 14,
            "label": "exudates"
          },
          {
            "x": 44,
            "y": 70,
            "r": 12,
            "label": "exudates"
          },
          {
            "x": 43,
            "y": 39,
            "r": 19,
            "label": "haemorrhage"
          }
        ],
        "notes": "Severe NPDR, haemorrhages",
        "imageQuality": 79,
        "analysis": {
          "summary": "Severe NPDR \u2014 3 exudates, exudates, haemorrhage at 79/100 quality, 83% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "superotemporal quadrant (67%,34%)",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (44%,70%)",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (43%,39%) near macula",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (83%) \u2014 quality 79/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.6%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.6% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "115/80",
              "contribution": "low \u2014 HTN accelerates DR; systolic 115 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "15y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 15y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 79/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "eye": "left"
      },
      {
        "id": "vGV-024-0-other",
        "date": "2026-07-22",
        "drStage": 3,
        "confidence": 0.85,
        "heatmapRegions": [
          {
            "x": 67,
            "y": 34,
            "r": 14,
            "label": "exudates"
          }
        ],
        "notes": "Severe NPDR, haemorrhages (right eye)",
        "imageQuality": 79,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding.",
          "dos": [
            "Strict salt <4g, oil <2 tsp",
            "Small frequent meals",
            "Fruit 80-100g only",
            "Daily walk as tolerated"
          ],
          "donts": [
            "No sugar or fried foods",
            "No smoking or alcohol",
            "Avoid long gaps without food"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks"
        },
        "analysis": {
          "summary": "Severe NPDR \u2014 3 exudates, exudates, haemorrhage at 79/100 quality, 83% confidence. Risk 95/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "superotemporal quadrant (67%,34%)",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (44%,70%)",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (43%,39%) near macula",
              "severity": "severe"
            }
          ],
          "stageJustification": "4-quadrant haemorrhages + 3 severe lesions, intraretinal haemorrhages in 2+ quadrants. Venous beading suspected. Qualifies Severe NPDR (ETDRS 53) \u2014 high progression risk to PDR within 12m (50% without treatment).",
          "confidenceExplanation": "Moderate confidence (83%) \u2014 quality 79/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 2/3. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.6%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.6% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "115/80",
              "contribution": "low \u2014 HTN accelerates DR; systolic 115 mmHg controlled"
            },
            {
              "factor": "Diabetes duration",
              "value": "15y",
              "contribution": "high \u2014 longer duration increases cumulative exposure; 15y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 79/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Severe NPDR is pre-proliferative \u2014 ischaemia extensive, neovascular drive imminent. Without PRP laser, 50% progress to PDR within 12 months, high risk of vitreous haemorrhage.",
          "recommendedActions": [
            "Urgent eSanjeevani 1-2w, PRP laser counselling",
            "Strict DM/HTN, avoid NSAIDs, HbA1c 2-weekly",
            "Telepharmacy holds meds until PRP decision"
          ],
          "urgency": "urgent"
        }
      }
    ],
    "lastScreened": "2026-07-22",
    "medication": [
      "Metformin 500mg",
      "Sitagliptin 100mg",
      "Atorvastatin 10mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "First-line",
        "status": "active"
      },
      {
        "drug": "Sitagliptin 100mg",
        "dosage": "100mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "DPP4 add-on",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-07-22",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-07-22",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-07-22",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-07-22",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-025",
    "name": "Anjali Mishra",
    "age": 34,
    "gender": "F",
    "village": "Bhainsa, Adilabad",
    "phone": "98XXXXX227",
    "diabetesYears": 8,
    "diabetesType": "Type 2",
    "bp": "130/94",
    "hbA1c": 7.4,
    "familyHistory": true,
    "symptoms": [
      "floaters",
      "eye pain"
    ],
    "riskScore": 75,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 187,
        "postMeal": 246
      },
      {
        "date": "2026-03-20",
        "fasting": 160,
        "postMeal": 205
      },
      {
        "date": "2026-05-22",
        "fasting": 178,
        "postMeal": 229
      },
      {
        "date": "2026-06-25",
        "fasting": 184,
        "postMeal": 235
      }
    ],
    "visits": [
      {
        "id": "vGV-025-auto-1",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 38,
            "r": 16,
            "label": "haemorrhage"
          },
          {
            "x": 52,
            "y": 45,
            "r": 12,
            "label": "exudates"
          }
        ],
        "notes": "Moderate NPDR, haemorrhage + exudates",
        "imageQuality": 82,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 haemorrhage, exudates at 82/100 quality, 86% confidence. Risk 75/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (44%,38%) near macula",
              "severity": "moderate"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (52%,45%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: haemorrhage, exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (86%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.4%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.4% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "130/94",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 130 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "8y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 8y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "floaters, eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "left"
      },
      {
        "id": "vGV-025-auto-1-other",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 38,
            "r": 16,
            "label": "haemorrhage"
          }
        ],
        "notes": "Moderate NPDR, haemorrhage + exudates (right eye)",
        "imageQuality": 82,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 haemorrhage, exudates at 82/100 quality, 86% confidence. Risk 75/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (44%,38%) near macula",
              "severity": "moderate"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (52%,45%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: haemorrhage, exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (86%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.4%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.4% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "130/94",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 130 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "8y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 8y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "floaters, eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Atorvastatin 10mg"
    ],
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "BP control",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-20",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-20",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "completed"
      }
    ],
    "lastScreened": "2026-08-20"
  },
  {
    "id": "GV-026",
    "name": "Sanjay Patil",
    "age": 52,
    "gender": "M",
    "village": "Narayangarh, Medinipur",
    "phone": "98XXXXX630",
    "diabetesYears": 9,
    "diabetesType": "Type 2",
    "bp": "143/86",
    "hbA1c": 8.5,
    "familyHistory": false,
    "symptoms": [
      "eye pain"
    ],
    "riskScore": 81,
    "glucose": [
      {
        "date": "2026-03-20",
        "fasting": 174,
        "postMeal": 217
      },
      {
        "date": "2026-06-25",
        "fasting": 182,
        "postMeal": 241
      },
      {
        "date": "2026-07-28",
        "fasting": 180,
        "postMeal": 265
      }
    ],
    "visits": [
      {
        "id": "vGV-026-0",
        "date": "2026-08-10",
        "drStage": 4,
        "confidence": 0.94,
        "heatmapRegions": [
          {
            "x": 65,
            "y": 55,
            "r": 18,
            "label": "haemorrhage"
          },
          {
            "x": 58,
            "y": 50,
            "r": 17,
            "label": "microaneurysm"
          },
          {
            "x": 48,
            "y": 70,
            "r": 12,
            "label": "exudates"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 83,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 haemorrhage, microaneurysm, exudates at 83/100 quality, 94% confidence. Risk 81/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "superotemporal quadrant (65%,55%)",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole (58%,50%) near macula",
              "severity": "severe"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "inferonasal (48%,70%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "High confidence (94%) because image quality 83/100 is sharp, lesions are conspicuous with distinct borders, and model agreement across 5 folds >0.90. Heatmap intensity peaks >0.85 over lesions, no artefacts.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.5%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.5% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "143/86",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 143 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "9y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 9y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 83/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "right"
      },
      {
        "id": "vGV-026-1",
        "date": "2026-06-18",
        "drStage": 4,
        "confidence": 0.85,
        "heatmapRegions": [
          {
            "x": 46,
            "y": 70,
            "r": 17,
            "label": "haemorrhage"
          },
          {
            "x": 57,
            "y": 33,
            "r": 16,
            "label": "microaneurysm"
          },
          {
            "x": 48,
            "y": 35,
            "r": 17,
            "label": "haemorrhage"
          }
        ],
        "notes": "Proliferative DR, neovascularization",
        "imageQuality": 93,
        "analysis": {
          "summary": "Proliferative DR \u2014 3 haemorrhage, microaneurysm, haemorrhage at 93/100 quality, 85% confidence. Risk 81/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (46%,70%)",
              "severity": "severe"
            },
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "inferonasal (57%,33%)",
              "severity": "severe"
            },
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "inferonasal (48%,35%)",
              "severity": "severe"
            }
          ],
          "stageJustification": "Neovascularization at disc/elsewhere + preretinal haemorrhage, 3 proliferative lesions. ETDRS 61-75 Proliferative DR \u2014 high-risk PDR, imminent vitreous haemorrhage/tractional detachment risk.",
          "confidenceExplanation": "Moderate confidence (85%) \u2014 quality 93/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 3/4. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "8.5%",
              "contribution": "moderate \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 8.5% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "143/86",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 143 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "9y",
              "contribution": "moderate \u2014 longer duration increases cumulative exposure; 9y Type 2"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "eye pain",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Excellent 93/100 \u2014 sharp focus fovea to periphery, even illumination, no motion artefact, optic disc and macula centred. Suitable for grading.",
          "clinicalSignificance": "Proliferative DR is sight-threatening \u2014 neovascular fronds bleed easily, tractional detachment risk. Immediate PRP/anti-VEGF needed, avoid Valsalva, urgent referral.",
          "recommendedActions": [
            "Emergency eSanjeevani <1w, PRP + anti-VEGF",
            "No strenuous activity, head elevation",
            "Admit if vitreous haemorrhage, FFA/OCT planned"
          ],
          "urgency": "emergency"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care.",
          "dos": [
            "Very strict small portions",
            "Salt <3g, oil <2 tsp",
            "Fruit 50-80g only",
            "Light activity only"
          ],
          "donts": [
            "No sugar or fried foods",
            "No alcohol or smoking",
            "Do not delay treatment"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral 1 week"
        },
        "eye": "right"
      }
    ],
    "lastScreened": "2026-08-10",
    "medication": [
      "Metformin 500mg",
      "Sitagliptin 100mg",
      "Telmisartan 40mg"
    ],
    "footLastCheck": "2026-08-18",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "BD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "First-line",
        "status": "active"
      },
      {
        "drug": "Sitagliptin 100mg",
        "dosage": "100mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "DPP4 add-on",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      },
      {
        "drug": "Fenofibrate 145mg",
        "dosage": "145mg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-10",
        "indication": "DR adjunct \u2014 FIELD trial",
        "status": "active"
      },
      {
        "drug": "Nepafenac 0.1% eye drops",
        "dosage": "1 drop",
        "frequency": "TID",
        "duration": "7d",
        "prescribedBy": "Ophthalmologist",
        "prescribedOn": "2026-08-10",
        "indication": "Peri-laser anti-inflammatory (if PRP)",
        "status": "active"
      },
      {
        "drug": "Mupirocin 2% ointment",
        "dosage": "thin layer",
        "frequency": "BD",
        "duration": "7d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "Foot care \u2014 post-screening",
        "status": "completed"
      },
      {
        "drug": "Vitamin B12 1500mcg",
        "dosage": "1500mcg",
        "frequency": "OD",
        "duration": "60d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-08-10",
        "indication": "Metformin-induced B12 check",
        "status": "active"
      },
      {
        "drug": "Ranibizumab 0.5mg intravitreal",
        "dosage": "0.5mg/0.05mL",
        "frequency": "single injection",
        "duration": "1 dose, review 4w",
        "prescribedBy": "Dr. Mehta, Retina Specialist",
        "prescribedOn": "2026-06-18",
        "indication": "PDR stage 4 \u2014 neovascularization on 2026-06-18",
        "status": "active"
      },
      {
        "drug": "Laser photocoagulation (PRP)",
        "dosage": "1200-1500 burns",
        "frequency": "2 sessions",
        "duration": "2w interval",
        "prescribedBy": "Ophthalmologist, GMC Dhule",
        "prescribedOn": "2026-06-18",
        "indication": "Severe NPDR/PDR \u2014 prevent progression",
        "status": "active"
      }
    ]
  },
  {
    "id": "GV-027",
    "name": "Lata Joshi",
    "age": 46,
    "gender": "F",
    "village": "Dhule, Maharashtra",
    "phone": "98XXXXX664",
    "diabetesYears": 2,
    "diabetesType": "Type 2",
    "bp": "147/76",
    "hbA1c": 6.9,
    "familyHistory": true,
    "symptoms": [
      "headache",
      "blurred vision"
    ],
    "riskScore": 76,
    "glucose": [
      {
        "date": "2026-02-15",
        "fasting": 166,
        "postMeal": 215
      },
      {
        "date": "2026-03-20",
        "fasting": 154,
        "postMeal": 210
      },
      {
        "date": "2026-04-18",
        "fasting": 178,
        "postMeal": 227
      },
      {
        "date": "2026-07-28",
        "fasting": 169,
        "postMeal": 237
      }
    ],
    "visits": [
      {
        "id": "vGV-027-0",
        "date": "2026-05-10",
        "drStage": 1,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 54,
            "y": 58,
            "r": 18,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms",
        "imageQuality": 86,
        "analysis": {
          "summary": "Mild NPDR \u2014 1 exudates at 86/100 quality, 87% confidence. Risk 76/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (54%,58%) near macula",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 54%/58% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "Moderate confidence (87%) \u2014 quality 86/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 0/1. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.9%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.9% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "147/76",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 147 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "2y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 2y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "headache, blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 86/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "eye": "right"
      },
      {
        "id": "vGV-027-0-other",
        "date": "2026-05-10",
        "drStage": 1,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 54,
            "y": 58,
            "r": 18,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms (left eye)",
        "imageQuality": 86,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Tighten control to stop mild changes from growing.",
          "dos": [
            "Millet + dal + green veg",
            "1 fruit and almonds",
            "Salt <5g, BP check",
            "Walk 30-45 min"
          ],
          "donts": [
            "No added sugar or sweet drinks",
            "Limit salt and packaged snacks",
            "No tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Eye check in 6 months"
        },
        "analysis": {
          "summary": "Mild NPDR \u2014 1 exudates at 86/100 quality, 87% confidence. Risk 76/100.",
          "lesionsDetected": [
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (54%,58%) near macula",
              "severity": "mild"
            }
          ],
          "stageJustification": "1\u20133 microaneurysms in posterior pole (heatmap 54%/58% if present). No haemorrhage or exudate beyond. Single lesion cluster = Mild NPDR (ETDRS 20-35).",
          "confidenceExplanation": "Moderate confidence (87%) \u2014 quality 86/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 0/1. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "6.9%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 6.9% is at target"
            },
            {
              "factor": "Blood pressure",
              "value": "147/76",
              "contribution": "moderate \u2014 HTN accelerates DR; systolic 147 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "2y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 2y Type 2"
            },
            {
              "factor": "Family history",
              "value": "Yes",
              "contribution": "Genetic predisposition adds baseline risk"
            },
            {
              "factor": "Symptoms",
              "value": "headache, blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 86/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Mild NPDR is earliest visible DR \u2014 microaneurysms only, no macular threat. Indicates end-organ damage has begun; systemic control must tighten to prevent progression to moderate.",
          "recommendedActions": [
            "Re-screen 6m, tighten glycemic control",
            "BP/lipid optimization, smoking cessation",
            "Patient education: report floaters/flashes immediately"
          ],
          "urgency": "routine"
        }
      }
    ],
    "lastScreened": "2026-05-10",
    "prescriptions": [
      {
        "drug": "Metformin 500mg",
        "dosage": "500mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Maintenance",
        "status": "active"
      },
      {
        "drug": "Telmisartan 40mg",
        "dosage": "40mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN \u2014 BP 140+",
        "status": "active"
      },
      {
        "drug": "Amlodipine 5mg",
        "dosage": "5mg",
        "frequency": "OD",
        "duration": "30d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "HTN adjunct",
        "status": "active"
      },
      {
        "drug": "Atorvastatin 10mg",
        "dosage": "10mg",
        "frequency": "HS",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "ASCVD risk \u2014 DR high risk",
        "status": "active"
      },
      {
        "drug": "Aspirin 75mg",
        "dosage": "75mg",
        "frequency": "OD",
        "duration": "90d",
        "prescribedBy": "PHC Shirpur",
        "prescribedOn": "2026-05-10",
        "indication": "Antiplatelet if no bleed risk",
        "status": "active"
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Telmisartan 40mg",
      "Amlodipine 5mg"
    ]
  },
  {
    "id": "GV-028",
    "name": "Mahesh Babu",
    "age": 63,
    "gender": "M",
    "village": "Eekkadu, Thiruvallur",
    "phone": "98XXXXX520",
    "diabetesYears": 3,
    "diabetesType": "Type 1",
    "bp": "162/99",
    "hbA1c": 7.3,
    "familyHistory": false,
    "symptoms": [
      "blurred vision"
    ],
    "riskScore": 80,
    "glucose": [
      {
        "date": "2026-03-20",
        "fasting": 166,
        "postMeal": 232
      },
      {
        "date": "2026-04-18",
        "fasting": 167,
        "postMeal": 233
      },
      {
        "date": "2026-05-22",
        "fasting": 163,
        "postMeal": 225
      },
      {
        "date": "2026-06-25",
        "fasting": 176,
        "postMeal": 230
      },
      {
        "date": "2026-07-28",
        "fasting": 171,
        "postMeal": 228
      },
      {
        "date": "2026-08-20",
        "fasting": 166,
        "postMeal": 256
      }
    ],
    "visits": [
      {
        "id": "vGV-028-auto-1",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 38,
            "r": 16,
            "label": "haemorrhage"
          },
          {
            "x": 52,
            "y": 45,
            "r": 12,
            "label": "exudates"
          }
        ],
        "notes": "Moderate NPDR, haemorrhage + exudates",
        "imageQuality": 82,
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 haemorrhage, exudates at 82/100 quality, 86% confidence. Risk 80/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (44%,38%) near macula",
              "severity": "moderate"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (52%,45%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: haemorrhage, exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (86%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.3%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "162/99",
              "contribution": "high \u2014 HTN accelerates DR; systolic 162 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "3y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 3y Type 1"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "eye": "right"
      },
      {
        "id": "vGV-028-auto-1-other",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 44,
            "y": 38,
            "r": 16,
            "label": "haemorrhage"
          }
        ],
        "notes": "Moderate NPDR, haemorrhage + exudates (left eye)",
        "imageQuality": 82,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "left",
        "dietPlan": {
          "summary": "Steady sugar and eye follow up helps prevent worsening.",
          "dos": [
            "1 cup millet + dal + 2 cups veg",
            "Low salt, lean protein",
            "Fruit 100g only",
            "Walk 30 min + foot check"
          ],
          "donts": [
            "No sweets or fried foods",
            "No deep fried or high salt",
            "Do not miss medicines"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye check in 3 months"
        },
        "analysis": {
          "summary": "Moderate NPDR \u2014 2 haemorrhage, exudates at 82/100 quality, 86% confidence. Risk 80/100.",
          "lesionsDetected": [
            {
              "type": "haemorrhage",
              "count": 1,
              "locations": "posterior pole (44%,38%) near macula",
              "severity": "moderate"
            },
            {
              "type": "exudates",
              "count": 1,
              "locations": "posterior pole (52%,45%) near macula",
              "severity": "moderate"
            }
          ],
          "stageJustification": "2 focal lesions: haemorrhage, exudates within 2DD of macula, scattered. Meets Moderate NPDR criteria (ETDRS 43-47): haemorrhage/exudate without venous beading.",
          "confidenceExplanation": "Moderate confidence (86%) \u2014 quality 82/100 is adequate, lesions visible but 1-2 are subtle near arcades, borderline with stage 1/2. Heatmap moderately focused (0.65-0.80). Senior review recommended if stage \u22652.",
          "riskScoreBreakdown": [
            {
              "factor": "HbA1c",
              "value": "7.3%",
              "contribution": "low \u2014 chronic hyperglycemia drives microvascular damage; HbA1c 7.3% is above target <7%"
            },
            {
              "factor": "Blood pressure",
              "value": "162/99",
              "contribution": "high \u2014 HTN accelerates DR; systolic 162 mmHg elevated"
            },
            {
              "factor": "Diabetes duration",
              "value": "3y",
              "contribution": "low \u2014 longer duration increases cumulative exposure; 3y Type 1"
            },
            {
              "factor": "Family history",
              "value": "No",
              "contribution": "No familial clustering"
            },
            {
              "factor": "Symptoms",
              "value": "blurred vision",
              "contribution": "Symptomatic (blur/floaters) correlates with macular involvement"
            }
          ],
          "imageQualityAssessment": "Good 82/100 \u2014 adequate focus, slight under-illumination at temporal periphery but lesions remain gradable. No blur gate block.",
          "clinicalSignificance": "Moderate NPDR is action threshold \u2014 haemorrhage/exudate near macula risks centre-involving DME. 15-20% progress to PDR within 1y without control optimization.",
          "recommendedActions": [
            "Routine ophthalmology 4-8w via eSanjeevani",
            "Optimize DM/HTN, HbA1c recheck 3m",
            "Foot screening same day, SMS reminder queued"
          ],
          "urgency": "soon"
        }
      }
    ],
    "footLastCheck": "2026-08-18",
    "prescriptions": [
      {
        "drug": "Insulin Glargine",
        "dosage": "16U",
        "frequency": "HS",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta, GMC Dhule",
        "prescribedOn": "2026-08-20",
        "indication": "Basal insulin \u2014 Type 1 DM",
        "status": "active"
      },
      {
        "drug": "Insulin Aspart",
        "dosage": "6U",
        "frequency": "TID pre-meal",
        "duration": "30d",
        "prescribedBy": "Dr. Mehta",
        "prescribedOn": "2026-08-20",
        "indication": "Bolus insulin",
        "status": "active"
      }
    ],
    "medication": [
      "Insulin Glargine",
      "Insulin Aspart"
    ],
    "lastScreened": "2026-08-20"
  }
];

export const referrals: Referral[] = [
  {
    "id": "REF-102",
    "patientId": "GV-003",
    "date": "2026-08-28",
    "stage": 3,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-107",
    "patientId": "GV-014",
    "date": "2026-08-22",
    "stage": 1,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-101",
    "patientId": "GV-001",
    "date": "2026-08-20",
    "stage": 2,
    "status": "confirmed",
    "doctor": "Dr. Mehta \u2014 GMC Dhule",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-008",
    "patientId": "GV-008",
    "date": "2026-08-20",
    "stage": 3,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-013",
    "patientId": "GV-013",
    "date": "2026-08-20",
    "stage": 3,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-020",
    "patientId": "GV-020",
    "date": "2026-08-20",
    "stage": 2,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-025",
    "patientId": "GV-025",
    "date": "2026-08-20",
    "stage": 2,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-028",
    "patientId": "GV-028",
    "date": "2026-08-20",
    "stage": 2,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-108",
    "patientId": "GV-018",
    "date": "2026-08-19",
    "stage": 3,
    "status": "confirmed",
    "doctor": "Dr. Reddy \u2014 Adilabad",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-103",
    "patientId": "GV-005",
    "date": "2026-08-18",
    "stage": 2,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-104",
    "patientId": "GV-007",
    "date": "2026-08-12",
    "stage": 3,
    "status": "confirmed",
    "doctor": "Dr. Kulkarni \u2014 GMC Aurangabad",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-026",
    "patientId": "GV-026",
    "date": "2026-08-10",
    "stage": 4,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-105",
    "patientId": "GV-009",
    "date": "2026-08-05",
    "stage": 4,
    "status": "pending",
    "via": "Direct"
  },
  {
    "id": "REF-106",
    "patientId": "GV-012",
    "date": "2026-07-28",
    "stage": 2,
    "status": "completed",
    "doctor": "Dr. Shah \u2014 Warangal",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-019",
    "patientId": "GV-019",
    "date": "2026-07-22",
    "stage": 4,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-024",
    "patientId": "GV-024",
    "date": "2026-07-22",
    "stage": 3,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-022",
    "patientId": "GV-022",
    "date": "2026-05-10",
    "stage": 4,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-023",
    "patientId": "GV-023",
    "date": "2026-05-10",
    "stage": 3,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-006",
    "patientId": "GV-006",
    "date": "2026-04-08",
    "stage": 2,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-010",
    "patientId": "GV-010",
    "date": "2026-04-08",
    "stage": 4,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-016",
    "patientId": "GV-016",
    "date": "2026-03-14",
    "stage": 3,
    "status": "pending",
    "via": "eSanjeevani"
  },
  {
    "id": "REF-021",
    "patientId": "GV-021",
    "date": "2026-01-12",
    "stage": 2,
    "status": "pending",
    "via": "eSanjeevani"
  }
];

export const pharmacyOrders: PharmacyOrder[] = [
  {
    "id": "RX-202",
    "patientId": "GV-003",
    "patientName": "Arjun Yadav",
    "prescription": "Awaiting ophthalmologist confirmation",
    "status": "pending",
    "date": "2026-08-28"
  },
  {
    "id": "RX-201",
    "patientId": "GV-001",
    "patientName": "Ramesh Patil",
    "prescription": "Metformin 500mg BD, Atorvastatin 10mg OD",
    "status": "dispatched",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-22"
  },
  {
    "id": "RX-208",
    "patientId": "GV-019",
    "patientName": "Rekha Patel",
    "prescription": "Awaiting referral",
    "status": "pending",
    "date": "2026-08-21"
  },
  {
    "id": "RX-203",
    "patientId": "GV-005",
    "patientName": "Priya Sharma",
    "prescription": "Sitagliptin 100mg OD, Fenofibrate 145mg",
    "status": "verified",
    "pharmacist": "Ph. Kavita Desai",
    "date": "2026-08-20"
  },
  {
    "id": "RX-004",
    "patientId": "GV-004",
    "patientName": "Lakshmi Rao",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-008",
    "patientId": "GV-008",
    "patientName": "Suresh Kumar",
    "prescription": "Metformin 500mg 1g BD \u2014 Glycemic control \u2014 HbA1c 9%+",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-011",
    "patientId": "GV-011",
    "patientName": "Kavita Joshi",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-013",
    "patientId": "GV-013",
    "patientName": "Sunita Reddy",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-018",
    "patientId": "GV-018",
    "patientName": "Rohit Meena",
    "prescription": "Metformin 500mg 500mg BD \u2014 First-line",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-020",
    "patientId": "GV-020",
    "patientName": "Harish Rao",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-025",
    "patientId": "GV-025",
    "patientName": "Anjali Mishra",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-028",
    "patientId": "GV-028",
    "patientName": "Mahesh Babu",
    "prescription": "Insulin Glargine 16U HS \u2014 Basal insulin \u2014 Type 1 DM",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-20"
  },
  {
    "id": "RX-207",
    "patientId": "GV-015",
    "patientName": "Sarita Devi",
    "prescription": "Metformin 500mg, Glibenclamide 5mg",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-18"
  },
  {
    "id": "RX-204",
    "patientId": "GV-007",
    "patientName": "Anita Deshmukh",
    "prescription": "Insulin Glargine 16U HS, Metformin 1g BD",
    "status": "dispatched",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-15"
  },
  {
    "id": "RX-205",
    "patientId": "GV-009",
    "patientName": "Meena Patel",
    "prescription": "Laser referral \u2014 no meds until PDR confirmed",
    "status": "pending",
    "date": "2026-08-10"
  },
  {
    "id": "RX-026",
    "patientId": "GV-026",
    "patientName": "Sanjay Patil",
    "prescription": "Metformin 500mg 500mg BD \u2014 First-line",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-08-10"
  },
  {
    "id": "RX-206",
    "patientId": "GV-012",
    "patientName": "Geeta Nair",
    "prescription": "Atorvastatin 20mg OD, Aspirin 75mg",
    "status": "delivered",
    "pharmacist": "Ph. R. Singh",
    "date": "2026-07-30"
  },
  {
    "id": "RX-024",
    "patientId": "GV-024",
    "patientName": "Vinod Kumar",
    "prescription": "Metformin 500mg 500mg BD \u2014 First-line",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-07-22"
  },
  {
    "id": "RX-014",
    "patientId": "GV-014",
    "patientName": "Deepak Yadav",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-06-18"
  },
  {
    "id": "RX-022",
    "patientId": "GV-022",
    "patientName": "Naresh Chandra",
    "prescription": "Metformin 500mg 1g BD \u2014 Glycemic control \u2014 HbA1c 9%+",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-05-10"
  },
  {
    "id": "RX-023",
    "patientId": "GV-023",
    "patientName": "Rekha Patel",
    "prescription": "Insulin Glargine 16U HS \u2014 Basal insulin \u2014 Type 1 DM",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-05-10"
  },
  {
    "id": "RX-027",
    "patientId": "GV-027",
    "patientName": "Lata Joshi",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-05-10"
  },
  {
    "id": "RX-002",
    "patientId": "GV-002",
    "patientName": "Sunita Devi",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-04-12"
  },
  {
    "id": "RX-006",
    "patientId": "GV-006",
    "patientName": "Vikram Singh",
    "prescription": "Metformin 500mg 1g BD \u2014 Glycemic control \u2014 HbA1c 9%+",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-04-08"
  },
  {
    "id": "RX-010",
    "patientId": "GV-010",
    "patientName": "Rajesh Gupta",
    "prescription": "Metformin 500mg 1g BD \u2014 Glycemic control \u2014 HbA1c 9%+",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-04-08"
  },
  {
    "id": "RX-016",
    "patientId": "GV-016",
    "patientName": "Manoj Tiwari",
    "prescription": "Metformin 500mg 1g BD \u2014 Glycemic control \u2014 HbA1c 9%+",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-03-14"
  },
  {
    "id": "RX-017",
    "patientId": "GV-017",
    "patientName": "Pooja Singh",
    "prescription": "Metformin 500mg 500mg OD \u2014 Maintenance",
    "status": "verified",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-03-14"
  },
  {
    "id": "RX-021",
    "patientId": "GV-021",
    "patientName": "Usha Rani",
    "prescription": "Metformin 500mg 1g BD \u2014 Glycemic control \u2014 HbA1c 9%+",
    "status": "pending",
    "pharmacist": "Ph. Sunil Joshi",
    "date": "2026-01-12"
  }
];
