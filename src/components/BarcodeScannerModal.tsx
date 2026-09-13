import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  X,
  ScanLine,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Pill,
  Utensils,
  Flashlight,
  Image as ImageIcon,
  ZoomIn,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { SAMPLE_PRODUCTS } from '../services/openFoodFacts';
import { POPULAR_MEDICINES } from '../services/medicineDatabase';
import { SupportedLanguage } from '../types';
import { getDictionary, getLocalizedMedicineForm } from '../i18n/localizationHelper';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBarcodeDetected: (barcode: string) => void;
  currentLanguage: SupportedLanguage;
  initialCategory?: 'all' | 'food' | 'medicine';
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onBarcodeDetected,
  currentLanguage,
  initialCategory = 'all',
}) => {
  const dict = getDictionary(currentLanguage);
  const isHi = currentLanguage === 'hi';

  const [manualBarcode, setManualBarcode] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [torchActive, setTorchActive] = useState(false);
  const [torchAvailable, setTorchAvailable] = useState<boolean | null>(null);
  const [torchMessage, setTorchMessage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isScanningFile, setIsScanningFile] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);

  const [sampleTab, setSampleTab] = useState<'medicine' | 'food'>(
    initialCategory === 'medicine' ? 'medicine' : 'food'
  );

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const scannerContainerId = 'interactive-barcode-viewport';

  useEffect(() => {
    if (initialCategory === 'medicine') {
      setSampleTab('medicine');
    }
  }, [initialCategory]);

  useEffect(() => {
    if (!isOpen) {
      stopCameraScanner();
      setCameraError(null);
      setTorchActive(false);
      setTorchMessage(null);
    }
    return () => {
      stopCameraScanner();
    };
  }, [isOpen]);

  const getVideoTrack = (): MediaStreamTrack | null => {
    const video = document.querySelector(`#${scannerContainerId} video`) as HTMLVideoElement | null;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getVideoTracks();
      return tracks.length > 0 ? tracks[0] : null;
    }
    return null;
  };

  const checkCameraCapabilities = () => {
    const track = getVideoTrack();
    if (track) {
      const capabilities = (track.getCapabilities ? track.getCapabilities() : {}) as any;
      if (capabilities && capabilities.torch !== undefined) {
        setTorchAvailable(Boolean(capabilities.torch));
      } else {
        // Fallback: assume capability might be available on mobile devices
        setTorchAvailable(true);
      }
    }
  };

  const toggleTorch = async () => {
    try {
      const track = getVideoTrack();
      if (!track) {
        setTorchMessage(isHi ? 'पहले कैमरा चालू करें' : 'Start camera first');
        setTimeout(() => setTorchMessage(null), 2500);
        return;
      }

      const nextState = !torchActive;
      await track.applyConstraints({
        advanced: [{ torch: nextState } as any],
      });
      setTorchActive(nextState);
      setTorchMessage(
        nextState
          ? (isHi ? '🔦 टॉर्च चालू है' : '🔦 Torch Activated')
          : (isHi ? '🔦 टॉर्च बंद' : '🔦 Torch Off')
      );
      setTimeout(() => setTorchMessage(null), 2000);
    } catch (err) {
      console.warn('Torch constraint not accepted:', err);
      setTorchAvailable(false);
      setTorchMessage(dict.torchNotSupported);
      setTimeout(() => setTorchMessage(null), 3000);
    }
  };

  const cycleZoom = async () => {
    const nextZoom = zoomLevel === 1 ? 2 : zoomLevel === 2 ? 3 : 1;
    setZoomLevel(nextZoom);

    try {
      const track = getVideoTrack();
      if (track) {
        await track.applyConstraints({
          advanced: [{ zoom: nextZoom } as any],
        });
      }
    } catch (e) {
      // Hardware zoom might not be supported; CSS zoom can also assist
    }
  };

  const startCameraScanner = async () => {
    setCameraError(null);
    setCameraActive(true);
    setTorchActive(false);

    // Give DOM a tick to render viewport
    setTimeout(async () => {
      try {
        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, {
            formatsToSupport: [
              Html5QrcodeSupportedFormats.EAN_13,
              Html5QrcodeSupportedFormats.EAN_8,
              Html5QrcodeSupportedFormats.CODE_128,
              Html5QrcodeSupportedFormats.CODE_39,
              Html5QrcodeSupportedFormats.UPC_A,
              Html5QrcodeSupportedFormats.UPC_E,
              Html5QrcodeSupportedFormats.DATA_MATRIX,
              Html5QrcodeSupportedFormats.QR_CODE,
            ],
            verbose: false,
          });
        }

        // Optimized configuration for 1D medicine strips and food packets
        const config = {
          fps: 20,
          qrbox: { width: 280, height: 140 },
          aspectRatio: 1.333,
        };

        await html5QrCodeRef.current.start(
          { facingMode: 'environment' },
          config,
          (decodedText: string) => {
            if (decodedText) {
              stopCameraScanner();
              onBarcodeDetected(decodedText.trim());
            }
          },
          () => {
            // Scanning frame...
          }
        );

        // Check torch capabilities once video feed is running
        setTimeout(checkCameraCapabilities, 500);
      } catch (err: any) {
        console.warn('Camera start error:', err);
        setCameraActive(false);
        setCameraError(
          isHi
            ? 'कैमरा शुरू नहीं हो सका। कृपया कैमरा अनुमति दें, या नीचे दिए गए बॉक्स में बारकोड नंबर लिखें।'
            : 'Could not start camera. Please verify camera permissions or enter the barcode number below.'
        );
      }
    }, 150);
  };

  const stopCameraScanner = async () => {
    try {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        await html5QrCodeRef.current.stop();
      }
    } catch (err) {
      console.warn('Error stopping scanner:', err);
    } finally {
      setCameraActive(false);
      setTorchActive(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      stopCameraScanner();
      onBarcodeDetected(manualBarcode.trim());
      setManualBarcode('');
    }
  };

  const handlePickSample = (barcode: string) => {
    stopCameraScanner();
    onBarcodeDetected(barcode);
  };

  const handleFileScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanningFile(true);
    setCameraError(null);

    try {
      // If live camera is currently scanning, stop it first
      await stopCameraScanner();

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, {
          formatsToSupport: [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.DATA_MATRIX,
            Html5QrcodeSupportedFormats.QR_CODE,
          ],
          verbose: false,
        });
      }

      const decodedText = await html5QrCodeRef.current.scanFile(file, true);
      if (decodedText) {
        setFileSuccess(true);
        setTimeout(() => {
          setFileSuccess(false);
          onBarcodeDetected(decodedText.trim());
        }, 500);
      }
    } catch (err) {
      console.warn('File barcode scan error:', err);
      setCameraError(dict.photoScanFail);
    } finally {
      setIsScanningFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="barcode-scanner-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl border border-slate-200 text-slate-800 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {dict.cameraScannerTitle}
              </h3>
              <p className="text-[11px] text-slate-500">
                {initialCategory === 'medicine'
                  ? dict.cameraScannerSubMedicine
                  : dict.cameraScannerSubFood}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close scanner"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Viewport for live camera feed */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex flex-col items-center justify-center border border-slate-800 shadow-inner">
          <div
            id={scannerContainerId}
            className={`w-full h-full ${!cameraActive ? 'hidden' : 'block'}`}
            style={{
              transform: zoomLevel > 1 ? `scale(${1 + (zoomLevel - 1) * 0.25})` : 'none',
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-out',
            }}
          />

          {/* Idle / Start Camera state */}
          {!cameraActive && (
            <div className="p-6 text-center text-slate-300 flex flex-col items-center justify-center">
              <ScanLine className="h-10 w-10 text-emerald-400 mb-2 opacity-80 animate-pulse" />
              <p className="text-xs font-semibold text-slate-200 mb-1">
                {dict.pointCameraInstruction}
              </p>
              <p className="text-[11px] text-slate-400 mb-3 max-w-xs">
                {initialCategory === 'medicine'
                  ? (isHi ? 'दवा के पत्ते या बॉक्स का बारकोड सामने लाएं' : 'Align strip or box barcode horizontally')
                  : (isHi ? 'खाद्य पैकेट का बारकोड सामने लाएं' : 'Align food packet barcode horizontally')}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  id="start-camera-feed-btn"
                  onClick={startCameraScanner}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all flex items-center gap-1.5"
                >
                  <Camera className="h-4 w-4" />
                  <span>{dict.startCameraBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanningFile}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
                >
                  {isScanningFile ? (
                    <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-sky-400" />
                  )}
                  <span>{dict.scanFromPhotoBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* Laser Guide overlay when camera is running */}
          {cameraActive && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-[82%] h-[60%] border-2 border-emerald-400/80 rounded-xl relative shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                {/* Horizontal scan laser */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#34d399] animate-pulse" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-emerald-300/90 bg-black/60 px-2 py-0.5 rounded">
                  {dict.pointCameraInstruction}
                </span>
              </div>
            </div>
          )}

          {/* Camera Active Controls Bar (Torch, Zoom, Stop) */}
          {cameraActive && (
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20">
              {/* Torch (टॉर्च) Toggle Button */}
              <button
                type="button"
                id="toggle-torch-btn"
                onClick={toggleTorch}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md backdrop-blur-md ${
                  torchActive
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 ring-offset-1 shadow-amber-400/50'
                    : 'bg-black/60 text-white hover:bg-black/80 border border-white/20'
                }`}
                title={torchActive ? dict.torchOffBtn : dict.torchOnBtn}
              >
                <Flashlight
                  className={`h-4 w-4 ${torchActive ? 'text-slate-950 fill-slate-950' : 'text-amber-300'}`}
                />
                <span>{torchActive ? dict.torchOffBtn : dict.torchOnBtn}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {/* Zoom button */}
                <button
                  type="button"
                  onClick={cycleZoom}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-black/60 text-white hover:bg-black/80 border border-white/20 backdrop-blur-md transition-all"
                  title="Toggle Zoom"
                >
                  <ZoomIn className="h-3.5 w-3.5 text-sky-400" />
                  <span>{zoomLevel}x</span>
                </button>

                {/* Stop Camera Button */}
                <button
                  type="button"
                  onClick={stopCameraScanner}
                  className="rounded-xl bg-black/70 px-3 py-1.5 text-xs font-bold text-white hover:bg-black/90 border border-white/20 backdrop-blur-md transition-all"
                >
                  {dict.stopCameraBtn}
                </button>
              </div>
            </div>
          )}

          {/* Toast message for Torch status */}
          <AnimatePresence>
            {torchMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-3 inset-x-4 mx-auto w-fit z-30 bg-slate-900/90 text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-700 shadow-lg text-center"
              >
                {torchMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* File scan success feedback */}
          {fileSuccess && (
            <div className="absolute inset-0 z-30 bg-emerald-950/80 flex items-center justify-center text-white gap-2 p-4 text-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <span className="text-xs font-bold">{dict.photoScanSuccess}</span>
            </div>
          )}
        </div>

        {/* Hidden file input for Photo Gallery upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileScan}
        />

        {/* Secondary option to upload photo if camera is active */}
        {cameraActive && (
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>
              {isHi
                ? 'दवाई के छोटे बारकोड के लिए टॉर्च चालू करें'
                : 'Turn on torch for low-light or tiny barcodes'}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              {dict.scanFromPhotoBtn}
            </button>
          </div>
        )}

        {cameraError && (
          <div className="mt-2.5 rounded-xl bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>{cameraError}</span>
          </div>
        )}

        {/* Manual Barcode Input */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              id="manual-barcode-input"
              value={manualBarcode}
              onChange={e => setManualBarcode(e.target.value)}
              placeholder={dict.manualBarcodePlaceholder}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              id="submit-manual-barcode-btn"
              disabled={!manualBarcode.trim()}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-1"
            >
              <span>{dict.checkBarcodeBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Quick Sample Barcodes Tabs (Food vs Medicine) */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              {dict.testSamplesTitle}
            </span>

            {/* Switch between Food and Medicine samples */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setSampleTab('medicine')}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                  sampleTab === 'medicine'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Pill className="h-3 w-3" />
                <span>{dict.sampleMedicinesTab}</span>
              </button>
              <button
                type="button"
                onClick={() => setSampleTab('food')}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                  sampleTab === 'food'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Utensils className="h-3 w-3" />
                <span>{dict.sampleFoodTab}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
            {sampleTab === 'medicine'
              ? POPULAR_MEDICINES.map(med => (
                  <button
                    type="button"
                    key={med.barcode}
                    id={`sample-med-barcode-${med.barcode}`}
                    onClick={() => handlePickSample(med.barcode)}
                    className="text-left p-2 rounded-xl bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300 border border-blue-200/60 transition-all group"
                  >
                    <div className="font-bold text-xs text-blue-950 group-hover:text-blue-900 truncate">
                      {med.name}
                    </div>
                    <div className="text-[10px] text-blue-700 truncate mt-0.5">
                      {med.brand} • {getLocalizedMedicineForm(med.form, currentLanguage)}
                    </div>
                    <div className="text-[9px] text-slate-500 truncate font-mono mt-0.5">
                      {med.barcode}
                    </div>
                  </button>
                ))
              : SAMPLE_PRODUCTS.slice(0, 6).map(sample => (
                  <button
                    type="button"
                    key={sample.barcode}
                    id={`sample-barcode-${sample.barcode}`}
                    onClick={() => handlePickSample(sample.barcode)}
                    className="text-left p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200/80 transition-all group"
                  >
                    <div className="font-semibold text-xs text-slate-800 group-hover:text-emerald-800 truncate">
                      {sample.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {sample.brand} • {sample.category}
                    </div>
                  </button>
                ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
