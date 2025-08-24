import React, { useState } from 'react';
import { Download, BarChart3 } from 'lucide-react';

// Teszt kérdések adatai
const testQuestions = [
  {
    category: 'A',
    questions: [
      'Szeretek a versengés örömééért versenyezni másokkal, függetlenül a díjtól.',
      'A határidők nagyon fontosak nekem.',
      'Nagyratörő céljaim vannak.',
      'Nehezen tolerálom, amikor mások miatt nem tudok haladni.',
      'Amikor valaki felbosszant, hajlamos vagyok felemelni a hangomat.',
      'Nyaralás közben is a munkámon jár az eszem.'
    ]
  },
  {
    category: 'B',
    questions: [
      'Úgy gondolom, hogy kevés beleszólásom van a döntéseimbe, sokszor mások irányítanak helyettem.',
      'Gyakran esek apátiába, mert nem tudok változtatni a dolgok menetén.',
      'A hibáimat általában rajtam kívülálló okoknak köszönhetem.',
      'Gyakran nehéz megtalálnom a motivációt a munkámhoz.',
      'Sokszor azt érzem, hogy mások jobbak nálam.',
      'Sokszor nincs is kedvem kikelni az ágyból.'
    ]
  },
  {
    category: 'C',
    questions: [
      'Úgy gondolom, hogy terhelhetö vagyok.',
      'Szerintem el fogom érni a céljaimat, ha elég keményen dolgozok értük.',
      'Sok mindenben jobb vagyok, mint az átlag.',
      'A hibáimat szeretem fejlődési lehetőségként felfogni.',
      'A tetteimért én vagyok a felelős, így a sikeremért is.',
      'Jó problémamegoldó vagyok, nem ijedek meg a kihívásoktól.'
    ]
  },
  {
    category: 'D',
    questions: [
      'Igyekszem mindig tökéletes munkát kiadni a kezeimből.',
      'Gyakran kérek másoktól segítséget.',
      'Jól kezelem a kríziseket.',
      'A lojalitás számomra elsődleges.',
      'Gyakran mások szükségleteit a sajátom elé helyezem.',
      'Manipulálok másokat, ha erre van szükségem céljaim eléréséhez.'
    ]
  },
  {
    category: 'E',
    questions: [
      'Nehezen viselem a monotonitást.',
      'Szeretem az extrém-sportokat.',
      'Mindig új kihívásokat keresek, mert izgalmasnak találom őket.',
      'Szeretek új helyeket felfedezni.',
      'Hajlamos vagyok mérlegelés után magasabb kockázatot vállalni, mint mások.',
      'Gyakran belemegyek veszélyes helyzetekbe az izgalom kedvéért.'
    ]
  }
];

// Személyiségtípus leírások
const personalityTypes = {
  A: {
    name: '"A" típus',
    description: 'Erre a személyiségre jellemző a határidőkhöz való ragaszkodás és versengési kényszer, mely érzelmi sebezhetőséggel, s ellenségeskedéssel, akár agresszióval párosulhat stressz esetén.'
  },
  B: {
    name: 'Külső kontrollos típus',
    description: 'Ennek a személyiségtípusnak a fő jellemzője, hogy képviselői úgy érzik, nem képesek irányítani a saját életüket, s így akár a kudarcaikért, akár a sikereikért külső tényezőket tesznek felelőssé.'
  },
  C: {
    name: 'Hardy típus',
    description: 'Jellemzői az elkötelezettség, a kihívásokra való reagálás és a kontrollképesség. A kutatások szerint, aki keményen helytálló személyiséggel rendelkezik, az lelkileg is és fizikailag is egészségesebb.'
  },
  D: {
    name: '"C" típus',
    description: 'Erre a személyiségre jellemző, hogy másoktól függőnek érzi magát, így gyakran vár támogatást ismerőseitől. Jó krízis-menedzser, a legnagyobb káoszon is képes úrrá lenni.'
  },
  E: {
    name: '"R" típus',
    description: 'Ez a személyiségtípus folyamatosan új élményekre vágyik, imádja az adrenalint, így az extrém-sportokat, és a nagy kockázatokat is, bár számításba veszi azokat.'
  }
};

interface Question {
  text: string;
  category: string;
  id: string;
}

interface Answers {
  [key: string]: number;
}

interface Results {
  [key: string]: number;
}

const StressTestApp: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [savedResults, setSavedResults] = useState<any>(null);
  const [showWarning, setShowWarning] = useState(false);

  // Összes kérdés egyetlen tömbben
  const allQuestions: Question[] = testQuestions.flatMap((category, categoryIndex) => 
    category.questions.map((question, questionIndex) => ({
      text: question,
      category: category.category,
      id: `${category.category}-${questionIndex}`
    }))
  );

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [allQuestions[currentQuestion].id]: parseInt(value)
    }));
    // Figyelmeztetés elrejtése ha válaszol
    if (showWarning) {
      setShowWarning(false);
    }
  };

  const nextQuestion = () => {
    const currentAnswer = answers[allQuestions[currentQuestion].id];
    
    // Ellenőrizzük, hogy van-e válasz (nem lehet undefined és nem lehet az alapértelmezett 3)
    if (currentAnswer === undefined) {
      setShowWarning(true);
      // Figyelmeztetés automatikus eltüntetése 3 másodperc után
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }
    
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Mentjük az eredményeket befejezés előtt
      const finalResults = calculateResults();
      setSavedResults({
        answers: { ...answers },
        results: finalResults,
        completedAt: new Date().toISOString()
      });
      setTestCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = (): Results => {
    const results: Results = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    
    Object.entries(answers).forEach(([questionId, score]) => {
      const category = questionId.split('-')[0];
      if (results[category] !== undefined && score !== undefined) {
        results[category] += score;
      }
    });
    
    return results;
  };

  const exportToPDF = () => {
    // Készítünk egy komplett HTML dokumentumot a letöltéshez
    const resultsData = savedResults || { answers, results: calculateResults() };
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="hu">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stresszkezelés Teszt Eredmények</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 40px; 
            line-height: 1.6;
            color: #333;
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
          }
          .header h1 { 
            color: #2563eb; 
            margin-bottom: 10px; 
            font-size: 2.5em;
          }
          .date { 
            color: #666; 
            font-style: italic; 
          }
          .result-section { 
            margin-bottom: 30px; 
            page-break-inside: avoid; 
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            padding: 20px;
            background: #f9fafb;
          }
          .category-title { 
            font-size: 20px; 
            font-weight: bold; 
            margin-bottom: 15px;
            color: #374151;
          }
          .score { 
            font-size: 28px; 
            color: #2563eb; 
            font-weight: bold;
            display: inline-block;
            background: #dbeafe;
            padding: 10px 20px;
            border-radius: 50px;
            margin: 10px 0;
          }
          .description { 
            margin: 15px 0; 
            line-height: 1.6;
            font-size: 16px;
          }
          .progress-bar { 
            width: 100%; 
            height: 25px; 
            background: #e5e7eb; 
            border-radius: 15px; 
            margin: 15px 0;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
          }
          .progress-fill { 
            height: 100%; 
            border-radius: 15px;
            transition: width 0.5s ease;
          }
          .answers-section { 
            margin-top: 50px; 
            page-break-before: always; 
          }
          .answers-section h2 {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 10px;
          }
          .question { 
            margin: 20px 0; 
            padding: 15px; 
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
          }
          .question-text { 
            font-weight: 600; 
            margin-bottom: 8px;
            color: #374151;
          }
          .answer { 
            color: #2563eb; 
            font-weight: bold;
            font-size: 18px;
          }
          .summary { 
            background: #eff6ff; 
            padding: 20px; 
            border-radius: 10px; 
            margin: 30px 0;
            border-left: 5px solid #2563eb;
          }
          @media print { 
            body { margin: 20px; } 
            .no-print { display: none; }
          }
          .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
          }
          .print-button:hover {
            background: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()" class="print-button no-print">🖨️ Nyomtatás</button>
        
        <div class="header">
          <h1>Stresszkezelés Teszt Eredmények</h1>
          <p class="date">Teszt kitöltve: ${new Date().toLocaleDateString('hu-HU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        <div class="summary">
          <h2>📊 Eredmények összefoglalása</h2>
          <p>Az alábbi eredmények az ön stresszkezelési típusait mutatják be az 5 különböző kategóriában.</p>
        </div>
        
        ${Object.entries(resultsData.results).map(([category, score]) => {
          const percentage = ((score - 6) / (30 - 6)) * 100;
          const clampedPercentage = Math.max(5, Math.min(100, percentage));
          
          let colorGradient = '#22c55e'; // zöld
          if (percentage >= 75) colorGradient = '#ef4444'; // piros
          else if (percentage >= 50) colorGradient = '#f97316'; // narancs  
          else if (percentage >= 25) colorGradient = '#eab308'; // sárga
          
          return `
            <div class="result-section">
              <div class="category-title">${personalityTypes[category as keyof typeof personalityTypes].name}</div>
              <div class="score">${score}/30 pont</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${clampedPercentage}%; background: ${colorGradient};"></div>
              </div>
              <div class="description"><strong>Leírás:</strong> ${personalityTypes[category as keyof typeof personalityTypes].description}</div>
            </div>
          `;
        }).join('')}
        
        <div class="answers-section">
          <h2>📝 Részletes válaszok</h2>
          <p><em>Az alábbi lista tartalmazza az összes kérdést és az ön által adott válaszokat.</em></p>
          
          ${allQuestions.map((question, index) => {
            const answer = resultsData.answers[question.id] || 'Nincs válasz';
            const categoryName = personalityTypes[question.category as keyof typeof personalityTypes]?.name || question.category;
            return `
              <div class="question">
                <div class="question-text">${index + 1}. ${question.text}</div>
                <div class="answer">Válasz: ${answer}/5 (${categoryName} kategória)</div>
              </div>
            `;
          }).join('')}
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #666; font-style: italic;">
          <p>Ez a dokumentum automatikusan generálódott a Stresszkezelés Teszt alapján.</p>
        </div>
      </body>
      </html>
    `;
    
    // Blob létrehozása és letöltés
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Letöltési link létrehozása
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `stresszkezeles-teszt-eredmeny-${new Date().toLocaleDateString('hu-HU').replace(/\./g, '-')}.html`;
    
    // Link hozzáadása a dokumentumhoz, kattintás, majd eltávolítás
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // URL felszabadítása
    URL.revokeObjectURL(url);
    
    // Felhasználó tájékoztatása
    alert('📄 A teszt eredmények letöltése megkezdődött! A letöltött HTML fájlt bármilyen böngészőben megnyithatja és kinyomtathatja.');
  };

  const results = calculateResults();
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const currentAnswer = answers[allQuestions[currentQuestion].id];
  const hasAnswered = currentAnswer !== undefined;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div id="pdf-content" className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Stresszkezelés Teszt Eredmények
            </h1>
            
            {/* Eredmény grafikonok */}
            <div className="space-y-6 mb-8">
              {Object.entries(results).map(([category, score]) => {
                const percentage = ((score - 6) / (30 - 6)) * 100;
                const clampedPercentage = Math.max(5, Math.min(100, percentage));
                return (
                  <div key={category} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-lg text-gray-800">
                        {personalityTypes[category as keyof typeof personalityTypes].name}
                      </span>
                      <span className="font-bold text-xl text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {score}/30
                      </span>
                    </div>
                    
                    <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${clampedPercentage}%`,
                          background: `linear-gradient(90deg, #22c55e 0%, #eab308 33%, #f97316 66%, #ef4444 100%)`,
                        }}
                      />
                      
                      {/* Skála jelölések */}
                      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-2 text-xs font-bold text-white">
                        <span className="bg-black bg-opacity-50 px-1 rounded">6</span>
                        <span className="bg-black bg-opacity-50 px-1 rounded">18</span>
                        <span className="bg-black bg-opacity-50 px-1 rounded">30</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {personalityTypes[category as keyof typeof personalityTypes].description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Akció gombok */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setTestCompleted(false);
                  setSavedResults(null);
                  setShowWarning(false);
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <BarChart3 size={20} />
                Új teszt
              </button>
              
              <button
                onClick={exportToPDF}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <Download size={20} />
                Letöltés HTML-ben
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Teszt befejezve!</h2>
          <p className="text-gray-600 mb-6">
            Minden kérdést megválaszoltál. Kattints a gombra az eredmények megtekintéséhez.
          </p>
          <button
            onClick={() => setShowResults(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Kiértékelés megtekintése
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Fejléc */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Stresszkezelés Teszt
          </h1>
          <div className="bg-gray-200 rounded-full h-4 mb-4 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-600 font-medium">
            {currentQuestion + 1} / {allQuestions.length} kérdés
          </p>
        </div>

        {/* Kérdés kártya */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {allQuestions[currentQuestion].text}
            </h2>
          </div>

          {/* Likert skála csúszka */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span className="font-medium">Egyáltalán nem illik rám</span>
              <span className="font-medium">Teljesen illik rám</span>
            </div>
            
            <div className="relative mb-4">
              <input
                type="range"
                min="1"
                max="5"
                value={answers[allQuestions[currentQuestion].id] || 3}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full h-3 bg-gradient-to-r from-yellow-400 via-orange-400 via-green-400 to-red-500 rounded-lg appearance-none cursor-pointer slider"
              />
              
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <span key={num} className="w-8 text-center font-medium">{num}</span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <span 
                className={`inline-block px-6 py-3 rounded-full font-bold text-xl shadow-lg transition-all duration-300 ${
                  hasAnswered 
                    ? 'bg-green-600 text-white ring-4 ring-green-300' 
                    : 'bg-gray-200 text-gray-500 ring-2 ring-gray-300'
                }`}
              >
                {answers[allQuestions[currentQuestion].id] || 3}
              </span>
            </div>
            
            {/* Figyelmeztetés buborék */}
            {showWarning && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-pulse">
                <strong className="font-bold">Figyelem!</strong>
                <span className="block sm:inline"> Kérjük, válasszon egy értéket a csúszka mozgatásával, mielőtt továbblép!</span>
              </div>
            )}
          </div>

          {/* Navigációs gombok */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Előző
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!hasAnswered}
              className={`px-6 py-3 rounded-xl font-semibold transition-all transform shadow-lg ${
                hasAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              {currentQuestion === allQuestions.length - 1 ? 'Befejezés' : 'Következő'}
            </button>
          </div>
        </div>

        {/* Válaszok állapota */}
        <div className="text-center text-sm text-gray-600">
          <p>Megválaszolt kérdések: {Object.keys(answers).length} / {allQuestions.length}</p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: ${hasAnswered ? '#16a34a' : '#ffffff'};
          border: 4px solid ${hasAnswered ? '#15803d' : '#94a3b8'};
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }
        
        .slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: ${hasAnswered ? '#16a34a' : '#ffffff'};
          border: 4px solid ${hasAnswered ? '#15803d' : '#94a3b8'};
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          #pdf-content, #pdf-content * {
            visibility: visible;
          }
          #pdf-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default StressTestApp;