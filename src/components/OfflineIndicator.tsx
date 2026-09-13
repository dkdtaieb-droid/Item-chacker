import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface OfflineIndicatorProps {
  currentLanguage: SupportedLanguage;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ currentLanguage }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);
  const isHi = currentLanguage === 'hi';

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) {
    return null;
  }

  if (showReconnected) {
    return (
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
        <Wifi className="h-3.5 w-3.5" />
        <span>{isHi ? 'इंटरनेट पुनः जुड़ गया' : 'Back online'}</span>
      </div>
    );
  }

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
      <WifiOff className="h-3.5 w-3.5 animate-pulse" />
      <span>
        {isHi
          ? 'ऑफ़लाइन मोड — स्थानीय डेटा व दवाइयां उपलब्ध हैं'
          : 'Offline mode — Local data & medicines available'}
      </span>
    </div>
  );
};
