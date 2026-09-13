import React, { useState } from 'react';
import { motion } from 'motion/react';
import { History, Trash2, ArrowRight, Pill, ShieldAlert, CheckCircle2, Layers } from 'lucide-react';
import { FoodProduct, MedicineProduct, ScannedRecord, SupportedLanguage } from '../types';
import { getDictionary, getLocalizedMedicineForm } from '../i18n/localizationHelper';

interface ScanHistoryViewProps {
  records: ScannedRecord[];
  onSelectProduct: (product: FoodProduct) => void;
  onSelectMedicine?: (medicine: MedicineProduct) => void;
  onClearHistory: () => void;
  currentLanguage: SupportedLanguage;
}

export const ScanHistoryView: React.FC<ScanHistoryViewProps> = ({
  records,
  onSelectProduct,
  onSelectMedicine,
  onClearHistory,
  currentLanguage,
}) => {
  const dict = getDictionary(currentLanguage);
  const [filter, setFilter] = useState<'all' | 'food' | 'medicine'>('all');

  const filteredRecords = records.filter(rec => {
    if (filter === 'food') return rec.productType !== 'medicine';
    if (filter === 'medicine') return rec.productType === 'medicine';
    return true;
  });

  return (
    <div className="w-full space-y-3">
      {/* Header with Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900">{dict.historyTitle}</h3>
          <span className="text-xs text-slate-500 font-medium">({records.length})</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {dict.historyFilterAll}
            </button>
            <button
              type="button"
              onClick={() => setFilter('food')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                filter === 'food'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🥗 {dict.historyFilterFood}
            </button>
            <button
              type="button"
              onClick={() => setFilter('medicine')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                filter === 'medicine'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              💊 {dict.historyFilterMedicine}
            </button>
          </div>

          {records.length > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              title={dict.clearHistoryBtn}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {records.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          <History className="h-8 w-8 mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-semibold text-slate-600">{dict.noHistoryYet}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{dict.noHistorySub}</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          {dict.noHistoryYet}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredRecords.map(rec => {
            const isMed = rec.productType === 'medicine' && rec.medicineProduct;
            const med = rec.medicineProduct;
            const prod = rec.product;

            if (isMed && med) {
              const hasWarning = med.personalizedWarnings.some(w => w.severity === 'critical');
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onSelectMedicine && onSelectMedicine(med)}
                  className="rounded-2xl bg-white p-3 border border-blue-200/80 hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-blue-600">
                      <Pill className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase text-white bg-blue-600 px-1.5 py-0.2 rounded">
                          {getLocalizedMedicineForm(med.form, currentLanguage)}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {med.manufacturer}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                        {med.name}
                      </h4>
                      <p className="text-[10px] text-blue-900/80 truncate font-medium">
                        {med.saltComposition}
                      </p>
                      <div className="text-[9px] text-slate-400 mt-0.5">
                        {new Date(rec.scannedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {hasWarning ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-600" /> {dict.historyCautionBadge}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <Pill className="h-3.5 w-3.5 text-blue-600" /> {dict.historyMedicineBadge}
                      </span>
                    )}
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700" />
                  </div>
                </motion.div>
              );
            }

            if (prod) {
              const isHealthy = prod.healthScoreNumber >= 6.5;
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onSelectProduct(prod)}
                  className="rounded-2xl bg-white p-3 border border-slate-200/80 hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {prod.image_url ? (
                        <img
                          src={prod.image_url}
                          alt={prod.product_name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <Layers className="h-6 w-6 text-slate-300" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        {prod.nutriscore_grade && (
                          <span className="text-[9px] font-black uppercase text-white bg-slate-700 px-1.5 py-0.2 rounded">
                            {dict.gradePrefix} {prod.nutriscore_grade.toUpperCase()}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 truncate">
                          {prod.brands || dict.packagedBrand}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                        {prod.product_name}
                      </h4>
                      <div className="text-[9px] text-slate-400 mt-0.5">
                        {new Date(rec.scannedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right">
                      <div
                        className={`text-xs font-black ${
                          isHealthy ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {prod.healthScoreNumber}/10
                      </div>
                      <div className="text-[9px] text-slate-400">{dict.scoreText}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700" />
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};
