import React from 'react';
import { motion } from 'motion/react';
import {
  FileSpreadsheet,
  X,
  HeartPulse,
  Lock,
  Crown,
} from 'lucide-react';
import { ScannedRecord, SupportedLanguage, UserProfile } from '../types';
import { getDictionary } from '../i18n/localizationHelper';

interface WeeklyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onOpenUpgrade: () => void;
  records: ScannedRecord[];
  userProfile: UserProfile;
  currentLanguage: SupportedLanguage;
}

export const WeeklyReportModal: React.FC<WeeklyReportModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  onOpenUpgrade,
  records,
  userProfile,
  currentLanguage,
}) => {
  const dict = getDictionary(currentLanguage);
  const isHi = currentLanguage === 'hi';

  if (!isOpen) return null;

  const totalScans = records.length;
  const healthyCount = records.filter(r => r.product ? r.product.isHealthy : true).length;
  const unhealthyCount = totalScans - healthyCount;
  const healthyPercentage = totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 100;

  // Aggregate averages
  let totalSugar = 0;
  let totalSodium = 0;
  records.forEach(r => {
    if (r.product) {
      totalSugar += r.product.nutriments?.sugars_serving || (r.product.nutriments?.sugars_100g ? r.product.nutriments.sugars_100g * 0.4 : 0);
      totalSodium += (r.product.nutriments?.sodium_100g || 150) * 0.4;
    }
  });

  return (
    <div
      id="weekly-report-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800 my-auto relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                {dict.navWeekly}
                {isPremium && (
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                    {dict.proBadge}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isHi
                  ? `${userProfile.name || 'आपके'} (${userProfile.age} वर्ष) के लिए साप्ताहिक पोषण स्कोर`
                  : `Weekly nutrition score for ${userProfile.name || 'You'} (${userProfile.age} yrs)`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* If Not Premium, show clean preview with unlock CTA */}
        {!isPremium && (
          <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-500/10 p-5 border border-amber-200 text-center mb-4 relative overflow-hidden">
            <div className="flex justify-center mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-300">
                <Lock className="h-6 w-6" />
              </div>
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">
              {isHi
                ? 'व्यक्तिगत साप्ताहिक रिपोर्ट एक प्रो (PRO) फीचर है'
                : 'Personalized Weekly Reports is a PRO Feature'}
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              {isHi
                ? 'स्कैन किए गए उत्पादों, कुल चीनी/सोडियम मात्रा और पोषण विशेषज्ञ की सलाह का साप्ताहिक विश्लेषण प्राप्त करें।'
                : 'Get an automated breakdown of your scanned products, net sugar/sodium load, and weekly dietitian insights.'}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenUpgrade();
              }}
              className="mt-3 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-all inline-flex items-center gap-1.5"
            >
              <Crown className="h-4 w-4" />
              <span>{isHi ? '7-दिन के निःशुल्क ट्रायल के साथ शुरू करें' : 'Unlock with 7-Day Free Trial'}</span>
            </button>
          </div>
        )}

        {/* Content (Active or Preview) */}
        <div className={`space-y-4 ${!isPremium ? 'opacity-40 blur-[1px] pointer-events-none' : ''}`}>
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {isHi ? 'कुल स्कैन' : 'Total Scans'}
              </span>
              <span className="text-lg font-black text-slate-900">{totalScans}</span>
              <span className="text-[10px] text-slate-500 block">{isHi ? 'इस सप्ताह' : 'This week'}</span>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3 border border-emerald-100 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                {isHi ? 'सुरक्षित विकल्प' : 'Healthy Picks'}
              </span>
              <span className="text-lg font-black text-emerald-700">{healthyCount}</span>
              <span className="text-[10px] text-emerald-600 block">{healthyPercentage}% {dict.statusSafe}</span>
            </div>

            <div className="rounded-2xl bg-rose-50 p-3 border border-rose-100 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-700 block">
                {isHi ? 'जोखिम वाले' : 'High Risk'}
              </span>
              <span className="text-lg font-black text-rose-700">{unhealthyCount}</span>
              <span className="text-[10px] text-rose-600 block">
                {isHi ? 'चेतावनियां मिलीं' : 'Warnings'}
              </span>
            </div>
          </div>

          {/* Cumulative Intake Gauges */}
          <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isHi ? 'पोषक तत्व सेवन प्रभाव' : 'Nutrient Ingestion Impact'}
            </h4>

            {/* Sugar Meter */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">
                  {isHi ? 'अनुमानित कुल चीनी (Sugar)' : 'Estimated Scanned Sugar'}
                </span>
                <span className="font-bold text-slate-900">{totalSugar.toFixed(0)}g {isHi ? 'कुल' : 'total'}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    totalSugar > 60 ? 'bg-rose-500' : totalSugar > 30 ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalSugar / 90) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {isHi ? 'अनुशंसित अधिकतम अतिरिक्त चीनी: 25g - 36g / दिन' : 'Recommended max added sugar: 25g - 36g/day'}
              </span>
            </div>

            {/* Sodium Meter */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">
                  {isHi ? 'अनुमानित कुल सोडियम (नमक)' : 'Estimated Scanned Sodium'}
                </span>
                <span className="font-bold text-slate-900">{totalSodium.toFixed(0)}mg</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    totalSodium > 2000 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalSodium / 2500) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {isHi ? 'WHO दैनिक सोडियम सीमा: 2000mg' : 'WHO daily sodium ceiling: 2000mg'}
              </span>
            </div>
          </div>

          {/* Condition-specific Advice Card */}
          <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200 text-xs">
            <div className="flex items-start gap-2">
              <HeartPulse className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-emerald-950">
                  {isHi ? `${userProfile.name || 'आपके'} लिए विशेष स्वास्थ्य सलाह:` : `Tailored Advice for ${userProfile.name || 'You'}:`}
                </h5>
                <p className="text-emerald-800 mt-1 leading-relaxed">
                  {userProfile.conditions.includes('diabetes')
                    ? (isHi
                        ? '⚠️ ध्यान दें: इस सप्ताह आपने अधिक शर्करा वाले पैकेज्ड खाद्य पदार्थों को स्कैन किया। रक्त शर्करा (HbA1c) स्थिर रखने के लिए बिना फ्लेवर वाले डेयरी, साबुत अनाज और प्रोटीन-युक्त खाद्य पदार्थों को प्राथमिकता दें।'
                        : '⚠️ Notice: You scanned high-sugar packaged foods this week. Prioritize unflavored dairy, whole grains, and protein-forward snacks to maintain stable blood sugar.')
                    : userProfile.conditions.includes('high_bp')
                    ? (isHi
                        ? '⚠️ ध्यान दें: इंस्टेंट नूडल्स और तले हुए चिप्स सोडियम की मात्रा बढ़ा सकते हैं। मखाने, भुने चने या ताजे फलों को चुनें।'
                        : '⚠️ Notice: Look out for instant noodles and fried crisps which contributed to elevated sodium spikes. Choose roasted foxnuts or fresh fruits.')
                    : userProfile.age < 18
                    ? (isHi
                        ? '⭐ विकास के लिए उत्तम प्रयास! मीठे सोडा पेय की जगह दूध और फाइबर युक्त स्वास्थ्यवर्धक स्नैक्स का चुनाव जारी रखें।'
                        : '⭐ Great job focusing on bone and muscle growth! Keep opting for whole milk and fiber-rich snacks instead of sugary energy sodas.')
                    : (isHi
                        ? '🎉 बेहतरीन निरंतरता! खाने से पहले पैकेज्ड खाद्य पदार्थों की जांच करना आपको हानिकारक ट्रांस-फैट और अतिरिक्त कॉर्न सिरप से बचाता है।'
                        : '🎉 Good consistency! Scanning packaged foods before consumption helps you avoid hidden industrial trans fats and excess corn syrup.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
          >
            {isHi ? 'रिपोर्ट बंद करें' : 'Close Report'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
