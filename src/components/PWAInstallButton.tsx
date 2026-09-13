import React, { useState } from 'react';
import { Download, Share2, X, Smartphone, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { SupportedLanguage } from '../types';

interface PWAInstallButtonProps {
  currentLanguage: SupportedLanguage;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ currentLanguage }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const isHi = currentLanguage === 'hi';

  // If already running as installed standalone PWA / APK, hide the install button
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop prompt flow
  if (isInstallable) {
    return (
      <button
        type="button"
        id="pwa-install-banner-btn"
        onClick={install}
        className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all"
      >
        <Download className="h-3.5 w-3.5 animate-bounce" />
        <span>{isHi ? 'ऐप इंस्टॉल करें' : 'Install App'}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          id="pwa-ios-install-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition-all"
        >
          <Smartphone className="h-3.5 w-3.5 text-slate-600" />
          <span>{isHi ? 'iOS पर जोड़ें' : 'Add to Home'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {isHi ? 'होम स्क्रीन पर जोड़ें (iOS)' : 'Install on iPhone / iPad'}
                    </h3>
                    <p className="text-[11px] text-slate-500">FoodCheck Mobile App</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span>
                    {isHi
                      ? 'Safari ब्राउज़र के नीचे शेयर (Share) बटन 📤 दबाएं।'
                      : 'Tap the Share button 📤 in Safari.'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span>
                    {isHi
                      ? 'नीचे स्क्रॉल करें और "Add to Home Screen" (होम स्क्रीन पर जोड़ें) चुनें।'
                      : 'Scroll down and tap "Add to Home Screen".'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span>
                    {isHi
                      ? 'ऊपर दाएँ कोने में "Add" पर क्लिक करें।'
                      : 'Tap "Add" in top right corner.'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                {isHi ? 'समझ गया' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback direct button for users on other browsers: allows manual download guidance or shortcut
  return (
    <button
      type="button"
      id="pwa-install-fallback-btn"
      onClick={() => {
        alert(
          isHi
            ? 'अपने ब्राउज़र मेनू (⋮) पर क्लिक करें और "Install App" या "Add to Home Screen" चुनें।'
            : 'Tap your browser menu (⋮) and choose "Install App" or "Add to Home screen".'
        );
      }}
      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition-all"
    >
      <Download className="h-3.5 w-3.5 text-slate-500" />
      <span>{isHi ? 'ऐप डाउनलोड' : 'Install'}</span>
    </button>
  );
};
