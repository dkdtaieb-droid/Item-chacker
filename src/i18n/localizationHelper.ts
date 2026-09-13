import { SupportedLanguage } from '../types';

export interface LocalizedDictionary {
  // Navigation & Core App
  appName: string;
  tagline: string;
  foodTab: string;
  medicineTab: string;
  activeHealthFilters: string;
  editProfile: string;
  healthyProfile: string;
  conditionsWatched: string;
  years: string;
  forUser: string;
  
  // Action Cards
  scanCardTitle: string;
  scanCardSubFood: string;
  scanCardSubMedicine: string;
  scanBadge: string;
  searchCardTitle: string;
  searchCardSubFood: string;
  searchCardSubMedicine: string;
  searchBadge: string;
  popularTestTitle: string;
  scrollHint: string;
  
  // Loading & States
  fetchingDataTitle: string;
  fetchingDataSub: string;
  noProductFound: string;
  
  // Scanner Modal & Torch
  cameraScannerTitle: string;
  cameraScannerSubFood: string;
  cameraScannerSubMedicine: string;
  pointCameraInstruction: string;
  startCameraBtn: string;
  stopCameraBtn: string;
  torchOnBtn: string;
  torchOffBtn: string;
  torchNotSupported: string;
  scanFromPhotoBtn: string;
  scanningPhotoWait: string;
  photoScanSuccess: string;
  photoScanFail: string;
  manualBarcodePlaceholder: string;
  checkBarcodeBtn: string;
  zoomLevel: string;
  testSamplesTitle: string;
  sampleMedicinesTab: string;
  sampleFoodTab: string;
  
  // Manual Search Modal
  searchFoodTitle: string;
  searchMedicineTitle: string;
  searchFoodSubtitle: string;
  searchMedicineSubtitle: string;
  searchPlaceholderFood: string;
  searchPlaceholderMedicine: string;
  searchBtn: string;
  searchResultsFood: string;
  searchResultsMedicine: string;
  noResultsFound: string;
  quickPickTitle: string;
  
  // Product Card (Food)
  gradePrefix: string;
  healthScoreTitle: string;
  caloriesPerServing: string;
  mfgExpDate: string;
  freshnessSafe: string;
  freshnessExpired: string;
  freshnessCheck: string;
  batchVerified: string;
  personalizedForYou: string;
  growthNotice: string;
  generalWellnessAdvice: string;
  whatIsGoodTitle: string;
  whatIsBadTitle: string;
  beneficialCountText: string;
  riskCountText: string;
  noBadItemsFound: string;
  noGoodItemsFound: string;
  nutritionalBreakdownTitle: string;
  healthierAlternativesTitle: string;
  whyBetterLabel: string;
  disclaimerFood: string;
  packagedBrand: string;
  
  // Medicine Card
  activeSaltTitle: string;
  categoryLabel: string;
  scheduleLabel: string;
  keyUsesTitle: string;
  approvedIndicationsCount: string;
  dosageHowToTakeTitle: string;
  dosageRuleSubtitle: string;
  methodOfIntakeLabel: string;
  timingAndLimitLabel: string;
  possibleSideEffectsTitle: string;
  sideEffectsSubtitle: string;
  safetyPrecautionsTitle: string;
  alcoholLabel: string;
  pregnancyLabel: string;
  drivingLabel: string;
  kidneyLiverLabel: string;
  statusSafe: string;
  statusCaution: string;
  statusAvoid: string;
  genericAlternativeTitle: string;
  genericAlternativeSub: string;
  janAushadhiBadge: string;
  savingsSuffix: string;
  disclaimerMedicine: string;
  safeOtcBadge: string;
  prescriptionBadge: string;
  highCautionBadge: string;
  safeOtcSub: string;
  prescriptionSub: string;
  highCautionSub: string;
  barcodePrefix: string;
  
  // History View
  historyTitle: string;
  historyFilterAll: string;
  historyFilterFood: string;
  historyFilterMedicine: string;
  clearHistoryBtn: string;
  clearHistoryConfirm: string;
  noHistoryYet: string;
  noHistorySub: string;
  historyCautionBadge: string;
  historyMedicineBadge: string;
  scoreText: string;
  
  // Bottom Navigation
  navProductInfo: string;
  navMedicineInfo: string;
  navHistory: string;
  navWeekly: string;
  navPro: string;
  proBadge: string;
  scansRemaining: string;
}

export const DICTIONARIES: Record<SupportedLanguage, LocalizedDictionary> = {
  hi: {
    // Navigation & Core App
    appName: 'फूडचेक',
    tagline: 'खाने या दवा लेने से पहले जानें — क्या यह आपकी सेहत के लिए सुरक्षित है?',
    foodTab: 'खाद्य व पेय पदार्थ',
    medicineTab: 'दवाइयां व साल्ट',
    activeHealthFilters: 'सक्रिय स्वास्थ्य फ़िल्टर:',
    editProfile: 'प्रोफ़ाइल बदलें',
    healthyProfile: 'सामान्य स्वस्थ प्रोफ़ाइल',
    conditionsWatched: 'स्थितियों की निगरानी',
    years: 'वर्ष',
    forUser: 'आपके लिए',

    // Action Cards
    scanCardTitle: 'बारकोड स्कैन करें',
    scanCardSubFood: 'कैमरे से खाद्य पैकेट का बारकोड स्कैन करें',
    scanCardSubMedicine: 'कैमरे से दवा के पत्ते (स्ट्रिप) या बॉक्स का बारकोड स्कैन करें',
    scanBadge: 'स्कैन',
    searchCardTitle: 'नाम या साल्ट से खोजें',
    searchCardSubFood: 'मैगी, ओट्स, बिस्किट, जूस आदि नाम से खोजें',
    searchCardSubMedicine: 'डोलो 650, पैन-डी, सिट्राजिन आदि नाम या साल्ट से खोजें',
    searchBadge: 'खोजें',
    popularTestTitle: 'तुरंत जांचने के लिए लोकप्रिय विकल्प:',
    scrollHint: 'दाएं खिसकाएं →',

    // Loading & States
    fetchingDataTitle: 'डेटा प्राप्त किया जा रहा है...',
    fetchingDataSub: 'आपकी स्वास्थ्य प्रोफ़ाइल से रासायनिक संरचना का मिलान किया जा रहा है...',
    noProductFound: 'उत्पाद नहीं मिला। कृपया ब्रांड नाम से खोजें या दूसरा बारकोड स्कैन करें।',

    // Scanner Modal & Torch
    cameraScannerTitle: 'कैमरा बारकोड स्कैनर',
    cameraScannerSubFood: 'खाद्य पैकेट का बारकोड फ्रेम के अंदर रखें',
    cameraScannerSubMedicine: 'दवा की स्ट्रिप या बॉक्स का बारकोड फ्रेम के अंदर रखें',
    pointCameraInstruction: 'बारकोड को लाल/हरी लेज़र रेखा के सीध में रखें',
    startCameraBtn: 'कैमरा चालू करें',
    stopCameraBtn: 'कैमरा बंद करें',
    torchOnBtn: 'टॉर्च चालू करें',
    torchOffBtn: 'टॉर्च बंद करें',
    torchNotSupported: 'आपके इस कैमरे में टॉर्च / फ्लैशलाइट उपलब्ध नहीं है।',
    scanFromPhotoBtn: 'फोटो / गैलरी से स्कैन करें',
    scanningPhotoWait: 'फोटो से बारकोड स्कैन हो रहा है...',
    photoScanSuccess: 'बारकोड सफलतापूर्वक पढ़ लिया गया!',
    photoScanFail: 'फोटो में स्पष्ट बारकोड नहीं दिखा। कृपया अच्छी रोशनी में फोटो लें या नीचे नंबर लिखें।',
    manualBarcodePlaceholder: 'बारकोड नंबर लिखें (उदा. 8901148216345)...',
    checkBarcodeBtn: 'जांचें',
    zoomLevel: 'ज़ूम',
    testSamplesTitle: 'तुरंत आज़माने के लिए नमूने:',
    sampleMedicinesTab: 'दवाइयां',
    sampleFoodTab: 'खाद्य पदार्थ',

    // Manual Search Modal
    searchFoodTitle: 'खाद्य उत्पाद खोजें',
    searchMedicineTitle: 'दवाई या साल्ट खोजें',
    searchFoodSubtitle: 'ओपन फूड फैक्ट्स डेटाबेस में खोजें',
    searchMedicineSubtitle: 'दवा के नाम या सक्रिय साल्ट से खोजें',
    searchPlaceholderFood: 'खोजें उदा. मैगी, लेज़, ओट्स, दूध, बिस्किट...',
    searchPlaceholderMedicine: 'खोजें उदा. डोलो 650, पैन-डी, एज़िथ्रोमाइसिन, पैरासिटामोल...',
    searchBtn: 'खोजें',
    searchResultsFood: 'खाद्य उत्पाद परिणाम',
    searchResultsMedicine: 'दवा परिणाम',
    noResultsFound: 'कोई परिणाम नहीं मिला। कृपया वर्तनी जांचें या अन्य नाम से खोजें।',
    quickPickTitle: 'लोकप्रिय खोज सुझाव:',

    // Product Card (Food)
    gradePrefix: 'ग्रेड',
    healthScoreTitle: 'हेल्थ स्कोर',
    caloriesPerServing: 'प्रति सर्विंग कैलोरी',
    mfgExpDate: 'निर्माण / समाप्ति तिथि',
    freshnessSafe: 'सेवन योग्य (सुरक्षित)',
    freshnessExpired: 'अवधि समाप्त (Expired)',
    freshnessCheck: 'शेल्फ-लाइफ जांचें',
    batchVerified: 'बैच सत्यापित',
    personalizedForYou: 'आपकी सेहत के अनुसार विशेष विश्लेषण',
    growthNotice: 'विकास व पोषण निर्देश (18 वर्ष से कम)',
    generalWellnessAdvice: 'सामान्य स्वास्थ्य सलाह',
    whatIsGoodTitle: 'इस उत्पाद में क्या अच्छा है',
    whatIsBadTitle: 'इस उत्पाद में क्या हानिकारक है',
    beneficialCountText: 'लाभदायक पोषक तत्व',
    riskCountText: 'जोखिम कारक मिले',
    noBadItemsFound: 'शानदार! कोई हानिकारक घटक या अत्यधिक एडिटिव्स नहीं मिले।',
    noGoodItemsFound: 'कोई विशेष पोषक तत्व रेखांकित नहीं हुए।',
    nutritionalBreakdownTitle: 'पोषक तत्वों का विवरण (प्रति 100 ग्राम)',
    healthierAlternativesTitle: 'बेहतर व स्वास्थ्यवर्धक विकल्प',
    whyBetterLabel: 'यह क्यों बेहतर है:',
    disclaimerFood: 'अस्वीकरण: यह विश्लेषण सार्वजनिक पोषण डेटाबेस पर आधारित है। किसी भी गंभीर एलर्जी या चिकित्सीय स्थिति में स्वास्थ्य विशेषज्ञ से सलाह लें।',
    packagedBrand: 'पैकेज्ड उत्पाद',

    // Medicine Card
    activeSaltTitle: 'सक्रिय साल्ट व रासायनिक घटक',
    categoryLabel: 'श्रेणी:',
    scheduleLabel: 'दवा का प्रकार:',
    keyUsesTitle: 'मुख्य उपयोग व लाभ',
    approvedIndicationsCount: 'स्वीकृत चिकित्सीय उपयोग',
    dosageHowToTakeTitle: 'सेवन विधि व समय',
    dosageRuleSubtitle: 'सुरक्षित सेवन के नियम',
    methodOfIntakeLabel: 'लेने का तरीका:',
    timingAndLimitLabel: 'समय व 24 घंटे की अधिकतम सीमा:',
    possibleSideEffectsTitle: 'संभावित दुष्प्रभाव (साइड इफेक्ट्स)',
    sideEffectsSubtitle: 'लक्षण दिखने पर डॉक्टर से संपर्क करें',
    safetyPrecautionsTitle: 'सुरक्षा सावधानियां व निर्देश',
    alcoholLabel: 'शराब का सेवन',
    pregnancyLabel: 'गर्भावस्था',
    drivingLabel: 'गाड़ी चलाना',
    kidneyLiverLabel: 'गुर्दा व लिवर',
    statusSafe: 'सुरक्षित',
    statusCaution: 'सावधानी',
    statusAvoid: 'हानिकारक / न लें',
    genericAlternativeTitle: 'किफ़ायती जेनेरिक विकल्प (प्रधानमंत्री जन औषधि)',
    genericAlternativeSub: 'वही साल्ट, वही असर — 70% तक की भारी बचत',
    janAushadhiBadge: 'जन औषधि केंद्र',
    savingsSuffix: 'की भारी बचत',
    disclaimerMedicine: 'अस्वीकरण: यह जानकारी केवल जागरूकता और शैक्षणिक उद्देश्य के लिए है। किसी भी दवा का सेवन करने, शुरू करने या बदलने से पहले अपने डॉक्टर या योग्य फार्मासिस्ट से परामर्श अवश्य लें।',
    safeOtcBadge: 'सुरक्षित ओटीसी दवा',
    prescriptionBadge: 'पर्चे वाली दवा (शेड्यूल H)',
    highCautionBadge: 'विशेष चेतावनी: आपकी सेहत के प्रतिकूल',
    safeOtcSub: 'बिना पर्चे के मान्य, अनुशंसित खुराक में सुरक्षित',
    prescriptionSub: 'केवल डॉक्टर के लिखित पर्चे पर ही लें',
    highCautionSub: 'आपकी चुनी हुई बीमारी या एलर्जी के साथ जोखिम हो सकता है',
    barcodePrefix: 'बारकोड:',

    // History View
    historyTitle: 'स्कैन इतिहास',
    historyFilterAll: 'सभी',
    historyFilterFood: 'खाद्य पदार्थ',
    historyFilterMedicine: 'दवाइयां',
    clearHistoryBtn: 'इतिहास मिटाएं',
    clearHistoryConfirm: 'क्या आप पूरा स्कैन इतिहास मिटाना चाहते हैं?',
    noHistoryYet: 'अभी तक कोई स्कैन किया गया उत्पाद नहीं है',
    noHistorySub: 'दवाई या खाद्य पैकेट का बारकोड स्कैन करें और यहां देखें!',
    historyCautionBadge: 'सावधानी',
    historyMedicineBadge: 'दवा',
    scoreText: 'स्कोर',

    // Bottom Navigation
    navProductInfo: 'उत्पाद विवरण',
    navMedicineInfo: 'दवा जानकारी',
    navHistory: 'स्कैन इतिहास',
    navWeekly: 'साप्ताहिक रिपोर्ट',
    navPro: 'प्रो प्लान',
    proBadge: 'प्रो',
    scansRemaining: 'स्कैन आज शेष',
  },

  en: {
    // Navigation & Core App
    appName: 'FoodCheck',
    tagline: 'Check if any food, drink, or medicine is safe for your health before consuming.',
    foodTab: 'Food & Beverages',
    medicineTab: 'Medicines & Salts',
    activeHealthFilters: 'Active Health Filters:',
    editProfile: 'Edit Profile',
    healthyProfile: 'General Healthy Profile',
    conditionsWatched: 'conditions monitored',
    years: 'yrs',
    forUser: 'For',

    // Action Cards
    scanCardTitle: 'Scan Product Barcode',
    scanCardSubFood: 'Point camera at food or beverage barcode',
    scanCardSubMedicine: 'Point camera at medicine strip or box barcode',
    scanBadge: 'SCAN',
    searchCardTitle: 'Search by Name or Salt',
    searchCardSubFood: 'Search Maggi, Oats, Biscuits, Juice, etc.',
    searchCardSubMedicine: 'Search Dolo 650, Pan-D, Cetirizine, etc.',
    searchBadge: 'SEARCH',
    popularTestTitle: 'Popular Items to Test Instantly:',
    scrollHint: 'Scroll horizontally →',

    // Loading & States
    fetchingDataTitle: 'Fetching product details...',
    fetchingDataSub: 'Matching composition against your personalized health profile...',
    noProductFound: 'Product not found. Try searching by brand name or scan another barcode.',

    // Scanner Modal & Torch
    cameraScannerTitle: 'Camera Barcode Scanner',
    cameraScannerSubFood: 'Align food package barcode inside the frame',
    cameraScannerSubMedicine: 'Align medicine strip or box barcode inside the frame',
    pointCameraInstruction: 'Align the barcode horizontally across the target laser',
    startCameraBtn: 'Start Camera',
    stopCameraBtn: 'Stop Camera',
    torchOnBtn: 'Turn On Torch',
    torchOffBtn: 'Turn Off Torch',
    torchNotSupported: 'Flashlight / Torch is not supported on this camera.',
    scanFromPhotoBtn: 'Scan from Photo / Gallery',
    scanningPhotoWait: 'Scanning barcode from photo...',
    photoScanSuccess: 'Barcode detected successfully!',
    photoScanFail: 'Could not detect a clear barcode in this photo. Please try a clearer picture or enter number below.',
    manualBarcodePlaceholder: 'Type Barcode Number e.g. 8901148216345...',
    checkBarcodeBtn: 'Check',
    zoomLevel: 'Zoom',
    testSamplesTitle: 'Test 1-Click Samples:',
    sampleMedicinesTab: 'Medicines',
    sampleFoodTab: 'Food',

    // Manual Search Modal
    searchFoodTitle: 'Search Food Products',
    searchMedicineTitle: 'Search Medicines & Salts',
    searchFoodSubtitle: 'Search Open Food Facts public database',
    searchMedicineSubtitle: 'Search by medicine brand or active molecule',
    searchPlaceholderFood: 'Search e.g. Maggi, Lay’s, Oats, Milk, Biscuits...',
    searchPlaceholderMedicine: 'Search e.g. Dolo 650, Pan-D, Azithromycin, Paracetamol...',
    searchBtn: 'Search',
    searchResultsFood: 'Food Product Results',
    searchResultsMedicine: 'Medicine Results',
    noResultsFound: 'No results found. Please check spelling or try another name.',
    quickPickTitle: 'Popular Suggestions:',

    // Product Card (Food)
    gradePrefix: 'Grade',
    healthScoreTitle: 'Health Score',
    caloriesPerServing: 'Calories per serving',
    mfgExpDate: 'Mfg / Expiry Date',
    freshnessSafe: 'Safe to Consume',
    freshnessExpired: 'Expired',
    freshnessCheck: 'Check Shelf Life',
    batchVerified: 'Batch verified',
    personalizedForYou: 'Personalized Health Analysis',
    growthNotice: 'Growth & Development Highlights (Under 18)',
    generalWellnessAdvice: 'General Wellness Advice',
    whatIsGoodTitle: 'What is Good in this product',
    whatIsBadTitle: 'What is Bad / Risk factors',
    beneficialCountText: 'beneficial attributes',
    riskCountText: 'risk factors identified',
    noBadItemsFound: 'Great! No major red-flag ingredients or excessive additives found.',
    noGoodItemsFound: 'No significant positive nutritional highlights detected.',
    nutritionalBreakdownTitle: 'Nutritional Breakdown (per 100g)',
    healthierAlternativesTitle: 'Healthier Alternatives You May Like',
    whyBetterLabel: 'Why it is healthier:',
    disclaimerFood: 'Disclaimer: This analysis is based on public nutrition databases. For medical or severe allergy guidance, consult a doctor.',
    packagedBrand: 'Packaged Product',

    // Medicine Card
    activeSaltTitle: 'Active Salt Composition',
    categoryLabel: 'Category:',
    scheduleLabel: 'Schedule:',
    keyUsesTitle: 'Key Uses & Indications',
    approvedIndicationsCount: 'approved indications',
    dosageHowToTakeTitle: 'Dosage & How to Take',
    dosageRuleSubtitle: 'Safe intake instructions',
    methodOfIntakeLabel: 'Method of Administration:',
    timingAndLimitLabel: 'Timing & Daily Limit:',
    possibleSideEffectsTitle: 'Possible Side Effects',
    sideEffectsSubtitle: 'Be aware if symptoms appear',
    safetyPrecautionsTitle: 'Safety Precautions',
    alcoholLabel: 'Alcohol Consumption',
    pregnancyLabel: 'Pregnancy',
    drivingLabel: 'Driving',
    kidneyLiverLabel: 'Kidney & Liver',
    statusSafe: 'Safe',
    statusCaution: 'Caution',
    statusAvoid: 'Avoid / High Risk',
    genericAlternativeTitle: 'Affordable Generic Alternative (PM Jan Aushadhi)',
    genericAlternativeSub: 'Same chemical molecule with up to 70% cost savings',
    janAushadhiBadge: 'PM Jan Aushadhi',
    savingsSuffix: 'Savings',
    disclaimerMedicine: 'Disclaimer: This information is for educational and awareness purposes only. Always consult a certified physician or pharmacist before taking or modifying any medications.',
    safeOtcBadge: 'Safe OTC Medication',
    prescriptionBadge: 'Prescription Only (Schedule H)',
    highCautionBadge: 'High Caution for Your Health Profile',
    safeOtcSub: 'Available without prescription, safe in recommended dose',
    prescriptionSub: 'Must only be taken under doctor prescription',
    highCautionSub: 'Potential contraindication with your health profile',
    barcodePrefix: 'Barcode:',

    // History View
    historyTitle: 'Scan History',
    historyFilterAll: 'All',
    historyFilterFood: 'Food',
    historyFilterMedicine: 'Medicines',
    clearHistoryBtn: 'Clear History',
    clearHistoryConfirm: 'Do you want to clear your entire scan history?',
    noHistoryYet: 'No scanned items yet',
    noHistorySub: 'Scan a food barcode or medicine strip to see it here!',
    historyCautionBadge: 'Caution',
    historyMedicineBadge: 'Medicine',
    scoreText: 'Score',

    // Bottom Navigation
    navProductInfo: 'Product Details',
    navMedicineInfo: 'Medicine Info',
    navHistory: 'Scan History',
    navWeekly: 'Weekly Report',
    navPro: 'PRO Plan',
    proBadge: 'PRO',
    scansRemaining: 'scans left today',
  },

  // Fallbacks for other regional languages map smoothly
  mr: null as any,
  bn: null as any,
  ta: null as any,
  te: null as any,
  gu: null as any,
  kn: null as any,
};

// Populate regional languages with regional nuances or fallback
const regionalCodes: SupportedLanguage[] = ['mr', 'bn', 'ta', 'te', 'gu', 'kn'];
regionalCodes.forEach(code => {
  DICTIONARIES[code] = {
    ...DICTIONARIES.hi,
    // Provide sensible language-specific app name & tab if needed
    appName: code === 'mr' ? 'फूडचेक' : code === 'bn' ? 'ফুডচেক' : code === 'gu' ? 'ફૂડચેક' : DICTIONARIES.hi.appName,
  };
});

export const getDictionary = (lang: SupportedLanguage): LocalizedDictionary => {
  return DICTIONARIES[lang] || DICTIONARIES.en;
};

// Health Condition Labels in 100% pure Hindi & English
export const HEALTH_CONDITION_MAP: Record<string, { hi: string; en: string }> = {
  diabetes: {
    hi: 'मधुमेह (शुगर)',
    en: 'Diabetes (High Sugar)',
  },
  high_bp: {
    hi: 'उच्च रक्तचाप (हाई बीपी)',
    en: 'High Blood Pressure',
  },
  low_bp: {
    hi: 'निम्न रक्तचाप (लो बीपी)',
    en: 'Low Blood Pressure',
  },
  thyroid: {
    hi: 'थायराइड रोग',
    en: 'Thyroid Disorder',
  },
  obesity: {
    hi: 'मोटापा / वजन नियंत्रण',
    en: 'Weight / Obesity',
  },
  heart_problem: {
    hi: 'हृदय रोग',
    en: 'Heart Conditions',
  },
  kidney_issue: {
    hi: 'गुर्दा / किडनी रोग',
    en: 'Kidney Disease',
  },
  nut_allergy: {
    hi: 'नट / मूंगफली एलर्जी',
    en: 'Nut / Peanut Allergy',
  },
  gluten_allergy: {
    hi: 'ग्लूटेन एलर्जी (सीलिएक)',
    en: 'Gluten Allergy (Celiac)',
  },
  lactose_intolerance: {
    hi: 'लैक्टोज एलर्जी (दूध)',
    en: 'Lactose Intolerance (Dairy)',
  },
  none: {
    hi: 'सामान्य (स्वस्थ प्रोफ़ाइल)',
    en: 'General Healthy Profile',
  },
  other: {
    hi: 'अन्य स्वास्थ्य समस्या',
    en: 'Other Health Condition',
  },
};

export const getLocalizedCondition = (key: string, lang: SupportedLanguage): string => {
  const item = HEALTH_CONDITION_MAP[key];
  if (!item) return key.replace(/_/g, ' ');
  return lang === 'hi' ? item.hi : item.en;
};

// Medicine Form Labels
export const MEDICINE_FORM_MAP: Record<string, { hi: string; en: string }> = {
  Tablet: { hi: 'टैबलेट (गोली)', en: 'Tablet' },
  Capsule: { hi: 'कैप्सूल', en: 'Capsule' },
  Syrup: { hi: 'सिरप', en: 'Syrup' },
  Injection: { hi: 'इंजेक्शन', en: 'Injection' },
  Ointment: { hi: 'मरहम (क्रीम)', en: 'Ointment' },
  Drops: { hi: 'ड्रॉप्स (बूंदें)', en: 'Drops' },
  Gel: { hi: 'जेल', en: 'Gel' },
  Inhaler: { hi: 'इनहेलर', en: 'Inhaler' },
};

export const getLocalizedMedicineForm = (form: string, lang: SupportedLanguage): string => {
  const item = MEDICINE_FORM_MAP[form];
  if (!item) return form;
  return lang === 'hi' ? item.hi : item.en;
};

// Medicine Category Labels
export const MEDICINE_CATEGORY_MAP: Record<string, { hi: string; en: string }> = {
  'Pain & Fever Analgesic': {
    hi: 'दर्द व बुखार निवारक (Analgesic)',
    en: 'Pain & Fever Analgesic',
  },
  'Acidity & Reflux (PPI)': {
    hi: 'एसिडिटी व गैस रोधक (PPI)',
    en: 'Acidity & Reflux (PPI)',
  },
  'Allergy & Antihistamine': {
    hi: 'एलर्जी व सर्दी रोधक',
    en: 'Allergy & Antihistamine',
  },
  'Antibiotic (Broad Spectrum)': {
    hi: 'एंटीबायोटिक (संक्रमण रोधक)',
    en: 'Antibiotic (Broad Spectrum)',
  },
  'Antibiotic (Macrolide)': {
    hi: 'एंटीबायोटिक (श्वसन संक्रमण)',
    en: 'Antibiotic (Macrolide)',
  },
  'Oral Hypoglycemic (Anti-diabetic)': {
    hi: 'मधुमेह नियंत्रण (शुगर की दवा)',
    en: 'Oral Hypoglycemic (Anti-diabetic)',
  },
  'Antihypertensive (Blood Pressure)': {
    hi: 'उच्च रक्तचाप नियंत्रण (BP दवा)',
    en: 'Antihypertensive (Blood Pressure)',
  },
  'Calcium & Vitamin D3 Supplement': {
    hi: 'हड्डी व कैल्शियम सप्लीमेंट',
    en: 'Calcium & Vitamin D3 Supplement',
  },
  'Antacid & Antigas Gel': {
    hi: 'एसिडिटी व सीने में जलन रोधक जेल',
    en: 'Antacid & Antigas Gel',
  },
  'Muscle Relaxant & Painkiller': {
    hi: 'मांसपेशी दर्द व खिंचाव रोधक',
    en: 'Muscle Relaxant & Painkiller',
  },
};

export const getLocalizedMedicineCategory = (category: string, lang: SupportedLanguage): string => {
  const item = MEDICINE_CATEGORY_MAP[category];
  if (!item) return category;
  return lang === 'hi' ? item.hi : item.en;
};

// Schedule Category Labels
export const MEDICINE_SCHEDULE_MAP: Record<string, { hi: string; en: string }> = {
  'Schedule H (Prescription)': {
    hi: 'शेड्यूल H (डॉक्टर का पर्चा अनिवार्य)',
    en: 'Schedule H (Prescription Required)',
  },
  'Schedule H1': {
    hi: 'शेड्यूल H1 (विशेष पर्चा अनिवार्य)',
    en: 'Schedule H1 (Special Prescription)',
  },
  'OTC (Over-The-Counter)': {
    hi: 'ओटीसी (बिना पर्चे के मान्य)',
    en: 'OTC (Over-The-Counter)',
  },
};

export const getLocalizedScheduleCategory = (schedule: string, lang: SupportedLanguage): string => {
  const item = MEDICINE_SCHEDULE_MAP[schedule];
  if (!item) return schedule;
  return lang === 'hi' ? item.hi : item.en;
};

// Nutrients in 100% pure Hindi & English
export const NUTRIENT_NAME_MAP: Record<string, { hi: string; en: string }> = {
  energy: { hi: 'ऊर्जा (कैलोरी)', en: 'Energy' },
  protein: { hi: 'प्रोटीन', en: 'Proteins' },
  carbs: { hi: 'कार्बोहाइड्रेट', en: 'Carbohydrates' },
  sugars: { hi: 'शर्करा (चीनी)', en: 'Sugars' },
  fat: { hi: 'वसा (फैट)', en: 'Fat' },
  salt: { hi: 'सोडियम / नमक', en: 'Sodium / Salt' },
};

export const getLocalizedNutrient = (key: string, lang: SupportedLanguage): string => {
  const item = NUTRIENT_NAME_MAP[key];
  if (!item) return key;
  return lang === 'hi' ? item.hi : item.en;
};
