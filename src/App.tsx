/**
 * FoodCheck - Smart Nutrition & Medicine Scanner
 * Zero login or signup required.
 * Real Open Food Facts data + Instant Medicine Barcode & Hindi/English Info
 * Personalized health condition & age logic.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scan,
  Search,
  History,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  Zap,
  Crown,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Globe,
  Camera,
  Heart,
  Pill,
  Utensils,
  Languages,
  Info
} from 'lucide-react';

import {
  FoodProduct,
  MedicineProduct,
  ScannedRecord,
  SubscriptionState,
  SupportedLanguage,
  UserProfile
} from './types';
import { translations } from './i18n/translations';
import { fetchProductFromOpenFoodFacts, SAMPLE_PRODUCTS } from './services/openFoodFacts';
import { calculateNutritionVerdict } from './services/nutritionEngine';
import {
  POPULAR_MEDICINES,
  getMedicineByBarcode,
  applyPersonalizedMedicineWarnings
} from './services/medicineDatabase';

import { OnboardingModal } from './components/OnboardingModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { ManualSearchModal } from './components/ManualSearchModal';
import { ProductCard } from './components/ProductCard';
import { MedicineCard } from './components/MedicineCard';
import { ScanHistoryView } from './components/ScanHistoryView';
import { WeeklyReportModal } from './components/WeeklyReportModal';
import { PremiumModal } from './components/PremiumModal';
import { SettingsModal } from './components/SettingsModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { getDictionary, getLocalizedCondition } from './i18n/localizationHelper';

const STORAGE_KEYS = {
  PROFILE: 'foodcheck_user_profile',
  SUBSCRIPTION: 'foodcheck_subscription',
  HISTORY: 'foodcheck_scan_history',
  LANGUAGE: 'foodcheck_app_language',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_default',
  name: '',
  age: 26,
  gender: 'Male',
  conditions: ['none'],
  isCompleted: false,
  createdAt: new Date().toISOString(),
};

const DEFAULT_SUBSCRIPTION: SubscriptionState = {
  isPremium: false,
  dailyScansRemaining: 8,
  maxDailyScans: 8,
  lastResetDate: new Date().toISOString().slice(0, 10),
  plan: 'free',
};

export default function App() {
  // 1. Language State
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved as SupportedLanguage) || 'en';
  });

  const t = translations[currentLanguage] || translations.en;
  const dict = getDictionary(currentLanguage);
  const isHi = currentLanguage === 'hi';

  // 2. User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user profile from local storage', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(!userProfile.isCompleted);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 3. Subscription & Daily Scans State
  const [subscription, setSubscription] = useState<SubscriptionState>(() => {
    const today = new Date().toISOString().slice(0, 10);
    const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
    if (saved) {
      try {
        const parsed: SubscriptionState = JSON.parse(saved);
        if (parsed.lastResetDate !== today && !parsed.isPremium) {
          return {
            ...parsed,
            dailyScansRemaining: parsed.maxDailyScans,
            lastResetDate: today,
          };
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse subscription', e);
      }
    }
    return { ...DEFAULT_SUBSCRIPTION, lastResetDate: today };
  });

  // 4. Scan History
  const [history, setHistory] = useState<ScannedRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
    return [];
  });

  // 5. Active Category Mode: 'food' or 'medicine'
  const [activeCategory, setActiveCategory] = useState<'food' | 'medicine'>('food');

  // 6. Active Scanned Items
  const [currentProduct, setCurrentProduct] = useState<FoodProduct | null>(null);
  const [currentMedicine, setCurrentMedicine] = useState<MedicineProduct | null>(() => {
    // Initial sample medicine pre-loaded
    return applyPersonalizedMedicineWarnings(POPULAR_MEDICINES[0], userProfile);
  });
  const [activeDisplay, setActiveDisplay] = useState<'food' | 'medicine'>('food');
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 7. Navigation Tabs: 'check' | 'history'
  const [activeTab, setActiveTab] = useState<'check' | 'history'>('check');

  // 8. Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isWeeklyReportOpen, setIsWeeklyReportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
  }, [subscription]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }, [history]);

  // Load a default demo food item initially
  useEffect(() => {
    if (!currentProduct) {
      fetchProductFromOpenFoodFacts(SAMPLE_PRODUCTS[0].barcode, userProfile).then(prod => {
        if (prod) setCurrentProduct(prod);
      });
    }
  }, []);

  // Update warnings whenever userProfile changes
  useEffect(() => {
    if (currentProduct) {
      const refreshed = calculateNutritionVerdict(currentProduct, userProfile);
      setCurrentProduct({
        ...currentProduct,
        healthScoreNumber: refreshed.healthScoreNumber,
        nutriscore_grade: refreshed.nutriscoreGrade,
        goodItems: refreshed.goodItems,
        badItems: refreshed.badItems,
        isHealthy: refreshed.isHealthy,
        personalizedWarnings: refreshed.personalizedWarnings,
        growthHighlights: refreshed.growthHighlights,
        generalAdvice: refreshed.generalAdvice,
        healthierAlternatives: refreshed.healthierAlternatives,
      });
    }

    if (currentMedicine) {
      const refreshedMed = applyPersonalizedMedicineWarnings(currentMedicine, userProfile);
      setCurrentMedicine(refreshedMed);
    }
  }, [userProfile]);

  // Process barcode scan (Handles BOTH Medicines & Foods)
  const processNewScan = async (barcode: string) => {
    setErrorMessage(null);

    // Check scan limits for free users
    if (!subscription.isPremium && subscription.dailyScansRemaining <= 0) {
      setIsPremiumOpen(true);
      return;
    }

    setIsProductLoading(true);

    try {
      // 1. Check if barcode is in Medicine Database
      const matchedMed = getMedicineByBarcode(barcode, userProfile);
      if (matchedMed) {
        setCurrentMedicine(matchedMed);
        setActiveDisplay('medicine');
        setActiveCategory('medicine');
        setActiveTab('check');

        // Record in history
        const newRecord: ScannedRecord = {
          id: `scan_${Date.now()}`,
          scannedAt: new Date().toISOString(),
          productType: 'medicine',
          medicineProduct: matchedMed,
          healthVerdict: matchedMed.personalizedWarnings.some(w => w.severity === 'critical')
            ? 'caution'
            : matchedMed.scheduleCategory.includes('Schedule H')
            ? 'prescription'
            : 'otc',
        };

        setHistory(prev => [newRecord, ...prev.slice(0, 49)]);

        if (!subscription.isPremium) {
          setSubscription(prev => ({
            ...prev,
            dailyScansRemaining: Math.max(0, prev.dailyScansRemaining - 1),
          }));
        }
        setIsProductLoading(false);
        return;
      }

      // 2. Otherwise, look up Food in Open Food Facts
      const product = await fetchProductFromOpenFoodFacts(barcode, userProfile);
      if (product) {
        setCurrentProduct(product);
        setActiveDisplay('food');
        setActiveCategory('food');
        setActiveTab('check');

        const newRecord: ScannedRecord = {
          id: `scan_${Date.now()}`,
          scannedAt: new Date().toISOString(),
          productType: 'food',
          product,
          healthVerdict: product.healthScoreNumber >= 6.5 ? 'healthy' : product.healthScoreNumber >= 4.5 ? 'moderate' : 'unhealthy',
        };
        setHistory(prev => [newRecord, ...prev.slice(0, 49)]);

        if (!subscription.isPremium) {
          setSubscription(prev => ({
            ...prev,
            dailyScansRemaining: Math.max(0, prev.dailyScansRemaining - 1),
          }));
        }
      } else {
        setErrorMessage(
          activeCategory === 'medicine'
            ? 'दवा का बारकोड नहीं मिला। कृपया नाम से खोजें (जैसे Dolo, Pan-D) या दूसरा बारकोड स्कैन करें।'
            : t.noProductFound
        );
      }
    } catch (err) {
      console.error('Failed to process barcode scan:', err);
      setErrorMessage('Could not load item details. Please check connection and try again.');
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleSelectFoodProduct = (product: FoodProduct) => {
    setCurrentProduct(product);
    setActiveDisplay('food');
    setActiveCategory('food');
    setActiveTab('check');

    if (history.length === 0 || history[0].product.barcode !== product.barcode) {
      const newRecord: ScannedRecord = {
        id: `scan_${Date.now()}`,
        scannedAt: new Date().toISOString(),
        productType: 'food',
        product,
        healthVerdict: product.isHealthy ? 'healthy' : 'unhealthy',
      };
      setHistory(prev => [newRecord, ...prev.slice(0, 49)]);
    }
  };

  const handleSelectMedicineProduct = (medicine: MedicineProduct) => {
    const personalizedMed = applyPersonalizedMedicineWarnings(medicine, userProfile);
    setCurrentMedicine(personalizedMed);
    setActiveDisplay('medicine');
    setActiveCategory('medicine');
    setActiveTab('check');

    const newRecord: ScannedRecord = {
      id: `scan_${Date.now()}`,
      scannedAt: new Date().toISOString(),
      productType: 'medicine',
      medicineProduct: personalizedMed,
      healthVerdict: personalizedMed.personalizedWarnings.some(w => w.severity === 'critical')
        ? 'caution'
        : 'otc',
    };
    setHistory(prev => [newRecord, ...prev.slice(0, 49)]);
  };

  const handleUpgradeSuccess = () => {
    setSubscription(prev => ({
      ...prev,
      isPremium: true,
      plan: 'monthly',
      trialEndDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    }));
  };

  const handleSwitchFamilyProfile = (preset: 'self' | 'kid' | 'elder') => {
    if (preset === 'kid') {
      setUserProfile({
        id: 'user_kid',
        name: 'Aarav (Child)',
        age: 11,
        gender: 'Male',
        conditions: ['none'],
        isCompleted: true,
        createdAt: new Date().toISOString(),
      });
    } else if (preset === 'elder') {
      setUserProfile({
        id: 'user_elder',
        name: 'Dad (Senior)',
        age: 62,
        gender: 'Male',
        conditions: ['diabetes', 'high_bp', 'kidney_issue', 'heart_problem'],
        isCompleted: true,
        createdAt: new Date().toISOString(),
      });
    } else {
      setUserProfile({
        id: 'user_self',
        name: 'Myself',
        age: 28,
        gender: 'Male',
        conditions: ['none'],
        isCompleted: true,
        createdAt: new Date().toISOString(),
      });
    }
    setIsSettingsOpen(false);
  };

  const handleResetAllData = () => {
    const confirmMsg = isHi
      ? 'क्या आप स्थानीय खाद्य व दवाई स्कैन डेटा और प्रोफ़ाइल रीसेट करना चाहते हैं?'
      : 'Reset all local food & medicine scan data and profile?';
    if (window.confirm(confirmMsg)) {
      localStorage.clear();
      setUserProfile(DEFAULT_PROFILE);
      setSubscription(DEFAULT_SUBSCRIPTION);
      setHistory([]);
      setIsOnboardingOpen(true);
      setIsSettingsOpen(false);
    }
  };

  return (
    <div
      id="foodcheck-root"
      className="min-h-screen bg-slate-100 text-slate-800 flex justify-center selection:bg-emerald-500 selection:text-white"
    >
      {/* Mobile-centric responsive container */}
      <div className="w-full max-w-xl bg-slate-50 min-h-screen flex flex-col shadow-xl border-x border-slate-200/80 relative">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md transition-colors ${
                activeCategory === 'medicine'
                  ? 'bg-blue-600 shadow-blue-600/20'
                  : 'bg-emerald-600 shadow-emerald-600/20'
              }`}
            >
              {activeCategory === 'medicine' ? (
                <Pill className="h-5 w-5" />
              ) : (
                <ShieldCheck className="h-5 w-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base text-slate-900 tracking-tight">
                  {dict.appName}
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {activeCategory === 'medicine' ? (isHi ? '💊 दवाई' : '💊 Medicine') : (isHi ? '🥗 खाद्य' : '🥗 Food')}
                </span>
                {subscription.isPremium ? (
                  <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded border border-amber-300">
                    {dict.proBadge}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPremiumOpen(true)}
                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded hover:bg-emerald-100 transition-colors flex items-center gap-0.5"
                  >
                    <Zap className="h-2.5 w-2.5" />
                    <span>{subscription.dailyScansRemaining} {dict.scansRemaining}</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-1">
                {userProfile.name ? `${userProfile.name} • ` : ''}
                {userProfile.age} {dict.years} •{' '}
                {userProfile.conditions.length > 0 && !userProfile.conditions.includes('none')
                  ? `${userProfile.conditions.length} ${dict.conditionsWatched}`
                  : dict.healthyProfile}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Quick 1-tap language switch between Hindi and English */}
            <button
              type="button"
              id="header-quick-lang-toggle"
              onClick={() => setCurrentLanguage(prev => (prev === 'hi' ? 'en' : 'hi'))}
              title={isHi ? 'Click to switch to English' : 'हिंदी में बदलने के लिए दबाएं'}
              aria-label="Toggle Hindi or English"
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 active:scale-95 px-2.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 border border-emerald-200 transition-all shadow-2xs"
            >
              <Languages className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isHi ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
            </button>

            <button
              type="button"
              id="header-settings-btn"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Settings"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Real-time offline indicator */}
        <OfflineIndicator currentLanguage={currentLanguage} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 pb-28 overflow-y-auto space-y-4">
          
          {/* CATEGORY SWITCHER: FOOD VS MEDICINE */}
          <div className="rounded-2xl bg-white p-1.5 border border-slate-200 shadow-2xs flex items-center gap-1.5">
            <button
              type="button"
              id="mode-switch-food-btn"
              onClick={() => {
                setActiveCategory('food');
                setActiveDisplay('food');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeCategory === 'food'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Utensils className="h-4 w-4" />
              <span>{dict.foodTab}</span>
            </button>

            <button
              type="button"
              id="mode-switch-medicine-btn"
              onClick={() => {
                setActiveCategory('medicine');
                setActiveDisplay('medicine');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeCategory === 'medicine'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Pill className="h-4 w-4" />
              <span>{dict.medicineTab}</span>
            </button>
          </div>

          {/* User Profile / Active Health Conditions Indicator */}
          <div className="rounded-2xl bg-white p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-7 w-7 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {dict.activeHealthFilters}
                </span>
                <div className="text-xs font-bold text-slate-800 truncate">
                  {userProfile.conditions.includes('none') || userProfile.conditions.length === 0
                    ? dict.healthyProfile
                    : userProfile.conditions.map(c => getLocalizedCondition(c, currentLanguage)).join(', ')}
                </div>
              </div>
            </div>

            <button
              type="button"
              id="customize-conditions-chip-btn"
              onClick={() => {
                setIsEditingProfile(true);
                setIsOnboardingOpen(true);
              }}
              className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors"
            >
              {dict.editProfile}
            </button>
          </div>

          {/* Action Trigger Cards (Scan & Search) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              id="open-scanner-card-btn"
              onClick={() => setIsScannerOpen(true)}
              className={`p-4 rounded-3xl text-white shadow-md active:scale-[0.98] transition-all flex flex-col justify-between text-left group relative overflow-hidden ${
                activeCategory === 'medicine'
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-xs">
                  <Camera className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full">
                  {dict.scanBadge}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight">
                  {dict.scanCardTitle}
                </h3>
                <p className="text-[11px] opacity-90 mt-0.5">
                  {activeCategory === 'medicine'
                    ? dict.scanCardSubMedicine
                    : dict.scanCardSubFood}
                </p>
              </div>
            </button>

            <button
              type="button"
              id="open-search-card-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-4 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 shadow-2xs active:scale-[0.98] transition-all flex flex-col justify-between text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-2xl transition-colors ${
                    activeCategory === 'medicine'
                      ? 'bg-blue-50 text-blue-700 group-hover:bg-blue-100'
                      : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
                  }`}
                >
                  <Search className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {dict.searchBadge}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight text-slate-900">
                  {dict.searchCardTitle}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {activeCategory === 'medicine'
                    ? dict.searchCardSubMedicine
                    : dict.searchCardSubFood}
                </p>
              </div>
            </button>
          </div>

          {/* QUICK 1-CLICK TEST SAMPLES (MEDICINE OR FOOD) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                {dict.popularTestTitle}
              </span>
              <span className="text-[10px] text-slate-400">{dict.scrollHint}</span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
              {activeCategory === 'medicine'
                ? POPULAR_MEDICINES.map(med => (
                    <button
                      type="button"
                      key={med.barcode}
                      id={`quick-med-chip-${med.barcode}`}
                      onClick={() => handleSelectMedicineProduct(med)}
                      className={`flex-shrink-0 w-44 p-2.5 rounded-2xl border text-left transition-all ${
                        activeDisplay === 'medicine' && currentMedicine?.barcode === med.barcode
                          ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20 shadow-2xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 truncate">
                        {med.brand} • {med.form}
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                        {med.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-1">
                        {med.saltComposition}
                      </div>
                    </button>
                  ))
                : SAMPLE_PRODUCTS.map(sample => (
                    <button
                      type="button"
                      key={sample.barcode}
                      id={`quick-sample-chip-${sample.barcode}`}
                      onClick={() => processNewScan(sample.barcode)}
                      className={`flex-shrink-0 w-44 p-2.5 rounded-2xl border text-left transition-all ${
                        activeDisplay === 'food' && currentProduct?.barcode === sample.barcode
                          ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-2xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                        {sample.brand}
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                        {sample.name}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold truncate mt-1">
                        {sample.highlight}
                      </div>
                    </button>
                  ))}
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="rounded-2xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Main Scanned Content View */}
          {activeTab === 'check' && (
            <div>
              {isProductLoading ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mb-3" />
                  <p className="text-sm font-bold text-slate-700">
                    {dict.fetchingDataTitle}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {dict.fetchingDataSub}
                  </p>
                </div>
              ) : activeDisplay === 'medicine' && currentMedicine ? (
                <MedicineCard
                  medicine={currentMedicine}
                  userProfile={userProfile}
                  currentLanguage={currentLanguage}
                  onSelectAlternative={altName => {
                    setIsSearchOpen(true);
                  }}
                />
              ) : currentProduct ? (
                <ProductCard
                  product={currentProduct}
                  userProfile={userProfile}
                  currentLanguage={currentLanguage}
                  onSelectAlternative={() => {
                    setIsSearchOpen(true);
                  }}
                />
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <Scan className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    {isHi ? 'खाद्य पदार्थ या दवाई का बारकोड स्कैन करें' : 'Ready to scan food or medicine'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isHi ? 'ऊपर दिए गए स्कैन बटन को दबाएं या नीचे दिए किसी नमूने को चुनें।' : 'Tap the Scan button above or pick any sample item.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* History View Tab */}
          {activeTab === 'history' && (
            <ScanHistoryView
              records={history}
              onSelectProduct={prod => {
                handleSelectFoodProduct(prod);
              }}
              onSelectMedicine={med => {
                handleSelectMedicineProduct(med);
              }}
              onClearHistory={() => setHistory([])}
              currentLanguage={currentLanguage}
            />
          )}
        </main>

        {/* Floating Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none p-3">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/90 p-1.5 flex items-center justify-around pointer-events-auto">
            <button
              type="button"
              id="nav-scan-tab-btn"
              onClick={() => setActiveTab('check')}
              className={`flex-1 py-2 px-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                activeTab === 'check'
                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <Scan className="h-4 w-4" />
              <span className="text-[10px]">
                {activeCategory === 'medicine' ? dict.navMedicineInfo : dict.navProductInfo}
              </span>
            </button>

            <button
              type="button"
              id="nav-history-tab-btn"
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                activeTab === 'history'
                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <History className="h-4 w-4" />
              <span className="text-[10px]">{dict.navHistory}</span>
            </button>

            <button
              type="button"
              id="nav-weekly-report-btn"
              onClick={() => setIsWeeklyReportOpen(true)}
              className="flex-1 py-2 px-3 rounded-2xl flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 font-medium transition-all"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              <span className="text-[10px]">{dict.navWeekly}</span>
            </button>

            <button
              type="button"
              id="nav-upgrade-pro-btn"
              onClick={() => setIsPremiumOpen(true)}
              className="flex-1 py-2 px-3 rounded-2xl flex flex-col items-center gap-1 text-amber-700 hover:text-amber-800 font-medium transition-all"
            >
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-[10px]">{dict.navPro}</span>
            </button>
          </div>
        </nav>

        {/* 1. Onboarding / Edit Profile Modal */}
        <OnboardingModal
          isOpen={isOnboardingOpen}
          initialProfile={userProfile}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          isEditing={isEditingProfile}
          onSave={profile => {
            setUserProfile(profile);
            setIsOnboardingOpen(false);
            setIsEditingProfile(false);
          }}
          onClose={() => {
            setIsOnboardingOpen(false);
            setIsEditingProfile(false);
          }}
        />

        {/* 2. Barcode Scanner Camera Modal */}
        <BarcodeScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onBarcodeDetected={code => {
            setIsScannerOpen(false);
            processNewScan(code);
          }}
          currentLanguage={currentLanguage}
          initialCategory={activeCategory}
        />

        {/* 3. Manual Search Modal */}
        <ManualSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={handleSelectFoodProduct}
          onSelectMedicine={handleSelectMedicineProduct}
          userProfile={userProfile}
          currentLanguage={currentLanguage}
          initialMode={activeCategory}
        />

        {/* 4. Weekly Report Modal */}
        <WeeklyReportModal
          isOpen={isWeeklyReportOpen}
          onClose={() => setIsWeeklyReportOpen(false)}
          isPremium={subscription.isPremium}
          onOpenUpgrade={() => setIsPremiumOpen(true)}
          records={history}
          userProfile={userProfile}
          currentLanguage={currentLanguage}
        />

        {/* 5. Premium Subscription Modal */}
        <PremiumModal
          isOpen={isPremiumOpen}
          onClose={() => setIsPremiumOpen(false)}
          onUpgradeSuccess={handleUpgradeSuccess}
          currentLanguage={currentLanguage}
        />

        {/* 6. Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userProfile={userProfile}
          onEditProfile={() => {
            setIsEditingProfile(true);
            setIsOnboardingOpen(true);
          }}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          isPremium={subscription.isPremium}
          onOpenUpgrade={() => setIsPremiumOpen(true)}
          onSwitchFamilyProfile={handleSwitchFamilyProfile}
          onResetAllData={handleResetAllData}
        />
      </div>
    </div>
  );
}
