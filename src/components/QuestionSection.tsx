import React, { useState } from 'react';
import { Question } from '../data/projects';
import { usePoints } from '../context/PointsContext';

interface QuestionSectionProps {
  question: Question;
  index: number;
  onLoadCode?: (code: string) => void;
  projectId?: string;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ question, index, onLoadCode, projectId: _projectId }) => {
  void _projectId;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { addPoints, recordCorrectAnswer } = usePoints();

  const handleSelectAnswer = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    setHasAnswered(true);

    if (optionIndex === question.correctAnswer) {
      addPoints(10);
      recordCorrectAnswer(); // 触发"首题答对"徽章判定
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setHasAnswered(false);
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  const isPractice = question.type === 'practice';

  return (
    <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            handleReset();
          }
        }}
      >
        <div className="flex items-center flex-1">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
            isPractice ? 'bg-blue-500 text-white' : 'bg-black text-white'
          }`}>
            {index + 1}
          </span>
          <span className="font-medium text-black flex-1">
            {question.content}
          </span>
        </div>
        <div className="flex items-center">
          {isPractice && (
            <span className="mr-3 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
              实操
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">
          {/* Quiz Options */}
          {!isPractice && question.options && (
            <div className="space-y-3 mb-4">
              {question.options.map((option, optionIndex) => {
                let optionClass = 'border-gray-200 hover:border-gray-400 hover:bg-gray-50';
                if (showResult) {
                  if (optionIndex === question.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (optionIndex === selectedAnswer && optionIndex !== question.correctAnswer) {
                    optionClass = 'border-red-500 bg-red-50';
                  } else {
                    optionClass = 'border-gray-200 opacity-50';
                  }
                } else if (selectedAnswer === optionIndex) {
                  optionClass = 'border-blue-500 bg-blue-50';
                }

                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleSelectAnswer(optionIndex)}
                    disabled={hasAnswered}
                    className={`w-full p-3 border rounded-lg text-left transition-colors flex items-center ${optionClass}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                      showResult && optionIndex === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : showResult && optionIndex === selectedAnswer && optionIndex !== question.correctAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {getOptionLabel(optionIndex)}
                    </span>
                    <span className="text-black">{option}</span>
                    {showResult && optionIndex === question.correctAnswer && (
                      <svg className="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {showResult && optionIndex === selectedAnswer && optionIndex !== question.correctAnswer && (
                      <svg className="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Result and Explanation for Quiz */}
          {!isPractice && showResult && (
            <div className="mb-4">
              <div className={`p-4 rounded-lg mb-4 ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-medium mb-2 ${
                  selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'
                }`}>
                  {selectedAnswer === question.correctAnswer ? '✓ 回答正确！+10积分' : '✗ 回答错误'}
                </p>
                {selectedAnswer !== question.correctAnswer && (
                  <p className="text-gray-600">
                    正确答案：{getOptionLabel(question.correctAnswer!)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Practice Section */}
          {isPractice && (
            <div className="mb-4">
              <p className="text-gray-600 mb-4">{question.explanation}</p>
              {question.hint && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>提示：</strong>{question.hint}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Explanation */}
          {(showResult || isPractice) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-black mb-2">解析：</h4>
              <p className="text-gray-600">{question.explanation}</p>
            </div>
          )}

          {/* Load Code Button for Practice */}
          {isPractice && question.initialCode && onLoadCode && (
            <button
              onClick={() => onLoadCode(question.initialCode!)}
              className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              加载代码到编译器
            </button>
          )}

          {/* Reset Button for Quiz */}
          {!isPractice && showResult && (
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              重新答题
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionSection;