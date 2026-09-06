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
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      },
      {
        "id": "v1-other",
        "date": "2026-02-10",
        "drStage": 2,
        "confidence": 0.85,
        "heatmapRegions": [
          {
            "x": 42,
            "y": 38,
            "r": 18,
            "label": "exudates"
          }
        ],
        "notes": "Moderate NPDR, scattered exudates (right eye)",
        "imageQuality": 92,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-02-10",
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg"
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
        "dietPlan": {
          "summary": "Balanced diabetes plate to keep sugar and BP steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups cooked per meal)",
            "Dal + seasonal veg daily, 2 tsp oil max",
            "Fruit: 1 small guava or papaya (100g) \u2014 avoid mango/banana in excess",
            "Walk 30 min daily, check sugar as advised"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets, and white rice in large portions",
            "Avoid fried snacks (samosa, pakora) and reusing oil",
            "Avoid skipping meals \u2014 eat on time"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Continue same plan, annual eye rescreen"
        },
        "imageUrl": "/images/fundus-normal.jpg",
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
          "summary": "Balanced diabetes plate to keep sugar and BP steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups cooked per meal)",
            "Dal + seasonal veg daily, 2 tsp oil max",
            "Fruit: 1 small guava or papaya (100g) \u2014 avoid mango/banana in excess",
            "Walk 30 min daily, check sugar as advised"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets, and white rice in large portions",
            "Avoid fried snacks (samosa, pakora) and reusing oil",
            "Avoid skipping meals \u2014 eat on time"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Continue same plan, annual eye rescreen"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-04-12"
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
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left"
      },
      {
        "id": "v3-other",
        "date": "2026-01-18",
        "drStage": 3,
        "confidence": 0.92,
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
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-01-18"
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
        "id": "vGV-004-left",
        "date": "2026-08-20",
        "drStage": 0,
        "confidence": 0.86,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina",
        "imageQuality": 90,
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "left",
        "analysis": {
          "summary": "No DR \u2014 eye left",
          "lesionsDetected": [],
          "stageJustification": "No lesions",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-004-right",
        "date": "2026-08-20",
        "drStage": 0,
        "confidence": 0.85,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina",
        "imageQuality": 89,
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "right",
        "analysis": {
          "summary": "No DR \u2014 eye right",
          "lesionsDetected": [],
          "stageJustification": "No lesions",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ]
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
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
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
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      }
    ],
    "lastScreened": "2026-05-10",
    "footLastCheck": "2026-08-18"
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
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-006-0-other",
        "date": "2026-04-08",
        "drStage": 2,
        "confidence": 0.91,
        "heatmapRegions": [
          {
            "x": 42,
            "y": 30,
            "r": 16,
            "label": "neovascularization"
          }
        ],
        "notes": "Moderate NPDR, exudates (right eye)",
        "imageQuality": 79,
        "imageUrl": "/images/fundus-scatter.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-04-08",
    "medication": [
      "Insulin Glargine"
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
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-007-0-other",
        "date": "2026-05-10",
        "drStage": 1,
        "confidence": 0.91,
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
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Metformin 500mg",
      "Sitagliptin 100mg"
    ],
    "footLastCheck": "2026-08-18"
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
        "id": "vGV-008-left",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.9,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 92,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-008-right",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.85,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 92,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ],
    "medication": [
      "Metformin 500mg",
      "Glimipride 2mg"
    ]
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
        "id": "vGV-009-left",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.91,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 90,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-009-right",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 93,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ],
    "medication": [
      "Glimipride 2mg"
    ]
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-laser.jpg",
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left"
      }
    ],
    "lastScreened": "2026-04-08",
    "medication": [
      "Sitagliptin 100mg",
      "Insulin Glargine"
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
        "id": "vGV-011-left",
        "date": "2026-08-20",
        "drStage": 1,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Mild NPDR",
        "imageQuality": 93,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Mild NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-011-right",
        "date": "2026-08-20",
        "drStage": 1,
        "confidence": 0.9,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Mild NPDR",
        "imageQuality": 92,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Mild NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ]
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
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-012-0-other",
        "date": "2026-05-10",
        "drStage": 2,
        "confidence": 0.89,
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
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months"
          ],
          "dailyCalories": "1500-1700 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Metformin 500mg"
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
        "id": "vGV-013-left",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 91,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-013-right",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.92,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 91,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ],
    "medication": [
      "Atorvastatin 10mg"
    ]
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
        "dietPlan": {
          "summary": "Balanced diabetes plate to keep sugar and BP steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups cooked per meal)",
            "Dal + seasonal veg daily, 2 tsp oil max",
            "Fruit: 1 small guava or papaya (100g) \u2014 avoid mango/banana in excess",
            "Walk 30 min daily, check sugar as advised"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets, and white rice in large portions",
            "Avoid fried snacks (samosa, pakora) and reusing oil",
            "Avoid skipping meals \u2014 eat on time"
          ],
          "dailyCalories": "1600-1800 kcal",
          "followUp": "Continue same plan, annual eye rescreen"
        },
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-014-0-other",
        "date": "2026-06-18",
        "drStage": 0,
        "confidence": 0.93,
        "heatmapRegions": [],
        "notes": "No DR, healthy retina (right eye)",
        "imageQuality": 91,
        "imageUrl": "/images/fundus-normal.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Balanced diabetes plate to keep sugar and BP steady and protect eyes.",
          "dos": [
            "Whole grains: jowar, bajra, brown rice (1.5 cups cooked per meal)",
            "Dal + seasonal veg daily, 2 tsp oil max",
            "Fruit: 1 small guava or papaya (100g) \u2014 avoid mango/banana in excess",
            "Walk 30 min daily, check sugar as advised"
          ],
          "donts": [
            "Avoid sugary tea, cold drinks, sweets, and white rice in large portions",
            "Avoid fried snacks (samosa, pakora) and reusing oil",
            "Avoid skipping meals \u2014 eat on time"
          ],
          "dailyCalories": "1600-1800 kcal",
          "followUp": "Continue same plan, annual eye rescreen"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-06-18",
    "footLastCheck": "2026-08-02"
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
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-015-0-other",
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
        "notes": "Mild NPDR, microaneurysms (right eye)",
        "imageQuality": 81,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-06-18"
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
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-016-0-other",
        "date": "2026-03-14",
        "drStage": 3,
        "confidence": 0.79,
        "heatmapRegions": [
          {
            "x": 71,
            "y": 39,
            "r": 20,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR, haemorrhages (right eye)",
        "imageQuality": 90,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-03-14",
    "medication": [
      "Insulin Glargine",
      "Atorvastatin 10mg"
    ],
    "footLastCheck": "2026-08-18"
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
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
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
        "notes": "Mild NPDR, microaneurysms (right eye)",
        "imageQuality": 78,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-03-14"
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
        "id": "vGV-018-left",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 89,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-018-right",
        "date": "2026-08-20",
        "drStage": 3,
        "confidence": 0.86,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Severe NPDR",
        "imageQuality": 89,
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Severe NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ]
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1200-1300 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left"
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1200-1300 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right"
      }
    ],
    "lastScreened": "2026-07-22",
    "medication": [
      "Glimipride 2mg",
      "Metformin 500mg"
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
        "id": "vGV-020-left",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR",
        "imageQuality": 89,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Moderate NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-020-right",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR",
        "imageQuality": 93,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Moderate NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ],
    "medication": [
      "Insulin Glargine"
    ]
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
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-021-0-other",
        "date": "2026-01-12",
        "drStage": 2,
        "confidence": 0.84,
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
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Steady sugar and BP plus eye follow-up helps prevent worsening near the center of vision.",
          "dos": [
            "1 cup cooked millet + 1 cup dal + 2 cups veg per meal",
            "Low salt, lean protein (egg white, fish, dal), curd small cup",
            "Fruit: 100g papaya or guava only, avoid juice",
            "Walk 30 min + foot check daily",
            "Extra: no sugar at all, use sugar-free for tea if needed"
          ],
          "donts": [
            "No sweets, sweet tea, cold drinks, alcohol",
            "No deep fried, re-fried oil, red meat, high-salt foods",
            "Do not miss medicines, do not skip eye follow-up in 3 months",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Eye re-screen in 3 months, routine referral 4-8 weeks"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-01-12",
    "medication": [
      "Sitagliptin 100mg",
      "Insulin Glargine"
    ],
    "footLastCheck": "2026-08-18"
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-022-0-other",
        "date": "2026-05-10",
        "drStage": 4,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 40,
            "y": 33,
            "r": 14,
            "label": "neovascularization"
          }
        ],
        "notes": "Proliferative DR, neovascularization (right eye)",
        "imageQuality": 94,
        "imageUrl": "/images/eye-macro.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: no sugar at all, use sugar-free for tea if needed",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose",
            "HB high, avoid any sweets until next HbA1c check"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Sitagliptin 100mg"
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
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
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
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts"
          ],
          "dailyCalories": "1200-1400 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-05-10",
    "medication": [
      "Insulin Glargine"
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
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-024-0-other",
        "date": "2026-07-22",
        "drStage": 3,
        "confidence": 0.84,
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
        "imageUrl": "/images/fundus-proliferative.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Strict control to protect eye from further bleeding and reduce PDR risk.",
          "dos": [
            "Strict salt <4g, oil <2 tsp/day, high fiber veg",
            "Small frequent meals, millet + dal, no large rice plates",
            "Fruit limited to 80-100g, no juice/dry fruits",
            "Daily walk as tolerated, plus BP and sugar log"
          ],
          "donts": [
            "No sugar, fried, salty, or processed foods",
            "No smoking, alcohol, or missing doses",
            "Avoid long gaps without food or heavy feasts"
          ],
          "dailyCalories": "1400-1600 kcal",
          "followUp": "Urgent eye referral 1-2 weeks, re-screen 1 month"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-07-22",
    "medication": [
      "Metformin 500mg"
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
        "id": "vGV-025-left",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.87,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR",
        "imageQuality": 88,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Moderate NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-025-right",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR",
        "imageQuality": 89,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Moderate NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ],
    "medication": [
      "Atorvastatin 10mg",
      "Sitagliptin 100mg"
    ]
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-proliferative.jpg",
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
        "dietPlan": {
          "summary": "Very strict diet and urgent eye care to protect vision.",
          "dos": [
            "Very strict: small millet portions, dal, boiled veg, curd small",
            "Salt <3g, oil <2 tsp, no added sugar at all",
            "Fruit only 50-80g if sugar allows, otherwise avoid",
            "Light activity only as doctor advises, no strain",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No sugar, fried, salty, processed, or outside food",
            "No alcohol, smoking, or strenuous exercise until eye doctor clears",
            "Do not delay eye treatment, do not miss any dose"
          ],
          "dailyCalories": "1300-1500 kcal",
          "followUp": "Emergency eye referral within 1 week, weekly follow-up"
        },
        "imageUrl": "/images/fundus-laser.jpg",
        "eye": "left"
      }
    ],
    "lastScreened": "2026-08-10",
    "medication": [
      "Insulin Glargine",
      "Metformin 500mg"
    ],
    "footLastCheck": "2026-08-18"
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
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left"
      },
      {
        "id": "vGV-027-0-other",
        "date": "2026-05-10",
        "drStage": 1,
        "confidence": 0.89,
        "heatmapRegions": [
          {
            "x": 54,
            "y": 58,
            "r": 18,
            "label": "exudates"
          }
        ],
        "notes": "Mild NPDR, microaneurysms (right eye)",
        "imageQuality": 86,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "dietPlan": {
          "summary": "Tighten sugar and BP control to stop mild changes from growing.",
          "dos": [
            "Millet-based meals (jowar/bajra) + dal + green veg",
            "1 fruit (guava, apple) and 5 soaked almonds",
            "Salt <5g/day, BP check weekly",
            "Walk 30-45 min, 5 days/week",
            "Extra: less salt, check BP twice weekly at PHC"
          ],
          "donts": [
            "No added sugar, jaggery, honey, or sweetened drinks",
            "Limit salt, pickle, papad, and packaged snacks",
            "No smoking or tobacco"
          ],
          "dailyCalories": "1400-1500 kcal",
          "followUp": "Re-screen eye in 6 months, tighten HbA1c"
        },
        "analysis": null
      }
    ],
    "lastScreened": "2026-05-10"
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
        "id": "vGV-028-left",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR",
        "imageQuality": 91,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "left",
        "analysis": {
          "summary": "Moderate NPDR \u2014 eye left",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      },
      {
        "id": "vGV-028-right",
        "date": "2026-08-20",
        "drStage": 2,
        "confidence": 0.88,
        "heatmapRegions": [
          {
            "x": 38,
            "y": 42,
            "r": 14,
            "label": "microaneurysm"
          }
        ],
        "notes": "Moderate NPDR",
        "imageQuality": 93,
        "imageUrl": "/images/fundus-mild.jpg",
        "eye": "right",
        "analysis": {
          "summary": "Moderate NPDR \u2014 eye right",
          "lesionsDetected": [
            {
              "type": "microaneurysm",
              "count": 1,
              "locations": "posterior pole",
              "severity": "mild"
            }
          ],
          "stageJustification": "Mild changes",
          "confidenceExplanation": "High confidence",
          "riskScoreBreakdown": [],
          "imageQualityAssessment": "Good",
          "clinicalSignificance": "Routine",
          "recommendedActions": [],
          "urgency": "routine"
        },
        "dietPlan": {
          "summary": "Balanced plate",
          "dos": [
            "Whole grains",
            "Dal + veg"
          ],
          "donts": [
            "Avoid sugar"
          ],
          "dailyCalories": "1500 kcal",
          "followUp": "Annual"
        }
      }
    ],
    "footLastCheck": "2026-08-18"
  }
];

export const referrals: Referral[] = [
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
    "id": "REF-102",
    "patientId": "GV-003",
    "date": "2026-08-28",
    "stage": 3,
    "status": "pending",
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
    "id": "REF-107",
    "patientId": "GV-014",
    "date": "2026-08-22",
    "stage": 1,
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
  }
];

export const pharmacyOrders: PharmacyOrder[] = [
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
    "id": "RX-202",
    "patientId": "GV-003",
    "patientName": "Arjun Yadav",
    "prescription": "Awaiting ophthalmologist confirmation",
    "status": "pending",
    "date": "2026-08-28"
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
    "id": "RX-206",
    "patientId": "GV-012",
    "patientName": "Geeta Nair",
    "prescription": "Atorvastatin 20mg OD, Aspirin 75mg",
    "status": "delivered",
    "pharmacist": "Ph. R. Singh",
    "date": "2026-07-30"
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
    "id": "RX-208",
    "patientId": "GV-019",
    "patientName": "Rekha Patel",
    "prescription": "Awaiting referral",
    "status": "pending",
    "date": "2026-08-21"
  }
];
