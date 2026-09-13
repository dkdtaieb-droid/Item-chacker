export type Gender = 'Male' | 'Female' | 'Other';

export type HealthConditionKey =
  | 'diabetes'
  | 'high_bp'
  | 'low_bp'
  | 'thyroid'
  | 'obesity'
  | 'heart_problem'
  | 'kidney_issue'
  | 'nut_allergy'
  | 'gluten_allergy'
  | 'lactose_intolerance'
  | 'none'
  | 'other';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  conditions: HealthConditionKey[];
  customCondition?: string;
  isCompleted: boolean;
  createdAt: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'bn' | 'ta' | 'te' | 'gu' | 'kn';

export interface SubscriptionState {
  isPremium: boolean;
  dailyScansRemaining: number;
  maxDailyScans: number;
  lastResetDate: string; // YYYY-MM-DD
  plan: 'free' | 'monthly' | 'yearly';
  trialEndDate?: string;
}

export type NutriGrade = 'a' | 'b' | 'c' | 'd' | 'e';

export interface NutriItem {
  id: string;
  title: string;
  amount: string;
  reason: string;
  iconName?: string;
}

export interface FoodProduct {
  barcode: string;
  product_name: string;
  brands?: string;
  image_url?: string;
  categories?: string;
  quantity?: string;
  serving_size?: string;
  nutriscore_grade?: NutriGrade;
  healthScoreNumber: number; // 1 - 10
  calories_serving?: number;
  calories_100g?: number;
  nutriments: {
    energy_kcal_100g?: number;
    energy_kcal_serving?: number;
    proteins_100g?: number;
    proteins_serving?: number;
    carbohydrates_100g?: number;
    carbohydrates_serving?: number;
    sugars_100g?: number;
    sugars_serving?: number;
    fat_100g?: number;
    fat_serving?: number;
    saturated_fat_100g?: number;
    saturated_fat_serving?: number;
    trans_fat_100g?: number;
    fiber_100g?: number;
    sodium_100g?: number; // in g or mg
    salt_100g?: number;
    calcium_100g?: number;
    iron_100g?: number;
    vitamin_c_100g?: number;
    caffeine_serving?: number;
  };
  ingredients_text?: string;
  allergens_tags?: string[];
  additives_count?: number;
  nova_group?: number; // 1 (unprocessed) to 4 (ultra-processed)
  manufacturing_date?: string;
  expiry_date?: string;
  goodItems: NutriItem[];
  badItems: NutriItem[];
  isHealthy: boolean;
  personalizedWarnings: PersonalizedWarning[];
  growthHighlights: string[];
  generalAdvice: string[];
  healthierAlternatives: AlternativeProduct[];
}

export interface PersonalizedWarning {
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  conditionMatched: string;
}

export interface MedicinePrecaution {
  status: 'safe' | 'caution' | 'unsafe';
  text: {
    en: string;
    hi: string;
  };
}

export interface MedicineProduct {
  barcode: string;
  name: string;
  brand: string;
  manufacturer: string;
  saltComposition: string;
  category: string;
  form: 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Ointment' | 'Drops';
  image_url?: string;
  scheduleCategory: 'Schedule H (Prescription)' | 'Schedule H1' | 'Schedule H1 (Prescription Required)' | 'OTC (Over-The-Counter)' | string;
  safetyLevel: 'safe' | 'caution' | 'prescription_required';
  uses: {
    en: string[];
    hi: string[];
  };
  howToTake: {
    en: string;
    hi: string;
  };
  timing: {
    en: string;
    hi: string;
  };
  sideEffects: {
    en: string[];
    hi: string[];
  };
  precautions: {
    alcohol: MedicinePrecaution;
    pregnancy: MedicinePrecaution;
    driving: MedicinePrecaution;
    kidney: MedicinePrecaution;
    liver: MedicinePrecaution;
  };
  personalizedWarnings: {
    severity: 'critical' | 'warning' | 'info';
    conditionMatched: string;
    title: { en: string; hi: string };
    message: { en: string; hi: string };
  }[];
  genericAlternative: {
    name: string;
    salt: string;
    brandedPrice: string;
    genericPrice: string;
    savingsPercent: string;
    description: { en: string; hi: string };
  };
  mfgDate?: string;
  expDate?: string;
}

export interface AlternativeProduct {
  id: string;
  name: string;
  brand: string;
  image_url: string;
  healthScore: number;
  nutriscore_grade: NutriGrade;
  reasonWhyBetter: string;
}

export interface ScannedRecord {
  id: string;
  scannedAt: string;
  itemType?: 'food' | 'medicine';
  productType?: 'food' | 'medicine';
  product?: FoodProduct;
  foodProduct?: FoodProduct;
  medicineProduct?: MedicineProduct;
  healthVerdict: 'healthy' | 'moderate' | 'unhealthy' | 'safe' | 'caution' | 'critical' | 'prescription' | 'otc';
}
