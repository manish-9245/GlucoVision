export type DRStage = 0 | 1 | 2 | 3 | 4;
export const DR_LABELS: Record<DRStage, string> = {
  0: "No DR",
  1: "Mild NPDR",
  2: "Moderate NPDR",
  3: "Severe NPDR",
  4: "Proliferative DR",
};
export const DR_COLOR: Record<DRStage, string> = {
  0: "emerald",
  1: "amber",
  2: "amber",
  3: "red",
  4: "red",
};

export interface GlucoseReading { date: string; fasting: number; postMeal?: number; }
export interface Visit {
  id: string;
  date: string;
  drStage: DRStage;
  confidence: number;
  heatmapRegions: { x: number; y: number; r: number; label: string }[];
  notes: string;
  imageQuality: number;
  imageUrl?: string;
}
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  village: string;
  phone: string;
  diabetesYears: number;
  diabetesType: "Type 1" | "Type 2";
  bp: string;
  hbA1c: number;
  familyHistory: boolean;
  symptoms: string[];
  riskScore: number; // 0-100
  glucose: GlucoseReading[];
  visits: Visit[];
  lastScreened?: string;
  medication?: string[];
  footLastCheck?: string;
}

export interface Referral {
  id: string;
  patientId: string;
  date: string;
  stage: DRStage;
  status: "pending" | "confirmed" | "completed";
  doctor?: string;
  via: "eSanjeevani" | "Direct";
}

export interface PharmacyOrder {
  id: string;
  patientId: string;
  patientName: string;
  prescription: string;
  status: "pending" | "verified" | "dispatched" | "delivered";
  pharmacist?: string;
  date: string;
}
