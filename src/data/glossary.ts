export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  formula?: string;
  example?: string;
}

// 术语分类
export const GLOSSARY_CATEGORIES = [
  '基础指标',
  '用户分析',
  '漏斗分析',
  '关联规则',
  '用户分层',
  '统计学基础',
];

// 术语库（精选商务数据分析核心术语）
export const glossary: GlossaryTerm[] = [
  // 基础指标
  {
    id: 'gmv',
    term: 'GMV（Gross Merchandise Volume）',
    definition: '商品交易总额，指在一定时间段内成交总额，是衡量电商平台业务规模的核心指标。',
    category: '基础指标',
    formula: 'GMV = 订单数 × 平均订单金额',
    example: '某月产生 1 万笔订单，平均每单 200 元，则该月 GMV = 200 万元。',
  },
  {
    id: 'revenue',
    term: 'Revenue（营业收入）',
    definition: '实际确认的收入金额。与 GMV 的区别在于：GMV 统计所有下单金额，Revenue 只统计实际交易成功的金额，扣除退款、优惠券等。',
    category: '基础指标',
    formula: 'Revenue = GMV - 退款金额 - 平台补贴',
    example: 'GMV 200 万，退款 15 万，平台补贴 5 万，实际 Revenue = 180 万。',
  },
  {
    id: 'arpu',
    term: 'ARPU（Average Revenue Per User）',
    definition: '每用户平均收入，衡量平台的用户变现能力。',
    category: '基础指标',
    formula: 'ARPU = 总收入 / 付费用户数（或活跃用户数，视口径而定）',
    example: '月收入 100 万，付费用户 2 万，ARPU = 50 元。',
  },
  {
    id: 'aov',
    term: 'AOV（Average Order Value）',
    definition: '平均订单金额，衡量单笔订单的购买力。',
    category: '基础指标',
    formula: 'AOV = 总收入 / 订单总数',
    example: '月收入 100 万，订单 5000 笔，AOV = 200 元。',
  },

  // 用户分析
  {
    id: 'dau-mau',
    term: 'DAU / MAU',
    definition: '日活跃用户数（Daily Active Users）/ 月活跃用户数（Monthly Active Users）。活跃通常定义为至少打开一次 App 或进行一次关键行为。',
    category: '用户分析',
    formula: 'DAU / MAU：用户粘性指标，比值越高说明用户回访越频繁',
    example: 'DAU = 10 万，MAU = 30 万，则 DAU/MAU ≈ 33%，代表用户平均每月使用约 10 天。',
  },
  {
    id: 'churn',
    term: '流失率（Churn Rate）',
    definition: '在一定时间内停止使用产品的用户比例，是衡量用户留存能力的核心反面指标。',
    category: '用户分析',
    formula: '流失率 = 期内流失用户数 / 期初用户数 × 100%',
    example: '月初有 10000 用户，月末仍活跃的只有 8500 人，则月流失率 = 15%。',
  },
  {
    id: 'ltv',
    term: 'LTV（Life Time Value）',
    definition: '用户生命周期价值，衡量一个用户在与平台保持关系的整个期间为平台贡献的净收益。',
    category: '用户分析',
    formula: 'LTV ≈ ARPU × 用户平均生命周期月数',
    example: '若用户平均付费 12 个月，每月 ARPU = 50 元，则 LTV ≈ 600 元。用于判断获取用户成本（CAC）是否合理。',
  },
  {
    id: 'cac',
    term: 'CAC（Customer Acquisition Cost）',
    definition: '获取一个新客户的平均成本，包含营销、渠道、销售等全部费用。',
    category: '用户分析',
    formula: 'CAC = 营销总投入 / 新增付费用户数',
    example: '投入 100 万获得 2 万付费用户，CAC = 50 元。若 LTV > 3 × CAC，通常认为业务模型健康。',
  },
  {
    id: 'pay-rate',
    term: '付费率（Pay Rate）',
    definition: '在一定时间段内产生付费行为的用户占活跃用户的比例。',
    category: '用户分析',
    formula: '付费率 = 付费用户数 / 活跃用户数 × 100%',
    example: '月活 10 万，付费 1 万，付费率 = 10%。',
  },

  // 漏斗分析
  {
    id: 'funnel',
    term: '转化漏斗（Conversion Funnel）',
    definition: '用户从入口到完成关键行为（如下单）的逐级转化路径。漏斗形态直观展示各环节的流失情况。',
    category: '漏斗分析',
    formula: '逐层转化率 = 当前步骤用户数 / 上一步骤用户数',
    example: '浏览商品 10000 人 → 加购 3000 人（30%）→ 提交订单 1500 人（50%）→ 支付成功 1200 人（80%），整体转化率 12%。',
  },
  {
    id: 'drop-off',
    term: '流失点（Drop-off Point）',
    definition: '漏斗中转化率异常低的步骤，往往意味着该环节存在体验问题或业务障碍。',
    category: '漏斗分析',
    example: '加购→提交订单的转化率仅 20%，明显低于行业均值 50%，这就是一个需要优化的流失点。',
  },

  // 关联规则
  {
    id: 'support',
    term: '支持度（Support）',
    definition: '在关联规则分析中，同时包含商品 A 和 B 的订单占总订单的比例。反映该规则出现的普遍性。',
    category: '关联规则',
    formula: 'Support(A→B) = P(A ∩ B)',
    example: '总订单 1000，同时购买牛奶和面包的订单 100，支持度 = 10%。',
  },
  {
    id: 'confidence',
    term: '置信度（Confidence）',
    definition: '在购买了 A 的订单中，同时也购买了 B 的比例。反映规则的可信度。',
    category: '关联规则',
    formula: 'Confidence(A→B) = Support(A∩B) / Support(A)',
    example: '买牛奶的订单 300 单中，有 100 单同时买了面包，置信度 = 33.3%。',
  },
  {
    id: 'lift',
    term: '提升度（Lift）',
    definition: '购买 A 后，购买 B 的概率提升倍数。Lift > 1 表示 A 与 B 存在正相关；=1 表示独立；<1 表示负相关。',
    category: '关联规则',
    formula: 'Lift(A→B) = Confidence(A→B) / Support(B)',
    example: 'Confidence(牛奶→面包) = 33%，面包的整体 Support = 20%，则 Lift = 0.33/0.20 = 1.65，说明购买牛奶显著增加面包购买概率。',
  },

  // 用户分层
  {
    id: 'rfm',
    term: 'RFM 模型',
    definition: '基于用户购买行为的经典分层模型：R（Recency 最近一次购买时间）、F（Frequency 购买频次）、M（Monetary 消费金额）。',
    category: '用户分层',
    example: 'R高F高M高 = 重要价值用户；R低F高M高 = 重要挽留用户；R低F低M低 = 一般用户。',
  },
  {
    id: 'cohort',
    term: '同期群分析（Cohort Analysis）',
    definition: '将用户按某个共同特征（如注册月份）分组，跟踪该组用户在后续时间内的留存/消费行为。用于消除时间因素干扰，精准评估用户质量。',
    category: '用户分层',
    example: '1 月新用户次月留存 40%，2 月新用户次月留存 45%，可判断 2 月用户质量更好。',
  },
  {
    id: 'persona',
    term: '用户画像（User Persona）',
    definition: '通过用户的人口属性、行为数据、偏好标签等信息构建的典型用户形象。用于指导产品设计、营销投放和个性化推荐。',
    category: '用户分层',
    example: '"都市白领女性，25-32 岁，月均消费 800 元，偏好进口零食和护肤品"。',
  },

  // 统计学基础
  {
    id: 'outlier',
    term: '异常值（Outlier）',
    definition: '与大部分数据明显偏离的数据点。可能来源于录入错误、测量误差，也可能是真实的极端案例。',
    category: '统计学基础',
    formula: '常用 IQR 判定：小于 Q1 - 1.5×IQR 或大于 Q3 + 1.5×IQR',
    example: '订单金额大部分在 50-500 元之间，出现一笔 99999 元订单，则为异常值。',
  },
  {
    id: 'correlation',
    term: '相关性（Correlation）',
    definition: '衡量两个变量之间线性关系的强度和方向，取值 -1 到 +1。注意：相关性≠因果性。',
    category: '统计学基础',
    formula: '皮尔逊相关系数 r = cov(X,Y) / (σX × σY)',
    example: '"冰淇淋销量"和"溺水事件"呈正相关，但二者并不存在因果关系，它们都受"气温"影响。',
  },
  {
    id: 'ab-test',
    term: 'A/B 测试（A/B Testing）',
    definition: '将用户随机分为两组，分别体验新旧版本，对比两组关键指标差异，判断新版是否更优。',
    category: '统计学基础',
    example: '对比两种商品详情页布局，新版转化率 12%，旧版 10%，p < 0.05 则新版显著更优。',
  },
  {
    id: 'p-value',
    term: 'P 值（P-value）',
    definition: '在假设原假设成立的前提下，观测到当前或更极端结果的概率。P 值越小，越有理由拒绝原假设。',
    category: '统计学基础',
    example: '在 A/B 测试中通常使用 0.05 作为阈值，p < 0.05 认为差异统计显著。',
  },
  {
    id: 'median-mean',
    term: '均值 vs 中位数',
    definition: '均值易受极端值影响，中位数对异常值更稳健。选择哪个取决于数据分布是否对称。',
    category: '统计学基础',
    example: '用户收入数据中存在"1% 富人"极端值，使用中位数更能反映"典型用户"情况。',
  },
];
