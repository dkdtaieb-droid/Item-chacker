import { FoodProduct, NutriGrade, UserProfile } from '../types';
import { calculateNutritionVerdict } from './nutritionEngine';

export interface SampleProductRef {
  barcode: string;
  name: string;
  category: string;
  brand: string;
  highlight: string;
}

export const SAMPLE_PRODUCTS: SampleProductRef[] = [
  {
    barcode: '8901058852394',
    name: 'Maggi 2-Minute Masala Noodles',
    category: 'Instant Noodles',
    brand: 'Nestle',
    highlight: 'High Sodium & Palm Oil (High BP Warning)',
  },
  {
    barcode: '8901491101837',
    name: "Lay's Classic Salted Potato Chips",
    category: 'Chips & Crisps',
    brand: 'Frito-Lay',
    highlight: 'High Saturated Fat & Sodium',
  },
  {
    barcode: '5449000000996',
    name: 'Coca-Cola Original 330ml',
    category: 'Carbonated Drink',
    brand: 'The Coca-Cola Company',
    highlight: 'High Sugar & Caffeine (Diabetes Alert)',
  },
  {
    barcode: '8901262010047',
    name: 'Amul Taaza Toned Fresh Milk',
    category: 'Dairy & Milk',
    brand: 'Amul',
    highlight: 'Growth Boost (High Calcium & Protein)',
  },
  {
    barcode: '8000500179860',
    name: 'Nutella Hazelnut Cocoa Spread',
    category: 'Chocolate Spreads',
    brand: 'Ferrero',
    highlight: 'Nut Allergen & 56% Added Sugar',
  },
  {
    barcode: '8901063018235',
    name: 'Parle-G Original Gluco Biscuits',
    category: 'Biscuits & Cookies',
    brand: 'Parle',
    highlight: 'Gluten & Refined Sugar Base',
  },
  {
    barcode: '8901491001235',
    name: 'Quaker 100% Whole Grain Rolled Oats',
    category: 'Breakfast Cereals',
    brand: 'Quaker',
    highlight: 'Nutri-Score A (High Fiber & Beta-Glucan)',
  },
  {
    barcode: '8906070432190',
    name: 'Epigamia Natural Greek Yogurt (High Protein)',
    category: 'Yogurt & Fermented Milk',
    brand: 'Epigamia',
    highlight: 'Nutri-Score A (Zero Sugar & Active Probiotics)',
  },
  {
    barcode: '8901764032110',
    name: 'Sting Energy Drink Berry Blast',
    category: 'Energy Drinks',
    brand: 'PepsiCo',
    highlight: 'Extreme Caffeine + High Sugar (Under 18 Alert)',
  },
];

// Fallback comprehensive offline mock dictionary for instant response & offline resilience
const CURATED_DB: Record<string, Partial<FoodProduct>> = {
  '8901058852394': {
    barcode: '8901058852394',
    product_name: 'Maggi 2-Minute Masala Noodles',
    brands: 'Nestle',
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80',
    categories: 'Plant-based foods, Cereals and potatoes, Instant noodles',
    quantity: '70 g',
    serving_size: '70 g (1 pack)',
    nutriscore_grade: 'd',
    nova_group: 4,
    nutriments: {
      energy_kcal_100g: 427,
      energy_kcal_serving: 299,
      proteins_100g: 8.0,
      proteins_serving: 5.6,
      carbohydrates_100g: 63.5,
      carbohydrates_serving: 44.5,
      sugars_100g: 2.2,
      sugars_serving: 1.5,
      fat_100g: 15.7,
      fat_serving: 11.0,
      saturated_fat_100g: 6.8,
      saturated_fat_serving: 4.8,
      trans_fat_100g: 0.12,
      fiber_100g: 3.6,
      sodium_100g: 1140, // 1140mg sodium!
      salt_100g: 2.85,
      calcium_100g: 0.08,
    },
    ingredients_text:
      'Wheat Flour (Maida), Palm Oil, Salt, Wheat Gluten, Mineral (Calcium Carbonate), Thickener (508). Tastemaker: Hydrolysed Peanut Protein, Mixed Spices (Onion Powder, Coriander, Chili, Turmeric, Cumin, Aniseed, Fenugreek, Ginger, Black Pepper, Clove, Nutmeg, Cardamom), Noodle Powder, Sugar, Edible Starch, Flavor Enhancers (635), Acidity Regulators (330, 500ii).',
    allergens_tags: ['en:gluten', 'en:wheat', 'en:peanuts'],
    additives_count: 5,
    manufacturing_date: '2026-06-15',
    expiry_date: '2027-03-15',
  },
  '8901491101837': {
    barcode: '8901491101837',
    product_name: "Lay's Classic Salted Potato Chips",
    brands: 'Frito-Lay / PepsiCo',
    image_url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80',
    categories: 'Snacks, Salty snacks, Appetizers, Crisps, Potato crisps',
    quantity: '52 g',
    serving_size: '30 g',
    nutriscore_grade: 'd',
    nova_group: 4,
    nutriments: {
      energy_kcal_100g: 544,
      energy_kcal_serving: 163,
      proteins_100g: 6.9,
      proteins_serving: 2.1,
      carbohydrates_100g: 53.2,
      carbohydrates_serving: 16.0,
      sugars_100g: 1.1,
      sugars_serving: 0.3,
      fat_100g: 33.8,
      fat_serving: 10.1,
      saturated_fat_100g: 14.2,
      saturated_fat_serving: 4.3,
      trans_fat_100g: 0.1,
      fiber_100g: 4.1,
      sodium_100g: 680,
      salt_100g: 1.7,
    },
    ingredients_text: 'Selected Potatoes, Edible Vegetable Oil (Palmolein), Salt (1.9%).',
    allergens_tags: [],
    additives_count: 1,
    manufacturing_date: '2026-07-10',
    expiry_date: '2026-11-10',
  },
  '5449000000996': {
    barcode: '5449000000996',
    product_name: 'Coca-Cola Original Taste',
    brands: 'The Coca-Cola Company',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80',
    categories: 'Beverages, Carbonated drinks, Sodas, Colas, Sweetened beverages',
    quantity: '330 ml',
    serving_size: '330 ml (1 can)',
    nutriscore_grade: 'e',
    nova_group: 4,
    nutriments: {
      energy_kcal_100g: 42,
      energy_kcal_serving: 139,
      proteins_100g: 0.0,
      proteins_serving: 0.0,
      carbohydrates_100g: 10.6,
      carbohydrates_serving: 35.0,
      sugars_100g: 10.6,
      sugars_serving: 35.0, // 35g sugar in 1 can!
      fat_100g: 0.0,
      fat_serving: 0.0,
      saturated_fat_100g: 0.0,
      sodium_100g: 10,
      salt_100g: 0.02,
      caffeine_serving: 32, // 32mg caffeine
    },
    ingredients_text:
      'Carbonated Water, Sugar, Acidity Regulator (338), Caramel Color (150d), Natural Flavors, Caffeine (32mg).',
    allergens_tags: [],
    additives_count: 3,
    manufacturing_date: '2026-08-01',
    expiry_date: '2027-02-01',
  },
  '8901262010047': {
    barcode: '8901262010047',
    product_name: 'Amul Taaza Homogenised Toned Milk',
    brands: 'Amul',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80',
    categories: 'Dairies, Milks, Homogenized milks, Toned milks',
    quantity: '500 ml',
    serving_size: '200 ml',
    nutriscore_grade: 'a',
    nova_group: 1,
    nutriments: {
      energy_kcal_100g: 58,
      energy_kcal_serving: 116,
      proteins_100g: 3.1,
      proteins_serving: 6.2,
      carbohydrates_100g: 4.7,
      carbohydrates_serving: 9.4,
      sugars_100g: 4.7, // lactose
      sugars_serving: 9.4,
      fat_100g: 3.0,
      fat_serving: 6.0,
      saturated_fat_100g: 1.8,
      saturated_fat_serving: 3.6,
      calcium_100g: 0.12, // 120mg calcium
      sodium_100g: 50,
      salt_100g: 0.12,
    },
    ingredients_text: 'Pasteurized Toned Cow and Buffalo Milk, Vitamin A, Vitamin D2.',
    allergens_tags: ['en:milk', 'en:lactose'],
    additives_count: 0,
    manufacturing_date: '2026-09-10',
    expiry_date: '2026-09-17',
  },
  '8000500179860': {
    barcode: '8000500179860',
    product_name: 'Nutella Hazelnut Spread with Cocoa',
    brands: 'Ferrero',
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80',
    categories: 'Spreads, Sweet spreads, Hazelnut spreads, Cocoa hazelnut spreads',
    quantity: '350 g',
    serving_size: '15 g (1 tbsp)',
    nutriscore_grade: 'e',
    nova_group: 4,
    nutriments: {
      energy_kcal_100g: 539,
      energy_kcal_serving: 81,
      proteins_100g: 6.3,
      proteins_serving: 0.9,
      carbohydrates_100g: 57.5,
      carbohydrates_serving: 8.6,
      sugars_100g: 56.3, // 56% sugar!
      sugars_serving: 8.4,
      fat_100g: 30.9,
      fat_serving: 4.6,
      saturated_fat_100g: 10.6,
      saturated_fat_serving: 1.6,
      sodium_100g: 42,
      salt_100g: 0.1,
    },
    ingredients_text:
      'Sugar, Palm Oil, Hazelnuts (13%), Skimmed Milk Powder (8.7%), Fat-Reduced Cocoa (7.4%), Emulsifier: Lecithins (Soya), Vanillin.',
    allergens_tags: ['en:nuts', 'en:hazelnuts', 'en:milk', 'en:soybeans'],
    additives_count: 2,
    manufacturing_date: '2026-05-12',
    expiry_date: '2027-05-12',
  },
  '8901063018235': {
    barcode: '8901063018235',
    product_name: 'Parle-G Original Gluco Biscuits',
    brands: 'Parle',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=80',
    categories: 'Snacks, Sweet snacks, Biscuits and cakes, Biscuits',
    quantity: '130 g',
    serving_size: '25 g',
    nutriscore_grade: 'd',
    nova_group: 4,
    nutriments: {
      energy_kcal_100g: 454,
      energy_kcal_serving: 114,
      proteins_100g: 6.5,
      proteins_serving: 1.6,
      carbohydrates_100g: 78.2,
      carbohydrates_serving: 19.5,
      sugars_100g: 26.5, // 26.5g sugar
      sugars_serving: 6.6,
      fat_100g: 12.5,
      fat_serving: 3.1,
      saturated_fat_100g: 5.8,
      saturated_fat_serving: 1.5,
      fiber_100g: 1.8,
      sodium_100g: 280,
      salt_100g: 0.7,
    },
    ingredients_text:
      'Wheat Flour (67%), Sugar (26%), Edible Vegetable Oil (Palm Oil), Invert Sugar Syrup, Raising Agents [503(ii), 500(ii)], Milk Solids, Salt, Emulsifiers [471, 481(i)], Dough Conditioner [223].',
    allergens_tags: ['en:gluten', 'en:wheat', 'en:milk'],
    additives_count: 5,
    manufacturing_date: '2026-07-20',
    expiry_date: '2027-01-20',
  },
  '8901491001235': {
    barcode: '8901491001235',
    product_name: 'Quaker 100% Whole Grain Rolled Oats',
    brands: 'Quaker / PepsiCo',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&auto=format&fit=crop&q=80',
    categories: 'Plant-based foods, Cereals and potatoes, Cereals and their products, Rolled oats',
    quantity: '1000 g',
    serving_size: '40 g',
    nutriscore_grade: 'a',
    nova_group: 1,
    nutriments: {
      energy_kcal_100g: 389,
      energy_kcal_serving: 155,
      proteins_100g: 11.8,
      proteins_serving: 4.7,
      carbohydrates_100g: 66.3,
      carbohydrates_serving: 26.5,
      sugars_100g: 0.9, // Almost 0 sugar
      sugars_serving: 0.3,
      fat_100g: 6.9,
      fat_serving: 2.7,
      saturated_fat_100g: 1.2,
      saturated_fat_serving: 0.5,
      fiber_100g: 10.6, // Rich beta-glucan fiber!
      sodium_100g: 5,
      salt_100g: 0.01,
      iron_100g: 0.004,
    },
    ingredients_text: '100% Pure Rolled Oats (Whole Grain).',
    allergens_tags: ['en:gluten'],
    additives_count: 0,
    manufacturing_date: '2026-08-10',
    expiry_date: '2027-08-10',
  },
  '8906070432190': {
    barcode: '8906070432190',
    product_name: 'Epigamia Natural Greek Yogurt',
    brands: 'Epigamia (Drums Food)',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80',
    categories: 'Dairies, Fermented foods, Fermented milk products, Yogurts, Greek yogurts',
    quantity: '90 g',
    serving_size: '90 g (1 cup)',
    nutriscore_grade: 'a',
    nova_group: 1,
    nutriments: {
      energy_kcal_100g: 80,
      energy_kcal_serving: 72,
      proteins_100g: 7.5,
      proteins_serving: 6.8,
      carbohydrates_100g: 5.0,
      carbohydrates_serving: 4.5,
      sugars_100g: 3.5,
      sugars_serving: 3.1,
      fat_100g: 3.3,
      fat_serving: 3.0,
      saturated_fat_100g: 2.1,
      saturated_fat_serving: 1.9,
      fiber_100g: 0.0,
      sodium_100g: 45,
      salt_100g: 0.1,
      calcium_100g: 0.14, // High calcium
    },
    ingredients_text: 'Pasteurized Double Toned Milk, Milk Solids, Active Live Yogurt Cultures (Streptococcus thermophilus, Lactobacillus bulgaricus).',
    allergens_tags: ['en:milk', 'en:lactose'],
    additives_count: 0,
    manufacturing_date: '2026-09-08',
    expiry_date: '2026-09-28',
  },
  '8901764032110': {
    barcode: '8901764032110',
    product_name: 'Sting Energy Drink Berry Blast',
    brands: 'PepsiCo',
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80',
    categories: 'Beverages, Energy drinks, Carbonated soft drinks',
    quantity: '250 ml',
    serving_size: '250 ml',
    nutriscore_grade: 'e',
    nova_group: 4,
    nutriments: {
      energy_kcal_100g: 48,
      energy_kcal_serving: 120,
      proteins_100g: 0.0,
      proteins_serving: 0.0,
      carbohydrates_100g: 11.8,
      carbohydrates_serving: 29.5,
      sugars_100g: 11.5, // 29g sugar in 250ml
      sugars_serving: 28.7,
      fat_100g: 0.0,
      fat_serving: 0.0,
      sodium_100g: 82,
      salt_100g: 0.2,
      caffeine_serving: 72, // 72mg caffeine!
    },
    ingredients_text:
      'Carbonated Water, Sugar, Acidity Regulators (330, 331), Taurine (200mg), Caffeine (72mg), Inositol (10mg), Preservatives (211, 202), Color (Allura Red AC 129), Flavoring Substances.',
    allergens_tags: [],
    additives_count: 6,
    manufacturing_date: '2026-06-01',
    expiry_date: '2027-06-01',
  },
};

/**
 * Fetch product data from Open Food Facts API with fallback to built-in database
 */
export async function fetchProductFromOpenFoodFacts(
  barcode: string,
  userProfile: UserProfile
): Promise<FoodProduct | null> {
  const cleanBarcode = barcode.trim().replace(/\s+/g, '');

  // Check if we have curated data first for high accuracy & instant demo
  const localProduct = CURATED_DB[cleanBarcode];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${cleanBarcode}.json`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'FoodCheck - Web - Version 1.0 - fact8448702758@gmail.com',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === 1 && data.product) {
        const p = data.product;
        const nutriments = p.nutriments || {};

        const mfgDate = p.manufacturing_places || (localProduct ? localProduct.manufacturing_date : '2026-05-10');
        const expDate = p.expiration_date || (localProduct ? localProduct.expiry_date : '2027-01-20');

        const rawProduct: Partial<FoodProduct> = {
          barcode: cleanBarcode,
          product_name: p.product_name || p.product_name_en || localProduct?.product_name || `Product ${cleanBarcode}`,
          brands: p.brands || localProduct?.brands || 'Generic',
          image_url: p.image_front_url || p.image_url || localProduct?.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
          categories: p.categories || localProduct?.categories || '',
          quantity: p.quantity || localProduct?.quantity || 'Standard pack',
          serving_size: p.serving_size || localProduct?.serving_size || '1 serving',
          nutriscore_grade: (p.nutriscore_grade || localProduct?.nutriscore_grade || 'c') as NutriGrade,
          nova_group: p.nova_group ?? localProduct?.nova_group ?? 3,
          nutriments: {
            energy_kcal_100g: nutriments['energy-kcal_100g'] ?? nutriments.energy_100g ? Math.round((nutriments.energy_100g || 0) / 4.184) : localProduct?.nutriments?.energy_kcal_100g ?? 120,
            energy_kcal_serving: nutriments['energy-kcal_serving'] ?? localProduct?.nutriments?.energy_kcal_serving,
            proteins_100g: nutriments.proteins_100g ?? localProduct?.nutriments?.proteins_100g ?? 2,
            proteins_serving: nutriments.proteins_serving ?? localProduct?.nutriments?.proteins_serving,
            carbohydrates_100g: nutriments.carbohydrates_100g ?? localProduct?.nutriments?.carbohydrates_100g ?? 15,
            carbohydrates_serving: nutriments.carbohydrates_serving ?? localProduct?.nutriments?.carbohydrates_serving,
            sugars_100g: nutriments.sugars_100g ?? localProduct?.nutriments?.sugars_100g ?? 3,
            sugars_serving: nutriments.sugars_serving ?? localProduct?.nutriments?.sugars_serving,
            fat_100g: nutriments.fat_100g ?? localProduct?.nutriments?.fat_100g ?? 3,
            fat_serving: nutriments.fat_serving ?? localProduct?.nutriments?.fat_serving,
            saturated_fat_100g: nutriments['saturated-fat_100g'] ?? localProduct?.nutriments?.saturated_fat_100g ?? 1,
            saturated_fat_serving: nutriments['saturated-fat_serving'] ?? localProduct?.nutriments?.saturated_fat_serving,
            trans_fat_100g: nutriments['trans-fat_100g'] ?? localProduct?.nutriments?.trans_fat_100g ?? 0,
            fiber_100g: nutriments.fiber_100g ?? localProduct?.nutriments?.fiber_100g ?? 1,
            sodium_100g: nutriments.sodium_100g ?? localProduct?.nutriments?.sodium_100g ?? 150,
            salt_100g: nutriments.salt_100g ?? localProduct?.nutriments?.salt_100g ?? 0.35,
            calcium_100g: nutriments.calcium_100g ?? localProduct?.nutriments?.calcium_100g,
            caffeine_serving: nutriments.caffeine_serving ?? localProduct?.nutriments?.caffeine_serving,
          },
          ingredients_text: p.ingredients_text || p.ingredients_text_en || localProduct?.ingredients_text || '',
          allergens_tags: p.allergens_tags || localProduct?.allergens_tags || [],
          additives_count: p.additives_n ?? localProduct?.additives_count ?? 1,
          manufacturing_date: mfgDate,
          expiry_date: expDate,
        };

        const verdict = calculateNutritionVerdict(rawProduct, userProfile);

        return {
          ...(rawProduct as any),
          healthScoreNumber: verdict.healthScoreNumber,
          nutriscore_grade: verdict.nutriscoreGrade,
          calories_serving: rawProduct.nutriments?.energy_kcal_serving || (rawProduct.nutriments?.energy_kcal_100g ? Math.round(rawProduct.nutriments.energy_kcal_100g * 0.4) : 150),
          calories_100g: rawProduct.nutriments?.energy_kcal_100g || 200,
          goodItems: verdict.goodItems,
          badItems: verdict.badItems,
          isHealthy: verdict.isHealthy,
          personalizedWarnings: verdict.personalizedWarnings,
          growthHighlights: verdict.growthHighlights,
          generalAdvice: verdict.generalAdvice,
          healthierAlternatives: verdict.healthierAlternatives,
        };
      }
    }
  } catch (err) {
    console.warn('Open Food Facts API direct fetch error, using local database:', err);
  }

  // If live API returned nothing or errored, fallback to local curated product if matched
  if (localProduct) {
    const verdict = calculateNutritionVerdict(localProduct, userProfile);
    return {
      ...(localProduct as any),
      healthScoreNumber: verdict.healthScoreNumber,
      nutriscore_grade: verdict.nutriscoreGrade,
      calories_serving: localProduct.nutriments?.energy_kcal_serving || (localProduct.nutriments?.energy_kcal_100g ? Math.round(localProduct.nutriments.energy_kcal_100g * 0.5) : 150),
      calories_100g: localProduct.nutriments?.energy_kcal_100g || 200,
      goodItems: verdict.goodItems,
      badItems: verdict.badItems,
      isHealthy: verdict.isHealthy,
      personalizedWarnings: verdict.personalizedWarnings,
      growthHighlights: verdict.growthHighlights,
      generalAdvice: verdict.generalAdvice,
      healthierAlternatives: verdict.healthierAlternatives,
    };
  }

  // Return a synthesized fallback food item with reasonable defaults if unknown barcode
  const synthetic: Partial<FoodProduct> = {
    barcode: cleanBarcode,
    product_name: `Packaged Food #${cleanBarcode.slice(-4)}`,
    brands: 'Packaged Goods',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
    categories: 'Snacks & Packaged Foods',
    quantity: '100 g',
    serving_size: '30 g',
    nutriscore_grade: 'c',
    nova_group: 3,
    nutriments: {
      energy_kcal_100g: 340,
      energy_kcal_serving: 102,
      proteins_100g: 4.2,
      carbohydrates_100g: 52.0,
      sugars_100g: 8.5,
      fat_100g: 12.0,
      saturated_fat_100g: 3.5,
      fiber_100g: 2.1,
      sodium_100g: 380,
      salt_100g: 0.95,
    },
    ingredients_text: 'Wheat Flour, Vegetable Fat, Sugar, Edible Salt, Raising Agent (500ii), Permitted Food Flavors.',
    allergens_tags: ['en:gluten'],
    additives_count: 2,
    manufacturing_date: '2026-07-01',
    expiry_date: '2027-01-01',
  };

  const verdict = calculateNutritionVerdict(synthetic, userProfile);
  return {
    ...(synthetic as any),
    healthScoreNumber: verdict.healthScoreNumber,
    nutriscore_grade: verdict.nutriscoreGrade,
    calories_serving: 102,
    calories_100g: 340,
    goodItems: verdict.goodItems,
    badItems: verdict.badItems,
    isHealthy: verdict.isHealthy,
    personalizedWarnings: verdict.personalizedWarnings,
    growthHighlights: verdict.growthHighlights,
    generalAdvice: verdict.generalAdvice,
    healthierAlternatives: verdict.healthierAlternatives,
  };
}

/**
 * Search products by keyword from Open Food Facts API or curated list
 */
export async function searchProductsByName(
  query: string,
  userProfile: UserProfile
): Promise<FoodProduct[]> {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  // Match curated database first for instant results
  const matchedBarcodes = Object.keys(CURATED_DB).filter(b => {
    const p = CURATED_DB[b];
    return (
      (p.product_name && p.product_name.toLowerCase().includes(clean)) ||
      (p.brands && p.brands.toLowerCase().includes(clean)) ||
      (p.categories && p.categories.toLowerCase().includes(clean))
    );
  });

  const localResults: FoodProduct[] = [];
  for (const b of matchedBarcodes) {
    const prod = await fetchProductFromOpenFoodFacts(b, userProfile);
    if (prod) localResults.push(prod);
  }

  // Also query Open Food Facts Search API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        clean
      )}&search_simple=1&action=process&json=1&page_size=8`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent': 'FoodCheck - Web - Version 1.0 - fact8448702758@gmail.com',
        },
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.products && Array.isArray(data.products)) {
        for (const item of data.products.slice(0, 6)) {
          const barcode = item.code || item.id;
          if (barcode && !localResults.some(r => r.barcode === barcode)) {
            const parsed = await fetchProductFromOpenFoodFacts(barcode, userProfile);
            if (parsed) localResults.push(parsed);
          }
        }
      }
    }
  } catch (err) {
    console.warn('Search API error, returning local matches:', err);
  }

  return localResults;
}
