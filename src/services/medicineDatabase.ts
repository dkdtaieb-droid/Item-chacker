import { MedicineProduct, UserProfile } from '../types';

export const POPULAR_MEDICINES: MedicineProduct[] = [
  {
    barcode: '8901148216345',
    name: 'Dolo 650 Tablet',
    brand: 'Dolo',
    manufacturer: 'Micro Labs Ltd.',
    saltComposition: 'Paracetamol (Acetaminophen) IP 650 mg',
    category: 'Analgesic & Antipyretic (बुखार व दर्द निवारक)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    scheduleCategory: 'OTC (Over-The-Counter)',
    safetyLevel: 'safe',
    uses: {
      en: [
        'Relief of fever (pyrexia) and body temperature reduction',
        'Headaches, migraine, and sinus pain',
        'Body aches, toothache, and post-vaccination fever',
        'Mild to moderate joint and muscular aches',
      ],
      hi: [
        'बुखार (fever) कम करने और तापमान नियंत्रित करने में सहायक',
        'सिरदर्द, माइग्रेन और बदन दर्द में राहत',
        'दांत दर्द और टीकाकरण (वैक्सीन) के बाद होने वाले बुखार में उपयोगी',
        'जोड़ों और मांसपेशियों के सामान्य दर्द में असरदार',
      ],
    },
    howToTake: {
      en: 'Swallow whole with a full glass of water. Can be taken with or without food, but taking after food prevents gastric discomfort. Maintain at least a 4-6 hour gap between doses.',
      hi: 'एक गिलास पानी के साथ पूरी गोली निगलें। इसे भोजन के बाद लेना बेहतर रहता है ताकि पेट में जलन न हो। दो खुराकों के बीच कम से कम 4 से 6 घंटे का अंतर रखें।',
    },
    timing: {
      en: 'Take after meals as required. Maximum 3 to 4 tablets in 24 hours. Do not exceed 3000 mg in a day.',
      hi: 'ज़रूरत पड़ने पर खाना खाने के बाद लें। 24 घंटे में अधिकतम 3 से 4 गोलियां ही लें। एक दिन में कुल 3000 मिलीग्राम से अधिक बिल्कुल न लें।',
    },
    sideEffects: {
      en: [
        'Generally well-tolerated at prescribed doses',
        'Nausea or mild stomach discomfort (rare)',
        'Allergic skin rash (very rare)',
        'Liver toxicity if taken in overdose or with alcohol',
      ],
      hi: [
        'उचित मात्रा में लेने पर आमतौर पर कोई दुष्प्रभाव नहीं होता',
        'हल्की मिचली या पेट में असहजता (दुर्लभ)',
        'त्वचा पर लाल चकत्ते या खुजली (अति दुर्लभ)',
        'अधिक मात्रा (ओवरडोज) या शराब के साथ लेने पर लिवर को गंभीर नुकसान',
      ],
    },
    precautions: {
      alcohol: {
        status: 'unsafe',
        text: {
          en: 'Unsafe. Combining alcohol with paracetamol significantly elevates the risk of acute liver toxicity.',
          hi: 'असुरक्षित। डोलो के साथ शराब का सेवन लिवर को गंभीर नुकसान पहुंचा सकता है।',
        },
      },
      pregnancy: {
        status: 'safe',
        text: {
          en: 'Generally considered safe during pregnancy when prescribed by a doctor at the lowest effective dose.',
          hi: 'डॉक्टर की सलाह पर गर्भावस्था में सबसे सुरक्षित दर्द व बुखार की दवा मानी जाती है।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Safe. Does not usually cause drowsiness or impaired reaction time.',
          hi: 'सुरक्षित। इससे चक्कर या नींद नहीं आती, गाड़ी चला सकते हैं।',
        },
      },
      kidney: {
        status: 'caution',
        text: {
          en: 'Caution. Patients with severe kidney impairment must reduce frequency under medical advice.',
          hi: 'सावधानी। गंभीर किडनी के मरीजों को डॉक्टर से सलाह लेकर ही मात्रा तय करनी चाहिए।',
        },
      },
      liver: {
        status: 'unsafe',
        text: {
          en: 'High Caution / Unsafe in pre-existing liver failure or hepatitis.',
          hi: 'सावधानी। पहले से लिवर रोग या पीलिया होने पर बिना डॉक्टर की सलाह के न लें।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Paracetamol Tablets IP 650 mg (Jan Aushadhi)',
      salt: 'Paracetamol 650 mg',
      brandedPrice: '₹34 for 15 tablets',
      genericPrice: '₹9 for 15 tablets',
      savingsPercent: '73% cheaper',
      description: {
        en: 'PM Jan Aushadhi generic Paracetamol 650mg contains the identical pharmaceutical molecule at a fraction of the price.',
        hi: 'प्रधानमंत्री जन औषधि केंद्र पर उपलब्ध जेनेरिक पैरासिटामोल 650mg में भी वही सॉल्ट है और 73% कम कीमत में मिलती है।',
      },
    },
    mfgDate: '11/2025',
    expDate: '10/2028',
  },
  {
    barcode: '8901043003019',
    name: 'Pan-D Capsule',
    brand: 'Pan',
    manufacturer: 'Alkem Laboratories Ltd.',
    saltComposition: 'Pantoprazole Gastro-Resistant (40 mg) + Domperidone Prolonged Release (30 mg)',
    category: 'Antacid & Anti-Reflux / Anti-Emetic (एसिडिटी व गैस की दवा)',
    form: 'Capsule',
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    scheduleCategory: 'Schedule H (Prescription)',
    safetyLevel: 'prescription_required',
    uses: {
      en: [
        'Gastroesophageal reflux disease (GERD) and severe hyperacidity',
        'Heartburn, chest burning sensation, and acid regurgitation',
        'Peptic ulcer and prevention of stomach ulcers caused by painkillers',
        'Nausea, bloating, fullness, and vomiting associated with acidity',
      ],
      hi: [
        'गैस, खट्टी डकार और एसिडिटी (GERD) की समस्या में राहत',
        'सीने में जलन (हार्टबर्न) और पेट के भारीपन को दूर करना',
        'पेट के छालों (अल्सर) का उपचार और दर्दनिवारक दवाओं से पेट की सुरक्षा',
        'एसिडिटी के कारण होने वाली उल्टी, मिचली और अपच में राहत',
      ],
    },
    howToTake: {
      en: 'Take strictly on an empty stomach in the morning, 30 to 60 minutes before breakfast. Swallow the capsule whole with water; do not crush or chew.',
      hi: 'सुबह खाली पेट, नाश्ता करने से 30 से 60 मिनट पहले एक गिलास पानी के साथ पूरी कैप्सूल निगलें। इसे चबाएं या तोड़ें नहीं।',
    },
    timing: {
      en: 'Once daily before breakfast in the morning. Follow prescription duration (usually 1-2 weeks).',
      hi: 'रोज़ाना सुबह नाश्ते से पहले 1 कैप्सूल। डॉक्टर द्वारा बताई गई अवधि (सामान्यतः 7 से 14 दिन) तक ही लें।',
    },
    sideEffects: {
      en: [
        'Dry mouth and headache',
        'Mild diarrhea or constipation',
        'Dizziness or flatulence',
        'Prolonged use (>3 months) may reduce Vitamin B12 and Magnesium absorption',
      ],
      hi: [
        'मुंह सूखना और हल्का सिरदर्द',
        'दस्त (Diarrhea) या हल्का पेट दर्द',
        'चक्कर आना या पेट में गैस बनना',
        'लंबे समय तक लेने पर विटामिन B12 और मैग्नीशियम की कमी हो सकती है',
      ],
    },
    precautions: {
      alcohol: {
        status: 'caution',
        text: {
          en: 'Avoid alcohol as it irritates the gastric lining and directly counteracts acidity treatment.',
          hi: 'शराब से बचें क्योंकि यह पेट में एसिड बढ़ाती है और दवा के असर को खत्म करती है।',
        },
      },
      pregnancy: {
        status: 'caution',
        text: {
          en: 'Use only if clearly advised by your gynecologist/obstetrician.',
          hi: 'गर्भावस्था में केवल डॉक्टर की सीधी सलाह पर ही लें।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Generally safe; if dizziness occurs, avoid driving or operating machinery.',
          hi: 'सामान्यतः सुरक्षित है। यदि चक्कर महसूस हो तो गाड़ी चलाने से बचें।',
        },
      },
      kidney: {
        status: 'safe',
        text: {
          en: 'Generally safe in mild-to-moderate kidney conditions; consult doctor if on dialysis.',
          hi: 'किडनी के मरीजों के लिए सामान्यतः सुरक्षित है।',
        },
      },
      liver: {
        status: 'caution',
        text: {
          en: 'Pantoprazole is metabolized by liver; dose reduction may be needed in hepatic impairment.',
          hi: 'लिवर की गंभीर बीमारी में खुराक की निगरानी आवश्यक है।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Pantoprazole 40mg + Domperidone 30mg SR (Jan Aushadhi)',
      salt: 'Pantoprazole 40mg + Domperidone 30mg',
      brandedPrice: '₹198 for 15 capsules',
      genericPrice: '₹42 for 10 capsules',
      savingsPercent: '68% cheaper',
      description: {
        en: 'Equivalent composition approved by CDSCO available under Jan Aushadhi generic brands at a much lower cost.',
        hi: 'समान सॉल्ट जन औषधि केंद्र पर लगभग 68% कम दाम में उपलब्ध है।',
      },
    },
    mfgDate: '01/2026',
    expDate: '12/2027',
  },
  {
    barcode: '8901043001206',
    name: 'Combiflam Tablet',
    brand: 'Combiflam',
    manufacturer: 'Sanofi India Ltd.',
    saltComposition: 'Ibuprofen IP (400 mg) + Paracetamol IP (325 mg)',
    category: 'NSAID & Analgesic (दर्द, सूजन व बुखार की दवा)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=300&q=80',
    scheduleCategory: 'Schedule H (Prescription)',
    safetyLevel: 'caution',
    uses: {
      en: [
        'Acute dental pain, toothache, and post-extraction pain',
        'Severe headache, migraine, and muscular sprains',
        'Joint pain, osteoarthritis, and inflammatory swellings',
        'Menstrual cramps and fever associated with body pain',
      ],
      hi: [
        'दांत का तेज दर्द और मसूड़ों की सूजन में राहत',
        'सिरदर्द, मांसपेशियों में खिंचाव और मोच का दर्द',
        'जोड़ों का दर्द, अर्थराइटिस और सूजन कम करने में',
        'पीरियड्स का दर्द और बदन दर्द के साथ तेज बुखार',
      ],
    },
    howToTake: {
      en: 'Always take with food or milk to prevent stomach ulceration and acid irritation. Swallow with water.',
      hi: 'हमेशा खाना खाने या दूध पीने के बाद ही लें। खाली पेट लेने से पेट में अल्सर या एसिडिटी हो सकती है।',
    },
    timing: {
      en: 'Take 1 tablet after meals, 2 to 3 times a day as prescribed. Do not exceed 3 tablets in 24 hours.',
      hi: 'खाना खाने के बाद 1 गोली, दिन में अधिकतम 2-3 बार। 24 घंटे में 3 गोली से ज्यादा बिल्कुल न लें।',
    },
    sideEffects: {
      en: [
        'Heartburn, acidity, and epigastric discomfort',
        'Nausea and loose stools',
        'Risk of gastric bleeding or ulcer if taken long-term',
        'Can elevate blood pressure and burden kidneys in susceptible individuals',
      ],
      hi: [
        'पेट में जलन, गैस और एसिडिटी',
        'मिचली और हल्का पेट खराब होना',
        'लंबे समय तक लेने पर पेट में छाले (अल्सर) का खतरा',
        'ब्लड प्रेशर बढ़ा सकती है और किडनी पर दबाव डालती है',
      ],
    },
    precautions: {
      alcohol: {
        status: 'unsafe',
        text: {
          en: 'Strictly unsafe. Combining Ibuprofen with alcohol multiplies the danger of stomach bleeding and ulcers.',
          hi: 'अत्यंत असुरक्षित। इसके साथ शराब पीने से पेट में आंतरिक रक्तस्राव और छालों का खतरा बहुत बढ़ जाता है।',
        },
      },
      pregnancy: {
        status: 'unsafe',
        text: {
          en: 'Unsafe, especially in the 3rd trimester as it can cause premature closure of the ductus arteriosus in baby.',
          hi: 'असुरक्षित। गर्भावस्था के तीसरे ट्राइमेस्टर में यह भ्रूण के दिल के लिए खतरनाक हो सकती है।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Generally safe; if dizziness occurs, do not drive.',
          hi: 'सामान्यतः सुरक्षित है।',
        },
      },
      kidney: {
        status: 'unsafe',
        text: {
          en: 'High Caution / Unsafe. NSAIDs restrict renal blood flow and can precipitate acute kidney injury.',
          hi: 'असुरक्षित/सावधानी। किडनी रोगियों को इबुप्रोफेन नहीं लेनी चाहिए, यह किडनी को नुकसान पहुंचाती है।',
        },
      },
      liver: {
        status: 'caution',
        text: {
          en: 'Caution. Metabolized by liver; avoid exceeding prescribed limits.',
          hi: 'सावधानी। लिवर के मरीज डॉक्टर की सलाह से ही लें।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Ibuprofen 400mg + Paracetamol 325mg (Generic)',
      salt: 'Ibuprofen + Paracetamol',
      brandedPrice: '₹48 for 20 tablets',
      genericPrice: '₹14 for 20 tablets',
      savingsPercent: '71% cheaper',
      description: {
        en: 'The generic combination delivers identical pain relief and anti-inflammatory action at roughly one-third the cost.',
        hi: 'समान जेनेरिक दवा लगभग 71% कम खर्च में दर्द और सूजन में पूरा आराम देती है।',
      },
    },
    mfgDate: '10/2025',
    expDate: '09/2028',
  },
  {
    barcode: '8901148202027',
    name: 'Cetzine 10mg Tablet',
    brand: 'Cetzine / Okacet',
    manufacturer: 'Dr. Reddy’s Laboratories',
    saltComposition: 'Cetirizine Dihydrochloride IP 10 mg',
    category: 'Antihistamine & Anti-Allergy (एलर्जी व जुकाम की दवा)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1550572017-ed20015ade08?w=300&q=80',
    scheduleCategory: 'Schedule H (Prescription)',
    safetyLevel: 'safe',
    uses: {
      en: [
        'Allergic rhinitis, hay fever, sneezing, and runny nose',
        'Watery, itchy, and red eyes due to pollen or dust allergies',
        'Skin allergies, hives (urticaria), itching, and insect bites',
        'Seasonal cold allergies and congestion relief',
      ],
      hi: [
        'एलर्जी, लगातार छींकें आना और बहती नाक में तुरंत राहत',
        'धूल या मौसम से आंखों में पानी, लाली और खुजली होना',
        'त्वचा पर पित्ती (hives), दाने, खुजली और कीड़े के काटने पर',
        'मौसमी जुकाम और गले की एलर्जी से आराम',
      ],
    },
    howToTake: {
      en: 'Take with a glass of water. Preferably taken in the evening or at bedtime because it can cause slight sleepiness.',
      hi: 'एक गिलास पानी के साथ लें। इसे रात को सोने से पहले लेना सबसे अच्छा रहता है क्योंकि इससे हल्की नींद आ सकती है।',
    },
    timing: {
      en: 'Once daily, preferably at night before sleeping.',
      hi: 'दिन में केवल 1 बार, रात को सोते समय।',
    },
    sideEffects: {
      en: [
        'Drowsiness, sleepiness, and fatigue',
        'Dry mouth and mild headache',
        'Dizziness or blurred vision in rare cases',
      ],
      hi: [
        'नींद या सुस्ती आना और आलस महसूस होना',
        'मुंह सूखना और हल्का सिरदर्द',
        'हल्के चक्कर आना (दुर्लभ)',
      ],
    },
    precautions: {
      alcohol: {
        status: 'unsafe',
        text: {
          en: 'Unsafe. Alcohol intensifies sedative and drowsy effects significantly.',
          hi: 'असुरक्षित। शराब के साथ लेने पर अत्यधिक सुस्ती और बेहोशी आ सकती है।',
        },
      },
      pregnancy: {
        status: 'caution',
        text: {
          en: 'Generally safe if prescribed by doctor; consult before taking in 1st trimester.',
          hi: 'सावधानी। डॉक्टर की सलाह पर ही गर्भावस्था में लें।',
        },
      },
      driving: {
        status: 'unsafe',
        text: {
          en: 'Caution / Unsafe. Can impair alertness. Do not drive or operate heavy machines if drowsy.',
          hi: 'सावधानी। नींद आ सकती है, इसलिए इसके बाद ड्राइविंग या भारी मशीन चलाने से बचें।',
        },
      },
      kidney: {
        status: 'caution',
        text: {
          en: 'Caution. Excreted through kidneys; dose must be halved in renal impairment.',
          hi: 'सावधानी। किडनी के मरीजों में खुराक कम करने की आवश्यकता होती है।',
        },
      },
      liver: {
        status: 'safe',
        text: {
          en: 'Safe at standard 10mg daily dose.',
          hi: 'सामान्य खुराक में लिवर के लिए सुरक्षित है।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Cetirizine 10mg IP (Jan Aushadhi)',
      salt: 'Cetirizine 10mg',
      brandedPrice: '₹22 for 10 tablets',
      genericPrice: '₹4.50 for 10 tablets',
      savingsPercent: '80% cheaper',
      description: {
        en: 'PM Jan Aushadhi generic Cetirizine 10mg costs under ₹5 per strip with identical anti-allergy efficacy.',
        hi: 'जन औषधि पर यह मात्र ₹4.50 में 10 गोलियां मिलती हैं और पूरा असर करती है।',
      },
    },
    mfgDate: '12/2025',
    expDate: '11/2028',
  },
  {
    barcode: '8901117202300',
    name: 'Azee 500 Tablet',
    brand: 'Azee / Azithral',
    manufacturer: 'Cipla Ltd.',
    saltComposition: 'Azithromycin Dihydrate IP equivalent to Azithromycin 500 mg',
    category: 'Macrolide Antibiotic (एंटीबायोटिक दवा)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    scheduleCategory: 'Schedule H1 (Prescription Required)',
    safetyLevel: 'prescription_required',
    uses: {
      en: [
        'Bacterial respiratory tract infections (bronchitis, pneumonia, tonsillitis)',
        'Throat infections, severe pharyngitis, and sinusitis',
        'Skin and soft tissue bacterial infections',
        'Ear infections (otitis media) and certain sexually transmitted infections',
      ],
      hi: [
        'गले का गंभीर संक्रमण, टॉन्सिल और ब्रोंकाइटिस का उपचार',
        'फेफड़ों का इन्फेक्शन (निमोनिया) और साइनोसाइटिस',
        'त्वचा और ऊतकों के बैक्टीरियल इन्फेक्शन में असरदार',
        'कान का इन्फेक्शन और यूटीआई (UTI) की रोकथाम',
      ],
    },
    howToTake: {
      en: 'Take with a glass of water. Can be taken with food to reduce stomach upset. Complete the full prescribed course (usually 3 to 5 days) even if feeling better.',
      hi: 'पानी के साथ लें। पेट दर्द से बचने के लिए भोजन के साथ ले सकते हैं। डॉक्टर द्वारा बताया गया 3 या 5 दिन का पूरा कोर्स अवश्य समाप्त करें, बीच में न छोड़ें।',
    },
    timing: {
      en: 'Once daily at the same time each day for 3 or 5 days strictly as prescribed.',
      hi: 'दिन में केवल 1 बार, रोज़ाना एक ही समय पर। 3 से 5 दिनों का कोर्स पूरा करें।',
    },
    sideEffects: {
      en: [
        'Diarrhea, loose stools, and abdominal cramping',
        'Nausea and vomiting',
        'Loss of appetite and altered taste',
        'Cardiac arrhythmia / QT prolongation in rare vulnerable patients',
      ],
      hi: [
        'दस्त (लूज मोशन) और पेट में मरोड़',
        'मिचली और उल्टी जैसा लगना',
        'भूख कम लगना और मुंह का स्वाद बदलना',
        'दिल की धड़कन अनियमित होना (दुर्लभ)',
      ],
    },
    precautions: {
      alcohol: {
        status: 'caution',
        text: {
          en: 'Avoid alcohol as it strains the liver and reduces recovery speed from infection.',
          hi: 'शराब से बचें क्योंकि यह लिवर पर दबाव डालती है और रोग ठीक होने में बाधा बनती है।',
        },
      },
      pregnancy: {
        status: 'caution',
        text: {
          en: 'Category B. Considered relatively safe in pregnancy when prescribed by a doctor.',
          hi: 'डॉक्टर की निगरानी में ही गर्भावस्था में ली जानी चाहिए।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Safe. Does not affect coordination or vision.',
          hi: 'सुरक्षित है, गाड़ी चला सकते हैं।',
        },
      },
      kidney: {
        status: 'safe',
        text: {
          en: 'Generally safe; no major dosage adjustment needed in mild to moderate kidney issues.',
          hi: 'किडनी के लिए सामान्यतः सुरक्षित है।',
        },
      },
      liver: {
        status: 'caution',
        text: {
          en: 'Caution. Cleared by liver; use with caution in patients with hepatic dysfunction.',
          hi: 'सावधानी। लिवर के जरिए शरीर से निकलती है, लिवर की बीमारी में सावधानी रखें।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Azithromycin Tablets IP 500 mg (Jan Aushadhi)',
      salt: 'Azithromycin 500mg',
      brandedPrice: '₹125 for 3 tablets',
      genericPrice: '₹33 for 3 tablets',
      savingsPercent: '74% cheaper',
      description: {
        en: 'Jan Aushadhi generic Azithromycin 500mg strip provides identical bactericidal efficacy at 74% savings.',
        hi: 'जन औषधि केंद्र पर 3 गोलियों का पत्ता मात्र ₹33 में मिलता है, जो ब्रांडेड से 74% सस्ता है।',
      },
    },
    mfgDate: '01/2026',
    expDate: '12/2027',
  },
  {
    barcode: '8901117008544',
    name: 'Glycomet 500 SR Tablet',
    brand: 'Glycomet',
    manufacturer: 'USV Pvt. Ltd.',
    saltComposition: 'Metformin Hydrochloride IP (Sustained Release) 500 mg',
    category: 'Oral Anti-Diabetic / Biguanide (शुगर / डायबिटीज की दवा)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    scheduleCategory: 'Schedule H (Prescription)',
    safetyLevel: 'prescription_required',
    uses: {
      en: [
        'Management of Type 2 Diabetes Mellitus to maintain healthy blood glucose levels',
        'Improves body sensitivity to insulin and reduces glucose production by the liver',
        'Helps prevent diabetes-related complications (heart, eyes, kidneys, nerves)',
        'Polycystic ovary syndrome (PCOS) management in women under gynecological guidance',
      ],
      hi: [
        'टाइप-2 डायबिटीज (शुगर) में ब्लड ग्लूकोज को नियंत्रित रखना',
        'इंसुलिन संवेदनशीलता बढ़ाना और लिवर में अतिरिक्त शुगर बनने से रोकना',
        'डायबिटीज से आंखों, नसों और किडनी को होने वाले नुकसान से बचाव',
        'महिलाओं में पीसीओडी / पीसीओएस (PCOS) का उपचार',
      ],
    },
    howToTake: {
      en: 'Take strictly with or immediately after a meal to reduce digestive side effects. Swallow whole; never crush or chew sustained-release tablets.',
      hi: 'हमेशा भोजन के साथ या खाने के तुरंत बाद लें ताकि पेट में खराबी न हो। गोली को पूरी निगलें, तोड़े या चबाएं नहीं।',
    },
    timing: {
      en: 'Usually once or twice daily with breakfast and dinner as prescribed by your diabetologist.',
      hi: 'डॉक्टर की सलाह अनुसार रोज़ाना 1 या 2 बार, सुबह नाश्ते या रात के खाने के साथ।',
    },
    sideEffects: {
      en: [
        'Nausea, diarrhea, stomach ache, and gas (common initially)',
        'Metallic taste in mouth',
        'Long-term use may cause Vitamin B12 deficiency',
        'Lactic acidosis (extremely rare but serious if taken during severe dehydration/kidney failure)',
      ],
      hi: [
        'शुरुआत में उल्टी, दस्त, पेट में ऐंठन या गैस',
        'मुंह में धातु जैसा (metallic) स्वाद आना',
        'लंबे समय तक लेने पर विटामिन B12 की कमी हो सकती है',
        'लैक्टिक एसिडोसिस (अति दुर्लभ परंतु किडनी फेलियर में गंभीर)',
      ],
    },
    precautions: {
      alcohol: {
        status: 'unsafe',
        text: {
          en: 'Unsafe. Drinking alcohol while taking Metformin drastically increases the risk of life-threatening lactic acidosis and severe hypoglycemia.',
          hi: 'अत्यंत असुरक्षित। मेटफॉर्मिन के साथ शराब पीने से लैक्टिक एसिडोसिस और शुगर खतरनाक रूप से गिरने का खतरा होता है।',
        },
      },
      pregnancy: {
        status: 'caution',
        text: {
          en: 'Used under strict specialist guidance in gestational diabetes; insulin is often preferred.',
          hi: 'गर्भावस्था में केवल डॉक्टर की निगरानी में ही लें।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Safe on its own; caution if combined with other anti-diabetic drugs that cause sudden hypoglycemia.',
          hi: 'अकेले लेने पर सुरक्षित है। यदि अन्य शुगर की दवा साथ हो तो शुगर गिरने पर सावधानी बरतें।',
        },
      },
      kidney: {
        status: 'unsafe',
        text: {
          en: 'High Caution / Unsafe in moderate-to-severe renal failure. Serum creatinine and eGFR must be checked.',
          hi: 'असुरक्षित/सावधानी। किडनी खराब होने पर यह दवा शरीर में जमा हो सकती है। किडनी टेस्ट आवश्यक है।',
        },
      },
      liver: {
        status: 'caution',
        text: {
          en: 'Caution. Avoid in severe chronic liver disease.',
          hi: 'सावधानी। गंभीर लिवर रोग में इसका उपयोग वर्जित है।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Metformin Hydrochloride SR 500mg (Jan Aushadhi)',
      salt: 'Metformin 500mg SR',
      brandedPrice: '₹44 for 20 tablets',
      genericPrice: '₹12 for 20 tablets',
      savingsPercent: '73% cheaper',
      description: {
        en: 'Chronic diabetes medication cost drops by over 70% with Jan Aushadhi generic metformin.',
        hi: 'महीने के खर्चे में 70% से ज्यादा की बचत के लिए जन औषधि मेटफॉर्मिन का उपयोग कर सकते हैं।',
      },
    },
    mfgDate: '11/2025',
    expDate: '10/2028',
  },
  {
    barcode: '8901148009114',
    name: 'Telma 40 Tablet',
    brand: 'Telma',
    manufacturer: 'Glenmark Pharmaceuticals',
    saltComposition: 'Telmisartan IP 40 mg',
    category: 'Antihypertensive / ARB (हाई ब्लड प्रेशर की दवा)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1550572017-ed20015ade08?w=300&q=80',
    scheduleCategory: 'Schedule H (Prescription)',
    safetyLevel: 'prescription_required',
    uses: {
      en: [
        'Treatment of Hypertension (high blood pressure) to prevent strokes and heart attacks',
        'Cardiovascular risk reduction in patients with known arterial disease',
        'Kidney protection in diabetic patients with microalbuminuria',
        'Heart failure management to ease heart pumping pressure',
      ],
      hi: [
        'हाई ब्लड प्रेशर (Hypertension) को नियंत्रित कर हार्ट अटैक और स्ट्रोक से बचाव',
        'हृदय रोग के मरीजों में कार्डियोवैस्कुलर जोखिम कम करना',
        'डायबिटीज के मरीजों में किडनी को सुरक्षित रखने में मदद',
        'दिल की पंपिंग क्षमता को सुगम बनाना',
      ],
    },
    howToTake: {
      en: 'Take once daily with water, with or without food. Take it at the same time every day (e.g. every morning) to maintain steady 24-hour blood pressure control.',
      hi: 'रोज़ाना एक निश्चित समय पर (उदा. सुबह) पानी के साथ 1 गोली लें। खाना खाकर या बिना खाए ले सकते हैं।',
    },
    timing: {
      en: 'Once a day, usually in the morning. Do not stop abruptly without doctor consultation.',
      hi: 'दिन में 1 बार सुबह। बिना डॉक्टर से पूछे दवा अचानक बंद न करें।',
    },
    sideEffects: {
      en: [
        'Dizziness or lightheadedness when standing up quickly',
        'Sinus congestion, back pain, or fatigue',
        'Elevated blood potassium levels (hyperkalemia)',
        'Diarrhea or mild stomach discomfort',
      ],
      hi: [
        'अचानक खड़े होने पर चक्कर या सिर घूमना',
        'थकान या पीठ में हल्का दर्द',
        'खून में पोटेशियम का स्तर बढ़ जाना',
        'हल्के दस्त या पेट में परेशानी',
      ],
    },
    precautions: {
      alcohol: {
        status: 'unsafe',
        text: {
          en: 'Unsafe. Alcohol causes additive vasodilation which can precipitate dangerous drops in blood pressure and fainting.',
          hi: 'असुरक्षित। शराब से बीपी बहुत ज्यादा गिर सकता है और चक्कर आ सकते हैं।',
        },
      },
      pregnancy: {
        status: 'unsafe',
        text: {
          en: 'Strictly Unsafe (Black Box Warning). ARBs can cause severe fetal toxicity, renal failure, and death of unborn baby.',
          hi: 'सख्त मनाही (अत्यंत असुरक्षित)। गर्भावस्था में यह भ्रूण की जान और किडनी के लिए घातक हो सकती है।',
        },
      },
      driving: {
        status: 'caution',
        text: {
          en: 'Caution. Dizziness may occur especially during the first few days of starting treatment.',
          hi: 'सावधानी। शुरुआत में बीपी कम होने से चक्कर आ सकते हैं, सतर्क रहें।',
        },
      },
      kidney: {
        status: 'caution',
        text: {
          en: 'Caution. Requires monitoring of kidney function tests and serum potassium regularly.',
          hi: 'सावधानी। समय-समय पर किडनी टेस्ट (KFT) और पोटेशियम की जांच ज़रूरी है।',
        },
      },
      liver: {
        status: 'caution',
        text: {
          en: 'Telmisartan is eliminated almost exclusively via biliary excretion; avoid in biliary obstruction.',
          hi: 'सावधानी। लिवर या पित्त की थैली में रुकावट होने पर सावधानी बरतें।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Telmisartan Tablets IP 40 mg (Jan Aushadhi)',
      salt: 'Telmisartan 40mg',
      brandedPrice: '₹140 for 15 tablets',
      genericPrice: '₹28 for 10 tablets',
      savingsPercent: '70% cheaper',
      description: {
        en: 'Generic Telmisartan 40mg provides identical 24-hour hemodynamic BP control at one-third the branded price.',
        hi: 'जन औषधि केंद्र पर 10 गोलियां मात्र ₹28 में मिलती हैं, जिससे 70% तक की बचत होती है।',
      },
    },
    mfgDate: '10/2025',
    expDate: '09/2028',
  },
  {
    barcode: '8901043005020',
    name: 'Augmentin 625 Duo Tablet',
    brand: 'Augmentin',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals (GSK)',
    saltComposition: 'Amoxicillin Trihydrate IP (500 mg) + Clavulanic Acid / Potassium Clavulanate (125 mg)',
    category: 'Broad-Spectrum Antibiotic (शक्तिशाली एंटीबायोटिक)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    scheduleCategory: 'Schedule H1 (Prescription Required)',
    safetyLevel: 'prescription_required',
    uses: {
      en: [
        'Severe bacterial infections resistant to simple amoxicillin',
        'Middle ear and sinus infections (otitis media, acute sinusitis)',
        'Chest and lung infections (bronchitis, bacterial pneumonia)',
        'Skin, soft tissue, dental abscesses, and urinary tract infections',
      ],
      hi: [
        'गंभीर बैक्टीरियल इन्फेक्शन जो साधारण दवाओं से ठीक नहीं होते',
        'कान, नाक और गले (साइनस) का तेज इन्फेक्शन',
        'छाती का संक्रमण, निमोनिया और ब्रोंकाइटिस',
        'दांत के मसूड़ों में पस पड़ना और यूरिनरी ट्रैक्ट इन्फेक्शन (UTI)',
      ],
    },
    howToTake: {
      en: 'Take with the start of a meal to optimize absorption and minimize gastrointestinal distress. Complete the entire course.',
      hi: 'भोजन की शुरुआत में लें ताकि पेट खराब न हो और दवा का पूरा असर हो। पूरा कोर्स अवश्य समाप्त करें।',
    },
    timing: {
      en: 'Twice daily (every 12 hours) with meals for 5 to 7 days strictly under prescription.',
      hi: 'दिन में 2 बार (हर 12 घंटे बाद) खाना खाते समय। 5 से 7 दिन का कोर्स पूरा करें।',
    },
    sideEffects: {
      en: [
        'Diarrhea (frequent with clavulanate; taking probiotics helps)',
        'Nausea and stomach discomfort',
        'Skin rashes or fungal thrush infections',
        'Contraindicated in patients with severe penicillin allergy',
      ],
      hi: [
        'दस्त (लूज मोशन होना आम है)',
        'मिचली और पेट में दर्द',
        'त्वचा पर एलर्जी या फंगल इन्फेक्शन',
        'पेनिसिलिन से एलर्जी वाले मरीजों को यह बिल्कुल नहीं लेनी चाहिए',
      ],
    },
    precautions: {
      alcohol: {
        status: 'caution',
        text: {
          en: 'Avoid alcohol as it impairs immunity and can increase stomach irritation and dehydration.',
          hi: 'शराब से बचें ताकि शरीर इन्फेक्शन से जल्दी उबर सके।',
        },
      },
      pregnancy: {
        status: 'safe',
        text: {
          en: 'Generally considered safe during pregnancy if prescribed by your doctor.',
          hi: 'डॉक्टर की सलाह पर गर्भावस्था में सुरक्षित माना जाता है।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Safe. Does not impact driving ability.',
          hi: 'सुरक्षित है।',
        },
      },
      kidney: {
        status: 'caution',
        text: {
          en: 'Caution. Dose must be adjusted in patients with severe renal impairment (eGFR < 30).',
          hi: 'सावधानी। किडनी की गंभीर समस्या में डॉक्टर से खुराक कम करवाएं।',
        },
      },
      liver: {
        status: 'caution',
        text: {
          en: 'Caution. Clavulanate has rarely been associated with cholestatic jaundice.',
          hi: 'सावधानी। पहले से पीलिया या लिवर रोग होने पर डॉक्टर को ज़रूर बताएं।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Amoxycillin 500mg + Potassium Clavulanate 125mg (Jan Aushadhi)',
      salt: 'Amoxicillin + Clavulanic Acid 625mg',
      brandedPrice: '₹204 for 10 tablets',
      genericPrice: '₹65 for 10 tablets',
      savingsPercent: '68% cheaper',
      description: {
        en: 'Jan Aushadhi generic 625 Duo provides identical antimicrobial potency with over 65% direct price savings.',
        hi: 'समान एंटीबायोटिक जन औषधि केंद्र पर मात्र ₹65 में उपलब्ध है (लगभग 68% की बचत)।',
      },
    },
    mfgDate: '12/2025',
    expDate: '11/2027',
  },
  {
    barcode: '8901088015024',
    name: 'Digene Gel Mint Flavour (Syrup)',
    brand: 'Digene',
    manufacturer: 'Abbott Healthcare Pvt. Ltd.',
    saltComposition: 'Magnesium Hydroxide (25mg) + Aluminium Hydroxide (25mg) + Simethicone (25mg) per 5ml',
    category: 'Antacid & Antiflatulent (एसिडिटी व पेट फूलने की सिरप)',
    form: 'Syrup',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    scheduleCategory: 'OTC (Over-The-Counter)',
    safetyLevel: 'safe',
    uses: {
      en: [
        'Instant neutralization of excessive gastric acid and heartburn',
        'Relief from gas bubbles, bloating, and stomach fullness (Simethicone)',
        'Soothes esophageal irritation caused by acid reflux',
        'Relieves indigestion and sour stomach',
      ],
      hi: [
        'पेट की एसिडिटी, जलन और खट्टी डकार में तुरंत राहत',
        'पेट में गैस, अफारा और पेट फूलने की समस्या में असरदार',
        'गले और सीने में जलन को शांत करना',
        'अपच और भारीपन से जल्दी छुटकारा',
      ],
    },
    howToTake: {
      en: 'Shake bottle well before use. Take 2 to 4 teaspoons (10-20 ml) after meals or at bedtime. Do not drink water immediately afterwards to allow protective coating.',
      hi: 'इस्तेमाल से पहले बोतल को अच्छी तरह हिलाएं। भोजन के 1 घंटे बाद या रात को सोने से पहले 2 से 4 चम्मच पिएं। पीने के तुरंत बाद पानी न पिएं।',
    },
    timing: {
      en: 'After meals or whenever symptoms of heartburn/gas flare up.',
      hi: 'खाना खाने के बाद या जब भी सीने में जलन और गैस महसूस हो।',
    },
    sideEffects: {
      en: [
        'Chalky taste in mouth',
        'Mild constipation or loose stools depending on individual balance',
        'Overuse may cause magnesium or aluminum build-up',
      ],
      hi: [
        'मुंह में थोड़ा खड़िया (chalky) जैसा स्वाद',
        'हल्का कब्ज या दस्त (बहुत अधिक पीने पर)',
        'अधिक उपयोग से शरीर में मिनरल्स का असंतुलन हो सकता है',
      ],
    },
    precautions: {
      alcohol: {
        status: 'caution',
        text: {
          en: 'Avoid alcohol as it stimulates gastric acid secretion.',
          hi: 'शराब से बचें क्योंकि यह एसिडिटी को और बढ़ा देती है।',
        },
      },
      pregnancy: {
        status: 'safe',
        text: {
          en: 'Considered safe for occasional pregnancy heartburn under medical knowledge.',
          hi: 'गर्भावस्था में कभी-कभार होने वाली एसिडिटी के लिए सुरक्षित मानी जाती है।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Completely safe.',
          hi: 'पूरी तरह सुरक्षित।',
        },
      },
      kidney: {
        status: 'caution',
        text: {
          en: 'Caution. Patients with chronic kidney disease should avoid long-term use due to aluminum accumulation.',
          hi: 'सावधानी। किडनी के मरीज लंबे समय तक लगातार न लें।',
        },
      },
      liver: {
        status: 'safe',
        text: {
          en: 'Safe.',
          hi: 'सुरक्षित।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Antacid Gel with Simethicone (Jan Aushadhi)',
      salt: 'Magnesium + Aluminium Hydroxide + Simethicone',
      brandedPrice: '₹170 for 200ml',
      genericPrice: '₹48 for 200ml',
      savingsPercent: '71% cheaper',
      description: {
        en: 'Same sugar-free antacid formulation at less than a third of the cost in generic dispensaries.',
        hi: 'शुगर-फ्री एंटासिड सिरप जन औषधि केंद्र पर मात्र ₹48 में उपलब्ध है।',
      },
    },
    mfgDate: '01/2026',
    expDate: '12/2028',
  },
  {
    barcode: '8901148021024',
    name: 'Shelcal 500 Tablet',
    brand: 'Shelcal',
    manufacturer: 'Torrent Pharmaceuticals Ltd.',
    saltComposition: 'Calcium Carbonate (from Oyster Shell) equivalent to Elemental Calcium 500 mg + Vitamin D3 (Cholecalciferol) 250 IU',
    category: 'Nutritional Supplement / Bone Health (कैल्शियम व विटामिन D3)',
    form: 'Tablet',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    scheduleCategory: 'OTC (Over-The-Counter)',
    safetyLevel: 'safe',
    uses: {
      en: [
        'Treatment and prevention of calcium and Vitamin D3 deficiency',
        'Osteoporosis, weak brittle bones, and joint stiffness',
        'Post-menopausal bone density support in women',
        'Supports dental health, nerve transmission, and muscle contraction',
      ],
      hi: [
        'शरीर में कैल्शियम और विटामिन D3 की कमी को पूरा करना',
        'हड्डियों की कमजोरी (ऑस्टियोपोरोसिस) और जोड़ों के दर्द से बचाव',
        'महिलाओं में 40 की उम्र के बाद हड्डियों को मजबूत बनाए रखना',
        'दांतों, नसों और मांसपेशियों की मजबूती के लिए आवश्यक',
      ],
    },
    howToTake: {
      en: 'Take with or after food (preferably lunch or dinner) as calcium carbonate absorbs best in the presence of stomach acid. Swallow with water.',
      hi: 'दोपहर या रात के भोजन के बाद पानी के साथ 1 गोली लें। खाने के बाद लेने से कैल्शियम शरीर में अच्छी तरह अवशोषित होता है।',
    },
    timing: {
      en: 'Once daily after meals or as advised by physician.',
      hi: 'दिन में 1 बार खाना खाने के बाद।',
    },
    sideEffects: {
      en: [
        'Mild constipation or bloating',
        'Gas or burping',
        'Excessive intake can increase risk of kidney stones',
      ],
      hi: [
        'हल्का कब्ज या पेट में गैस बनना',
        'खट्टी डकारें आना',
        'ज़रूरत से ज़्यादा खाने पर गुर्दे में पथरी (Kidney stone) का खतरा हो सकता है',
      ],
    },
    precautions: {
      alcohol: {
        status: 'safe',
        text: {
          en: 'No direct interaction, but alcohol reduces calcium absorption.',
          hi: 'सीधा दुष्प्रभाव नहीं, लेकिन शराब से कैल्शियम का अवशोषण घटता है।',
        },
      },
      pregnancy: {
        status: 'safe',
        text: {
          en: 'Highly recommended in 2nd and 3rd trimesters under gynecologist guidance for baby skeleton formation.',
          hi: 'गर्भावस्था में बच्चे की हड्डियों के विकास के लिए डॉक्टर की सलाह पर अत्यंत उपयोगी।',
        },
      },
      driving: {
        status: 'safe',
        text: {
          en: 'Completely safe.',
          hi: 'सुरक्षित।',
        },
      },
      kidney: {
        status: 'caution',
        text: {
          en: 'Caution. Patients with history of calcium oxalate kidney stones should drink plenty of water.',
          hi: 'सावधानी। जिन लोगों को किडनी में पथरी की समस्या रही हो, वे खूब पानी पिएं और डॉक्टर से पूछकर लें।',
        },
      },
      liver: {
        status: 'safe',
        text: {
          en: 'Safe.',
          hi: 'सुरक्षित।',
        },
      },
    },
    personalizedWarnings: [],
    genericAlternative: {
      name: 'Calcium 500mg + Vitamin D3 250IU (Jan Aushadhi)',
      salt: 'Calcium Carbonate + Vit D3',
      brandedPrice: '₹131 for 15 tablets',
      genericPrice: '₹22 for 10 tablets',
      savingsPercent: '75% cheaper',
      description: {
        en: 'Get regular daily bone nourishment at 75% lower cost through Jan Aushadhi generic calcium.',
        hi: 'जन औषधि केंद्र पर 10 गोलियां सिर्फ ₹22 में मिलती हैं (75% की भारी बचत)।',
      },
    },
    mfgDate: '10/2025',
    expDate: '09/2028',
  },
];

/**
 * Calculates personalized safety warnings based on User Profile
 * e.g. High BP + Combiflam, Diabetes + Syrup, Under 18 + Adult Dose, Kidney + NSAIDs
 */
export function applyPersonalizedMedicineWarnings(
  med: MedicineProduct,
  userProfile: UserProfile
): MedicineProduct {
  const warnings: MedicineProduct['personalizedWarnings'] = [];
  const age = userProfile.age;
  const conditions = userProfile.conditions || [];

  // 1. Under 18 Check
  if (age < 18) {
    if (med.saltComposition.includes('650 mg') || med.name.includes('650')) {
      warnings.push({
        severity: 'critical',
        conditionMatched: 'Age (<18)',
        title: {
          en: '⚠️ Pediatric Dosage Alert: 650mg is for Adults',
          hi: '⚠️ उम्र चेतावनी: 650mg वयस्कों के लिए है',
        },
        message: {
          en: `You are ${age} years old. 650mg paracetamol is an adult dose. Children and teens should use pediatric drops or age-calculated syrups (e.g. 120mg/5ml or 250mg/5ml) under a pediatrician's advice.`,
          hi: `आपकी उम्र ${age} वर्ष है। 650mg बहुत अधिक खुराक हो सकती है। 18 वर्ष से कम आयु के बच्चों को पीडियाट्रिक डॉक्टर की सलाह पर ही सिरप या कम खुराक देनी चाहिए।`,
        },
      });
    }

    if (med.saltComposition.includes('Ibuprofen') || med.name.includes('Combiflam')) {
      warnings.push({
        severity: 'warning',
        conditionMatched: 'Age (<18)',
        title: {
          en: '⚠️ Pediatric NSAID Caution',
          hi: '⚠️ किशोर व बच्चों के लिए सावधानी',
        },
        message: {
          en: 'Ibuprofen + Paracetamol adult combination can cause severe stomach upset in young individuals. Consult a doctor for pediatric suspension.',
          hi: 'वयस्क दर्द निवारक दवाएं किशोरों के पेट में जलन और एसिडिटी कर सकती हैं। डॉक्टर की सलाह लें।',
        },
      });
    }
  }

  // 2. High Blood Pressure / Hypertension Check
  if (conditions.includes('high_bp')) {
    if (med.saltComposition.includes('Ibuprofen') || med.saltComposition.includes('Diclofenac')) {
      warnings.push({
        severity: 'critical',
        conditionMatched: 'High BP (Hypertension)',
        title: {
          en: '🚨 High Blood Pressure Conflict (NSAID Alert)',
          hi: '🚨 हाई बीपी वालों के लिए चेतावनी (NSAID)',
        },
        message: {
          en: 'Combiflam / Ibuprofen belongs to NSAIDs which can cause fluid retention and significantly spike blood pressure. It can also interfere with your BP medications (like Telmisartan, Amlodipine). Paracetamol alone is safer.',
          hi: 'इबुप्रोफेन (Combiflam) ब्लड प्रेशर को अचानक बढ़ा सकती है और बीपी की दवाओं का असर घटा सकती है। दर्द में केवल सादी पैरासिटामोल लेना अधिक सुरक्षित है।',
        },
      });
    }

    if (med.name.includes('Telma') || med.saltComposition.includes('Telmisartan')) {
      warnings.push({
        severity: 'info',
        conditionMatched: 'High BP (Hypertension)',
        title: {
          en: '✅ Matches Your Profile: Blood Pressure Controller',
          hi: '✅ आपकी प्रोफ़ाइल से संबंधित: बीपी नियंत्रक',
        },
        message: {
          en: 'This medication is prescribed specifically for Hypertension. Ensure you take it consistently at the same hour each day and do not skip doses.',
          hi: 'यह दवा विशेष रूप से हाई ब्लड प्रेशर के लिए है। इसे रोज़ाना एक ही समय पर लें और कभी भी बीच में न छोड़ें।',
        },
      });
    }
  }

  // 3. Diabetes Check
  if (conditions.includes('diabetes')) {
    if (med.form === 'Syrup' && !med.name.toLowerCase().includes('sugar-free')) {
      warnings.push({
        severity: 'warning',
        conditionMatched: 'Diabetes',
        title: {
          en: '⚠️ Syrup Sugar Content Alert',
          hi: '⚠️ सिरप में शुगर की चेतावनी',
        },
        message: {
          en: 'Liquid syrups may contain sucrose or sugar base which can cause sudden spikes in blood sugar. Always ask your pharmacist for Sugar-Free formulations.',
          hi: 'कुछ कफ व एंटासिड सिरप में चीनी (शुगर) होती है जो ब्लड शुगर बढ़ा सकती है। हमेशा "शुगर-फ्री" विकल्प मांगें।',
        },
      });
    }

    if (med.name.includes('Glycomet') || med.saltComposition.includes('Metformin')) {
      warnings.push({
        severity: 'info',
        conditionMatched: 'Diabetes',
        title: {
          en: '✅ Matches Your Profile: Type 2 Diabetes Management',
          hi: '✅ आपकी प्रोफ़ाइल से संबंधित: शुगर नियंत्रण दवा',
        },
        message: {
          en: 'This is a primary anti-diabetic medication. Always take it with or after a meal to prevent gastrointestinal upset and lactic acidosis.',
          hi: 'यह दवा डायबिटीज को नियंत्रित करने के लिए है। पेट दर्द से बचने के लिए इसे हमेशा भोजन के साथ या तुरंत बाद लें।',
        },
      });
    }
  }

  // 4. Kidney Issue Check
  if (conditions.includes('kidney_issue')) {
    if (med.saltComposition.includes('Ibuprofen') || med.saltComposition.includes('Diclofenac')) {
      warnings.push({
        severity: 'critical',
        conditionMatched: 'Kidney Issue',
        title: {
          en: '🚨 Severe Danger: Harmful to Kidneys (Nephrotoxic)',
          hi: '🚨 गंभीर खतरा: किडनी के लिए नुकसानदेह',
        },
        message: {
          en: 'NSAID pain relievers reduce blood flow to the renal arteries and can accelerate kidney damage or trigger acute kidney injury (AKI). Strictly consult your nephrologist.',
          hi: 'इबुप्रोफेन किडनी में खून का प्रवाह घटाती है और किडनी को गंभीर क्षति पहुंचा सकती है। किडनी रोगी इसे बिल्कुल न लें।',
        },
      });
    }

    if (med.name.includes('Shelcal') || med.saltComposition.includes('Calcium')) {
      warnings.push({
        severity: 'warning',
        conditionMatched: 'Kidney Issue',
        title: {
          en: '⚠️ Calcium & Stone Risk Caution',
          hi: '⚠️ किडनी पथरी व मिनरल सावधानी',
        },
        message: {
          en: 'Kidney patients need precise monitoring of Calcium and Phosphorus levels to avoid arterial calcification or kidney stones. Take only under doctor guidance.',
          hi: 'किडनी की बीमारी में कैल्शियम और फास्फोरस का संतुलन बनाए रखना ज़रूरी है, बिना डॉक्टर के टेस्ट कराए न लें।',
        },
      });
    }
  }

  // 5. Heart Problem Check
  if (conditions.includes('heart_problem')) {
    if (med.saltComposition.includes('Ibuprofen')) {
      warnings.push({
        severity: 'critical',
        conditionMatched: 'Heart Problem',
        title: {
          en: '🚨 Cardiovascular Hazard Alert',
          hi: '🚨 दिल के मरीजों के लिए चेतावनी',
        },
        message: {
          en: 'NSAID painkillers like Ibuprofen increase the risk of heart attacks and strokes. Consult your cardiologist before taking any pain medication.',
          hi: 'इबुप्रोफेन जैसी दर्दनिवारक दवाएं हार्ट अटैक और स्ट्रोक का खतरा बढ़ाती हैं। हृदय रोगी इसका सेवन न करें।',
        },
      });
    }
  }

  return {
    ...med,
    personalizedWarnings: warnings,
  };
}

/**
 * Searches medicine database by name or salt
 */
export function searchMedicines(query: string, userProfile: UserProfile): MedicineProduct[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];

  const matches = POPULAR_MEDICINES.filter(
    m =>
      m.name.toLowerCase().includes(cleanQ) ||
      m.saltComposition.toLowerCase().includes(cleanQ) ||
      m.brand.toLowerCase().includes(cleanQ) ||
      m.category.toLowerCase().includes(cleanQ) ||
      m.barcode.includes(cleanQ) ||
      m.uses.en.some(u => u.toLowerCase().includes(cleanQ)) ||
      m.uses.hi.some(u => u.includes(cleanQ))
  );

  return matches.map(m => applyPersonalizedMedicineWarnings(m, userProfile));
}

/**
 * Looks up medicine by barcode number
 */
export function lookupMedicineByBarcode(
  barcode: string,
  userProfile: UserProfile
): MedicineProduct | null {
  const found = POPULAR_MEDICINES.find(m => m.barcode === barcode.trim());
  if (found) {
    return applyPersonalizedMedicineWarnings(found, userProfile);
  }
  return null;
}

export const getMedicineByBarcode = lookupMedicineByBarcode;
