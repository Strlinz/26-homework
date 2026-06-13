import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';
import SearchBar from '../components/SearchBar';

const finalChallenges = [
  {
    id: 'fc1',
    question:
      '在数据清洗过程中，发现订单金额出现大量0值和负值。以下哪种处理策略最合理？',
    options: [
      '直接删除所有0值和负值记录',
      '将0值视为正常交易（赠品），负值联系业务方确认',
      '将所有异常值替换为平均值',
      '不做任何处理，保持原样',
    ],
    correctAnswer: 1,
    explanation:
      '0值可能是赠品交易，负值可能是退款或错误。需要与业务方确认后再做处理，不能简单删除或替换。',
  },
  {
    id: 'fc2',
    question: '使用RFM模型进行用户分层时，以下哪种情况需要特别考虑？',
    options: [
      '所有用户的RFM得分都是5分',
      '高频低价和低频高价的用户被归为同一层',
      '用户的M值为0',
      '用户的F值为1',
    ],
    correctAnswer: 1,
    explanation:
      'RFM模型主要考虑消费金额、频次和最近消费时间，但忽略了消费场景。高频低价（如小额日用品）和低频高价（如奢侈品）用户虽然消费模式不同，但在RFM中可能被归为同一层，需要额外考虑用户消费类型。',
  },
  {
    id: 'fc3',
    question:
      '在购物篮分析中，发现「薯片→可乐」的置信度为80%，「可乐→薯片」的置信度为30%。以下推断正确的是？',
    options: [
      '薯片和可乐之间没有关联关系',
      '购买薯片的用户中有80%会购买可乐',
      '应该只推荐「薯片→可乐」规则',
      '提升度一定大于1',
    ],
    correctAnswer: 1,
    explanation:
      '置信度表示在购买前项的条件下购买后项的概率。80%的置信度意味着购买薯片的用户中有80%会购买可乐。但需要结合提升度来判断是否是有效的推荐规则。',
  },
  {
    id: 'fc4',
    question: '在计算同期群留存率时，以下哪个做法会导致数据偏差？',
    options: [
      '使用注册月份作为同期群划分标准',
      '使用首次购买月份代替注册月份',
      '只计算有购买记录的用户',
      '保留已流失用户的数据',
    ],
    correctAnswer: 2,
    explanation:
      '如果只计算有购买记录的用户，会遗漏注册后从未购买的用户，导致留存率虚高。正确的做法是包含所有注册用户，即使他们后来流失了。',
  },
  {
    id: 'fc5',
    question:
      '在异常值检测中，使用3倍标准差（Z-score > 3）和1.5倍IQR两种方法，以下情况最可能发生？',
    options: [
      '两种方法检测结果完全相同',
      'Z-score方法会检测出更多异常值',
      'IQR方法会检测出更多异常值',
      '两种方法各有优劣，适用于不同分布的数据',
    ],
    correctAnswer: 3,
    explanation:
      'Z-score方法假设数据服从正态分布，适合检测极端异常值；IQR方法不依赖分布假设，更稳健。对于非正态分布数据，IQR方法通常更合适。',
  },
  {
    id: 'fc6',
    question:
      '在用户复购周期分析中，发现某用户复购周期为365天（一年一次），但平台平均复购周期为30天。以下分析正确的是？',
    options: [
      '该用户是典型用户',
      '应该剔除该用户后重新计算',
      '该用户可能是季节性购买用户，应保留并分析其特征',
      '该数据是错误的，应该删除',
    ],
    correctAnswer: 2,
    explanation:
      '该用户可能是季节性消费者（如每年只在特定节日购买），这种模式本身是有价值的客户洞察。应该保留并分析其购买行为特征，而不是简单地剔除或标记为异常。',
  },
  {
    id: 'fc7',
    question:
      '在K-Means聚类中，肘部法则显示SSE在K=3处出现明显拐点，但轮廓系数在K=5时最高。以下做法正确的是？',
    options: [
      '选择K=3，因为肘部法则更权威',
      '选择K=5，因为轮廓系数更重要',
      '综合考虑业务可解释性和模型指标，选择合适的K值',
      '选择K=4作为折中方案',
    ],
    correctAnswer: 2,
    explanation:
      '聚类分析需要综合考虑模型指标和业务可解释性。如果K=5的簇有清晰的业务含义且轮廓系数显著更高，应该优先考虑；如果K=3的业务意义更明确，可以选择K=3。',
  },
  {
    id: 'fc8',
    question: '在情感分析中，评论「期待了很久，终于降价了，买了！」的情感极性应该是？',
    options: [
      '负面（因为提到了降价）',
      '中性（因为既有正面也有负面情感）',
      '正面（整体表达的是满意和购买意愿）',
      '无法判断',
    ],
    correctAnswer: 2,
    explanation:
      '虽然提到了降价，但整个评论表达的是期待已久的满足感和购买决定，整体情感是正面的。情感分析需要理解上下文和用户意图，而不是简单的词汇叠加。',
  },
  {
    id: 'fc9',
    question:
      '在时间序列预测中，训练集使用最近1年的数据，测试集使用当年的最后一个月。这种划分方式的主要问题是？',
    options: [
      '训练集数据量太少',
      '测试集数据量太少',
      '无法捕捉季节性模式',
      '测试集和训练集时间不连续',
    ],
    correctAnswer: 3,
    explanation:
      '测试集和训练集之间没有时间上的连续性，这意味着无法评估模型在实际场景中的预测能力。正确做法是使用时间序列分割，确保测试集的时间晚于训练集。',
  },
  {
    id: 'fc10',
    question:
      '在价格敏感度分析中，发现某用户群体的价格弹性为-0.5（绝对值小于1）。以下营销建议最合理的是？',
    options: [
      '降价可以增加收入',
      '提价可以增加收入，同时保持客户群稳定',
      '价格调整对收入没有影响',
      '应该进行更大规模的降价促销',
    ],
    correctAnswer: 1,
    explanation:
      '价格弹性为-0.5表示需求变化对价格变化不敏感（绝对值<1）。这种情况下提价会导致需求小幅下降，但总收入仍会增加，因此提价是增加收入的合理策略。',
  },
];

const FinalChallenge: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<string>>(new Set());
  const { points, addPoints, recordChallengeResult, markChallengeVisited } = usePoints();

  // 访问即触发"挑战者"徽章
  useEffect(() => {
    markChallengeVisited();
  }, [markChallengeVisited]);

  const question = finalChallenges[currentQuestion];
  const isCompleted = currentQuestion === finalChallenges.length - 1 && showResult;

  // 挑战完成后记录本次正确数，用于刷新"挑战大师"徽章的最高记录
  useEffect(() => {
    if (isCompleted) {
      recordChallengeResult(correctCount);
    }
  }, [isCompleted, correctCount, recordChallengeResult]);

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const questionId = finalChallenges[currentQuestion].id;
    if (!attemptedQuestions.has(questionId)) {
      setAttemptedQuestions(new Set([...attemptedQuestions, questionId]));
      if (index === question.correctAnswer) {
        setCorrectCount((prev) => prev + 1);
        addPoints(50);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < finalChallenges.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getOptionClass = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800';
    }

    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-400';
    }
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-400';
    }
    return 'border-gray-200 dark:border-gray-700 opacity-50';
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-black text-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center">
            <Link to="/" className="text-white hover:text-gray-300 mr-4 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold">🏆 最终挑战</h1>
          </div>
          <div className="w-full md:w-1/3">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 积分显示 */}
          <div className="bg-black text-white dark:bg-gray-900 rounded-xl p-6 mb-8 text-center shadow-md">
            <p className="text-3xl font-bold mb-2">{points}</p>
            <p className="text-gray-300">当前总积分</p>
            {isCompleted && (
              <div className="mt-4 p-4 bg-green-600 dark:bg-green-700 rounded-lg">
                <p className="text-xl font-bold">🎉 挑战完成！</p>
                <p className="text-sm">
                  正确率：{correctCount}/{finalChallenges.length} 题
                </p>
                <p className="text-sm">获得积分：{correctCount * 50} 分</p>
              </div>
            )}
          </div>

          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                第 {currentQuestion + 1} / {finalChallenges.length} 题
              </span>
              <span>正确：{correctCount} 题</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div
                className="bg-black dark:bg-white h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / finalChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 题目卡片 */}
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl p-8 mb-8 shadow-sm">
            <div className="mb-6">
              <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded text-sm mb-4">
                思考题 {currentQuestion + 1}
              </span>
              <h2 className="text-xl font-semibold leading-relaxed">{question.question}</h2>
            </div>

            {/* 选项 */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${getOptionClass(
                    index,
                  )} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-start">
                    <span
                      className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                        showResult && index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : showResult && index === selectedAnswer && index !== question.correctAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <span className="text-green-500 ml-2">✓</span>
                    )}
                    {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                      <span className="text-red-500 ml-2">✗</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* 解析 */}
            {showResult && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">💡 解析：</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {question.explanation}
                </p>
                {selectedAnswer === question.correctAnswer && (
                  <p className="mt-2 text-green-600 dark:text-green-400 font-medium">
                    ✓ 回答正确！+50 积分
                  </p>
                )}
                {selectedAnswer !== question.correctAnswer && (
                  <p className="mt-2 text-red-600 dark:text-red-400 font-medium">
                    ✗ 回答错误，正确答案是 {String.fromCharCode(65 + question.correctAnswer)}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              ← 上一题
            </button>

            {!isCompleted ? (
              <button
                onClick={handleNext}
                disabled={currentQuestion === finalChallenges.length - 1 && !showResult}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                下一题 →
              </button>
            ) : (
              <Link
                to="/"
                className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex-shrink-0"
              >
                🏠 返回首页
              </Link>
            )}
          </div>

          {/* 提示 */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 text-sm leading-relaxed">
              <strong>📌 提示：</strong>
              这是最终挑战题目，每答对一题可获得 50 积分。这些题目设计用于区分真正理解和死记硬背，需要综合运用课程中学到的知识进行分析和判断。
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 dark:bg-gray-900 border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>商务数据分析教学内容 © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default FinalChallenge;
