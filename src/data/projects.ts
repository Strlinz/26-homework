export interface Question {
  id: string;
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  code?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '项目 1：电商订单数据清洗与基础分析',
    description: '数据清洗是数据分析的基础，本项目涵盖订单数据清洗的核心问题和解决方案。',
    questions: [
      {
        id: 'q1',
        content: '订单金额出现负数且无法联系业务方，以下哪种处理策略适用于负数占比较小的情况？',
        options: ['设为缺失值', '直接删除', '取绝对值', '填充平均值'],
        correctAnswer: 1,
        explanation: '直接删除适用于负数占比较小，且对整体分析影响不大的情况。设为缺失值适用于需要保留其他字段信息的情况。取绝对值适用于可能是符号错误的情况，但需要在分析报告中注明。'
      },
      {
        id: 'q2',
        content: '计算真实金额=单价×数量后与订单金额对比，为何允许0.01元微小误差？',
        options: ['业务允许', '四舍五入误差', '系统bug', '数据录入错误'],
        correctAnswer: 1,
        explanation: '微小误差（如0.01元）通常是由于浮点数计算精度问题或四舍五入导致的，属于正常现象。而超过1元的误差可能是数据录入错误、系统bug或业务逻辑问题。'
      },
      {
        id: 'q3',
        content: '订单日期包含2023/02/30非法日期，pd.to_datetime(..., errors="coerce")会返回什么？',
        options: ['报错', 'NaT', '当前日期', '空字符串'],
        correctAnswer: 1,
        explanation: 'pd.to_datetime(..., errors="coerce")会将非法日期转换为NaT（Not a Time）。可以通过df[df["date"].isna()]统计错误日期。'
      },
      {
        id: 'q4',
        content: '多商品订单为长格式（一行一个商品），为何清洗前必须检查订单总金额与商品明细总和不一致问题？',
        options: ['为了美观', '避免分析偏差', '提高数据量', '符合规范'],
        correctAnswer: 1,
        explanation: '如果订单总金额与商品明细总和不一致，可能导致后续分析结果错误。例如，在计算平均订单金额、销售额等指标时会产生偏差。'
      },
      {
        id: 'q5',
        content: '单价列存在10%缺失值，哪种填充方法对异常值不敏感？',
        options: ['删除行', '均值填充', '中位数填充', '同类商品均价填充'],
        correctAnswer: 2,
        explanation: '中位数填充对异常值不敏感，适合数据存在极端值的情况。但中位数填充可能掩盖数据的真实分布。'
      },
      {
        id: 'q6',
        content: '付款状态列：已支付/未支付/NaN，业务说明NaN=支付超时未回传，正确的处理逻辑是？',
        options: ['删除NaN行', '替换为"未支付"', '替换为"支付超时"', '保持不变'],
        correctAnswer: 2,
        explanation: '应将NaN值替换为"支付超时"，然后根据业务需求决定是否将其归为未支付类别。'
      },
      {
        id: 'q7',
        content: '数量列存在单位转换错误（实际值的1000倍），以下哪种方法可以自动检测？',
        options: ['检查数据类型', '统计描述分析', '查看列名', '数据排序'],
        correctAnswer: 1,
        explanation: '可以使用统计描述（查看数量列的分布）、箱线图分析、业务规则检查或关联分析来检测单位转换错误。'
      },
      {
        id: 'q8',
        content: '数据清洗完成后，数据质量报告至少应包含以下哪个统计指标？',
        options: ['商品名称', '用户姓名', '数据完整性', '订单编号'],
        correctAnswer: 2,
        explanation: '数据质量报告应包含数据完整性（各字段的非空率）、数据准确性、数据一致性、数据时效性和异常值统计等指标。'
      },
      {
        id: 'q9',
        content: '用户ID列格式不一致（如001234与1234），用什么pandas方法统一格式？',
        options: ['astype(int)', 'str.zfill()', 'fillna()', 'drop_duplicates()'],
        correctAnswer: 1,
        explanation: '可以使用df["user_id"] = df["user_id"].astype(str).str.zfill(6)将用户ID统一为6位字符串格式。'
      },
      {
        id: 'q10',
        content: '一个订单同时存在退款记录和正常支付记录，清洗时应如何处理？',
        options: ['删除所有记录', '保留并标记', '只保留支付记录', '只保留退款记录'],
        correctAnswer: 1,
        explanation: '应保留并标记。同时保留两种记录可以完整反映订单的生命周期，便于后续分析退款原因和模式。'
      }
    ]
  },
  {
    id: 'project-2',
    title: '项目 2：购物车弃购分析与转化漏斗',
    description: '分析用户从加购到支付的转化过程，识别弃购原因和优化机会。',
    questions: [
      {
        id: 'q1',
        content: '用户事件序列：浏览→加购→浏览→加购→提交→支付，应计入几次「加购到提交」转化？',
        options: ['1次', '2次', '3次', '6次'],
        correctAnswer: 0,
        explanation: '应计入1次。因为整个序列只完成了一次从加购到提交的转化过程，多次加购行为最终只对应一次提交。'
      },
      {
        id: 'q2',
        content: '加购后支付平均时长2小时，某用户7天才支付，漏斗分析是否剔除？',
        options: ['必须剔除', '必须保留', '视业务场景而定', '随机决定'],
        correctAnswer: 2,
        explanation: '是否剔除取决于业务场景：如果分析的是正常购买流程，建议剔除；如果需要完整统计所有支付行为，则应保留。'
      },
      {
        id: 'q3',
        content: '10个用户加购商品A未支付，判断是商品问题还是支付流程问题，需要哪3个对比维度？',
        options: ['商品价格、颜色、尺寸', '商品A与其他商品的弃购率对比、用户对其他商品的支付情况、支付流程完成率', '用户年龄、性别、地域', '商品库存、销量、评分'],
        correctAnswer: 1,
        explanation: '需要对比：商品A与其他商品的弃购率、这10个用户对其他商品的支付情况、支付流程的完成率。'
      },
      {
        id: 'q4',
        content: '转化率分母用「浏览用户数」还是「会话数」？',
        options: ['只能用浏览用户数', '只能用会话数', '根据分析目的选择', '两者结果相同'],
        correctAnswer: 2,
        explanation: '「浏览用户数」关注独立用户的转化情况，「会话数」关注单次会话的转化情况，应根据分析目的选择。'
      },
      {
        id: 'q5',
        content: '提交订单→支付成功率从80%骤降至40%，应如何定位异常？',
        options: ['直接找技术人员', '按时间分组计算支付成功率', '随机抽查订单', '忽略'],
        correctAnswer: 1,
        explanation: '应按时间分组计算支付成功率，识别骤降的时间点，然后分析该时间点的订单数据，识别异常用户。'
      },
      {
        id: 'q6',
        content: '用户加购5件商品，仅支付3件，属于什么情况？',
        options: ['弃购商品', '部分支付', '完全支付', '订单失败'],
        correctAnswer: 1,
        explanation: '属于部分支付。应标记订单状态为"部分支付"，并为每个商品添加支付状态字段。'
      },
      {
        id: 'q7',
        content: '代码df["duration"] = (df["pay_time"] - df["cart_time"]).dt.days计算加购到支付时长的错误是？',
        options: ['语法错误', '只计算了天数，忽略了小时分钟', '数据类型错误', '逻辑正确'],
        correctAnswer: 1,
        explanation: '错误在于使用了dt.days只计算了天数，忽略了小时、分钟等更细粒度的时间。应使用dt.total_seconds()转换为秒。'
      },
      {
        id: 'q8',
        content: '为何要排除加购后1秒内删除的机器人行为？',
        options: ['数据量太大', '不符合正常用户操作习惯', '影响美观', '节省存储空间'],
        correctAnswer: 1,
        explanation: '加购后1秒内删除的行为不符合正常用户操作习惯，很可能是机器人或测试行为，建议使用30秒作为阈值过滤。'
      },
      {
        id: 'q9',
        content: '商品加购弃购率高，但最终支付转化率正常，说明什么业务问题？',
        options: ['数据错误', '用户加购时有冲动行为', '支付系统故障', '商品库存不足'],
        correctAnswer: 1,
        explanation: '说明用户在加购时可能存在冲动行为，添加了很多不需要的商品，但在结账时会筛选出真正需要的商品。'
      },
      {
        id: 'q10',
        content: '用pandas计算「浏览→加购」转化率，正确的代码是？',
        options: ['df["browse"].sum() / df["add_to_cart"].sum()', 'df.groupby("user_id").agg({"browse": "any", "add_to_cart": "any"}).eval("add_to_cart.sum() / browse.sum()")', 'df["add_to_cart"].count() / df["browse"].count()', 'len(df[df["add_to_cart"]==1]) / len(df)'],
        correctAnswer: 1,
        explanation: '正确的代码是按用户分组，统计有浏览行为和有加购行为的用户数，然后计算转化率。'
      }
    ]
  },
  {
    id: 'project-3',
    title: '项目 3：用户消费行为 RFM 分析',
    description: '使用RFM模型对用户进行分层，识别高价值用户和潜在流失用户。',
    questions: [
      {
        id: 'q1',
        content: 'R（最近消费）用「距今天数」还是「最后消费日期」更好？',
        options: ['两者一样', '最后消费日期', '距今天数', '视情况而定'],
        correctAnswer: 2,
        explanation: '使用「距今天数」更好，因为它直接反映了用户的活跃程度，便于比较不同用户。'
      },
      {
        id: 'q2',
        content: 'F（消费频次）：用户1天下5单，算几次？',
        options: ['1次', '5次', '取决于业务场景', '平均每天1次'],
        correctAnswer: 2,
        explanation: '算5次适用于需要精确统计交易次数的场景；算1次适用于关注用户活跃天数的场景。'
      },
      {
        id: 'q3',
        content: '五分位法下用户R=5/F=5/M=5，一定是重要价值用户吗？',
        options: ['一定是', '不一定', '肯定不是', '需要看其他指标'],
        correctAnswer: 1,
        explanation: '不一定。五分位法是相对排名，可能存在整体数据质量不高的情况，必须结合实际数值分布来判断。'
      },
      {
        id: 'q4',
        content: '总消费金额M呈长尾分布，等频分箱会产生什么问题？',
        options: ['计算速度慢', '高消费用户被压缩在一个区间', '数据丢失', '结果不稳定'],
        correctAnswer: 1,
        explanation: '等频分箱会导致高消费用户被压缩在一个区间内，无法区分真正的高价值用户，建议使用自定义阈值。'
      },
      {
        id: 'q5',
        content: '按(R得分，F得分)分组统计人数，计算「R低F高」用户占比的正确方法是？',
        options: ['直接计数', '分组后筛选再计算', '只看R得分', '只看F得分'],
        correctAnswer: 1,
        explanation: '应先按(R得分，F得分)分组统计人数，然后筛选出R低F高的组，计算其占总人数的比例。'
      },
      {
        id: 'q6',
        content: '90天无购买的历史超级大户，RFM归类为一般挽留用户是否合理？',
        options: ['合理', '不合理', '视情况', '无法判断'],
        correctAnswer: 1,
        explanation: '不合理。历史超级大户虽然近期无购买，但曾经贡献了大量revenue，应该归类为重要挽留用户。'
      },
      {
        id: 'q7',
        content: 'RFM结果中，重要挽留用户复购率高于一般用户，可能是什么数据问题？',
        options: ['数据正确', '数据时间范围设置不合理', '用户分类错误', '计算错误'],
        correctAnswer: 1,
        explanation: '可能的原因：数据时间范围设置不合理、复购率计算方法有问题、数据质量问题（如重复记录）。'
      },
      {
        id: 'q8',
        content: '除RFM外，以下哪个可以作为用户分层维度？',
        options: ['订单编号', '商品名称', '商品偏好', '订单状态'],
        correctAnswer: 2,
        explanation: '可结合的用户分层维度包括：商品偏好、渠道偏好、价格敏感度等。'
      },
      {
        id: 'q9',
        content: 'RFM分箱阈值要求每月动态更新，选用分位数还是聚类？',
        options: ['只能用分位数', '只能用聚类', '两者结合', '视情况选择'],
        correctAnswer: 3,
        explanation: '分位数优点是计算简单，结果稳定；聚类优点是能自动识别数据分布的变化。应根据需求选择。'
      },
      {
        id: 'q10',
        content: '针对「重要发展用户（R高、F低、M高）」，推荐什么策略？',
        options: ['优惠券', '新品推送', '会员专属服务', '无动作'],
        correctAnswer: 1,
        explanation: '推荐新品推送。这类用户最近有购买，客单价高，但购买频次低，新品推送可以激发购买兴趣。'
      }
    ]
  },
  {
    id: 'project-4',
    title: '项目 4：商品关联规则挖掘（购物篮分析）',
    description: '通过分析用户购物篮中的商品组合，发现商品间的关联关系。',
    questions: [
      {
        id: 'q1',
        content: '支持度、置信度、提升度中，哪个能避免「热门商品强关联」误导？',
        options: ['支持度', '置信度', '提升度', '都不能'],
        correctAnswer: 2,
        explanation: '提升度能避免热门商品强关联的误导。提升度 = 置信度 / 后项支持度，如果提升度大于1，才说明两者存在正相关。'
      },
      {
        id: 'q2',
        content: '总订单10000，{牛奶}→{面包}支持度5%，置信度40%，同时购买的订单数是？',
        options: ['400', '500', '200', '1000'],
        correctAnswer: 1,
        explanation: '同时购买的订单数 = 总订单数 × 支持度 = 10000 × 5% = 500单'
      },
      {
        id: 'q3',
        content: '{啤酒}→{尿布}提升度=0.9代表什么？',
        options: ['强正相关', '弱正相关', '负相关', '无关联'],
        correctAnswer: 2,
        explanation: '提升度=0.9代表啤酒和尿布的关联程度低于随机水平，存在负相关，不推荐关联推荐。'
      },
      {
        id: 'q4',
        content: '订单含重复商品（2瓶牛奶），生成购物篮时应如何处理？',
        options: ['保留重复', '去重', '随机选择', '根据数量加权'],
        correctAnswer: 1,
        explanation: '应该去重。关联规则分析关注的是商品的存在性，而不是数量。'
      },
      {
        id: 'q5',
        content: '{A,B}→{C}置信度 < {A}→{C}，推荐时选择哪条规则？',
        options: ['{A,B}→{C}', '{A}→{C}', '两条都推荐', '两条都不推荐'],
        correctAnswer: 1,
        explanation: '选择{A}→{C}。虽然{A,B}是更具体的条件，但它的置信度更低，说明同时购买A和B时购买C的可能性更小。'
      },
      {
        id: 'q6',
        content: '不使用apyori，用pandas手动计算商品A和B的支持度，核心是计算什么？',
        options: ['商品销量', '同时购买A和B的订单数', '订单总数', '用户总数'],
        correctAnswer: 1,
        explanation: '支持度 = 同时购买A和B的订单数 / 总订单数，核心是计算同时包含A和B的订单数。'
      },
      {
        id: 'q7',
        content: '大量仅含1件商品的订单，对支持度有什么影响？',
        options: ['提高支持度', '降低支持度', '无影响', '无法判断'],
        correctAnswer: 1,
        explanation: '会降低支持度，因为无法形成商品组合。可以设置最小订单商品数阈值过滤。'
      },
      {
        id: 'q8',
        content: '手机→手机壳规则支持度极低，改用什么分析方法？',
        options: ['增加数据量', '序列模式挖掘', '删除该规则', '提高支持度阈值'],
        correctAnswer: 1,
        explanation: '可以使用序列模式挖掘，分析用户购买手机后一段时间内购买手机壳的模式。'
      },
      {
        id: 'q9',
        content: '{薯片}→{可乐}置信度80%，{可乐}→{薯片}30%，为何不对称？',
        options: ['计算错误', '购买薯片的用户更倾向于购买可乐', '数据量不足', '随机现象'],
        correctAnswer: 1,
        explanation: '不对称是因为购买薯片的用户更倾向于购买可乐，而购买可乐的用户不一定购买薯片。'
      },
      {
        id: 'q10',
        content: '{婴儿奶粉}→{啤酒}置信度极高，能否直接上线推荐？',
        options: ['可以直接上线', '不能直接上线', '测试后上线', '看情况'],
        correctAnswer: 1,
        explanation: '不能直接上线。需要检查数据偏差、样本量、虚假关联和业务逻辑合理性。'
      }
    ]
  },
  {
    id: 'project-5',
    title: '项目 5：用户复购周期与留存分析',
    description: '分析用户的复购行为和留存情况，识别用户生命周期特征。',
    questions: [
      {
        id: 'q1',
        content: '留存分析为何用同期群（Cohort）而非整体留存率？',
        options: ['计算简单', '消除时间因素影响', '数据量小', '结果好看'],
        correctAnswer: 1,
        explanation: '同期群分析可以消除时间因素的影响，更准确地反映不同时期用户的留存情况。'
      },
      {
        id: 'q2',
        content: '平均复购周期30天，中位数15天，用什么代表典型用户？',
        options: ['均值', '中位数', '两者都可以', '取最大值'],
        correctAnswer: 1,
        explanation: '用中位数代表典型用户。复购周期通常呈右偏分布，少数用户的长周期会拉高均值。'
      },
      {
        id: 'q3',
        content: '用户1月注册购买2次，2月0次，3月1次，3月是否算月留存？',
        options: ['算', '不算', '看购买金额', '看购买次数'],
        correctAnswer: 0,
        explanation: '算月留存。留存的定义是用户在注册后第N个月仍有活跃行为，无论中间是否有中断。'
      },
      {
        id: 'q4',
        content: '按注册月份分组，计算注册后第1/2/3个月留存人数，核心步骤是？',
        options: ['按月统计订单数', '计算用户的注册月份和订单月份差', '计算总用户数', '随机抽样'],
        correctAnswer: 1,
        explanation: '核心步骤是计算每个用户的注册月份和订单月份差，然后按同期群和月份差分组统计。'
      },
      {
        id: 'q5',
        content: '同期群留存曲线第2个月突然高于第1个月，可能的原因是？',
        options: ['数据错误', '第1个月有大量一次性用户', '统计方法错误', '用户质量提升'],
        correctAnswer: 1,
        explanation: '可能的原因包括：第1个月的用户中有大量一次性用户、平台在第2个月推出了促销活动、数据采集错误等。'
      },
      {
        id: 'q6',
        content: '如何定义用户流失（连续N月未购买）？',
        options: ['固定N=3', '根据业务经验', '用数据驱动选择N', 'N=1'],
        correctAnswer: 2,
        explanation: '应通过分析用户的历史购买间隔分布来确定N，例如计算用户购买间隔的90分位数。'
      },
      {
        id: 'q7',
        content: '不同同期群留存差异大，给运营的优化建议是？',
        options: ['统一运营策略', '分析高留存同期群特征', '减少用户获取', '降低价格'],
        correctAnswer: 1,
        explanation: '应分析高留存同期群的共同特征并复制成功经验，分析低留存同期群的问题并针对性改进。'
      },
      {
        id: 'q8',
        content: '复购周期分析中，如何排除一次性大促羊毛党？',
        options: ['删除所有大促期间订单', '设定购买频次阈值', '保留所有数据', '随机删除'],
        correctAnswer: 1,
        explanation: '可以设定购买频次阈值，排除只在大促期间购买的用户，或分析用户的购买时间分布。'
      },
      {
        id: 'q9',
        content: '代码df.groupby("user_id").apply(lambda g: g["order_date"].diff().dt.days.median())运行极慢的原因是？',
        options: ['数据量小', 'groupby.apply逐组处理效率低', '语法错误', '内存不足'],
        correctAnswer: 1,
        explanation: '低效原因是groupby.apply是逐组处理，对于大量用户会很慢。应使用向量操作优化。'
      },
      {
        id: 'q10',
        content: '外卖类周活产品，选择什么时间粒度的留存？',
        options: ['年留存', '月留存', '日/周留存', '季度留存'],
        correctAnswer: 2,
        explanation: '外卖类产品应选择日留存和周留存，因为外卖是高频产品，用户活跃周期较短。'
      }
    ]
  },
  {
    id: 'project-6',
    title: '项目 6：订单时间序列销量预测预处理',
    description: '预处理时间序列数据，为销量预测模型做准备。',
    questions: [
      {
        id: 'q1',
        content: 'resample("W")聚合周销量，如何设置周一为一周起始？',
        options: ['resample("W")', 'resample("W-MON")', 'resample("W-START")', 'resample("W-MONDAY")'],
        correctAnswer: 1,
        explanation: '使用W-MON作为频率参数可以设置周一为一周的起始。'
      },
      {
        id: 'q2',
        content: '存在周周期性时，为何不能直接用t-7日销量预测t日销量？',
        options: ['数据量不足', '可能受到节假日等因素影响', '计算复杂', '效果一样'],
        correctAnswer: 1,
        explanation: '因为周周期性可能受到节假日、促销活动等其他因素的影响，需要综合考虑。'
      },
      {
        id: 'q3',
        content: '过去7天滑动均值会引入未来信息泄漏吗？',
        options: ['不会', '会，如果包含当天数据', '不一定', '取决于数据量'],
        correctAnswer: 1,
        explanation: '如果在计算滑动均值时包含了当天的数据，就会引入未来信息泄漏。'
      },
      {
        id: 'q4',
        content: '时间序列有明显上升趋势，直接用原始数据构造滞后特征会导致什么问题？',
        options: ['数据量增大', '模型学习到趋势而非预测模式', '计算速度变慢', '无问题'],
        correctAnswer: 1,
        explanation: '会导致模型学习到趋势而非真正的预测模式，可能产生过拟合。应进行差分或对数变换。'
      },
      {
        id: 'q5',
        content: '为日销量添加不含当天的过去7天销量均值，正确的代码是？',
        options: ['rolling(7).mean()', 'rolling(7, closed="left").mean()', 'rolling(7).sum()/7', 'expanding(7).mean()'],
        correctAnswer: 1,
        explanation: '使用closed="left"参数可以确保窗口不包含当前行。'
      },
      {
        id: 'q6',
        content: '数据无节假日标记，如何自动生成节假日特征？',
        options: ['手动标记', '使用pandas.tseries.holiday库', '忽略节假日', '随机生成'],
        correctAnswer: 1,
        explanation: '可以使用pandas.tseries.holiday库来自动生成节假日特征。'
      },
      {
        id: 'q7',
        content: '滚动均值持续增长，判断时间序列非平稳，选用什么方法预处理？',
        options: ['对数变换', '差分法', '归一化', '标准化'],
        correctAnswer: 1,
        explanation: '选用差分法。差分法可以有效消除趋势，使时间序列变得平稳。'
      },
      {
        id: 'q8',
        content: '滞后30天特征，但历史数据仅60天，用全部数据训练会有什么后果？',
        options: ['效果更好', '前30天数据无法生成滞后特征', '计算更快', '无影响'],
        correctAnswer: 1,
        explanation: '前30天的数据无法生成滞后30天特征，会导致数据缺失。应截取从第31天开始的数据。'
      },
      {
        id: 'q9',
        content: '零售业务中，销量缺失值（无订单）应如何填充？',
        options: ['填充0', '插值', '删除', '填充均值'],
        correctAnswer: 0,
        explanation: '填充0。因为无订单意味着销量为0，这是真实情况，而插值会引入虚假数据。'
      },
      {
        id: 'q10',
        content: 'XGBoost预测特征表含滞后/窗口特征，如何避免训练集与验证集特征泄漏？',
        options: ['随机分割', '按时间顺序分割', '分层抽样', '交叉验证'],
        correctAnswer: 1,
        explanation: '使用时间顺序分割训练集和验证集，确保验证集的时间晚于训练集。'
      }
    ]
  },
  {
    id: 'project-7',
    title: '项目 7：用户价格敏感度分析',
    description: '分析用户对价格的敏感程度，为定价和促销策略提供依据。',
    questions: [
      {
        id: 'q1',
        content: '折扣率=1-实付/原价，原价100，券后80，积分再抵10，实付70，用哪个金额计算？',
        options: ['100', '80', '70', '90'],
        correctAnswer: 2,
        explanation: '用70计算。因为实付是用户实际支付的金额，折扣率应该反映用户实际获得的折扣程度。'
      },
      {
        id: 'q2',
        content: '折扣率超过90%的可能原因是什么？',
        options: ['正常促销', '系统错误或数据录入错误', '商品质量好', '用户需求高'],
        correctAnswer: 1,
        explanation: '可能原因包括系统错误、数据录入错误、特殊促销活动、员工内部购买或测试订单等。'
      },
      {
        id: 'q3',
        content: '仅用平均折扣率区分价格敏感/品质型用户，有什么缺陷？',
        options: ['计算简单', '无法区分真敏感还是偶然使用折扣', '结果准确', '数据量大'],
        correctAnswer: 1,
        explanation: '缺陷包括：无法区分用户是真的价格敏感还是偶然使用了折扣，无法反映用户对不同品类的价格敏感度差异。'
      },
      {
        id: 'q4',
        content: '用户平均折扣率高但购买次数少，如何验证是真敏感还是偶然用大额券？',
        options: ['直接判断为真敏感', '查看折扣使用模式和购买时间分布', '忽略该用户', '平均处理'],
        correctAnswer: 1,
        explanation: '需要查看用户的折扣使用模式、购买时间分布，比较用户在折扣和非折扣时期的购买行为。'
      },
      {
        id: 'q5',
        content: '筛选「高折扣率+高客单价」用户，这类用户的行为特征是？',
        options: ['对价格不敏感', '对价格敏感但购买能力强', '只买低价商品', '购买频率高'],
        correctAnswer: 1,
        explanation: '这类用户对价格敏感但购买能力强，可能喜欢在促销时购买高价值商品。'
      },
      {
        id: 'q6',
        content: '用历史数据验证价格敏感用户发小额券，品质型发满减券是否有效，应采用什么方法？',
        options: ['主观判断', 'A/B测试或历史数据分析', '问卷调查', '专家评估'],
        correctAnswer: 1,
        explanation: '可以通过A/B测试或历史数据分析，比较不同类型用户在收到不同优惠券后的转化率和客单价变化。'
      },
      {
        id: 'q7',
        content: '电子产品折扣低、服饰折扣高，是用户偏好还是品类策略？',
        options: ['只是用户偏好', '只是品类策略', '两者都可能', '无法判断'],
        correctAnswer: 2,
        explanation: '需要分析不同品类的成本结构、价格弹性、消费者价格敏感度和市场竞争情况来区分。'
      },
      {
        id: 'q8',
        content: '用户只买不打折新品，折扣率低，应如何归类？',
        options: ['价格敏感型', '品质型', '不确定', '两者都是'],
        correctAnswer: 1,
        explanation: '可以归为品质型。建议新增品偏好特征，如"新品购买率"，以更准确地描述用户偏好。'
      },
      {
        id: 'q9',
        content: '用户折扣率变异系数CV=std/mean，高CV代表什么用户类型？',
        options: ['折扣使用稳定', '折扣使用不稳定', '从不使用折扣', '总是使用折扣'],
        correctAnswer: 1,
        explanation: '高CV代表用户的折扣使用行为不稳定，可能有时使用高折扣，有时不使用折扣。'
      },
      {
        id: 'q10',
        content: '高折扣率用户对券敏感但复购低，可能的业务解释是？',
        options: ['用户忠诚度高', '用户只在有折扣时购买', '商品质量好', '价格太低'],
        correctAnswer: 1,
        explanation: '可能的解释包括：用户只在有折扣时购买，缺乏品牌忠诚度；折扣吸引了价格敏感的新用户但体验不佳；用户等待更大折扣。'
      }
    ]
  },
  {
    id: 'project-8',
    title: '项目 8：K-Means 用户消费行为聚类',
    description: '使用K-Means算法对用户进行聚类分析，识别不同类型的用户群体。',
    questions: [
      {
        id: 'q1',
        content: '聚类前必须标准化：消费金额0~100万、购买频次0~100，不标准化会有什么后果？',
        options: ['计算更快', '消费金额权重远大于购买频次', '结果更准确', '无影响'],
        correctAnswer: 1,
        explanation: '不标准化会导致消费金额的权重远大于购买频次，因为金额的数值范围更大，聚类结果主要由消费金额决定。'
      },
      {
        id: 'q2',
        content: '肘部法则：K=3→4 SSE下降明显，4→5平缓，选择K=？',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '选择K=4。肘部法则的核心是找到SSE下降趋势明显减缓的点。'
      },
      {
        id: 'q3',
        content: '聚类出平均客单价极高但人数极少的簇，应如何处理？',
        options: ['直接删除', '视为异常簇', '视为高价值簇', '进一步分析'],
        correctAnswer: 3,
        explanation: '需要进一步分析：如果符合业务逻辑（如企业采购用户）则视为高价值簇，如果是数据异常则排除。'
      },
      {
        id: 'q4',
        content: 'pandas+sklearn实现K-Means聚类的正确流程是？',
        options: ['直接聚类', '标准化→聚类→合并标签', '聚类→标准化→合并标签', '合并标签→聚类'],
        correctAnswer: 1,
        explanation: '正确流程：选择特征→标准化→K-Means聚类→簇标签合并回原表。'
      },
      {
        id: 'q5',
        content: '两个簇所有特征接近，仅折扣敏感度不同，应合并还是保留？',
        options: ['合并', '保留', '随机决定', '看簇大小'],
        correctAnswer: 1,
        explanation: '保留。折扣敏感度是重要的用户特征，可能反映不同的购买行为模式和营销策略需求。'
      },
      {
        id: 'q6',
        content: '新增R特征后聚类结果巨变，说明什么问题？',
        options: ['计算错误', 'R特征对聚类结果有显著影响', '数据量不足', '算法不稳定'],
        correctAnswer: 1,
        explanation: '说明R特征（最近消费时间）对聚类结果有显著影响，特征选择对聚类结果有重要影响。'
      },
      {
        id: 'q7',
        content: 'K-Means要求簇为凸形且大小相近，非凸用户群应换用什么算法？',
        options: ['决策树', 'DBSCAN', '线性回归', '随机森林'],
        correctAnswer: 1,
        explanation: '可以使用DBSCAN或层次聚类算法，它们对非凸形状的簇有更好的处理能力。'
      },
      {
        id: 'q8',
        content: '新注册3天用户消费额极高，如何验证是真实行为还是数据错误？',
        options: ['直接信任', '检查用户行为模式和交易真实性', '忽略', '标记为异常'],
        correctAnswer: 1,
        explanation: '需要检查注册和购买时间戳、分析购买行为模式、检查支付和物流信息、与历史数据对比。'
      },
      {
        id: 'q9',
        content: '聚类后如何用簇中心客观命名？',
        options: ['主观命名', '基于簇中心特征值命名', '随机命名', '按数字命名'],
        correctAnswer: 1,
        explanation: '可以基于簇中心的特征值进行客观命名，如"高消费高频用户"、"低消费低频用户"等。'
      },
      {
        id: 'q10',
        content: '个性化推送使用硬分配（单一簇）还是软分配（概率）？',
        options: ['硬分配', '软分配', '两者都可以', '视情况'],
        correctAnswer: 1,
        explanation: '建议使用软分配。用户可能同时具有多个簇的特征，软分配可以更准确地反映用户的多样性。'
      }
    ]
  },
  {
    id: 'project-9',
    title: '项目 9：异常交易检测（IQR+Z-Score + 规则引擎）',
    description: '使用多种方法检测异常交易，防范欺诈和刷单行为。',
    questions: [
      {
        id: 'q1',
        content: 'IQR异常阈值用1.5倍IQR的原因？改为3.0会有什么变化？',
        options: ['习惯用法', '1.5倍约对应99.7%数据范围，改为3.0会减少异常检测数量', '无特殊原因', '计算方便'],
        correctAnswer: 1,
        explanation: '1.5倍IQR是经验值，在正态分布中约对应99.7%的数据范围。改为3.0倍会减少异常值检测数量，降低误报率但可能增加漏报率。'
      },
      {
        id: 'q2',
        content: 'VIP用户订单金额Z-Score=10，统计异常但业务正常，应如何处理？',
        options: ['直接标记为异常', '为VIP用户设置单独阈值', '删除记录', '忽略'],
        correctAnswer: 1,
        explanation: '不应简单标记为异常。应为VIP用户设置单独的异常检测阈值，或根据用户历史行为调整标准。'
      },
      {
        id: 'q3',
        content: '规则：同一用户1小时多收货地址=异常，代下单会误报，如何优化？',
        options: ['删除规则', '增加时间窗口长度', '忽略代下单', '保持不变'],
        correctAnswer: 1,
        explanation: '优化方法包括增加时间窗口、结合用户历史行为、增加其他维度判断、设置频率阈值等。'
      },
      {
        id: 'q4',
        content: '按用户分组计算Z-Score，检测单日下单量异常用户的核心步骤是？',
        options: ['直接计算', '按用户和日期分组统计订单数，计算每个用户的Z-Score', '随机抽样', '按日期分组'],
        correctAnswer: 1,
        explanation: '核心步骤：按用户和日期分组统计订单数，计算每个用户的均值和标准差，然后计算Z-Score。'
      },
      {
        id: 'q5',
        content: 'IQR和Z-Score结果冲突（一个异常一个正常），用什么逻辑？',
        options: ['与逻辑', '或逻辑', '随机选择', '取平均值'],
        correctAnswer: 1,
        explanation: '建议使用"或"逻辑，可以捕获更多潜在的异常情况，减少漏报率。'
      },
      {
        id: 'q6',
        content: '低频用户突然大额消费，Z-Score不稳定，改用什么方法？',
        options: ['继续使用Z-Score', '绝对阈值法', '删除用户', '增加数据量'],
        correctAnswer: 1,
        explanation: '可以使用绝对阈值法、分位数法或机器学习方法（如Isolation Forest）来检测异常。'
      },
      {
        id: 'q7',
        content: '异常清单包含大促正常囤货，如何调整检测策略？',
        options: ['删除所有大促数据', '在检测中加入时间因素', '忽略异常', '降低阈值'],
        correctAnswer: 1,
        explanation: '调整方法包括：大促期间提高异常阈值、结合用户历史购买模式、分析商品类型等。'
      },
      {
        id: 'q8',
        content: '设计百分位数规则：标记折扣率超过99分位数的订单，为何优于固定阈值>90%？',
        options: ['计算简单', '自动适应数据分布变化', '结果更严格', '更容易理解'],
        correctAnswer: 1,
        explanation: '百分位数规则会根据数据分布自动调整阈值，更适应数据的变化，而固定阈值可能产生过多或过少的异常标记。'
      },
      {
        id: 'q9',
        content: '用户日均下单2次，今日50次，是否立即冻结？',
        options: ['立即冻结', '进一步检查IP/设备/支付方式等特征', '忽略', '联系用户'],
        correctAnswer: 1,
        explanation: '不应立即冻结，应进一步检查IP地址、设备信息、支付方式、商品类型、收货地址等特征。'
      },
      {
        id: 'q10',
        content: '如何建立反馈机制，让模型区分促销正常行为与刷单/欺诈？',
        options: ['不做反馈', '人工审核标记并迭代模型', '固定规则', '增加数据量'],
        correctAnswer: 1,
        explanation: '建立反馈机制：人工审核标记、模型迭代、A/B测试、业务规则调整。'
      }
    ]
  },
  {
    id: 'project-10',
    title: '项目 10：用户评论情感分析 + 关键词提取',
    description: '分析用户评论的情感倾向，提取关键信息，为产品改进提供依据。',
    questions: [
      {
        id: 'q1',
        content: '评论「物流快，但包装破、客服差」3星，词典法得分中性，应归类为？',
        options: ['正面', '负面', '中性', '无法判断'],
        correctAnswer: 2,
        explanation: '应归类为中性。评论中既有正面信息也有负面信息，整体情感较为复杂，3星评分也符合中性评价。'
      },
      {
        id: 'q2',
        content: '5星好评含「一般/还行」，评分与情感不一致的原因是？',
        options: ['用户习惯性打高分', '评分错误', '评论错误', '数据错误'],
        correctAnswer: 0,
        explanation: '可能的原因包括：用户习惯性打高分但实际体验一般，或用户对产品期望较低。'
      },
      {
        id: 'q3',
        content: '评论预处理包括哪些步骤？',
        options: ['只分词', '去非中文字符、英文小写、去停用词', '只去停用词', '直接使用'],
        correctAnswer: 1,
        explanation: '评论预处理通常包括：去非中文字符、英文小写、分词、去停用词等步骤。'
      },
      {
        id: 'q4',
        content: 'TF-IDF中，高频词（快递/包装）为何不一定重要？',
        options: ['出现次数少', '在大多数文档中都出现，缺乏区分度', '不重要', '计算错误'],
        correctAnswer: 1,
        explanation: '因为高频词在大多数文档中都出现，缺乏区分度。TF-IDF通过计算逆文档频率降低常见词的权重。'
      },
      {
        id: 'q5',
        content: '提取好评/差评中的高频差异关键词，正确的流程是？',
        options: ['直接统计词频', 'TF-IDF向量化→计算好评差评平均TF-IDF→找出差异关键词', '随机选择', '人工标注'],
        correctAnswer: 1,
        explanation: '正确流程：分离好评差评→TF-IDF向量化→计算平均TF-IDF→找出差异关键词。'
      },
      {
        id: 'q6',
        content: '商品90好评10差评，差评频繁出现「漏液」，是否判定严重问题？',
        options: ['是严重问题', '否', '需要综合判断', '无法判断'],
        correctAnswer: 2,
        explanation: '需要综合判断：漏液问题的严重程度、发生频率、与同类商品对比、问题趋势等。'
      },
      {
        id: 'q7',
        content: 'TextBlob情感得分[-1,1]，划分积极/中性/消极的阈值应如何选？',
        options: ['0分界', '[-0.1,0.1]为中性', '[-0.5,0.5]为中性', '随机选择'],
        correctAnswer: 1,
        explanation: '建议阈值：积极>0.1，中性[-0.1,0.1]，消极<-0.1。设置中性区间可以减少误判。'
      },
      {
        id: 'q8',
        content: '词典法无法识别比较级（比上次好），如何改进？',
        options: ['扩展词典', '使用深度学习模型如BERT', '忽略比较级', '手动标注'],
        correctAnswer: 1,
        explanation: '改进方法包括：使用BERT等深度学习模型、扩展词典包含比较级、结合语法分析等。'
      },
      {
        id: 'q9',
        content: '用户多条评论，情感得分应如何处理？',
        options: ['取平均', '取最差', '取最新', '视情况选择'],
        correctAnswer: 3,
        explanation: '选择依据：平均适合了解整体情感倾向，最差适合识别痛点，最新适合了解最新体验。'
      },
      {
        id: 'q10',
        content: '商品情感得分低但销量高，可能的解释是？',
        options: ['数据错误', '价格低廉或功能满足基本需求', '情感分析错误', '销量统计错误'],
        correctAnswer: 1,
        explanation: '可能的解释：商品价格低廉，用户虽然不满意但仍购买；商品功能满足基本需求，小问题不影响核心使用。'
      }
    ]
  }
];