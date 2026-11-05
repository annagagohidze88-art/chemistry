import React, { useState, useMemo } from 'react';
import {
  QUIZ_QUESTIONS,
  type QuizQuestion,
} from '../../data/quizQuestions';
import {
  Trophy,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Flame,
  Sparkles,
  BookOpen,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const ChemistryQuizGame: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; selected: number; isCorrect: boolean }[]
  >([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Filter questions based on category
  const questionsList: QuizQuestion[] = useMemo(() => {
    if (selectedCategory === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion: QuizQuestion | undefined = questionsList[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      // Calculate score (penalize slightly if hints were used to encourage thinking)
      const basePoints = 100;
      const hintPenalty = revealedHints * 20;
      const earnedPoints = Math.max(40, basePoints - hintPenalty);

      setScore(prev => prev + earnedPoints);
      setStreak(prev => {
        const next = prev + 1;
        if (next > highestStreak) setHighestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: index,
        isCorrect,
      },
    ]);
  };

  const handleRevealNextHint = () => {
    if (!currentQuestion) return;
    if (revealedHints < currentQuestion.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setRevealedHints(0);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setRevealedHints(0);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setRevealedHints(0);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>ინტერაქტიული ქიმიური ქვიზი & ტესტები</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                მინიშნებებით
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              შეამოწმეთ ცოდნა რეაქციებში, ნალექებში, ოქსიდებსა და პერიოდულ სისტემაში მინიშნებების დახმარებით
            </p>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ქულა: <strong className="text-amber-300 font-bold">{score}</strong></span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>სერია: <strong className="text-rose-300 font-bold">{streak}</strong></span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold custom-scrollbar">
        <span className="text-slate-400 flex items-center gap-1 mr-1 text-[11px] shrink-0">
          <Filter className="w-3 h-3" />
          <span>თემა:</span>
        </span>
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/25'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          ყველა თემა ({QUIZ_QUESTIONS.length})
        </button>
        <button
          type="button"
          onClick={() => handleCategoryChange('lab_precipitates')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'lab_precipitates'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          ნალექები & ფერები
        </button>
        <button
          type="button"
          onClick={() => handleCategoryChange('oxides_acids')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'oxides_acids'
              ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/25'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          ოქსიდები & მჟავები
        </button>
        <button
          type="button"
          onClick={() => handleCategoryChange('elements')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'elements'
              ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/25'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          ელემენტები & პერიოდულობა
        </button>
        <button
          type="button"
          onClick={() => handleCategoryChange('reactions')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'reactions'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/25'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          რეაქციები & აირები
        </button>
        <button
          type="button"
          onClick={() => handleCategoryChange('everyday')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'everyday'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          ყოველდღიური & ბიოქიმია
        </button>
      </div>

      {/* Main Question Card or Completed Scorecard */}
      {!isQuizCompleted && currentQuestion ? (
        <div className="space-y-5 animate-fadeIn">
          {/* Progress Bar & Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{currentQuestion.categoryLabelKa}</span>
              </span>
              <span>
                კითხვა: <strong>{currentQuestionIndex + 1}</strong> / {questionsList.length}
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-lg space-y-3">
            <h4 className="text-base sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h4>

            {/* Smart Progressive Hints Section */}
            <div className="space-y-2 pt-2 border-t border-slate-850">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRevealNextHint}
                  disabled={revealedHints >= currentQuestion.hints.length || isAnswered}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    revealedHints >= currentQuestion.hints.length || isAnswered
                      ? 'bg-slate-850 text-slate-600 cursor-not-allowed border border-slate-800'
                      : 'bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 shadow-sm'
                  }`}
                  title="გახსენით მინიშნება"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {revealedHints === 0
                      ? `მინიშნება 1-ის გახსნა (სულ ${currentQuestion.hints.length})`
                      : revealedHints < currentQuestion.hints.length
                      ? `მინიშნება 2-ის გახსნა`
                      : 'ყველა მინიშნება გახსნილია'}
                  </span>
                </button>

                {revealedHints > 0 && (
                  <span className="text-[10px] text-amber-400 font-mono">
                    გამოყენებულია {revealedHints} მინიშნება (-{revealedHints * 20} ქულა)
                  </span>
                )}
              </div>

              {/* Displayed hints */}
              {revealedHints > 0 && (
                <div className="space-y-1.5 pt-1">
                  {currentQuestion.hints.slice(0, revealedHints).map((hintText, hIdx) => (
                    <div
                      key={`hint-${hIdx}`}
                      className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2 animate-fadeIn"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 font-mono mr-1">მინიშნება #{hIdx + 1}:</strong>
                        <span>{hintText}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQuestion.correctIndex;

              let btnStyle =
                'bg-slate-950/80 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/60 font-bold';
                } else if (isSelected) {
                  btnStyle =
                    'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-500/25 font-bold';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-850 text-slate-600 opacity-60';
                }
              }

              return (
                <button
                  key={`opt-${optIdx}`}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {optIdx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback & Educational Explanation */}
          {isAnswered && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedOption === currentQuestion.correctIndex ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>სწორია! შესანიშნავია!</span>
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                      <XCircle className="w-5 h-5" />
                      <span>არასწორია. სწორი პასუხია: {currentQuestion.options[currentQuestion.correctIndex]}</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/25"
                >
                  <span>{currentQuestionIndex < questionsList.length - 1 ? 'შემდეგი კითხვა' : 'შედეგების ნახვა'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Deep Explanation */}
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="text-amber-300 font-bold flex items-center gap-1.5 text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>საგანმანათლებლო ახსნა და ქიმიური რეაქცია:</span>
                </div>
                <p className="leading-relaxed font-sans text-slate-200">
                  {currentQuestion.explanationKa}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Completed Scorecard */
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 border-2 border-purple-500/40 text-center space-y-6 shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/30">
            <Trophy className="w-9 h-9" />
          </div>

          <div>
            <h4 className="text-2xl sm:text-3xl font-black text-white">
              ქვიზი დასრულებულია!
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              თქვენ წარმატებით უპასუხეთ {questionsList.length} კითხვას.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ჯამური ქულა</span>
              <span className="text-2xl font-black text-amber-300">{score}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">სწორი პასუხები</span>
              <span className="text-2xl font-black text-emerald-400">
                {userAnswers.filter(a => a.isCorrect).length} / {questionsList.length}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px]">მაქსიმალური სერია</span>
              <span className="text-2xl font-black text-rose-400">
                {highestStreak}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/25"
            >
              <RefreshCw className="w-4 h-4" />
              <span>თავიდან დაწყება</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
