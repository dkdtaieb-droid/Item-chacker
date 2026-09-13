import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Pill,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wine,
  Baby,
  Car,
  Activity,
  Sparkles,
  TrendingDown,
  Info,
  Languages,
  ShieldAlert,
  HeartPulse,
} from 'lucide-react';
import { MedicineProduct, SupportedLanguage, UserProfile } from '../types';
import {
  getDictionary,
  getLocalizedMedicineCategory,
  getLocalizedMedicineForm,
  getLocalizedScheduleCategory,
} from '../i18n/localizationHelper';

interface MedicineCardProps {
  medicine: MedicineProduct;
  userProfile: UserProfile;
  currentLanguage: SupportedLanguage;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  userProfile,
  currentLanguage,
}) => {
  const dict = getDictionary(currentLanguage);

  // Synchronize language state with app language
  const [activeLang, setActiveLang] = useState<'en' | 'hi'>(
    currentLanguage === 'hi' ? 'hi' : 'en'
  );

  useEffect(() => {
    setActiveLang(currentLanguage === 'hi' ? 'hi' : 'en');
  }, [currentLanguage]);

  const isHi = activeLang === 'hi';

  const getSafetyBadge = () => {
    const hasCritical = medicine.personalizedWarnings.some(w => w.severity === 'critical');
    const hasWarning = medicine.personalizedWarnings.some(w => w.severity === 'warning');

    if (hasCritical) {
      return {
        bg: 'bg-rose-600',
        textColor: 'text-rose-700',
        badgeBg: 'bg-rose-50 border-rose-200',
        text: dict.highCautionBadge,
        sub: dict.highCautionSub,
      };
    }
    if (medicine.scheduleCategory.includes('Schedule H')) {
      return {
        bg: 'bg-amber-600',
        textColor: 'text-amber-700',
        badgeBg: 'bg-amber-50 border-amber-200',
        text: dict.prescriptionBadge,
        sub: dict.prescriptionSub,
      };
    }
    if (hasWarning) {
      return {
        bg: 'bg-amber-500',
        textColor: 'text-amber-700',
        badgeBg: 'bg-amber-50 border-amber-200',
        text: isHi ? 'मध्यम सावधानी अपेक्षित' : 'Moderate Caution Advised',
        sub: isHi ? 'दवा लेते समय खुराक व निर्देशों का ध्यान रखें' : 'Follow dosage guidelines carefully',
      };
    }
    return {
      bg: 'bg-emerald-600',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      text: dict.safeOtcBadge,
      sub: dict.safeOtcSub,
    };
  };

  const safety = getSafetyBadge();

  const getPrecautionStatusLabel = (status: 'safe' | 'caution' | 'avoid') => {
    if (status === 'safe') return dict.statusSafe;
    if (status === 'caution') return dict.statusCaution;
    return dict.statusAvoid;
  };

  return (
    <div id="medicine-details-card" className="w-full space-y-4 text-slate-800">
      {/* Language Switcher Bar inside Medicine Card */}
      <div className="flex items-center justify-between rounded-2xl bg-blue-50/80 p-2.5 border border-blue-100 shadow-2xs">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-blue-700" />
          <span className="text-xs font-bold text-blue-950">
            {isHi ? 'दवा की जानकारी की भाषा:' : 'Medicine details language:'}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-blue-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveLang('hi')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'hi'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'en'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Primary Medicine Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200/80 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Medicine Form Icon / Image */}
          <div className="relative h-24 w-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mx-auto sm:mx-0 shadow-inner">
            <Pill className="h-10 w-10 text-blue-600" />
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-black text-white bg-blue-700 shadow-xs uppercase">
              {getLocalizedMedicineForm(medicine.form, activeLang)}
            </div>
          </div>

          {/* Medicine Meta */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                {medicine.manufacturer}
              </span>
              <span className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                {getLocalizedScheduleCategory(medicine.scheduleCategory, activeLang)}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
              {medicine.name}
            </h2>

            {/* Salt / Composition Banner */}
            <div className="mt-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                {dict.activeSaltTitle}
              </span>
              <span className="text-xs font-bold text-blue-900 leading-tight">
                {medicine.saltComposition}
              </span>
            </div>

            {/* Category Tag */}
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-semibold text-slate-400">{dict.categoryLabel} </span>
              <span className="font-bold text-slate-700">
                {getLocalizedMedicineCategory(medicine.category, activeLang)}
              </span>
            </p>
          </div>
        </div>

        {/* Safety Status Banner */}
        <div className={`mt-4 rounded-2xl p-3 border ${safety.badgeBg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-white ${safety.bg} shadow-xs flex-shrink-0`}>
              <HeartPulse className="h-4 w-4" />
            </div>
            <div>
              <div className={`text-xs font-bold leading-tight ${safety.textColor}`}>
                {safety.text}
              </div>
              <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                {safety.sub}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-600 whitespace-nowrap">
            {dict.barcodePrefix} {medicine.barcode}
          </span>
        </div>
      </motion.div>

      {/* PERSONALIZED WARNINGS MATCHED WITH USER HEALTH PROFILE */}
      {medicine.personalizedWarnings.length > 0 && (
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

          {medicine.personalizedWarnings.map((warning, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border transition-all ${
                warning.severity === 'critical'
                  ? 'bg-rose-50/95 border-rose-300 text-rose-950 shadow-sm ring-1 ring-rose-300/60'
                  : warning.severity === 'warning'
                  ? 'bg-amber-50/95 border-amber-300 text-amber-950 shadow-sm'
                  : 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    warning.severity === 'critical'
                      ? 'text-rose-600 animate-pulse'
                      : warning.severity === 'warning'
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                />
                <div>
                  <h4 className="font-bold text-sm leading-tight">
                    {warning.title[activeLang]}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {warning.message[activeLang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* KIS KAAM AATI HAI (USES) & HOW TO TAKE SIDE BY SIDE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* USES / KIS KAAM AATI HAI */}
        <div className="rounded-2xl bg-white p-4 border border-blue-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-blue-100 pb-2">
            <div className="p-1 rounded-lg bg-blue-100 text-blue-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900">
                {dict.keyUsesTitle}
              </h4>
              <span className="text-[10px] text-blue-600">
                {medicine.uses[activeLang].length} {dict.approvedIndicationsCount}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {medicine.uses[activeLang].map((useItem, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-blue-50/50 p-2.5 border border-blue-100 flex items-start gap-2 text-xs text-blue-950"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed font-medium">{useItem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HOW TO TAKE & TIMING */}
        <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <div className="p-1 rounded-lg bg-amber-100 text-amber-700">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                {dict.dosageHowToTakeTitle}
              </h4>
              <span className="text-[10px] text-slate-500">
                {dict.dosageRuleSubtitle}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/70">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                {dict.methodOfIntakeLabel}
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {medicine.howToTake[activeLang]}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/70">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                {dict.timingAndLimitLabel}
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {medicine.timing[activeLang]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIDE EFFECTS */}
      <div className="rounded-2xl bg-white p-4 border border-rose-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
          <div className="p-1 rounded-lg bg-rose-100 text-rose-700">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-900">
              {dict.possibleSideEffectsTitle}
            </h4>
            <span className="text-[10px] text-rose-600">
              {dict.sideEffectsSubtitle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {medicine.sideEffects[activeLang].map((effect, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-rose-50/50 p-2.5 border border-rose-100 flex items-start gap-2 text-rose-950 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
              <span>{effect}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PRECAUTIONS / SAVDHANIYAAN GRID */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {dict.safetyPrecautionsTitle}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Alcohol */}
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Wine className="h-4 w-4 text-slate-500" />
                {dict.alcoholLabel}
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  medicine.precautions.alcohol.status === 'safe'
                    ? 'bg-emerald-100 text-emerald-700'
                    : medicine.precautions.alcohol.status === 'caution'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {getPrecautionStatusLabel(medicine.precautions.alcohol.status)}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {medicine.precautions.alcohol.text[activeLang]}
            </p>
          </div>

          {/* Pregnancy */}
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Baby className="h-4 w-4 text-slate-500" />
                {dict.pregnancyLabel}
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  medicine.precautions.pregnancy.status === 'safe'
                    ? 'bg-emerald-100 text-emerald-700'
                    : medicine.precautions.pregnancy.status === 'caution'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {getPrecautionStatusLabel(medicine.precautions.pregnancy.status)}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {medicine.precautions.pregnancy.text[activeLang]}
            </p>
          </div>

          {/* Driving */}
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Car className="h-4 w-4 text-slate-500" />
                {dict.drivingLabel}
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  medicine.precautions.driving.status === 'safe'
                    ? 'bg-emerald-100 text-emerald-700'
                    : medicine.precautions.driving.status === 'caution'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {getPrecautionStatusLabel(medicine.precautions.driving.status)}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {medicine.precautions.driving.text[activeLang]}
            </p>
          </div>

          {/* Kidney / Liver */}
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-slate-500" />
                {dict.kidneyLiverLabel}
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  medicine.precautions.kidney.status === 'safe'
                    ? 'bg-emerald-100 text-emerald-700'
                    : medicine.precautions.kidney.status === 'caution'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {getPrecautionStatusLabel(medicine.precautions.kidney.status)}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {medicine.precautions.kidney.text[activeLang]}
            </p>
          </div>
        </div>
      </div>

      {/* JAN AUSHADHI / GENERIC SUBSTITUTE */}
      {medicine.genericAlternative && (
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
                {dict.genericAlternativeTitle}
              </h3>
              <p className="text-[11px] text-emerald-700 font-medium">
                {dict.genericAlternativeSub}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-emerald-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {dict.janAushadhiBadge}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  {medicine.genericAlternative.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {medicine.genericAlternative.salt}
                </p>
              </div>

              {/* Price comparison badge */}
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                <TrendingDown className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="text-[10px] font-bold text-emerald-800 uppercase">
                    {medicine.genericAlternative.savingsPercent} {dict.savingsSuffix}
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">
                    <span className="line-through text-slate-400 font-normal mr-1">
                      {medicine.genericAlternative.brandedPrice}
                    </span>
                    <span className="text-emerald-700">
                      {medicine.genericAlternative.genericPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {medicine.genericAlternative.description[activeLang]}
            </p>
          </div>
        </motion.div>
      )}

      {/* Medical Disclaimer */}
      <div className="rounded-2xl bg-slate-100 p-3 border border-slate-200 text-slate-600 flex items-start gap-2 text-[11px] leading-relaxed">
        <Info className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>{dict.disclaimerMedicine}</span>
      </div>
    </div>
  );
};
