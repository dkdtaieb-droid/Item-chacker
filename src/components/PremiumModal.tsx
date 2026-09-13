import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Crown,
  Zap,
  Sparkles,
  Users,
  FileSpreadsheet,
  X,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
  currentLanguage: SupportedLanguage;
  reason?: 'limit_reached' | 'feature_locked';
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
  currentLanguage,
  reason = 'limit_reached',
}) => {
  const t = translations[currentLanguage] || translations.en;
  const isHi = currentLanguage === 'hi';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isOpen) return null;

  const handleStartTrialOrUpgrade = () => {
    // Fire festive celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onUpgradeSuccess();
    onClose();
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
      setTimeout(() => {
        handleStartTrialOrUpgrade();
      }, 700);
    }
  };

  return (
    <div
      id="premium-upgrade-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-amber-200/80 text-slate-800 my-auto relative overflow-hidden"
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-400" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close premium modal"
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center pt-2 pb-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-white shadow-lg shadow-amber-300/50 mb-3">
            <Crown className="h-8 w-8" />
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300/60 px-2.5 py-0.5 rounded-full mb-1">
            <Sparkles className="h-3 w-3" /> FoodCheck PRO
          </span>

          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {reason === 'limit_reached' ? t.freeLimitReached : t.upgradeToPremium}
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            {isHi
              ? 'मुफ्त उपयोगकर्ताओं को प्रतिदिन 8 स्कैन मिलते हैं। पूरे परिवार के स्वास्थ्य की सुरक्षा के लिए असीमित अनलॉक करें।'
              : 'Free users get 8 scans per day. Unlock unlimited family health protection.'}
          </p>
        </div>

        {/* Feature Comparison List */}
        <div className="space-y-2.5 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                {isHi ? 'असीमित बारकोड व उत्पाद स्कैन' : 'Unlimited Barcode & Food Scans'}
              </span>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'बिना किसी दैनिक सीमा के हमेशा के लिए' : 'Zero daily scan limits forever'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0">
              <FileSpreadsheet className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                {isHi ? 'व्यक्तिगत साप्ताहिक स्वास्थ्य रिपोर्ट' : 'Personalized Weekly Health Reports'}
              </span>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'कुल चीनी, नमक व स्वास्थ्य रुझानों की निगरानी' : 'Track cumulative sugar, salt & health trends'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0">
              <Users className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                {isHi ? 'पारिवारिक शेयरिंग (5 सदस्यों तक)' : 'Family Sharing (Up to 5 Profiles)'}
              </span>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'बच्चों, बुजुर्गों और स्वयं के लिए अलग-अलग अलर्ट' : 'Separate alerts for kids, parents & yourself'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                {isHi ? 'स्थायी ऑफलाइन स्कैन इतिहास' : 'Full Permanent Scan History'}
              </span>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'पुराने स्कैन कभी भी ऑफलाइन खोजें' : 'Search past items offline anytime'}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Selector */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            id="plan-yearly-btn"
            onClick={() => setBillingCycle('yearly')}
            className={`p-3 rounded-2xl border text-left relative transition-all ${
              billingCycle === 'yearly'
                ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/30'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <span className="absolute -top-2 right-2 text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">
              {isHi ? '50% छूट' : 'Save 50%'}
            </span>
            <div className="text-[11px] text-slate-500 font-semibold">
              {isHi ? 'वार्षिक प्लान' : 'Annual Plan'}
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5">
              ₹799 / {isHi ? 'वर्ष' : 'yr'}
            </div>
            <div className="text-[10px] text-emerald-700 font-bold">
              ₹66 / {isHi ? 'माह' : 'month'}
            </div>
          </button>

          <button
            type="button"
            id="plan-monthly-btn"
            onClick={() => setBillingCycle('monthly')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              billingCycle === 'monthly'
                ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/30'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="text-[11px] text-slate-500 font-semibold">
              {isHi ? 'मासिक प्लान' : 'Monthly Plan'}
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5">
              ₹149 / {isHi ? 'माह' : 'mo'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isHi ? 'कभी भी रद्द करें' : 'Cancel anytime'}
            </div>
          </button>
        </div>

        {/* Action Button: Start 7-Day Free Trial (Active upgrade) */}
        <div className="mt-4 space-y-2">
          <button
            type="button"
            id="start-free-trial-btn"
            onClick={handleStartTrialOrUpgrade}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-3 px-4 text-sm font-extrabold text-white shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Crown className="h-4 w-4" />
            <span>{isHi ? '7-दिन का निःशुल्क ट्रायल शुरू करें' : 'Start 7-Day Free Trial & Unlock All'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-[10px] text-center text-slate-400">
            {isHi
              ? 'ट्रायल के लिए किसी क्रेडिट कार्ड की आवश्यकता नहीं • तुरंत सक्रिय'
              : 'No credit card required for trial • Instant activation'}
          </p>
        </div>

        {/* Promo code drawer */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <form onSubmit={handleApplyPromo} className="flex gap-1.5">
            <input
              type="text"
              id="promo-code-input"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              placeholder={isHi ? 'प्रोमो कोड? उदा. HEALTHVIP' : 'Have code? e.g. HEALTHVIP'}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs uppercase text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              {promoApplied ? (isHi ? 'सफल!' : 'Unlocked!') : (isHi ? 'लागू करें' : 'Apply')}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
