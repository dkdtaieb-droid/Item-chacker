import { AlternativeProduct, FoodProduct, NutriGrade, NutriItem, PersonalizedWarning, UserProfile } from '../types';

export const ALTERNATIVE_CATALOG: Record<string, AlternativeProduct[]> = {
  soda: [
    {
      id: 'alt_tender_coconut',
      name: 'Natural Tender Coconut Water',
      brand: 'Raw Nature / Local',
      image_url: 'https://images.unsplash.com/photo-1544253106-a97920dc73a9?w=300&auto=format&fit=crop&q=80',
      healthScore: 9.2,
      nutriscore_grade: 'a',
      reasonWhyBetter: '0g added sugar, naturally packed with potassium, magnesium & natural electrolytes.',
    },
    {
      id: 'alt_sparkling_lime',
      name: 'Sparkling Lemon Mint Infusion',
      brand: 'Botanical / Homemade',
      image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&auto=format&fit=crop&q=80',
      healthScore: 8.8,
      nutriscore_grade: 'a',
      reasonWhyBetter: 'Crisp fizz without artificial sweeteners, zero high fructose corn syrup or caffeine.',
    },
  ],
  chips: [
    {
      id: 'alt_makhana',
      name: 'Roasted Himalayan Salted Foxnuts (Makhana)',
      brand: 'Farm Fresh',
      image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&auto=format&fit=crop&q=80',
      healthScore: 9.0,
      nutriscore_grade: 'a',
      reasonWhyBetter: 'Slow-roasted, not fried! High in plant protein and antioxidant flavonoids, 70% less fat.',
    },
    {
      id: 'alt_baked_multigrain',
      name: 'Air-Popped Multigrain Crisps',
      brand: 'HealthyBites',
      image_url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80',
      healthScore: 8.2,
      nutriscore_grade: 'b',
      reasonWhyBetter: 'Whole grain oats and quinoa base, baked with heart-friendly olive oil.',
    },
  ],
  instant_noodles: [
    {
      id: 'alt_millet_noodles',
      name: 'Sun-Dried Foxtail Millet Noodles',
      brand: 'Native Grains',
      image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&auto=format&fit=crop&q=80',
      healthScore: 8.5,
      nutriscore_grade: 'b',
      reasonWhyBetter: '100% Maida-free, not flash-fried in palm oil, packed with low-GI complex carbs and fiber.',
    },
  ],
  biscuits: [
    {
      id: 'alt_oat_seed_cookies',
      name: '100% Whole Rolled Oats & Chia Cookies',
      brand: 'GoodGrains',
      image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&auto=format&fit=crop&q=80',
      healthScore: 8.7,
      nutriscore_grade: 'a',
      reasonWhyBetter: 'Sweetened lightly with raw dates, zero invert syrup, and 5g fiber per serving.',
    },
  ],
  chocolate_spread: [
    {
      id: 'alt_peanut_butter',
      name: '100% Roasted Crunchy Peanut Butter (Unsweetened)',
      brand: 'PureNut',
      image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=300&auto=format&fit=crop&q=80',
      healthScore: 8.9,
      nutriscore_grade: 'a',
      reasonWhyBetter: 'Single ingredient (100% roasted peanuts), zero palm oil, 30g pure plant protein.',
    },
  ],
  general: [
    {
      id: 'alt_greek_yogurt',
      name: 'Natural Greek Yogurt with Berries',
      brand: 'Dairy Pure',
      image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&auto=format&fit=crop&q=80',
      healthScore: 9.4,
      nutriscore_grade: 'a',
      reasonWhyBetter: 'Probiotic-rich, high biological value protein, supports gut microbiome and bone density.',
    },
  ],
};

export function calculateNutritionVerdict(
  productData: Partial<FoodProduct>,
  userProfile: UserProfile
): {
  healthScoreNumber: number;
  nutriscoreGrade: NutriGrade;
  goodItems: NutriItem[];
  badItems: NutriItem[];
  isHealthy: boolean;
  personalizedWarnings: PersonalizedWarning[];
  growthHighlights: string[];
  generalAdvice: string[];
  healthierAlternatives: AlternativeProduct[];
} {
  const nutriments = productData.nutriments || {};
  const sugars100g = nutriments.sugars_100g ?? 0;
  const energyKcal100g = nutriments.energy_kcal_100g ?? (nutriments.energy_kcal_serving ? nutriments.energy_kcal_serving : 0);
  const salt100g = nutriments.salt_100g ?? (nutriments.sodium_100g ? (nutriments.sodium_100g > 10 ? nutriments.sodium_100g / 400 : nutriments.sodium_100g * 2.5) : 0);
  const sodiumMg100g = (nutriments.sodium_100g && nutriments.sodium_100g > 10) ? nutriments.sodium_100g : (salt100g * 400);
  const satFat100g = nutriments.saturated_fat_100g ?? 0;
  const transFat100g = nutriments.trans_fat_100g ?? 0;
  const proteins100g = nutriments.proteins_100g ?? 0;
  const fiber100g = nutriments.fiber_100g ?? 0;
  const calcium100g = nutriments.calcium_100g ?? 0;
  const caffeineServing = nutriments.caffeine_serving ?? 0;
  const novaGroup = productData.nova_group;
  const ingredients = (productData.ingredients_text || '').toLowerCase();
  const productName = (productData.product_name || '').toLowerCase();
  const categories = (productData.categories || '').toLowerCase();

  const goodItems: NutriItem[] = [];
  const badItems: NutriItem[] = [];
  const personalizedWarnings: PersonalizedWarning[] = [];
  const growthHighlights: string[] = [];
  const generalAdvice: string[] = [];

  // 1. Analyze GOOD components
  if (proteins100g >= 10) {
    goodItems.push({
      id: 'high_protein',
      title: 'High Protein',
      amount: `${proteins100g.toFixed(1)}g / 100g`,
      reason: 'Essential for muscle repair, cell maintenance, and sustained satiety.',
    });
  } else if (proteins100g >= 5) {
    goodItems.push({
      id: 'mod_protein',
      title: 'Decent Protein Content',
      amount: `${proteins100g.toFixed(1)}g / 100g`,
      reason: 'Contributes positively to daily protein targets.',
    });
  }

  if (fiber100g >= 4) {
    goodItems.push({
      id: 'high_fiber',
      title: 'Rich in Dietary Fiber',
      amount: `${fiber100g.toFixed(1)}g / 100g`,
      reason: 'Promotes healthy digestion, regular bowel movements, and stabilizes blood sugar.',
    });
  }

  if (sugars100g <= 4 && energyKcal100g > 15) {
    goodItems.push({
      id: 'low_sugar',
      title: 'Low in Added Sugar',
      amount: `${sugars100g.toFixed(1)}g / 100g`,
      reason: 'Minimal glycemic stress on insulin receptors, preventing energy crashes.',
    });
  }

  if (salt100g <= 0.3 && energyKcal100g > 15) {
    goodItems.push({
      id: 'low_sodium',
      title: 'Low Sodium / Salt',
      amount: `${sodiumMg100g.toFixed(0)}mg / 100g`,
      reason: 'Helps maintain relaxed vascular tone and optimal fluid balance.',
    });
  }

  if (satFat100g <= 1.5 && (nutriments.fat_100g ?? 0) > 0) {
    goodItems.push({
      id: 'low_sat_fat',
      title: 'Low Saturated Fat',
      amount: `${satFat100g.toFixed(1)}g / 100g`,
      reason: 'Supports optimal cardiovascular endothelial function and healthy lipid profile.',
    });
  }

  if (calcium100g > 0.08 || ingredients.includes('calcium') || categories.includes('milk') || categories.includes('yogurt')) {
    goodItems.push({
      id: 'calcium_rich',
      title: 'Source of Calcium & Minerals',
      amount: calcium100g > 0 ? `${(calcium100g * 1000).toFixed(0)}mg` : 'Natural source',
      reason: 'Vital for bone density, nerve signaling, and dental health.',
    });
  }

  if (novaGroup === 1 || novaGroup === 2) {
    goodItems.push({
      id: 'minimal_processing',
      title: 'Minimally Processed (NOVA 1-2)',
      amount: 'Whole Food Base',
      reason: 'Retains intact cellular matrix, bioavailable micronutrients, and clean clean ingredients.',
    });
  }

  // 2. Analyze BAD components
  if (sugars100g >= 18) {
    badItems.push({
      id: 'very_high_sugar',
      title: 'Excessive Added Sugar',
      amount: `${sugars100g.toFixed(1)}g / 100g`,
      reason: 'High fructose/sucrose overload triggers fatty liver accumulation, weight gain & dental caries.',
    });
  } else if (sugars100g >= 10) {
    badItems.push({
      id: 'high_sugar',
      title: 'Elevated Sugar Content',
      amount: `${sugars100g.toFixed(1)}g / 100g`,
      reason: 'Spikes blood glucose rapidly and can lead to mid-day fatigue.',
    });
  }

  if (sodiumMg100g >= 600 || salt100g >= 1.5) {
    badItems.push({
      id: 'high_sodium',
      title: 'Excess Sodium / Salt',
      amount: `${sodiumMg100g.toFixed(0)}mg / 100g`,
      reason: 'Causes fluid retention, increases arterial wall tension and stresses kidneys.',
    });
  }

  if (satFat100g >= 5) {
    badItems.push({
      id: 'high_sat_fat',
      title: 'High Saturated Fat',
      amount: `${satFat100g.toFixed(1)}g / 100g`,
      reason: 'Excessive intake elevates circulating ApoB and LDL-cholesterol.',
    });
  }

  if (transFat100g > 0.1 || ingredients.includes('partially hydrogenated') || ingredients.includes('vanaspati')) {
    badItems.push({
      id: 'trans_fat',
      title: 'Harmful Trans Fats Detected',
      amount: transFat100g > 0 ? `${transFat100g.toFixed(1)}g` : 'Hydrogenated oils',
      reason: 'Strongly linked to systemic vascular inflammation and coronary heart disease.',
    });
  }

  if (ingredients.includes('palm oil') || ingredients.includes('palmolein')) {
    badItems.push({
      id: 'palm_oil',
      title: 'Contains Refined Palm Oil / Palmolein',
      amount: 'Refined fat',
      reason: 'High in palmitic acid and repeated thermal oxidation during industrial frying.',
    });
  }

  if (
    caffeineServing > 30 ||
    ingredients.includes('caffeine') ||
    productName.includes('energy') ||
    productName.includes('monster') ||
    productName.includes('red bull') ||
    productName.includes('sting')
  ) {
    badItems.push({
      id: 'high_caffeine',
      title: 'High Caffeine & Stimulants',
      amount: caffeineServing > 0 ? `${caffeineServing}mg` : 'Stimulant load',
      reason: 'Can trigger tachycardia, insomnia, anxiety, and adrenal strain.',
    });
  }

  const preservativeMatches = [
    'e211', 'sodium benzoate',
    'e250', 'sodium nitrite',
    'e223', 'sodium metabisulfite',
    'bha', 'bht', 'tartrazine', 'caramel color iv',
    'e150d', 'aspartame', 'sucralose', 'acesulfame'
  ].filter(p => ingredients.includes(p));

  if (preservativeMatches.length > 0 || (productData.additives_count ?? 0) >= 3) {
    badItems.push({
      id: 'additives_preservatives',
      title: 'Industrial Additives & Preservatives',
      amount: `${productData.additives_count || preservativeMatches.length || 'Multiple'} additives`,
      reason: 'Synthetic chemical stabilizers that may disturb the gut lining and microbiome diversity.',
    });
  }

  if (novaGroup === 4) {
    badItems.push({
      id: 'ultra_processed',
      title: 'Ultra-Processed Food (NOVA 4)',
      amount: 'Industrial Formulation',
      reason: 'Engineered for hyper-palatability with extracted starches, emulsifiers, and flavors.',
    });
  }

  // 3. Compute Health Score (1 to 10 scale)
  let score = 7.0;
  if (productData.nutriscore_grade) {
    switch (productData.nutriscore_grade.toLowerCase()) {
      case 'a': score = 9.2; break;
      case 'b': score = 7.8; break;
      case 'c': score = 5.5; break;
      case 'd': score = 3.6; break;
      case 'e': score = 1.8; break;
    }
  } else {
    // Dynamic calculation
    score += (proteins100g * 0.25) + (fiber100g * 0.35);
    score -= (sugars100g * 0.18) + (satFat100g * 0.22) + (salt100g * 0.7);
    if (novaGroup === 4) score -= 1.5;
    if (novaGroup === 1) score += 1.5;
  }
  score = Math.max(1.0, Math.min(10.0, Math.round(score * 10) / 10));

  let nutriscoreGrade: NutriGrade = 'c';
  if (score >= 8.5) nutriscoreGrade = 'a';
  else if (score >= 6.8) nutriscoreGrade = 'b';
  else if (score >= 4.8) nutriscoreGrade = 'c';
  else if (score >= 2.8) nutriscoreGrade = 'd';
  else nutriscoreGrade = 'e';

  const isHealthy = score >= 6.0;

  // 4. PERSONALIZED RESULT LOGIC
  const conditions = userProfile.conditions || [];
  const age = userProfile.age || 25;

  // Age < 18 logic
  if (age < 18) {
    if (
      caffeineServing > 20 ||
      ingredients.includes('caffeine') ||
      badItems.some(i => i.id === 'high_caffeine') ||
      sugars100g >= 12
    ) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '⚠️ NOT SUITABLE FOR CHILDREN & TEENS (Under 18)',
        message:
          'Contains high caffeine or excess sugar. High caffeine interferes with neural development, calcium absorption, and restorative sleep cycles in growing bodies.',
        conditionMatched: 'Age < 18',
      });
    }

    if (proteins100g >= 6 || calcium100g > 0.05 || categories.includes('milk') || categories.includes('dairy')) {
      growthHighlights.push(
        '🌟 Growth & Bone Builder: High in protein and bioavailable calcium, directly supporting peak bone mass and muscle development during growth years.'
      );
    }
  }

  // Diabetes logic
  if (conditions.includes('diabetes')) {
    if (sugars100g >= 8 || badItems.some(i => i.id.includes('sugar'))) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '🚨 CRITICAL DIABETES WARNING: High Sugar Spike Risk',
        message: `This product packs ${sugars100g.toFixed(1)}g sugar per 100g. Consuming this causes severe blood glucose surges and forces pancreatic insulin exhaustion. Strongly avoid or limit strictly.`,
        conditionMatched: 'Diabetes',
      });
    } else if (fiber100g >= 4 && sugars100g < 5) {
      personalizedWarnings.push({
        severity: 'info',
        title: '✅ Diabetes-Friendly Glycemic Profile',
        message: 'Low in simple sugars and fortified with dietary fiber, which slows carbohydrate absorption and stabilizes postprandial glucose.',
        conditionMatched: 'Diabetes',
      });
    }
  }

  // High BP (Hypertension) logic
  if (conditions.includes('high_bp')) {
    if (sodiumMg100g >= 400 || salt100g >= 1.0) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '🚨 CRITICAL HIGH BP WARNING: Sodium / Salt Overload',
        message: `Contains ${sodiumMg100g.toFixed(0)}mg sodium (${salt100g.toFixed(2)}g salt). High sodium draws water into your bloodstream, directly spiking arterial pressure and increasing cardiovascular strain.`,
        conditionMatched: 'High BP',
      });
    } else if (sodiumMg100g < 140) {
      personalizedWarnings.push({
        severity: 'info',
        title: '✅ Heart-Safe Low Sodium',
        message: 'Low sodium content (<140mg per serving) supports healthy blood pressure targets without arterial strain.',
        conditionMatched: 'High BP',
      });
    }
  }

  // Low BP
  if (conditions.includes('low_bp')) {
    if (energyKcal100g < 30 && sodiumMg100g < 50) {
      personalizedWarnings.push({
        severity: 'warning',
        title: 'ℹ️ Low BP Reminder',
        message: 'Ensure adequate fluid and electrolyte intake throughout the day to prevent dizziness and orthostatic drops.',
        conditionMatched: 'Low BP',
      });
    }
  }

  // Heart Problem
  if (conditions.includes('heart_problem')) {
    if (transFat100g > 0 || satFat100g >= 4 || badItems.some(i => i.id === 'trans_fat' || i.id === 'palm_oil')) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '🚨 CARDIOVASCULAR RISK: High Saturated / Trans Fats',
        message: 'Contains atherogenic fats that contribute to arterial plaque accumulation and coronary artery constriction. Not recommended for heart conditions.',
        conditionMatched: 'Heart Problem',
      });
    }
  }

  // Kidney Issue
  if (conditions.includes('kidney_issue')) {
    if (sodiumMg100g > 350 || proteins100g > 18) {
      personalizedWarnings.push({
        severity: 'warning',
        title: '⚠️ RENAL STRAIN ADVISORY: High Sodium / Nitrogen Load',
        message: 'Elevated sodium or concentrated protein density puts elevated filtration strain on your glomeruli. Consult your nephrologist.',
        conditionMatched: 'Kidney Issue',
      });
    }
  }

  // Obesity
  if (conditions.includes('obesity')) {
    if (energyKcal100g >= 350 || sugars100g >= 15 || satFat100g >= 8) {
      personalizedWarnings.push({
        severity: 'warning',
        title: '⚠️ HIGH CALORIE DENSITY: Weight Management Warning',
        message: `High calorie density (${energyKcal100g.toFixed(0)} kcal/100g) combined with refined carbohydrates can easily exceed your daily caloric threshold.`,
        conditionMatched: 'Obesity',
      });
    }
  }

  // Thyroid
  if (conditions.includes('thyroid')) {
    if (ingredients.includes('soy') || ingredients.includes('soya')) {
      personalizedWarnings.push({
        severity: 'warning',
        title: '⚠️ THYROID CAUTION: Contains Soy Compounds',
        message: 'Contains soy isoflavones which may inhibit thyroid peroxidase and compete with levothyroxine absorption if eaten within 4 hours of medication.',
        conditionMatched: 'Thyroid',
      });
    }
  }

  // Allergen checks
  const allergensTags = (productData.allergens_tags || []).join(' ').toLowerCase();

  // Nut Allergy
  if (conditions.includes('nut_allergy')) {
    const nutTriggers = ['nut', 'peanut', 'almond', 'cashew', 'walnut', 'hazelnut', 'pistachio'];
    const matched = nutTriggers.some(n => ingredients.includes(n) || allergensTags.includes(n) || productName.includes(n));
    if (matched) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '🚨 SEVERE ALLERGEN ALERT: Contains Tree Nuts / Peanuts!',
        message: 'Immediate anaphylaxis danger! Nut particles or traces detected in product ingredients. DO NOT INGEST.',
        conditionMatched: 'Nut Allergy',
      });
    }
  }

  // Gluten Allergy / Celiac
  if (conditions.includes('gluten_allergy')) {
    const glutenTriggers = ['wheat', 'gluten', 'barley', 'rye', 'maida', 'atta', 'semolina', 'suji'];
    const matched = glutenTriggers.some(g => ingredients.includes(g) || allergensTags.includes(g) || categories.includes('biscuit') || categories.includes('noodle'));
    if (matched) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '🚨 GLUTEN HAZARD ALERT: Unsafe for Celiac & Gluten Sensitivity',
        message: 'Contains wheat or gluten grains. Ingestion triggers intestinal villi inflammation and immune reaction.',
        conditionMatched: 'Gluten Allergy',
      });
    }
  }

  // Lactose Intolerance
  if (conditions.includes('lactose_intolerance')) {
    const dairyTriggers = ['milk', 'dairy', 'whey', 'lactose', 'cheese', 'butter', 'cream', 'casein', 'paneer'];
    const matched = dairyTriggers.some(d => ingredients.includes(d) || allergensTags.includes(d) || categories.includes('milk') || categories.includes('dairy'));
    if (matched) {
      personalizedWarnings.push({
        severity: 'critical',
        title: '🚨 LACTOSE INTOLERANCE ALERT: Contains Dairy / Milk Derivatives',
        message: 'Contains lactose components. May trigger acute abdominal bloating, cramping, and gastrointestinal distress.',
        conditionMatched: 'Lactose Intolerance',
      });
    }
  }

  // Custom condition check
  if (userProfile.customCondition && userProfile.customCondition.trim()) {
    const custom = userProfile.customCondition.toLowerCase();
    if (ingredients.includes(custom) || productName.includes(custom)) {
      personalizedWarnings.push({
        severity: 'critical',
        title: `🚨 CUSTOM HEALTH CONCERN: Matched "${userProfile.customCondition}"`,
        message: `Your specified condition keyword was detected in the product profile. Review ingredient details carefully.`,
        conditionMatched: userProfile.customCondition,
      });
    }
  }

  // No condition / None selected
  if (conditions.length === 0 || conditions.includes('none')) {
    generalAdvice.push(
      'Eat a rainbow of unprocessed colorful plants, legumes, and whole grains.',
      'Hydrate with pure water instead of sweetened beverages.',
      'Check serving size carefully — packaged goods often mask high sugar by declaring small portion sizes.'
    );
  }

  // 5. Suggest Healthier Alternatives when unhealthy or warnings exist
  let healthierAlternatives: AlternativeProduct[] = [];
  if (!isHealthy || badItems.length >= 2 || personalizedWarnings.some(w => w.severity === 'critical')) {
    if (categories.includes('beverage') || categories.includes('soda') || productName.includes('cola') || productName.includes('drink')) {
      healthierAlternatives = ALTERNATIVE_CATALOG.soda;
    } else if (categories.includes('chip') || categories.includes('snack') || productName.includes('chip') || productName.includes('crisp')) {
      healthierAlternatives = ALTERNATIVE_CATALOG.chips;
    } else if (categories.includes('noodle') || productName.includes('noodle') || productName.includes('maggi')) {
      healthierAlternatives = ALTERNATIVE_CATALOG.instant_noodles;
    } else if (categories.includes('biscuit') || categories.includes('cookie') || productName.includes('biscuit') || productName.includes('parle')) {
      healthierAlternatives = ALTERNATIVE_CATALOG.biscuits;
    } else if (categories.includes('spread') || productName.includes('nutella') || productName.includes('chocolate')) {
      healthierAlternatives = ALTERNATIVE_CATALOG.chocolate_spread;
    } else {
      healthierAlternatives = ALTERNATIVE_CATALOG.general;
    }
  }

  return {
    healthScoreNumber: score,
    nutriscoreGrade,
    goodItems,
    badItems,
    isHealthy,
    personalizedWarnings,
    growthHighlights,
    generalAdvice,
    healthierAlternatives,
  };
}
