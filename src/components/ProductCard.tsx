import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Info,
} from 'lucide-react';
import { FoodProduct, NutriGrade, SupportedLanguage, UserProfile } from '../types';
import { getDictionary, getLocalizedNutrient } from '../i18n/localizationHelper';

interface ProductCardProps {
  product: FoodProduct;
  userProfile: UserProfile;
  currentLanguage: SupportedLanguage;
  onSelectAlternative?: (altName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  userProfile,
  currentLanguage,
  onSelectAlternative,
}) => {
  const dict = getDictionary(currentLanguage);
  const isHi = currentLanguage === 'hi';

  const getScoreTheme = (score: number, grade?: NutriGrade) => {
    if (score >= 8.0 || grade === 'a') {
      return {
        bg: 'bg-emerald-500',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        cardBg: 'bg-emerald-50/50',
        label: isHi ? 'उत्तम विकल्प' : 'Excellent Choice',
        badge: `${dict.gradePrefix} A`,
        colorHex: '#10b981',
      };
    }
    if (score >= 6.5 || grade === 'b') {
      return {
        bg: 'bg-lime-500',
        text: 'text-lime-700',
        border: 'border-lime-200',
        cardBg: 'bg-lime-50/50',
        label: isHi ? 'अच्छा व पौष्टिक' : 'Good & Nutritious',
        badge: `${dict.gradePrefix} B`,
        colorHex: '#84cc16',
      };
    }
    if (score >= 4.5 || grade === 'c') {
      return {
        bg: 'bg-amber-500',
        text: 'text-amber-700',
        border: 'border-amber-200',
        cardBg: 'bg-amber-50/50',
        label: isHi ? 'संतुलित मात्रा में लें' : 'Moderate / In Moderation',
        badge: `${dict.gradePrefix} C`,
        colorHex: '#f59e0b',
      };
    }
    if (score >= 2.5 || grade === 'd') {
      return {
        bg: 'bg-orange-500',
        text: 'text-orange-700',
        border: 'border-orange-200',
        cardBg: 'bg-orange-50/50',
        label: isHi ? 'अस्वस्थ / अधिक सेवन न करें' : 'Unhealthy / High Risk',
        badge: `${dict.gradePrefix} D`,
        colorHex: '#f97316',
      };
    }
    return {
      bg: 'bg-rose-600',
      text: 'text-rose-700',
      border: 'border-rose-200',
      cardBg: 'bg-rose-50/50',
      label: isHi ? 'आपके लिए नुकसानदेह' : 'Not Recommended for You',
      badge: `${dict.gradePrefix} E`,
      colorHex: '#e11d48',
    };
  };

  const theme = getScoreTheme(product.healthScoreNumber, product.nutriscore_grade);

  // Check if dates are present and calculate freshness
  const exp = product.expiry_date;
  let isExpired = false;
  if (exp) {
    const expDate = new Date(exp);
    if (!isNaN(expDate.getTime()) && expDate < new Date('2026-09-13')) {
      isExpired = true;
    }
  }

  return (
    <div id="scanned-product-card" className="w-full space-y-4 text-slate-800">
      {/* Primary Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200/80 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Product Image */}
          <div className="relative h-28 w-28 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner flex items-center justify-center mx-auto sm:mx-0">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.product_name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <Layers className="h-10 w-10 text-slate-300" />
            )}

            {/* Nutri-Score Letter Overlay */}
            <div
              className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[11px] font-black text-white shadow-sm uppercase ${theme.bg}`}
            >
              {dict.gradePrefix} {product.nutriscore_grade?.toUpperCase() || 'C'}
            </div>
          </div>

          {/* Product Meta */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {product.brands || dict.packagedBrand}
              </span>
              {product.quantity && (
                <span className="text-[11px] text-slate-400 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                  {product.quantity}
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {product.product_name}
            </h2>

            {product.categories && (
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {product.categories}
              </p>
            )}

            {/* Health Score Pill */}
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200/80 px-3 py-1.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow-sm ${theme.bg}`}
                >
                  {product.healthScoreNumber}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">
                    {dict.healthScoreTitle}
                  </div>
                  <div className={`text-xs font-bold leading-tight ${theme.text}`}>
                    {theme.label}
                  </div>
                </div>
              </div>

              {/* Nutri-score 5-color bar */}
              <div className="hidden xs:flex items-center gap-0.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200">
                {(['a', 'b', 'c', 'd', 'e'] as NutriGrade[]).map(g => {
                  const isCurrent = product.nutriscore_grade === g;
                  const colors: Record<NutriGrade, string> = {
                    a: 'bg-emerald-600',
                    b: 'bg-lime-500',
                    c: 'bg-amber-400',
                    d: 'bg-orange-500',
                    e: 'bg-rose-600',
                  };
                  return (
                    <span
                      key={g}
                      className={`h-5 w-4 rounded text-[10px] font-black uppercase flex items-center justify-center transition-all ${
                        isCurrent
                          ? `${colors[g]} text-white scale-110 shadow-sm ring-2 ring-white`
                          : 'bg-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Serving & Dates Banner */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {dict.caloriesPerServing}
              </div>
              <div className="font-bold text-slate-800 text-sm">
                {product.calories_serving || 120} kcal
                <span className="text-[10px] text-slate-400 font-normal ml-1">
                  ({product.serving_size || (isHi ? '1 पैकेट' : '1 pack')})
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {dict.mfgExpDate}
              </div>
              <div className="font-bold text-slate-800 text-xs truncate">
                {exp ? exp : dict.batchVerified}
                {isExpired && (
                  <span className="ml-1 text-[10px] text-rose-600 font-extrabold bg-rose-100 px-1 py-0.5 rounded">
                    {dict.freshnessExpired}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-50 p-2.5 border border-slate-100 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isHi ? 'ताज़गी स्थिति' : 'Freshness'}
              </div>
              <div className="font-bold text-slate-800 text-xs">
                {isExpired ? dict.freshnessCheck : dict.freshnessSafe}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* PERSONALIZED WARNINGS & HEALTH ALERTS */}
      {product.personalizedWarnings && product.personalizedWarnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2.5"
        >
          <div className="flex items-center gap-1.5 px-1">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {dict.personalizedForYou}
            </h3>
            <span className="ml-auto text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              {userProfile.name || dict.forUser} ({userProfile.age} {dict.years})
            </span>
          </div>

          {product.personalizedWarnings.map((warning, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border transition-all ${
                warning.severity === 'critical'
                  ? 'bg-rose-50/90 border-rose-300 text-rose-950 shadow-sm ring-1 ring-rose-300/50'
                  : 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    warning.severity === 'critical' ? 'text-rose-600 animate-pulse' : 'text-amber-600'
                  }`}
                />
                <div>
                  <h4 className="font-bold text-sm leading-tight">
                    {warning.title}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {warning.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Growth boost highlights for under 18 */}
      {product.growthHighlights && product.growthHighlights.length > 0 && (
        <div className="rounded-2xl bg-emerald-50/90 border border-emerald-300 p-3.5 text-emerald-950">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs uppercase tracking-wide text-emerald-800">
                {dict.growthNotice}
              </div>
              {product.growthHighlights.map((gh, idx) => (
                <p key={idx} className="text-xs mt-1 leading-relaxed">
                  {gh}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* General Advice */}
      {product.generalAdvice && product.generalAdvice.length > 0 && (
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-slate-700">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs uppercase tracking-wide text-slate-800">
                {dict.generalWellnessAdvice}
              </div>
              <ul className="text-xs mt-1 space-y-1 list-disc list-inside text-slate-600">
                {product.generalAdvice.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* WHAT IS GOOD vs WHAT IS BAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* WHAT IS GOOD */}
        <div className="rounded-2xl bg-white p-4 border border-emerald-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
            <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800">
                {dict.whatIsGoodTitle}
              </h4>
              <span className="text-[10px] text-emerald-600">
                {product.goodItems.length} {dict.beneficialCountText}
              </span>
            </div>
          </div>

          {product.goodItems.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              {dict.noGoodItemsFound}
            </p>
          ) : (
            <div className="space-y-2">
              {product.goodItems.map(item => (
                <div
                  key={item.id}
                  className="rounded-xl bg-emerald-50/60 p-2.5 border border-emerald-100/70 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-emerald-900">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                      {item.reason}
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-md shadow-2xs whitespace-nowrap">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WHAT IS BAD */}
        <div className="rounded-2xl bg-white p-4 border border-rose-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
            <div className="p-1 rounded-lg bg-rose-100 text-rose-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800">
                {dict.whatIsBadTitle}
              </h4>
              <span className="text-[10px] text-rose-600">
                {product.badItems.length} {dict.riskCountText}
              </span>
            </div>
          </div>

          {product.badItems.length === 0 ? (
            <p className="text-xs text-emerald-600 font-medium py-2">
              ✨ {dict.noBadItemsFound}
            </p>
          ) : (
            <div className="space-y-2">
              {product.badItems.map(item => (
                <div
                  key={item.id}
                  className="rounded-xl bg-rose-50/60 p-2.5 border border-rose-100/70 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-rose-900">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                      {item.reason}
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-rose-700 bg-white px-2 py-0.5 rounded-md shadow-2xs whitespace-nowrap">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nutritional Breakdown Table */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          {dict.nutritionalBreakdownTitle}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-semibold">
              {getLocalizedNutrient('energy', currentLanguage)}
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {product.nutriments?.energy_kcal_100g || 0} kcal
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-semibold">
              {getLocalizedNutrient('protein', currentLanguage)}
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {(product.nutriments?.proteins_100g ?? 0).toFixed(1)}g
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-semibold">
              {getLocalizedNutrient('sugars', currentLanguage)}
            </span>
            <span
              className={`font-bold text-sm ${
                (product.nutriments?.sugars_100g ?? 0) > 10 ? 'text-rose-600' : 'text-slate-900'
              }`}
            >
              {(product.nutriments?.sugars_100g ?? 0).toFixed(1)}g
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-semibold">
              {getLocalizedNutrient('salt', currentLanguage)}
            </span>
            <span
              className={`font-bold text-sm ${
                (product.nutriments?.salt_100g ?? 0) > 1.2 ? 'text-rose-600' : 'text-slate-900'
              }`}
            >
              {(product.nutriments?.salt_100g ?? 0).toFixed(2)}g
            </span>
          </div>
        </div>

        {product.ingredients_text && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              {isHi ? 'सामग्री सूची (Ingredients):' : 'Full Ingredients List:'}
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed max-h-24 overflow-y-auto bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {product.ingredients_text}
            </p>
          </div>
        )}
      </div>

      {/* HEALTHIER ALTERNATIVES */}
      {product.healthierAlternatives && product.healthierAlternatives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-50/50 to-emerald-500/5 p-5 border border-emerald-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {dict.healthierAlternativesTitle}
              </h3>
              <p className="text-[11px] text-emerald-700 font-medium">
                {isHi ? 'इस श्रेणी में स्वास्थ्यवर्धक विकल्प' : 'Smarter swaps for this product category'}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {product.healthierAlternatives.map(alt => (
              <div
                key={alt.id}
                className="rounded-2xl bg-white p-3.5 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={alt.image_url}
                    alt={alt.name}
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        {dict.gradePrefix} {alt.nutriscore_grade.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {alt.brand}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 mt-0.5">
                      {alt.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      <strong className="text-emerald-700 font-semibold">{dict.whyBetterLabel}</strong>{' '}
                      {alt.reasonWhyBetter}
                    </p>
                  </div>
                </div>

                {onSelectAlternative && (
                  <button
                    type="button"
                    onClick={() => onSelectAlternative(alt.name)}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors flex-shrink-0"
                  >
                    <span>{isHi ? 'इसे देखें' : 'Check This'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Food Disclaimer */}
      <div className="rounded-2xl bg-slate-100 p-3 border border-slate-200 text-slate-600 flex items-start gap-2 text-[11px] leading-relaxed">
        <Info className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>{dict.disclaimerFood}</span>
      </div>
    </div>
  );
};
