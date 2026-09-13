import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Check, Globe } from 'lucide-react';
import { Gender, HealthConditionKey, SupportedLanguage, UserProfile } from '../types';
import { conditionLabels, languageList, translations } from '../i18n/translations';

interface OnboardingModalProps {
  isOpen: boolean;
  initialProfile?: UserProfile | null;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSave: (profile: UserProfile) => void;
  onClose?: () => void;
  isEditing?: boolean;
}

const CONDITION_KEYS: HealthConditionKey[] = [
  'diabetes',
  'high_bp',
  'low_bp',
  'thyroid',
  'obesity',
  'heart_problem',
  'kidney_issue',
  'nut_allergy',
  'gluten_allergy',
  'lactose_intolerance',
  'none',
  'other',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  initialProfile,
  currentLanguage,
  onLanguageChange,
  onSave,
  onClose,
  isEditing = false,
}) => {
  const t = translations[currentLanguage] || translations.en;

  const [name, setName] = useState(initialProfile?.name || '');
  const [age, setAge] = useState<string>(initialProfile?.age ? String(initialProfile.age) : '');
  const [gender, setGender] = useState<Gender>(initialProfile?.gender || 'Male');
  const [selectedConditions, setSelectedConditions] = useState<HealthConditionKey[]>(
    initialProfile?.conditions || ['none']
  );
  const [customCondition, setCustomCondition] = useState(initialProfile?.customCondition || '');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const toggleCondition = (key: HealthConditionKey) => {
    if (key === 'none') {
      setSelectedConditions(['none']);
      return;
    }

    let updated = selectedConditions.filter(c => c !== 'none');
    if (updated.includes(key)) {
      updated = updated.filter(c => c !== key);
      if (updated.length === 0) {
        updated = ['none'];
      }
    } else {
      updated.push(key);
    }
    setSelectedConditions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'कृपया 1 से 120 के बीच सही आयु दर्ज करें।'
          : 'Please enter a valid age between 1 and 120.'
      );
      return;
    }

    const finalConditions = selectedConditions.length === 0 ? ['none' as HealthConditionKey] : selectedConditions;

    const profile: UserProfile = {
      id: initialProfile?.id || `user_${Date.now()}`,
      name: name.trim(),
      age: parsedAge,
      gender,
      conditions: finalConditions,
      customCondition: finalConditions.includes('other') ? customCondition.trim() : undefined,
      isCompleted: true,
      createdAt: initialProfile?.createdAt || new Date().toISOString(),
    };

    onSave(profile);
  };

  return (
    <div
      id="onboarding-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 my-8 text-slate-800"
      >
        {/* Header with App Logo & Language toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900 leading-tight">
                {isEditing ? t.profile : 'FoodCheck'}
              </h2>
              <p className="text-xs text-emerald-700 font-medium">
                {isEditing
                  ? t.setupTitle
                  : currentLanguage === 'hi'
                  ? 'बिना लॉगिन / साइनअप • तुरंत स्वास्थ्य जांच'
                  : 'Zero Signup • Instant Health Check'}
              </p>
            </div>
          </div>

          {/* Quick Language Dropdown */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <select
              aria-label="Select Language"
              value={currentLanguage}
              onChange={e => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
            >
              {languageList.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">
            {t.setupTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {t.setupSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Optional) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              {t.nameOptional}
            </label>
            <input
              type="text"
              id="user-name-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Age (Required) & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                {t.ageRequired} <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                id="user-age-input"
                required
                min={1}
                max={120}
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder={t.agePlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {parseInt(age, 10) < 18
                  ? (currentLanguage === 'hi'
                      ? '⚡ 18 वर्ष से कम: विकास व पोषण निर्देश सक्रिय'
                      : '⚡ Under 18: Growth alerts enabled')
                  : (currentLanguage === 'hi'
                      ? 'व्यक्तिगत स्वास्थ्य चेतावनियों के लिए प्रयुक्त'
                      : 'Used for personalized warnings')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                {t.gender}
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                {(['Male', 'Female', 'Other'] as Gender[]).map(g => (
                  <button
                    type="button"
                    key={g}
                    id={`gender-${g.toLowerCase()}`}
                    onClick={() => setGender(g)}
                    className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                      gender === g
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {g === 'Male' ? t.male : g === 'Female' ? t.female : t.other}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Health Conditions & Suggestion Chips */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t.healthConditions}
              </label>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Heart className="h-3 w-3" /> {currentLanguage === 'hi' ? 'कई विकल्प चुन सकते हैं' : 'Multi-select'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">
              {t.healthConditionsSubtitle}
            </p>

            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 py-1">
              {CONDITION_KEYS.map(key => {
                const isSelected = selectedConditions.includes(key);
                const label = conditionLabels[key]?.[currentLanguage] || conditionLabels[key]?.en || key;
                const isNone = key === 'none';

                return (
                  <button
                    type="button"
                    key={key}
                    id={`chip-${key}`}
                    onClick={() => toggleCondition(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? isNone
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
                          : 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom "Other" Condition Input Box */}
            {selectedConditions.includes('other') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2.5"
              >
                <input
                  type="text"
                  id="custom-condition-input"
                  value={customCondition}
                  onChange={e => setCustomCondition(e.target.value)}
                  placeholder={t.otherConditionPlaceholder}
                  className="w-full rounded-xl border border-amber-300 bg-amber-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
              </motion.div>
            )}
          </div>

          {errorMessage && (
            <div className="rounded-lg bg-rose-50 p-2.5 text-xs font-semibold text-rose-600 border border-rose-200">
              {errorMessage}
            </div>
          )}

          {/* Privacy Note */}
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
            <Sparkles className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>{t.savedLocallyNote}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {isEditing && onClose && (
              <button
                type="button"
                id="cancel-profile-btn"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
            )}
            <button
              type="submit"
              id="save-profile-btn"
              className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <span>{t.saveAndContinue}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
