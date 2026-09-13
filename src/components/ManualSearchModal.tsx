import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, X, Loader2, ArrowRight, Layers, Sparkles, Pill, Utensils } from 'lucide-react';
import { FoodProduct, MedicineProduct, SupportedLanguage, UserProfile } from '../types';
import { SAMPLE_PRODUCTS, searchProductsByName } from '../services/openFoodFacts';
import { searchMedicines, POPULAR_MEDICINES } from '../services/medicineDatabase';
import {
  getDictionary,
  getLocalizedMedicineCategory,
  getLocalizedMedicineForm,
} from '../i18n/localizationHelper';

interface ManualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: FoodProduct) => void;
  onSelectMedicine?: (medicine: MedicineProduct) => void;
  userProfile: UserProfile;
  currentLanguage: SupportedLanguage;
  initialMode?: 'food' | 'medicine';
}

export const ManualSearchModal: React.FC<ManualSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectMedicine,
  userProfile,
  currentLanguage,
  initialMode = 'food',
}) => {
  const dict = getDictionary(currentLanguage);
  const isHi = currentLanguage === 'hi';

  const [searchMode, setSearchMode] = useState<'food' | 'medicine'>(initialMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foodResults, setFoodResults] = useState<FoodProduct[]>([]);
  const [medicineResults, setMedicineResults] = useState<MedicineProduct[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setSearchMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setSearched(true);
    try {
      if (searchMode === 'medicine') {
        const medResults = searchMedicines(searchTerm, userProfile);
        setMedicineResults(medResults);
      } else {
        const results = await searchProductsByName(searchTerm, userProfile);
        setFoodResults(results);
      }
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPick = async (sampleName: string, mode: 'food' | 'medicine') => {
    setSearchTerm(sampleName);
    setSearchMode(mode);
    setIsLoading(true);
    setSearched(true);
    try {
      if (mode === 'medicine') {
        const medResults = searchMedicines(sampleName, userProfile);
        setMedicineResults(medResults);
      } else {
        const results = await searchProductsByName(sampleName, userProfile);
        setFoodResults(results);
      }
    } catch (err) {
      console.error('Quick pick failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="manual-search-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl border border-slate-200 text-slate-800 my-auto relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition-colors ${
                searchMode === 'medicine' ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
            >
              {searchMode === 'medicine' ? (
                <Pill className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {searchMode === 'medicine'
                  ? dict.searchMedicineTitle
                  : dict.searchFoodTitle}
              </h3>
              <p className="text-[11px] text-slate-500">
                {searchMode === 'medicine'
                  ? dict.searchMedicineSubtitle
                  : dict.searchFoodSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Mode Toggle (Food vs Medicine) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mb-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              setSearchMode('food');
              setSearched(false);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              searchMode === 'food'
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Utensils className="h-3.5 w-3.5" />
            <span>{dict.foodTab}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchMode('medicine');
              setSearched(false);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              searchMode === 'medicine'
                ? 'bg-white text-blue-800 shadow-xs border border-blue-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pill className="h-3.5 w-3.5" />
            <span>{dict.medicineTab}</span>
          </button>
        </div>

        {/* Search Input Field */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-3 flex-shrink-0">
          <div className="relative flex-1">
            <input
              type="text"
              id="manual-search-input-field"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={
                searchMode === 'medicine'
                  ? dict.searchPlaceholderMedicine
                  : dict.searchPlaceholderFood
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
          </div>
          <button
            type="submit"
            id="manual-search-submit-btn"
            disabled={!searchTerm.trim() || isLoading}
            className={`rounded-2xl px-4 py-2.5 text-xs font-bold text-white shadow-md disabled:opacity-40 transition-all flex items-center gap-1.5 ${
              searchMode === 'medicine'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Search className="h-3.5 w-3.5" />
            )}
            <span>{dict.searchBtn}</span>
          </button>
        </form>

        {/* Scrollable Results / Suggestions Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2 min-h-48">
          {isLoading && (
            <div className="py-12 text-center text-slate-400">
              <Loader2 className="h-7 w-7 animate-spin mx-auto text-blue-600 mb-2" />
              <p className="text-xs">{dict.fetchingDataTitle}</p>
            </div>
          )}

          {/* MEDICINE SEARCH RESULTS */}
          {!isLoading && searched && searchMode === 'medicine' && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {dict.searchResultsMedicine} ({medicineResults.length})
              </div>
              {medicineResults.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  {dict.noResultsFound}
                </div>
              ) : (
                <div className="space-y-2">
                  {medicineResults.map(med => (
                    <div
                      key={med.barcode}
                      onClick={() => {
                        onClose();
                        if (onSelectMedicine) onSelectMedicine(med);
                      }}
                      className="p-3 rounded-2xl bg-blue-50/40 hover:bg-blue-100/60 border border-blue-200/80 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black uppercase text-white bg-blue-600 px-1.5 py-0.2 rounded">
                              {getLocalizedMedicineForm(med.form, currentLanguage)}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {med.manufacturer}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-700 transition-colors">
                            {med.name}
                          </h4>
                          <p className="text-[11px] text-blue-900/80 line-clamp-1 font-medium">
                            {med.saltComposition}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FOOD SEARCH RESULTS */}
          {!isLoading && searched && searchMode === 'food' && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {dict.searchResultsFood} ({foodResults.length})
              </div>
              {foodResults.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  {dict.noResultsFound}
                </div>
              ) : (
                <div className="space-y-2">
                  {foodResults.map(prod => (
                    <div
                      key={prod.barcode}
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {prod.image_url ? (
                            <img
                              src={prod.image_url}
                              alt={prod.product_name}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain p-1"
                            />
                          ) : (
                            <Layers className="h-5 w-5 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {prod.brands || dict.packagedBrand}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                            {prod.product_name}
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-700">
                            {dict.healthScoreTitle}: {prod.healthScoreNumber}/10
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Initial Suggestions / Quick Picks */}
          {!searched && !isLoading && (
            <div className="pt-1">
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>{dict.quickPickTitle}</span>
              </div>

              {searchMode === 'medicine' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {POPULAR_MEDICINES.slice(0, 8).map(med => (
                    <button
                      type="button"
                      key={med.barcode}
                      onClick={() => handleQuickPick(med.name, 'medicine')}
                      className="text-left p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 border border-blue-100 transition-all group"
                    >
                      <div className="font-bold text-xs text-blue-950 group-hover:text-blue-700">
                        {med.name}
                      </div>
                      <div className="text-[10px] text-blue-700/80 truncate">
                        {med.saltComposition}
                      </div>
                      <div className="text-[9px] text-slate-400 mt-0.5">
                        {getLocalizedMedicineCategory(med.category, currentLanguage)}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SAMPLE_PRODUCTS.map(sample => (
                    <button
                      type="button"
                      key={sample.barcode}
                      onClick={() => handleQuickPick(sample.name, 'food')}
                      className="text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/80 hover:border-emerald-200 transition-all group"
                    >
                      <div className="font-semibold text-xs text-slate-800 group-hover:text-emerald-800">
                        {sample.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {sample.brand} • {sample.category}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
