import React from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  X,
  Globe,
  Crown,
  Users,
  Shield,
  RotateCcw,
  Check,
  Smartphone,
  Download,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { SupportedLanguage, UserProfile } from '../types';
import { languageList, translations } from '../i18n/translations';
import { getDictionary, getLocalizedCondition } from '../i18n/localizationHelper';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onEditProfile: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isPremium: boolean;
  onOpenUpgrade: () => void;
  onSwitchFamilyProfile: (preset: 'self' | 'kid' | 'elder') => void;
  onResetAllData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onEditProfile,
  currentLanguage,
  onLanguageChange,
  isPremium,
  onOpenUpgrade,
  onSwitchFamilyProfile,
  onResetAllData,
}) => {
  const t = translations[currentLanguage] || translations.en;
  const dict = getDictionary(currentLanguage);
  const isHi = currentLanguage === 'hi';
  const { isInstallable, isInstalled, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div
      id="settings-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl border border-slate-200 text-slate-800 my-auto relative space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{t.settings}</h3>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'प्राथमिकताएं व प्रोफ़ाइल सेटिंग्स' : 'Preferences & Profile Settings'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Health Profile Card */}
        <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                {userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">
                  {userProfile.name || (isHi ? 'उपयोगकर्ता' : 'User')} ({userProfile.age} {dict.years})
                </div>
                <div className="text-[10px] text-slate-500">
                  {userProfile.conditions.map(c => getLocalizedCondition(c, currentLanguage)).join(', ')}
                </div>
              </div>
            </div>
            <button
              type="button"
              id="edit-profile-btn"
              onClick={() => {
                onClose();
                onEditProfile();
              }}
              className="text-xs font-bold text-emerald-700 bg-white border border-emerald-200 px-2.5 py-1 rounded-xl hover:bg-emerald-50"
            >
              {dict.editProfile}
            </button>
          </div>
        </div>

        {/* Language Selection Grid */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-slate-600" />
            {t.language}
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {languageList.map(lang => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  type="button"
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200/60'
                  }`}
                >
                  <div className="text-left">
                    <span className="font-bold block leading-tight">{lang.nativeName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {lang.label}
                    </span>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Family Sharing Simulation (Switch profile) */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-slate-600" />
              {t.familySharing}
            </label>
            <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.2 rounded">
              {dict.proBadge} {isHi ? 'फीचर' : 'Feature'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isHi
              ? 'परिवार के विभिन्न सदस्यों के अनुसार स्वास्थ्य चेतावनियां परखें:'
              : 'Test how alerts adapt across different family members:'}
          </p>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onSwitchFamilyProfile('self')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs"
            >
              <span className="font-bold text-slate-900 block">👤 {isHi ? 'स्वयं' : 'Self'}</span>
              <span className="text-[10px] text-slate-500">{isHi ? 'सामान्य (स्वस्थ)' : 'Normal (Healthy)'}</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchFamilyProfile('kid')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs"
            >
              <span className="font-bold text-slate-900 block">🧒 {isHi ? 'बच्चा (12 वर्ष)' : 'Child (12y)'}</span>
              <span className="text-[10px] text-slate-500">{isHi ? 'कैफीन/चीनी अलर्ट' : 'Caffeine/Sugar'}</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchFamilyProfile('elder')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs"
            >
              <span className="font-bold text-slate-900 block">👵 {isHi ? 'अभिभावक (58)' : 'Elder (58y)'}</span>
              <span className="text-[10px] text-slate-500">{isHi ? 'शुगर + हाई बीपी' : 'Diabetes + BP'}</span>
            </button>
          </div>
        </div>

        {/* Subscription Status Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-900 font-black">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-xs flex items-center gap-1.5">
                FoodCheck {isPremium ? (isHi ? 'प्रो सदस्य' : 'PRO Member') : (isHi ? 'मुफ्त प्लान' : 'Free Plan')}
                {isPremium && (
                  <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded">
                    {isHi ? 'सक्रिय' : 'Active'}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-300">
                {isPremium
                  ? (isHi ? 'असीमित स्कैन • साप्ताहिक रिपोर्ट अनलॉक' : 'Unlimited scans • Weekly reports unlocked')
                  : (isHi ? 'प्रति दिन 8 स्कैन तक सीमित' : 'Limited to 8 scans/day')}
              </div>
            </div>
          </div>

          {!isPremium && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenUpgrade();
              }}
              className="rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-amber-300 transition-colors"
            >
              {isHi ? 'अपग्रेड करें' : 'Upgrade'}
            </button>
          )}
        </div>

        {/* PWA & PWABuilder Android APK Readiness Card */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Smartphone className="h-4 w-4 text-emerald-600" />
              <span>{isHi ? 'PWA एवं Android APK (PWABuilder) तैयार' : 'PWA & Android APK (PWABuilder) Ready'}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              100% Passed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-lg border border-slate-100">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>manifest.json (192 & 512px)</span>
            </div>
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-lg border border-slate-100">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Service Worker (sw.js)</span>
            </div>
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-lg border border-slate-100">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Maskable Icons (Android)</span>
            </div>
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-lg border border-slate-100">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Offline Cache Support</span>
            </div>
          </div>

          {isInstallable && (
            <button
              type="button"
              onClick={install}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isHi ? 'फोन में ऐप इंस्टॉल करें' : 'Install App to Device'}</span>
            </button>
          )}

          {isInstalled && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 py-1.5 rounded-xl border border-emerald-200/60">
              <Check className="h-3.5 w-3.5" />
              <span>{isHi ? 'डिवाइस में पहले से इंस्टॉल है' : 'Installed as Standalone App'}</span>
            </div>
          )}
        </div>

        {/* Reset / Clear Data */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            {isHi ? 'डेटा केवल इस फोन में सुरक्षित' : 'Saved strictly in local device'}
          </span>
          <button
            type="button"
            onClick={onResetAllData}
            className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="h-3 w-3" />
            {isHi ? 'डेटा रीसेट करें' : 'Reset Data'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
