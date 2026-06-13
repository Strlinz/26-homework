export type QuestionType = 'quiz' | 'practice';

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  options?: string[];
  correctAnswer?: number;
  explanation: string;
  code?: string;
  initialCode?: string;
  expectedOutput?: string;
  hint?: string;
}

export interface TeachingSection {
  title: string;
  content: string;
  code?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  teaching: TeachingSection[];
  questions: Question[];
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '项目 1：电商订单数据清洗与基础分析',
    description: '数据清洗是数据分析的基础，本项目涵盖订单数据清洗的核心问题和解决方案。',
    teaching: [
      {
        title: '数据清洗概述',
        content: '数据清洗是数据分析流程中的关键步骤，它包括识别和纠正数据中的错误、缺失值、重复值和异常值。在电商数据分析中，订单数据的质量直接影响后续的业务决策。'
      },
      {
        title: '数据质量问题类型',
        content: '常见的数据质量问题包括：\n1. 缺失值：某些字段为空或NaN\n2. 异常值：数值超出合理范围（如负数金额）\n3. 格式不一致：日期格式不统一、ID格式不一致\n4. 重复数据：同一订单被多次记录\n5. 逻辑错误：订单金额与商品明细不一致'
      },
      {
        title: 'pandas数据清洗基础',
        content: 'pandas提供了强大的数据清洗工具：\n- df.dropna()：删除缺失值\n- df.fillna()：填充缺失值\n- df.drop_duplicates()：删除重复值\n- df.astype()：转换数据类型\n- pd.to_datetime()：转换日期格式',
        code: `import pandas as pd
import numpy as np

# 读取数据
df = pd.read_csv('orders.csv')

# 查看数据概况
print(df.info())
print(df.describe())

# 检查缺失值
print(df.isnull().sum())

# 检查重复值
print(df.duplicated().sum())`
      },
      {
        title: '异常值检测方法',
        content: '常用的异常值检测方法：\n1. IQR方法：基于四分位数间距检测\n2. Z-score方法：基于标准差检测\n3. 业务规则：根据业务知识定义阈值',
        code: `# IQR方法检测异常值
Q1 = df['amount'].quantile(0.25)
Q3 = df['amount'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = df[(df['amount'] < lower_bound) | (df['amount'] > upper_bound)]`
      },
      {
        title: '数据清洗流程',
        content: '标准的数据清洗流程：\n1. 数据导入与初步检查\n2. 缺失值处理\n3. 异常值检测与处理\n4. 格式标准化\n5. 重复数据处理\n6. 逻辑一致性检查\n7. 生成数据质量报告'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '订单金额出现负数且无法联系业务方，以下哪种处理策略适用于负数占比较小的情况？',
        options: ['设为缺失值', '直接删除', '取绝对值', '填充平均值'],
        correctAnswer: 1,
        explanation: '直接删除适用于负数占比较小，且对整体分析影响不大的情况。设为缺失值适用于需要保留其他字段信息的情况。取绝对值适用于可能是符号错误的情况，但需要在分析报告中注明。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：使用 pandas 检测并处理订单数据中的异常值',
        explanation: '请使用 pandas 完成以下任务：\n1. 创建包含异常值的订单数据\n2. 使用 IQR 方法检测异常值\n3. 统计异常值数量并输出',
        initialCode: `import pandas as pd
import numpy as np

# 创建订单数据
data = {
    'order_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'amount': [100, 200, 150, -50, 300, 250, 180, 99999, 120, 160]  # -50和99999是异常值
}

df = pd.DataFrame(data)
print("原始数据：")
print(df)

# 使用 IQR 方法检测异常值
Q1 = df['amount'].quantile(0.25)
Q3 = df['amount'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"\nQ1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print(f"正常范围: [{lower_bound}, {upper_bound}]")

# 标记异常值
df['is_outlier'] = (df['amount'] < lower_bound) | (df['amount'] > upper_bound)

print("\n检测结果：")
print(df)
print(f"\n异常值数量: {df['is_outlier'].sum()}")`,
        expectedOutput: '检测出负数和极大值为异常值',
        hint: '提示：IQR = Q3 - Q1，正常范围是 [Q1 - 1.5*IQR, Q3 + 1.5*IQR]'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '订单日期包含2023/02/30非法日期，pd.to_datetime(..., errors="coerce")会返回什么？',
        options: ['报错', 'NaT', '当前日期', '空字符串'],
        correctAnswer: 1,
        explanation: 'pd.to_datetime(..., errors="coerce")会将非法日期转换为NaT（Not a Time）。可以通过df[df["date"].isna()]统计错误日期。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：处理日期数据中的非法日期',
        explanation: '请使用 pandas 处理包含非法日期的数据，并统计和填充错误日期。',
        initialCode: `import pandas as pd
import numpy as np

# 创建包含非法日期的数据
data = {
    'order_id': [1, 2, 3, 4, 5],
    'date': ['2023-01-15', '2023-02-30', '2023-03-20', '2023-04-31', '2023-05-10']
}

df = pd.DataFrame(data)
print("原始日期数据：")
print(df)

# 使用 pd.to_datetime 转换，设置 errors='coerce'
df['date_parsed'] = pd.to_datetime(df['date'], errors='coerce')

print("\n转换后的数据：")
print(df)

# 统计非法日期数量
invalid_count = df['date_parsed'].isna().sum()
print(f"\n非法日期数量: {invalid_count}")

# 用前一个有效日期填充
df['date_filled'] = df['date_parsed'].fillna(method='ffill')
print("\n填充后的数据：")
print(df)`,
        expectedOutput: '非法日期被转换为 NaT 并用前一个日期填充',
        hint: '提示：errors="coerce" 会将非法日期转为 NaT，然后可以用 ffill 或 bfill 填充'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '单价列存在10%缺失值，哪种填充方法对异常值不敏感？',
        options: ['删除行', '均值填充', '中位数填充', '同类商品均价填充'],
        correctAnswer: 2,
        explanation: '中位数填充对异常值不敏感，适合数据存在极端值的情况。但中位数填充可能掩盖数据的真实分布。'
      },
      {
        id: 'q6',
        type: 'quiz',
        content: '用户ID列格式不一致（如001234与1234），用什么pandas方法统一格式？',
        options: ['astype(int)', 'str.zfill()', 'fillna()', 'drop_duplicates()'],
        correctAnswer: 1,
        explanation: '可以使用df["user_id"] = df["user_id"].astype(str).str.zfill(6)将用户ID统一为6位字符串格式。'
      },
      {
        id: 'q7',
        type: 'practice',
        content: '实操练习：用户ID格式统一与数据去重',
        explanation: '请使用 pandas 统一用户ID格式，并进行数据去重。',
        initialCode: `import pandas as pd

# 创建格式不一致的用户数据
data = {
    'user_id': ['001234', '1234', '0005678', '5678', '001234', '99999'],
    'order_amount': [100, 200, 150, 300, 100, 500]
}

df = pd.DataFrame(data)
print("原始数据：")
print(df)

# 统一用户ID格式为6位字符串
df['user_id_clean'] = df['user_id'].astype(str).str.zfill(6)
print("\n统一格式后的数据：")
print(df)

# 去除重复订单
df_unique = df.drop_duplicates(subset=['user_id_clean', 'order_amount'], keep='first')
print(f"\n去重前订单数: {len(df)}, 去重后订单数: {len(df_unique)}")
print("\n去重后的数据：")
print(df_unique)`,
        expectedOutput: '用户ID统一为6位格式，重复订单被删除',
        hint: '提示：str.zfill(6) 可以将字符串补齐到6位'
      },
      {
        id: 'q8',
        type: 'quiz',
        content: '一个订单同时存在退款记录和正常支付记录，清洗时应如何处理？',
        options: ['删除所有记录', '保留并标记', '只保留支付记录', '只保留退款记录'],
        correctAnswer: 1,
        explanation: '应保留并标记。同时保留两种记录可以完整反映订单的生命周期，便于后续分析退款原因和模式。'
      },
      {
        id: 'q9',
        type: 'practice',
        content: '实操练习：计算订单金额与商品明细一致性',
        explanation: '请检查订单总金额与商品明细总和不一致的情况。',
        initialCode: `import pandas as pd
import numpy as np

# 创建多商品订单数据
data = {
    'order_id': [1, 1, 1, 2, 2, 3, 3, 3],
    'product': ['商品A', '商品B', '商品C', '商品A', '商品B', '商品A', '商品B', '商品C'],
    'price': [50, 30, 20, 100, 80, 45, 55, 100],
    'quantity': [2, 1, 3, 1, 2, 1, 1, 2],
    'order_total': [130, 130, 130, 260, 260, 300, 300, 300]
}

df = pd.DataFrame(data)
print("原始数据：")
print(df)

# 计算商品明细小计
df['subtotal'] = df['price'] * df['quantity']

# 按订单汇总商品明细
order_summary = df.groupby('order_id').agg({
    'subtotal': 'sum',
    'order_total': 'first'
}).reset_index()

order_summary.columns = ['order_id', 'items_total', 'order_total']
order_summary['is_consistent'] = np.isclose(order_summary['items_total'], order_summary['order_total'], atol=0.01)

print("\n订单一致性检查：")
print(order_summary)

# 统计不一致订单
inconsistent = order_summary[~order_summary['is_consistent']]
print(f"\n不一致订单数量: {len(inconsistent)}")`,
        expectedOutput: '检测出订单金额与商品明细不一致的情况',
        hint: '提示：使用 np.isclose 比较浮点数，允许 0.01 的误差'
      },
      {
        id: 'q10',
        type: 'practice',
        content: '实操练习：生成数据质量报告',
        explanation: '请生成一份完整的数据质量报告，包含完整性、准确性、一致性等指标。',
        initialCode: `import pandas as pd
import numpy as np

# 创建模拟的订单数据（包含各种数据质量问题）
data = {
    'order_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'user_id': ['001', '002', None, '004', '005', '002', '007', '008', '009', '010'],
    'amount': [100, 200, 150, None, 300, 200, 180, 160, 170, 190],
    'status': ['paid', 'paid', 'paid', 'refund', 'paid', 'paid', 'paid', 'paid', 'paid', 'paid'],
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', 
             '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09', '2023-01-10']
}

df = pd.DataFrame(data)

print("=" * 50)
print("数据质量报告")
print("=" * 50)

# 1. 数据完整性
print("\n【1. 数据完整性】")
total_records = len(df)
for col in df.columns:
    non_null = df[col].notna().sum()
    completeness = non_null / total_records * 100
    print(f"  {col}: {completeness:.1f}%")

# 2. 数据分布
print("\n【2. 数据分布】")
print(f"  订单金额统计:")
print(df['amount'].describe())

# 3. 异常值检测
print("\n【3. 异常值检测】")
Q1 = df['amount'].quantile(0.25)
Q3 = df['amount'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['amount'] < Q1 - 1.5*IQR) | (df['amount'] > Q3 + 1.5*IQR)]
print(f"  异常值数量: {len(outliers)}")

# 4. 重复检测
print("\n【4. 重复检测】")
duplicates = df.duplicated(subset=['order_id']).sum()
print(f"  重复订单数: {duplicates}")

print("\n" + "=" * 50)`,
        expectedOutput: '生成完整的数据质量报告',
        hint: '提示：数据质量报告应包含完整性、准确性、一致性、及时性、唯一性等方面'
      }
    ]
  },
  {
    id: 'project-2',
    title: '项目 2：购物车弃购分析与转化漏斗',
    description: '分析用户从加购到支付的转化过程，识别弃购原因和优化机会。',
    teaching: [
      {
        title: '转化漏斗概述',
        content: '转化漏斗是分析用户从一个阶段到下一个阶段的转化率的工具。在电商场景中，典型的转化漏斗包括：浏览→加购→提交订单→支付。'
      },
      {
        title: '漏斗分析指标',
        content: '常用的漏斗分析指标：\n1. 转化率：当前步骤用户数 / 上一步骤用户数\n2. 流失率：1 - 转化率\n3. 平均转化时长：用户从一个步骤到下一个步骤的平均时间'
      },
      {
        title: '漏斗计算方法',
        content: '漏斗计算的关键是按用户去重统计，而不是按事件次数。需要确保同一个用户在同一个漏斗中只被计算一次。',
        code: `import pandas as pd

# 用户行为数据
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3],
    'event': ['browse', 'add_to_cart', 'pay', 'browse', 'add_to_cart', 'browse', 'pay'],
    'timestamp': range(7)
}

df = pd.DataFrame(data)

# 统计各步骤用户数
funnel = df.groupby('event')['user_id'].nunique()
print(funnel)`
      },
      {
        title: '弃购原因分析',
        content: '常见的弃购原因包括：\n1. 价格敏感：用户觉得价格太高\n2. 支付体验差：支付流程复杂\n3. 商品问题：库存不足、规格不符\n4. 比较购物：用户去其他平台比价\n5. 意外退出：误操作或页面卡顿'
      },
      {
        title: '用户行为序列分析',
        content: '通过分析用户的行为序列，可以了解用户在弃购前的行为模式，识别关键的流失节点。',
        code: `# 按用户排序并生成行为序列
df_sorted = df.sort_values(['user_id', 'timestamp'])
user_sequences = df_sorted.groupby('user_id')['event'].apply(list)
print(user_sequences)`
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '用户事件序列：浏览→加购→浏览→加购→提交→支付，应计入几次「加购到提交」转化？',
        options: ['1次', '2次', '3次', '6次'],
        correctAnswer: 0,
        explanation: '应计入1次。因为整个序列只完成了一次从加购到提交的转化过程，多次加购行为最终只对应一次提交。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：计算用户转化漏斗',
        explanation: '请根据用户行为数据计算转化漏斗的各层级转化率。',
        initialCode: `import pandas as pd

# 模拟用户行为数据
data = {
    'user_id': [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3],
    'event': ['browse', 'add_to_cart', 'browse', 'add_to_cart', 'submit', 'pay',
              'browse', 'add_to_cart', 'submit', 'browse', 'browse', 'add_to_cart', 'submit', 'pay'],
    'timestamp': range(14)
}

df = pd.DataFrame(data)
print("用户行为数据：")
print(df)

# 统计各步骤用户数
funnel_steps = ['browse', 'add_to_cart', 'submit', 'pay']
funnel_counts = {}

for step in funnel_steps:
    users = df[df['event'] == step]['user_id'].nunique()
    funnel_counts[step] = users

print("\n转化漏斗：")
for step, count in funnel_counts.items():
    print(f"  {step}: {count} 用户")

# 计算转化率
print("\n转化率：")
total_users = funnel_counts['browse']
for i in range(1, len(funnel_steps)):
    prev_step = funnel_steps[i-1]
    curr_step = funnel_steps[i]
    rate = funnel_counts[curr_step] / funnel_counts[prev_step] * 100
    print(f"  {prev_step} -> {curr_step}: {rate:.1f}%")`,
        expectedOutput: '计算各步骤的转化率和整体转化漏斗',
        hint: '提示：转化率 = 当前步骤用户数 / 上一步骤用户数'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '加购后支付平均时长2小时，某用户7天才支付，漏斗分析是否剔除？',
        options: ['必须剔除', '必须保留', '视业务场景而定', '随机决定'],
        correctAnswer: 2,
        explanation: '是否剔除取决于业务场景：如果分析的是正常购买流程，建议剔除；如果需要完整统计所有支付行为，则应保留。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：计算加购到支付时长并识别异常',
        explanation: '请计算用户从加购到支付的时长，并识别异常延迟的订单。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟加购和支付数据
data = {
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    'event': ['add_to_cart', 'pay', 'add_to_cart', 'pay', 'add_to_cart', 'pay', 'add_to_cart', 'pay', 'add_to_cart', 'pay'],
    'timestamp': pd.to_datetime([
        '2023-01-01 10:00:00', '2023-01-01 11:00:00',  # 用户1: 1小时
        '2023-01-01 10:00:00', '2023-01-01 12:00:00',  # 用户2: 2小时
        '2023-01-01 10:00:00', '2023-01-01 10:01:00',  # 用户3: 1分钟（异常快）
        '2023-01-01 10:00:00', '2023-01-01 01-08 10:00:00',  # 用户4: 7天（异常慢）
        '2023-01-01 10:00:00', '2023-01-01 11:30:00'  # 用户5: 1.5小时
    ])
}

df = pd.DataFrame(data)

# 分别获取加购和支付时间
cart_df = df[df['event'] == 'add_to_cart'].rename(columns={'timestamp': 'cart_time'})
pay_df = df[df['event'] == 'pay'].rename(columns={'timestamp': 'pay_time'})

# 合并数据
result = cart_df.merge(pay_df, on='user_id')

# 计算时长（小时）
result['duration_hours'] = (result['pay_time'] - result['cart_time']).dt.total_seconds() / 3600

print("用户支付时长分析：")
print(result[['user_id', 'cart_time', 'pay_time', 'duration_hours']])

# 识别异常
Q1 = result['duration_hours'].quantile(0.25)
Q3 = result['duration_hours'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

result['is_anomaly'] = (result['duration_hours'] < lower) | (result['duration_hours'] > upper)

print(f"\n正常范围: {lower:.2f} - {upper:.2f} 小时")
print("\n异常订单：")
print(result[result['is_anomaly']])`,
        expectedOutput: '识别出支付时长异常的用户',
        hint: '提示：支付时长过短或过长都可能是异常'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '用户加购5件商品，仅支付3件，属于什么情况？',
        options: ['弃购商品', '部分支付', '完全支付', '订单失败'],
        correctAnswer: 1,
        explanation: '属于部分支付。应标记订单状态为"部分支付"，并为每个商品添加支付状态字段。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：识别部分支付订单',
        explanation: '请识别加购多件但只支付部分的用户订单。',
        initialCode: `import pandas as pd

# 模拟用户加购和支付数据
data = {
    'user_id': [1, 1, 1, 1, 1, 2, 2, 2, 3, 3],
    'product': ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'A', 'B'],
    'event': ['add_to_cart', 'add_to_cart', 'add_to_cart', 'add_to_cart', 'add_to_cart',
              'add_to_cart', 'add_to_cart', 'add_to_cart', 'add_to_cart', 'add_to_cart'],
    'status': ['paid', 'paid', 'paid', 'unpaid', 'unpaid', 'paid', 'paid', 'unpaid', 'paid', 'paid']
}

df = pd.DataFrame(data)

# 按用户统计
user_stats = df.groupby('user_id').agg({
    'product': 'count',
    'status': lambda x: (x == 'paid').sum()
}).reset_index()

user_stats.columns = ['user_id', 'total_items', 'paid_items']
user_stats['is_partial'] = user_stats['paid_items'] < user_stats['total_items']

print("用户购买统计：")
print(user_stats)

print(f"\n部分支付用户数: {user_stats['is_partial'].sum()}")
print("\n部分支付详情：")
partial_users = user_stats[user_stats['is_partial']]
for _, row in partial_users.iterrows():
    print(f"  用户{row['user_id']}: 加购{row['total_items']}件，支付{row['paid_items']}件")`,
        expectedOutput: '识别出部分支付的用户和订单',
        hint: '提示：加购数量 > 支付数量 则为部分支付'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '代码计算加购到支付时长的错误是？',
        options: ['语法错误', '只计算了天数，忽略了小时分钟', '数据类型错误', '逻辑正确'],
        correctAnswer: 1,
        explanation: '错误在于使用了dt.days只计算了天数，忽略了小时、分钟等更细粒度的时间。应使用dt.total_seconds()转换为秒。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：排除机器人行为数据',
        explanation: '请过滤掉加购后短时间内删除的疑似机器人行为。',
        initialCode: `import pandas as pd

# 模拟用户行为数据（包含机器人行为）
data = {
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    'event': ['add_to_cart', 'remove_from_cart', 'add_to_cart', 'remove_from_cart',
              'add_to_cart', 'remove_from_cart', 'add_to_cart', 'pay',
              'add_to_cart', 'pay', 'add_to_cart', 'remove_from_cart'],
    'timestamp': pd.to_datetime([
        '2023-01-01 10:00:00', '2023-01-01 10:00:01',  # 用户1: 1秒后删除（机器人）
        '2023-01-01 10:00:00', '2023-01-01 10:00:30',  # 用户2: 30秒后删除（机器人）
        '2023-01-01 10:00:00', '2023-01-01 10:00:05',  # 用户3: 5秒后删除（机器人）
        '2023-01-01 10:00:00', '2023-01-01 12:00:00',  # 用户4: 正常用户
        '2023-01-01 10:00:00', '2023-01-01 11:00:00',  # 用户5: 正常用户
        '2023-01-01 10:00:00', '2023-01-01 10:00:45'   # 用户6: 45秒后删除（待定）
    ])
}

df = pd.DataFrame(data)

# 获取加购时间
cart_df = df[df['event'] == 'add_to_cart'][['user_id', 'timestamp']].rename(columns={'timestamp': 'cart_time'})

# 获取删除时间
remove_df = df[df['event'] == 'remove_from_cart'][['user_id', 'timestamp']].rename(columns={'timestamp': 'remove_time'})

# 合并
result = cart_df.merge(remove_df, on='user_id', how='left')

# 计算删除时长
result['duration_seconds'] = (result['remove_time'] - result['cart_time']).dt.total_seconds()

print("用户行为分析：")
print(result)

# 设置阈值：30秒内删除视为机器人行为
THRESHOLD = 30
result['is_bot'] = result['duration_seconds'] <= THRESHOLD

print(f"\n机器人行为（删除时长 <= {THRESHOLD}秒）：")
print(result[result['is_bot']])

print(f"\n真实用户数: {(~result['is_bot']).sum()}")
print(f"机器人用户数: {result['is_bot'].sum()}")`,
        expectedOutput: '过滤掉机器人行为，保留真实用户数据',
        hint: '提示：加购后30秒内删除视为机器人行为'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '商品加购弃购率高，但最终支付转化率正常，说明什么业务问题？',
        options: ['数据错误', '用户加购时有冲动行为', '支付系统故障', '商品库存不足'],
        correctAnswer: 1,
        explanation: '说明用户在加购时可能存在冲动行为，添加了很多不需要的商品，但在结账时会筛选出真正需要的商品。'
      },
      {
        id: 'q10',
        type: 'practice',
        content: '实操练习：一行代码计算浏览→加购转化率',
        explanation: '请使用 pandas 一行链式代码计算转化率。',
        initialCode: `# 模拟数据
import pandas as pd

data = {
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    'event': ['browse', 'add_to_cart', 'browse', 'add_to_cart', 'browse', 'add_to_cart', 'browse', 'add_to_cart', 'browse', 'add_to_cart']
}

df = pd.DataFrame(data)

# 一行代码计算浏览->加购转化率
conversion_rate = (
    df.groupby('user_id')
    .agg({'event': lambda x: ('add_to_cart' in x.values)})
    .assign(browse=lambda x: True)
    ['event'].sum() / 
    df.groupby('user_id')['event'].apply(lambda x: 'browse' in x.values).sum()
)

print(f"浏览用户数: {df.groupby('user_id')['event'].apply(lambda x: 'browse' in x.values).sum()}")
print(f"加购用户数: {df.groupby('user_id').agg({'event': lambda x: ('add_to_cart' in x.values)}).sum()[0]}")
print(f"转化率: {conversion_rate * 100:.1f}%")`,
        expectedOutput: '计算得到浏览→加购的转化率',
        hint: '提示：转化率 = 加购用户数 / 浏览用户数'
      }
    ]
  },
  {
    id: 'project-3',
    title: '项目 3：用户消费行为 RFM 分析',
    description: '使用RFM模型对用户进行分层，识别高价值用户和潜在流失用户。',
    teaching: [
      {
        title: 'RFM模型概述',
        content: 'RFM是一种常用的用户价值分析模型，通过三个维度评估用户价值：\n- R(Recency)：最近一次消费时间\n- F(Frequency)：消费频次\n- M(Monetary)：消费金额'
      },
      {
        title: 'RFM得分计算',
        content: 'RFM得分通常采用五分位法：\n- R得分：最近消费的用户得分高（5分），久未消费的用户得分低（1分）\n- F得分：消费频次高的用户得分高\n- M得分：消费金额高的用户得分高',
        code: `import pandas as pd

# 计算RFM得分
rfm['R_score'] = pd.qcut(rfm['R'], q=5, labels=[5, 4, 3, 2, 1])
rfm['F_score'] = pd.qcut(rfm['F'], q=5, labels=[1, 2, 3, 4, 5])
rfm['M_score'] = pd.qcut(rfm['M'], q=5, labels=[1, 2, 3, 4, 5])`
      },
      {
        title: '用户分层策略',
        content: '基于RFM得分进行用户分层：\n- 重要价值用户：R高、F高、M高\n- 重要发展用户：R高、F低、M高\n- 重要挽留用户：R低、F高、M高\n- 一般用户：R低、F低、M低'
      },
      {
        title: 'RFM应用场景',
        content: 'RFM模型的典型应用：\n1. 个性化营销：针对不同分层用户制定不同策略\n2. 客户关系管理：识别高价值用户并重点维护\n3. 流失预警：识别潜在流失用户并采取挽留措施\n4. 资源分配：优化营销资源的投放'
      },
      {
        title: 'RFM局限性',
        content: 'RFM模型的局限性：\n1. 忽略用户行为特征\n2. 未考虑用户生命周期阶段\n3. 对低频高客单价用户可能误判\n4. 需要定期更新模型参数'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: 'R（最近消费）用「距今天数」还是「最后消费日期」更好？',
        options: ['两者一样', '最后消费日期', '距今天数', '视情况而定'],
        correctAnswer: 2,
        explanation: '使用「距今天数」更好，因为它直接反映了用户的活跃程度，便于比较不同用户。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：计算用户 RFM 得分',
        explanation: '请根据用户消费数据计算 RFM 得分并进行用户分层。',
        initialCode: `import pandas as pd
import numpy as np
from datetime import datetime

# 模拟用户订单数据
data = {
    'user_id': [1, 1, 2, 2, 2, 3, 4, 5, 5, 5],
    'order_date': pd.to_datetime(['2023-01-01', '2023-06-01', '2023-02-01', '2023-03-01', '2023-04-01',
                                   '2023-01-01', '2023-06-01', '2023-02-01', '2023-03-01', '2023-04-01']),
    'order_amount': [100, 200, 150, 180, 220, 300, 250, 100, 150, 200]
}

df = pd.DataFrame(data)

# 基准日期
reference_date = pd.to_datetime('2023-06-15')

# 计算RFM
rfm = df.groupby('user_id').agg({
    'order_date': lambda x: (reference_date - x.max()).days,  # R: 距今天数
    'user_id': 'count',  # F: 消费频次
    'order_amount': 'sum'  # M: 消费金额
}).reset_index()

rfm.columns = ['user_id', 'R', 'F', 'M']

print("原始RFM数据：")
print(rfm)

# 计算RFM得分（使用分位数，1-5分，分数越高越好）
rfm['R_score'] = pd.qcut(rfm['R'], q=5, labels=[5, 4, 3, 2, 1], duplicates='drop')
rfm['F_score'] = pd.qcut(rfm['F'], q=5, labels=[1, 2, 3, 4, 5], duplicates='drop')
rfm['M_score'] = pd.qcut(rfm['M'], q=5, labels=[1, 2, 3, 4, 5], duplicates='drop')

print("\nRFM得分：")
print(rfm)

# 用户分层
def segment_user(row):
    r, f, m = int(row['R_score']), int(row['F_score']), int(row['M_score'])
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值用户'
    elif r >= 4 and f <= 2 and m >= 4:
        return '重要发展用户'
    elif r <= 2 and f >= 4 and m >= 4:
        return '重要挽留用户'
    elif r <= 2 and f <= 2 and m <= 2:
        return '一般用户'
    else:
        return '其他用户'

rfm['segment'] = rfm.apply(segment_user, axis=1)

print("\n用户分层结果：")
print(rfm[['user_id', 'R_score', 'F_score', 'M_score', 'segment']])

print("\n各层级用户数量：")
print(rfm['segment'].value_counts())`,
        expectedOutput: '完成RFM计算和用户分层',
        hint: '提示：RFM得分使用五分位法，得分越高表示该维度表现越好'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: 'F（消费频次）：用户1天下5单，算几次？',
        options: ['1次', '5次', '取决于业务场景', '平均每天1次'],
        correctAnswer: 2,
        explanation: '算5次适用于需要精确统计交易次数的场景；算1次适用于关注用户活跃天数的场景。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：按 RFM 分组统计用户占比',
        explanation: '请计算「R低F高」用户的占比，这是一种潜在流失的高价值用户。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟RFM数据
data = {
    'user_id': range(1, 101),
    'R_score': np.random.randint(1, 6, 100),
    'F_score': np.random.randint(1, 6, 100),
    'M_score': np.random.randint(1, 6, 100)
}

rfm = pd.DataFrame(data)

# 按R和F得分分组统计
rf_groups = rfm.groupby(['R_score', 'F_score']).size().reset_index(name='count')

print("R-F分组统计：")
print(rf_groups.pivot(index='R_score', columns='F_score', values='count').fillna(0))

# 计算各类型用户占比
total_users = len(rfm)

# R低F高用户（R<=2, F>=4）
r_low_f_high = rfm[(rfm['R_score'] <= 2) & (rfm['F_score'] >= 4)]
percentage_r_low_f_high = len(r_low_f_high) / total_users * 100

# R高F低用户（R>=4, F<=2）
r_high_f_low = rfm[(rfm['R_score'] >= 4) & (rfm['F_score'] <= 2)]
percentage_r_high_f_low = len(r_high_f_low) / total_users * 100

# 高价值用户（R>=4, F>=4, M>=4）
high_value = rfm[(rfm['R_score'] >= 4) & (rfm['F_score'] >= 4) & (rfm['M_score'] >= 4)]
percentage_high_value = len(high_value) / total_users * 100

print("\n用户类型占比分析：")
print(f"R低F高（潜在流失高价值用户）: {len(r_low_f_high)}人, 占比 {percentage_r_low_f_high:.1f}%")
print(f"R高F低（重要发展用户）: {len(r_high_f_low)}人, 占比 {percentage_r_high_f_low:.1f}%")
print(f"高价值用户: {len(high_value)}人, 占比 {percentage_high_value:.1f}%")`,
        expectedOutput: '计算各类用户的数量和占比',
        hint: '提示：R低F高用户需要重点关注和挽留'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '总消费金额M呈长尾分布，等频分箱会产生什么问题？',
        options: ['计算速度慢', '高消费用户被压缩在一个区间', '数据丢失', '结果不稳定'],
        correctAnswer: 1,
        explanation: '等频分箱会导致高消费用户被压缩在一个区间内，无法区分真正的高价值用户，建议使用自定义阈值。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：使用自定义阈值进行M值分箱',
        explanation: '请对比等频分箱和自定义阈值分箱的差异。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟长尾分布的消费金额数据
np.random.seed(42)
data = {
    'user_id': range(1, 1001),
    'total_amount': np.concatenate([
        np.random.exponential(50, 900),  # 大多数用户低消费
        np.random.exponential(500, 90),   # 部分用户中等消费
        np.random.exponential(5000, 10)    # 少数用户高消费
    ])
}

df = pd.DataFrame(data)

print("消费金额分布统计：")
print(df['total_amount'].describe())

# 等频分箱（5等分）
df['M_equal_freq'] = pd.qcut(df['total_amount'], q=5, labels=['极低', '低', '中', '高', '极高'])
print("\n等频分箱结果：")
print(df['M_equal_freq'].value_counts().sort_index())

# 自定义阈值分箱
bins = [0, 100, 500, 2000, 10000, float('inf')]
labels = ['极低', '低', '中', '高', '极高']
df['M_custom'] = pd.cut(df['total_amount'], bins=bins, labels=labels)

print("\n自定义阈值分箱结果：")
print(df['M_custom'].value_counts().sort_index())

print("\n对比分析：")
print("等频分箱：各组人数相等，但高消费用户被压缩在'极高'组")
print("自定义阈值：更符合业务认知，能更好地区分高价值用户")`,
        expectedOutput: '对比两种分箱方法的差异',
        hint: '提示：长尾分布下，等频分箱会导致高值区间包含过多用户'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '90天无购买的历史超级大户，RFM归类为一般挽留用户是否合理？',
        options: ['合理', '不合理', '视情况', '无法判断'],
        correctAnswer: 1,
        explanation: '不合理。历史超级大户虽然近期无购买，但曾经贡献了大量revenue，应该归类为重要挽留用户。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：优化历史高价值用户的RFM分类',
        explanation: '请识别历史高价值但近期不活跃的用户，并调整其分类。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟用户数据
data = {
    'user_id': [1, 2, 3, 4, 5, 6, 7, 8],
    'total_orders': [50, 10, 5, 100, 3, 8, 2, 60],
    'total_amount': [50000, 5000, 2000, 100000, 500, 3000, 300, 80000],
    'recency_days': [5, 10, 15, 90, 3, 7, 20, 95]
}

df = pd.DataFrame(data)

print("用户原始数据：")
print(df)

# 标准RFM分类
def standard_rfm(row):
    r = 5 if row['recency_days'] <= 10 else (4 if row['recency_days'] <= 30 else 3 if row['recency_days'] <= 60 else 2 if row['recency_days'] <= 90 else 1)
    f = 5 if row['total_orders'] >= 50 else (4 if row['total_orders'] >= 20 else 3 if row['total_orders'] >= 10 else 2 if row['total_orders'] >= 5 else 1)
    m = 5 if row['total_amount'] >= 50000 else (4 if row['total_amount'] >= 20000 else 3 if row['total_amount'] >= 10000 else 2 if row['total_amount'] >= 5000 else 1)
    return r, f, m

df[['R', 'F', 'M']] = df.apply(lambda x: pd.Series(standard_rfm(x)), axis=1)

# 识别历史高价值但近期不活跃的用户
historical_high_value = df[(df['total_amount'] >= 50000) & (df['recency_days'] > 60)]

print("\n历史高价值但近期不活跃用户：")
print(historical_high_value)

# 优化分类：加入历史价值权重
def improved_segment(row):
    # 如果历史累计消费>=50000，额外加权
    historical_weight = 1 if row['total_amount'] < 50000 else 2
    
    r, f, m = row['R'], row['F'], row['M'] * historical_weight
    
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值用户'
    elif r <= 2 and f >= 3 and m >= 6:
        return '重要挽留用户（历史高价值）'
    elif r >= 4 and f <= 2 and m >= 4:
        return '重要发展用户'
    else:
        return '一般用户'

df['segment'] = df.apply(improved_segment, axis=1)

print("\n优化后的用户分层：")
print(df[['user_id', 'total_amount', 'recency_days', 'R', 'F', 'M', 'segment']])`,
        expectedOutput: '识别并重新分类历史高价值用户',
        hint: '提示：可以为历史高消费用户设置更高的M权重'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '除RFM外，以下哪个可以作为用户分层维度？',
        options: ['订单编号', '商品名称', '商品偏好', '订单状态'],
        correctAnswer: 2,
        explanation: '可结合的用户分层维度包括：商品偏好、渠道偏好、价格敏感度等。'
      },
      {
        id: 'q10',
        type: 'quiz',
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
    teaching: [
      {
        title: '关联规则概述',
        content: '关联规则挖掘是一种数据挖掘技术，用于发现数据集中项之间的有趣关系。在电商领域，常用于发现购物篮中商品之间的关联，如"购买牛奶的用户也倾向于购买面包"。'
      },
      {
        title: '核心指标',
        content: '关联规则的三个核心指标：\n- 支持度(Support)：包含该项集的交易占总交易的比例\n- 置信度(Confidence)：在购买A的条件下购买B的概率\n- 提升度(Lift)：置信度与B的支持度之比，衡量规则的强度'
      },
      {
        title: 'Apriori算法原理',
        content: 'Apriori算法是经典的关联规则挖掘算法：\n1. 找出所有频繁项集（支持度大于最小支持度）\n2. 从频繁项集生成关联规则\n3. 筛选满足最小置信度和提升度的规则',
        code: `# 关联规则计算公式
# 支持度(A,B) = 同时包含A和B的订单数 / 总订单数
# 置信度(A->B) = 支持度(A,B) / 支持度(A)
# 提升度(A->B) = 置信度(A->B) / 支持度(B)`
      },
      {
        title: '业务应用',
        content: '关联规则的业务应用：\n1. 商品推荐：根据购物篮推荐相关商品\n2. 货架布局：将关联商品放在相邻位置\n3. 促销策略：捆绑销售、交叉促销\n4. 库存管理：优化库存配置'
      },
      {
        title: '注意事项',
        content: '使用关联规则时的注意事项：\n1. 避免过度挖掘：设置合理的支持度阈值\n2. 注意数据时效性：定期更新规则\n3. 验证业务合理性：规则需要符合业务逻辑\n4. 警惕虚假关联：提升度>1才有实际意义'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '支持度、置信度、提升度中，哪个能避免「热门商品强关联」误导？',
        options: ['支持度', '置信度', '提升度', '都不能'],
        correctAnswer: 2,
        explanation: '提升度能避免热门商品强关联的误导。提升度 = 置信度 / 后项支持度，如果提升度大于1，才说明两者存在正相关。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：计算商品关联规则的支持度、置信度和提升度',
        explanation: '请使用 pandas 计算商品 A 和 B 的关联规则指标。',
        initialCode: `import pandas as pd
from itertools import combinations

# 模拟订单数据
orders = [
    ['牛奶', '面包', '鸡蛋'],
    ['牛奶', '面包'],
    ['牛奶', '鸡蛋', '薯片'],
    ['面包', '鸡蛋'],
    ['牛奶', '面包', '鸡蛋', '可乐'],
    ['面包', '可乐'],
    ['牛奶', '可乐'],
    ['面包', '薯片']
]

total_orders = len(orders)

# 统计单个商品的支持度
item_counts = {}
for order in orders:
    for item in set(order):  # 去重
        item_counts[item] = item_counts.get(item, 0) + 1

print("单个商品支持度：")
for item, count in item_counts.items():
    print(f"  {item}: {count}/{total_orders} = {count/total_orders*100:.1f}%")

# 计算 {牛奶} -> {面包} 的关联规则
milk_orders = [set(o) for o in orders if '牛奶' in o]
bread_orders = [set(o) for o in orders if '面包' in o]
milk_bread_orders = [o for o in orders if '牛奶' in o and '面包' in o]

support_milk = len(milk_orders) / total_orders
support_bread = len(bread_orders) / total_orders
support_milk_bread = len(milk_bread_orders) / total_orders
confidence_milk_bread = support_milk_bread / support_milk
lift_milk_bread = confidence_milk_bread / support_bread

print("\n{牛奶} -> {面包} 关联规则：")
print(f"  支持度: {support_milk_bread*100:.1f}%")
print(f"  置信度: {confidence_milk_bread*100:.1f}%")
print(f"  提升度: {lift_milk_bread:.2f}")

print(f"\n结论: 提升度{lift_milk_bread:.2f} > 1，牛奶和面包存在正相关关系")`,
        expectedOutput: '计算得到关联规则的支持度、置信度和提升度',
        hint: '提示：提升度 > 1 表示正相关，< 1 表示负相关，= 1 表示无关联'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '总订单10000，{牛奶}→{面包}支持度5%，置信度40%，同时购买的订单数是？',
        options: ['400', '500', '200', '1000'],
        correctAnswer: 1,
        explanation: '同时购买的订单数 = 总订单数 × 支持度 = 10000 × 5% = 500单'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：使用 pandas 手动计算商品支持度',
        explanation: '请不使用 apyori 库，手动计算商品之间的支持度。',
        initialCode: `import pandas as pd

# 模拟订单数据
data = {
    'order_id': [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5],
    'product': ['牛奶', '面包', '鸡蛋', '牛奶', '面包', '牛奶', '可乐', '薯片', '面包', '鸡蛋', '牛奶', '面包', '可乐']
}

df = pd.DataFrame(data)

# 总订单数
total_orders = df['order_id'].nunique()
print(f"总订单数: {total_orders}")

# 计算单个商品的支持度
def calc_support(item):
    orders_with_item = df[df['product'] == item]['order_id'].nunique()
    return orders_with_item / total_orders

print("\n单个商品支持度：")
for product in df['product'].unique():
    support = calc_support(product)
    print(f"  {product}: {support*100:.1f}%")

# 计算商品对的共同支持度
def calc_pair_support(item1, item2):
    # 找出同时包含两个商品的订单
    orders1 = set(df[df['product'] == item1]['order_id'])
    orders2 = set(df[df['product'] == item2]['order_id'])
    common_orders = orders1 & orders2
    return len(common_orders) / total_orders

print("\n商品对支持度：")
for p1, p2 in [('牛奶', '面包'), ('牛奶', '可乐'), ('面包', '可乐')]:
    support = calc_pair_support(p1, p2)
    print(f"  {{{p1}, {p2}}}: {support*100:.1f}%")`,
        expectedOutput: '手动计算得到各商品和商品对的支持度',
        hint: '提示：支持度 = 包含某商品的订单数 / 总订单数'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '订单含重复商品（2瓶牛奶），生成购物篮时应如何处理？',
        options: ['保留重复', '去重', '随机选择', '根据数量加权'],
        correctAnswer: 1,
        explanation: '应该去重。关联规则分析关注的是商品的存在性，而不是数量。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：过滤仅含1件商品的订单',
        explanation: '请过滤掉仅含1件商品的订单，然后重新计算关联规则。',
        initialCode: `import pandas as pd

# 模拟订单数据（包含单商品订单）
orders = [
    {'order_id': 1, 'items': ['牛奶', '面包', '鸡蛋']},
    {'order_id': 2, 'items': ['牛奶']},  # 单商品
    {'order_id': 3, 'items': ['面包', '薯片']},
    {'order_id': 4, 'items': ['可乐']},  # 单商品
    {'order_id': 5, 'items': ['牛奶', '可乐']},
    {'order_id': 6, 'items': ['面包']},  # 单商品
    {'order_id': 7, 'items': ['牛奶', '面包', '可乐']},
    {'order_id': 8, 'items': ['薯片', '可乐']},
]

df = pd.DataFrame(orders)

print("原始订单数据：")
print(df)

# 过滤多商品订单
df_multi = df[df['items'].apply(len) > 1]

print(f"\n过滤前订单数: {len(df)}")
print(f"过滤后订单数（多商品订单）: {len(df_multi)}")

# 重新计算支持度
total_multi = len(df_multi)

def calc_support_multi(item):
    orders_with_item = df_multi[df_multi['items'].apply(lambda x: item in x)]['order_id'].count()
    return orders_with_item / total_multi

print("\n过滤后商品支持度：")
for item in ['牛奶', '面包', '可乐', '薯片', '鸡蛋']:
    if item in df_multi['items'].explode().unique():
        support = calc_support_multi(item)
        print(f"  {item}: {support*100:.1f}%")`,
        expectedOutput: '过滤单商品订单后重新计算支持度',
        hint: '提示：单商品订单无法形成商品组合，会降低关联规则挖掘的效果'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '{A,B}→{C}置信度 < {A}→{C}，推荐时选择哪条规则？',
        options: ['{A,B}→{C}', '{A}→{C}', '两条都推荐', '两条都不推荐'],
        correctAnswer: 1,
        explanation: '选择{A}→{C}。虽然{A,B}是更具体的条件，但它的置信度更低，说明同时购买A和B时购买C的可能性更小。'
      },
      {
        id: 'q8',
        type: 'quiz',
        content: '手机→手机壳规则支持度极低，改用什么分析方法？',
        options: ['增加数据量', '序列模式挖掘', '删除该规则', '提高支持度阈值'],
        correctAnswer: 1,
        explanation: '可以使用序列模式挖掘，分析用户购买手机后一段时间内购买手机壳的模式。'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '{薯片}→{可乐}置信度80%，{可乐}→{薯片}30%，为何不对称？',
        options: ['计算错误', '购买薯片的用户更倾向于购买可乐', '数据量不足', '随机现象'],
        correctAnswer: 1,
        explanation: '不对称是因为购买薯片的用户更倾向于购买可乐，而购买可乐的用户不一定购买薯片。'
      },
      {
        id: 'q10',
        type: 'quiz',
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
    teaching: [
      {
        title: '留存分析概述',
        content: '留存分析是衡量用户在一段时间内继续使用产品或服务的指标。它反映了产品的用户粘性和用户生命周期价值。'
      },
      {
        title: '同期群分析',
        content: '同期群分析是将用户按注册时间分组，跟踪每组用户在后续时间内的留存情况。这种方法可以消除时间因素的影响，准确反映不同时期用户的质量。',
        code: `import pandas as pd

# 创建同期群表
cohort = df.groupby(['register_month', 'month_diff'])['user_id'].nunique().unstack()

# 计算留存率
retention = cohort.divide(cohort[0], axis=0) * 100`
      },
      {
        title: '复购周期计算',
        content: '复购周期是指用户两次购买之间的时间间隔。常用指标：\n- 平均复购周期\n- 中位数复购周期\n- 复购周期分布',
        code: `# 计算订单间隔
df['days_diff'] = df.groupby('user_id')['order_date'].diff().dt.days

# 计算中位数复购周期
median_cycle = df['days_diff'].median()`
      },
      {
        title: '用户生命周期',
        content: '用户生命周期阶段：\n1. 引入期：新用户注册\n2. 成长期：用户开始活跃\n3. 成熟期：用户稳定复购\n4. 衰退期：用户活跃度下降\n5. 流失期：用户停止使用'
      },
      {
        title: '流失预警',
        content: '通过分析用户行为数据，可以识别潜在流失用户：\n- 超过平均复购周期2倍未购买\n- 活跃度持续下降\n- 关键行为缺失'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '留存分析为何用同期群（Cohort）而非整体留存率？',
        options: ['计算简单', '消除时间因素影响', '数据量小', '结果好看'],
        correctAnswer: 1,
        explanation: '同期群分析可以消除时间因素的影响，更准确地反映不同时期用户的留存情况。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：计算同期群留存率',
        explanation: '请按注册月份分组，计算用户的月留存率。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟用户数据
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    'register_month': ['2023-01', '2023-01', '2023-01', '2023-01', '2023-01',
                       '2023-02', '2023-02', '2023-02', '2023-02', '2023-02',
                       '2023-03', '2023-03', '2023-03', '2023-03'],
    'order_month': ['2023-01', '2023-02', '2023-03', '2023-01', '2023-02',
                    '2023-02', '2023-03', '2023-04', '2023-05', '2023-03',
                    '2023-04', '2023-05', '2023-03', '2023-04']
}

df = pd.DataFrame(data)

# 计算用户首次购买的月份差异
df['cohort_month'] = pd.to_datetime(df['register_month'])
df['order_month_dt'] = pd.to_datetime(df['order_month'])
df['month_diff'] = ((df['order_month_dt'].dt.year - df['cohort_month'].dt.year) * 12 +
                    (df['order_month_dt'].dt.month - df['cohort_month'].dt.month))

print("用户订单数据：")
print(df[['user_id', 'register_month', 'order_month', 'month_diff']])

# 创建同期群表
cohort_counts = df.groupby(['register_month', 'month_diff'])['user_id'].nunique().unstack(fill_value=0)

print("\n同期群用户数：")
print(cohort_counts)

# 计算同期群大小
cohort_size = cohort_counts[0]

# 计算留存率
retention_rate = cohort_counts.divide(cohort_size, axis=0) * 100

print("\n同期群留存率（%）：")
print(retention_rate.round(1))`,
        expectedOutput: '计算得到各同期群的月留存率',
        hint: '提示：留存率 = 当月活跃用户数 / 同期群初始用户数 × 100%'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '平均复购周期30天，中位数15天，用什么代表典型用户？',
        options: ['均值', '中位数', '两者都可以', '取最大值'],
        correctAnswer: 1,
        explanation: '用中位数代表典型用户。复购周期通常呈右偏分布，少数用户的长周期会拉高均值。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：优化计算用户订单间隔中位数',
        explanation: '请优化低效的 groupby.apply 代码，使用向量化操作。',
        initialCode: `import pandas as pd
import numpy as np
import time

# 创建大量模拟数据
np.random.seed(42)
n_users = 1000
n_orders_per_user = 20

data = []
for user_id in range(1, n_users + 1):
    base_date = pd.Timestamp('2023-01-01') + pd.Timedelta(days=np.random.randint(0, 365))
    for i in range(n_orders_per_user):
        data.append({
            'user_id': user_id,
            'order_date': base_date + pd.Timedelta(days=i * np.random.randint(5, 35))
        })

df = pd.DataFrame(data).sort_values(['user_id', 'order_date']).reset_index(drop=True)

print(f"数据量: {len(df)} 条订单, {df['user_id'].nunique()} 个用户")

# 低效方法（演示用）
start = time.time()
inefficient_result = df.groupby('user_id').apply(
    lambda g: g['order_date'].diff().dt.days.median()
)
inefficient_time = time.time() - start

# 高效方法（向量化）
start = time.time()
df['days_diff'] = df.groupby('user_id')['order_date'].diff().dt.days
efficient_result = df.groupby('user_id')['days_diff'].median()
efficient_time = time.time() - start

print(f"\n低效方法耗时: {inefficient_time:.3f}秒")
print(f"高效方法耗时: {efficient_time:.3f}秒")
print(f"性能提升: {inefficient_time/efficient_time:.1f}倍")

print("\n前5个用户的复购周期中位数：")
print(efficient_result.head())`,
        expectedOutput: '对比低效和高效方法的性能差异',
        hint: '提示：向量化操作比 groupby.apply 快很多'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '用户1月注册购买2次，2月0次，3月1次，3月是否算月留存？',
        options: ['算', '不算', '看购买金额', '看购买次数'],
        correctAnswer: 0,
        explanation: '算月留存。留存的定义是用户在注册后第N个月仍有活跃行为，无论中间是否有中断。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：识别流失用户并确定流失阈值',
        explanation: '请根据用户购买间隔分布，确定流失用户的最优阈值。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟用户订单数据
np.random.seed(42)
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    'order_date': pd.to_datetime([
        '2023-01-01', '2023-02-01', '2023-06-01',  # 用户1: 30天间隔后流失
        '2023-01-01', '2023-01-15',  # 用户2: 持续活跃
        '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01',  # 用户3: 持续活跃
        '2023-01-01', '2023-04-01', '2023-07-01',  # 用户4: 流失后回归
        '2023-01-01', '2023-08-01'   # 用户5: 长期不活跃
    ])
}

df = pd.DataFrame(data)

# 计算每个用户的订单间隔
df = df.sort_values(['user_id', 'order_date'])
df['next_order_date'] = df.groupby('user_id')['order_date'].shift(-1)
df['gap_days'] = (df['next_order_date'] - df['order_date']).dt.days

# 过滤掉最后一次购买（没有下次购买）
gaps = df.dropna(subset=['gap_days'])

print("用户购买间隔分布：")
print(gaps['gap_days'].describe())

print(f"\n分位数分析：")
for q in [0.5, 0.75, 0.9, 0.95]:
    value = gaps['gap_days'].quantile(q)
    print(f"  {int(q*100)}分位数: {value:.0f}天")

# 确定流失阈值（使用90分位数）
churn_threshold = gaps['gap_days'].quantile(0.9)
print(f"\n建议流失阈值: {churn_threshold:.0f}天")
print(f"（即超过{ churn_threshold:.0f }天未购买视为流失）")

# 标记流失用户
reference_date = pd.Timestamp('2023-09-01')
last_purchase = df.groupby('user_id')['order_date'].max()
days_since_last = (reference_date - last_purchase).dt.days

churned_users = days_since_last[days_since_last > churn_threshold].index.tolist()
print(f"\n流失用户数: {len(churned_users)}")
print(f"流失用户ID: {churned_users}")`,
        expectedOutput: '根据数据分布确定流失阈值并识别流失用户',
        hint: '提示：可以使用购买间隔的90分位数作为流失阈值'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '不同同期群留存差异大，给运营的优化建议是？',
        options: ['统一运营策略', '分析高留存同期群特征', '减少用户获取', '降低价格'],
        correctAnswer: 1,
        explanation: '应分析高留存同期群的共同特征并复制成功经验，分析低留存同期群的问题并针对性改进。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：排除大促羊毛党用户',
        explanation: '请识别并排除只在大促期间购买的用户，避免统计偏差。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟用户订单数据（包含羊毛党）
data = {
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8],
    'order_date': pd.to_datetime([
        '2023-01-01', '2023-02-01', '2023-01-01', '2023-03-01',
        '2023-01-01', '2023-04-01', '2023-01-01', '2023-05-01',
        '2023-06-18', '2023-11-11',  # 羊毛党：只在大促购买
        '2023-06-18', '2023-11-11',  # 羊毛党
        '2023-06-18', '2023-11-11', '2023-12-12',  # 正常大促用户
        '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01'  # 正常用户
    ]),
    'is_promotion': [False, False, False, False, False, False, False, False,
                     True, True, True, True, True, True, True, False, False, False, False]
}

df = pd.DataFrame(data)

print("用户购买记录：")
print(df)

# 统计每个用户的购买情况
user_stats = df.groupby('user_id').agg({
    'order_date': 'count',
    'is_promotion': ['sum', lambda x: (x > 0).sum()]
}).reset_index()

user_stats.columns = ['user_id', 'total_orders', 'promotion_orders', 'promotion_days']
user_stats['normal_orders'] = user_stats['total_orders'] - user_stats['promotion_orders']

print("\n用户购买统计：")
print(user_stats)

# 识别羊毛党（只在大促期间购买的用户）
# 条件：促销订单数 = 总订单数，且促销天数 = 1
whale_users = user_stats[
    (user_stats['promotion_orders'] == user_stats['total_orders']) &
    (user_stats['promotion_days'] == 1)
]['user_id'].tolist()

print(f"\n羊毛党用户ID: {whale_users}")
print(f"羊毛党用户数: {len(whale_users)}")

# 排除羊毛党后的数据
df_clean = df[~df['user_id'].isin(whale_users)]
print(f"\n排除前订单数: {len(df)}, 排除后订单数: {len(df_clean)}")`,
        expectedOutput: '识别并排除羊毛党用户',
        hint: '提示：羊毛党特征是只在促销期间购买，购买次数少'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '代码df.groupby("user_id").apply(...)运行极慢的原因是？',
        options: ['数据量小', 'groupby.apply逐组处理效率低', '语法错误', '内存不足'],
        correctAnswer: 1,
        explanation: '低效原因是groupby.apply是逐组处理，对于大量用户会很慢。应使用向量操作优化。'
      },
      {
        id: 'q10',
        type: 'quiz',
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
    teaching: [
      {
        title: '时间序列概述',
        content: '时间序列是按时间顺序排列的数据序列。在电商场景中，销量数据是典型的时间序列数据，可用于预测未来销量趋势。'
      },
      {
        title: '时间序列特征',
        content: '时间序列数据的特征：\n- 趋势性：长期增长或下降趋势\n- 季节性：周期性变化（如节假日效应）\n- 波动性：数据的波动程度\n- 噪声：随机波动'
      },
      {
        title: '数据聚合',
        content: '将数据聚合到合适的时间粒度：\n- 日级别：分析每日销量\n- 周级别：分析周销量趋势\n- 月级别：分析月度销售情况',
        code: `import pandas as pd

# 按周聚合
weekly_sales = df.resample('W-MON', on='date')['sales'].sum()

# 按月聚合  
monthly_sales = df.resample('M', on='date')['sales'].sum()`
      },
      {
        title: '特征工程',
        content: '时间序列特征工程：\n1. 滞后特征：使用历史数据作为特征\n2. 滚动窗口特征：计算滑动窗口统计量\n3. 时间特征：提取年、月、日、周等\n4. 差分特征：计算数据变化量',
        code: `# 创建滞后特征
for i in range(1, 8):
    df[f'lag_{i}'] = df['sales'].shift(i)

# 创建滚动平均特征
df['rolling_mean_7'] = df['sales'].rolling(window=7).mean()`
      },
      {
        title: '数据平稳化',
        content: '许多时间序列模型要求数据是平稳的：\n- 差分法：计算相邻时间点的差值\n- 对数变换：处理指数增长数据\n- 移动平均：平滑数据'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: 'resample("W")聚合周销量，如何设置周一为一周起始？',
        options: ['resample("W")', 'resample("W-MON")', 'resample("W-START")', 'resample("W-MONDAY")'],
        correctAnswer: 1,
        explanation: '使用W-MON作为频率参数可以设置周一为一周的起始。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：创建滞后特征和滚动窗口特征',
        explanation: '请为销量数据创建过去7天的滞后特征和滚动统计，避免未来信息泄漏。',
        initialCode: `import pandas as pd
import numpy as np

# 创建日销量数据
date_range = pd.date_range('2023-01-01', '2023-01-31', freq='D')
np.random.seed(42)
data = {
    'date': date_range,
    'sales': np.random.randint(50, 150, len(date_range))
}

df = pd.DataFrame(data)

print("原始日销量数据：")
print(df.head(10))

# 创建滞后特征（不包含当天的过去7天）
for lag in range(1, 8):
    df[f'sales_lag_{lag}'] = df['sales'].shift(lag)

print("\n滞后特征（包含lag_1到lag_7）：")
print(df[['date', 'sales', 'sales_lag_1', 'sales_lag_7']].head(10))

# 创建滚动窗口特征（不含当天）
df['sales_7d_mean'] = df['sales'].shift(1).rolling(window=7, min_periods=1).mean()
df['sales_7d_std'] = df['sales'].shift(1).rolling(window=7, min_periods=1).std()
df['sales_7d_min'] = df['sales'].shift(1).rolling(window=7, min_periods=1).min()
df['sales_7d_max'] = df['sales'].shift(1).rolling(window=7, min_periods=1).max()

print("\n滚动窗口特征（过去7天，不含当天）：")
print(df[['date', 'sales', 'sales_7d_mean', 'sales_7d_std', 'sales_7d_min', 'sales_7d_max']].head(12))

# 检查前7行是否有NaN
print(f"\n前7行滞后特征是否有NaN: {df['sales_lag_7'].head(7).isna().any()}")`,
        expectedOutput: '创建滞后和滚动特征，避免未来信息泄漏',
        hint: '提示：使用 shift(1) 确保不包含当天的数据'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '过去7天滑动均值会引入未来信息泄漏吗？',
        options: ['不会', '会，如果包含当天数据', '不一定', '取决于数据量'],
        correctAnswer: 1,
        explanation: '如果在计算滑动均值时包含了当天的数据，就会引入未来信息泄漏。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：检测时间序列平稳性并进行差分处理',
        explanation: '请检测销量数据的平稳性，并使用差分法消除趋势。',
        initialCode: `import pandas as pd
import numpy as np

# 创建有明显趋势的销量数据
np.random.seed(42)
date_range = pd.date_range('2023-01-01', '2023-06-30', freq='D')
trend = np.linspace(100, 200, len(date_range))  # 上升趋势
noise = np.random.randn(len(date_range)) * 10

data = {
    'date': date_range,
    'sales': trend + noise
}

df = pd.DataFrame(data)

print("原始销量数据（带上升趋势）：")
print(df.head())
print(df.tail())

# 计算滚动均值判断趋势
df['rolling_mean'] = df['sales'].rolling(window=7).mean()

print(f"\n滚动均值变化：")
print(f"  第1周均值: {df['rolling_mean'].iloc[3]:.1f}")
print(f"  最后1周均值: {df['rolling_mean'].iloc[-3]:.1f}")

# 一阶差分消除趋势
df['sales_diff'] = df['sales'].diff()

print(f"\n差分后数据：")
print(df[['date', 'sales', 'sales_diff']].head(10))

# 差分后滚动均值
df['diff_rolling_mean'] = df['sales_diff'].rolling(window=7).mean()
print(f"\n差分后滚动均值变化：")
print(f"  第1周均值: {df['diff_rolling_mean'].iloc[10]:.2f}")
print(f"  最后1周均值: {df['diff_rolling_mean'].iloc[-3]:.2f}")

print("\n结论：原始数据有上升趋势，差分后趋势消除，数据更平稳")`,
        expectedOutput: '检测数据平稳性并使用差分处理',
        hint: '提示：如果滚动均值持续增长，说明数据非平稳，需要差分处理'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '为日销量添加不含当天的过去7天销量均值，正确的代码是？',
        options: ['rolling(7).mean()', 'rolling(7, closed="left").mean()', 'rolling(7).sum()/7', 'expanding(7).mean()'],
        correctAnswer: 1,
        explanation: '使用closed="left"参数可以确保窗口不包含当前行。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：自动生成节假日特征',
        explanation: '请使用 pandas 生成节假日特征，区分工作日和周末。',
        initialCode: `import pandas as pd
import numpy as np

# 创建日期数据
date_range = pd.date_range('2023-01-01', '2023-01-31', freq='D')
data = {
    'date': date_range,
    'sales': np.random.randint(100, 200, len(date_range))
}

df = pd.DataFrame(data)

# 基础节假日特征
df['day_of_week'] = df['date'].dt.dayofweek  # 0=周一, 6=周日
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

# 中国法定节假日（简化版）
holidays = [
    '2023-01-01',  # 元旦
    '2023-01-21', '2023-01-22', '2023-01-23',  # 春节
    '2023-01-24', '2023-01-25', '2023-01-26', '2023-01-27',
]
holidays = pd.to_datetime(holidays)

df['is_holiday'] = df['date'].isin(holidays).astype(int)

# 调休补班（需要上班的周末）
workday_weekends = [
    '2023-01-28', '2023-01-29'  # 春节调休
]
workday_weekends = pd.to_datetime(workday_weekends)
df['is_workday_weekend'] = df['date'].isin(workday_weekends).astype(int)

# 综合判断是否为休息日
df['is_day_off'] = ((df['is_weekend'] == 1) & (df['is_workday_weekend'] == 0)) | (df['is_holiday'] == 1)
df['is_day_off'] = df['is_day_off'].astype(int)

print("节假日特征：")
print(df[['date', 'day_of_week', 'is_weekend', 'is_holiday', 'is_workday_weekend', 'is_day_off']].head(15))

print(f"\n休息日销量均值: {df[df['is_day_off']==1]['sales'].mean():.1f}")
print(f"工作日销量均值: {df[df['is_day_off']==0]['sales'].mean():.1f}")`,
        expectedOutput: '生成节假日特征并分析其对销量的影响',
        hint: '提示：需要区分周末、调休补班和法定节假日'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '滞后30天特征，但历史数据仅60天，用全部数据训练会有什么后果？',
        options: ['效果更好', '前30天数据无法生成滞后特征', '计算更快', '无影响'],
        correctAnswer: 1,
        explanation: '前30天的数据无法生成滞后30天特征，会导致数据缺失。应截取从第31天开始的数据。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：处理时间序列预测中的特征泄漏',
        explanation: '请模拟训练集和验证集的划分，确保验证集不泄漏信息。',
        initialCode: `import pandas as pd
import numpy as np

# 创建时间序列数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', '2023-06-30', freq='D')
data = {
    'date': dates,
    'sales': np.random.randint(100, 200, len(dates))
}

df = pd.DataFrame(data)

# 创建滞后特征
for lag in range(1, 8):
    df[f'lag_{lag}'] = df['sales'].shift(lag)

df['rolling_7d'] = df['sales'].shift(1).rolling(7).mean()
df = df.dropna()

print(f"总数据量（去除NaN后）: {len(df)}")

# 错误划分：随机划分（会导致泄漏）
train_size = int(len(df) * 0.8)
df_shuffled = df.sample(frac=1, random_state=42)
train_wrong = df_shuffled[:train_size]
val_wrong = df_shuffled[train_size:]

print(f"\n❌ 错误划分（随机划分）：")
print(f"  训练集时间范围: {train_wrong['date'].min()} 到 {train_wrong['date'].max()}")
print(f"  验证集时间范围: {val_wrong['date'].min()} 到 {val_wrong['date'].max()}")

# 正确划分：时间顺序划分
train_correct = df[:train_size]
val_correct = df[train_size:]

print(f"\n✓ 正确划分（时间顺序）：")
print(f"  训练集时间范围: {train_correct['date'].min()} 到 {train_correct['date'].max()}")
print(f"  验证集时间范围: {val_correct['date'].min()} 到 {val_correct['date'].max()}")
print(f"  验证集样本数: {len(val_correct)}")

print("\n结论：时间序列预测必须使用时间顺序划分，避免特征泄漏")`,
        expectedOutput: '对比正确和错误的训练验证集划分方法',
        hint: '提示：随机划分会导致验证集包含训练集的历史信息，造成泄漏'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '零售业务中，销量缺失值（无订单）应如何填充？',
        options: ['填充0', '插值', '删除', '填充均值'],
        correctAnswer: 0,
        explanation: '填充0。因为无订单意味着销量为0，这是真实情况，而插值会引入虚假数据。'
      },
      {
        id: 'q10',
        type: 'quiz',
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
    teaching: [
      {
        title: '价格敏感度概述',
        content: '价格敏感度是指用户对价格变化的反应程度。分析价格敏感度有助于制定合理的定价策略和促销方案。'
      },
      {
        title: '价格弹性',
        content: '价格弹性 = 需求量变化百分比 / 价格变化百分比\n- 弹性 > 1：弹性需求，降价可增加总收入\n- 弹性 < 1：非弹性需求，提价可增加总收入\n- 弹性 = 1：单位弹性'
      },
      {
        title: '价格敏感度细分',
        content: '用户价格敏感度分类：\n1. 价格敏感型：对价格变化反应强烈\n2. 价格不敏感型：对价格变化反应较弱\n3. 品质导向型：更关注品质而非价格',
        code: `# 计算价格弹性
price_elasticity = (demand_change_pct) / (price_change_pct)`
      },
      {
        title: '促销效果评估',
        content: '评估促销活动的效果：\n1. 增量销售：促销带来的额外销量\n2. 利润率变化：促销对利润的影响\n3. 用户反馈：用户对促销的反应'
      },
      {
        title: '动态定价策略',
        content: '根据用户价格敏感度实施动态定价：\n1. 差别定价：对不同用户收取不同价格\n2. 时段定价：不同时段设置不同价格\n3. 捆绑定价：将相关商品捆绑销售'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '折扣率=1-实付/原价，原价100，券后80，积分再抵10，实付70，用哪个金额计算？',
        options: ['100', '80', '70', '90'],
        correctAnswer: 2,
        explanation: '用70计算。因为实付是用户实际支付的金额，折扣率应该反映用户实际获得的折扣程度。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：计算用户折扣率并识别异常',
        explanation: '请计算每个用户的折扣率，并识别折扣率异常的订单。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟订单数据
data = {
    'order_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    'original_price': [100, 200, 150, 300, 80, 120, 500, 250, 180, 90],
    'coupon_discount': [20, 40, 30, 60, 8, 12, 450, 50, 36, 9],  # 优惠券
    'points_discount': [5, 10, 5, 20, 2, 5, 50, 10, 5, 2],  # 积分
}

df = pd.DataFrame(data)

# 计算实付金额和折扣率
df['actual_paid'] = df['original_price'] - df['coupon_discount'] - df['points_discount']
df['discount_rate'] = 1 - df['actual_paid'] / df['original_price']

print("订单数据：")
print(df)

# 用户维度统计
user_stats = df.groupby('user_id').agg({
    'original_price': 'sum',
    'actual_paid': 'sum',
    'discount_rate': 'mean',
    'order_id': 'count'
}).reset_index()

user_stats.columns = ['user_id', 'total_original', 'total_paid', 'avg_discount_rate', 'order_count']
user_stats['total_discount'] = user_stats['total_original'] - user_stats['total_paid']

print("\n用户统计：")
print(user_stats)

# 识别折扣率异常
Q1 = user_stats['avg_discount_rate'].quantile(0.25)
Q3 = user_stats['avg_discount_rate'].quantile(0.75)
IQR = Q3 - Q1

upper_threshold = Q3 + 1.5 * IQR

print(f"\n折扣率统计：")
print(f"  平均值: {user_stats['avg_discount_rate'].mean():.2%}")
print(f"  中位数: {user_stats['avg_discount_rate'].median():.2%}")
print(f"  异常阈值（99分位）: {user_stats['avg_discount_rate'].quantile(0.99):.2%}")
print(f"  IQR上限: {upper_threshold:.2%}")

# 标记高折扣用户
high_discount_users = user_stats[user_stats['avg_discount_rate'] > 0.5]
print(f"\n高折扣率用户（>50%）：")
print(high_discount_users)`,
        expectedOutput: '计算用户折扣率并识别异常',
        hint: '提示：折扣率超过99分位或超过90%的订单需要进一步检查'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '仅用平均折扣率区分价格敏感/品质型用户，有什么缺陷？',
        options: ['计算简单', '无法区分真敏感还是偶然使用折扣', '结果准确', '数据量大'],
        correctAnswer: 1,
        explanation: '缺陷包括：无法区分用户是真的价格敏感还是偶然使用了折扣，无法反映用户对不同品类的价格敏感度差异。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：区分真实价格敏感用户和偶然使用折扣用户',
        explanation: '请通过购买频次和折扣使用频率来区分用户类型。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟用户订单数据
data = {
    'user_id': [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
    'order_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    'original_price': [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    'actual_paid': [100, 90, 80, 70, 60, 50, 50, 50, 80, 80, 80, 80, 80, 100, 100, 100, 100, 100],
    'has_coupon': [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

df = pd.DataFrame(data)

# 用户维度统计
user_stats = df.groupby('user_id').agg({
    'order_id': 'count',
    'discount_rate': lambda x: (1 - x.mean()) * 100,
    'has_coupon': 'sum'
}).reset_index()

user_stats.columns = ['user_id', 'total_orders', 'avg_discount_rate', 'coupon_usage_count']
user_stats['coupon_usage_rate'] = user_stats['coupon_usage_count'] / user_stats['total_orders']
user_stats['discount_rate'] = 100 - user_stats['avg_discount_rate']

print("用户统计：")
print(user_stats)

# 用户分类
def classify_user(row):
    if row['coupon_usage_rate'] >= 0.8 and row['discount_rate'] >= 30:
        return '真实价格敏感'
    elif row['coupon_usage_rate'] <= 0.2 and row['discount_rate'] <= 10:
        return '品质型'
    elif row['coupon_usage_rate'] >= 0.8 and row['discount_rate'] <= 20:
        return '偶然使用大额券'
    else:
        return '一般用户'

user_stats['user_type'] = user_stats.apply(classify_user, axis=1)

print("\n用户分类结果：")
print(user_stats)

print("\n各类型用户数量：")
print(user_stats['user_type'].value_counts())`,
        expectedOutput: '区分真实价格敏感用户和偶然使用折扣用户',
        hint: '提示：需要结合折扣使用频率和折扣率来综合判断'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '用户只买不打折新品，折扣率低，应如何归类？',
        options: ['价格敏感型', '品质型', '不确定', '两者都是'],
        correctAnswer: 1,
        explanation: '可以归为品质型。建议新增品偏好特征，如"新品购买率"，以更准确地描述用户偏好。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：计算折扣率变异系数识别不稳定用户',
        explanation: '请计算用户折扣率的变异系数（CV），识别折扣使用行为不稳定的用户。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟用户订单数据
data = {
    'user_id': [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4],
    'order_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    'original_price': [100] * 16,
    'actual_paid': [100, 100, 100, 100, 50, 50, 50, 50, 100, 80, 60, 40, 60, 70, 80, 90]
}

df = pd.DataFrame(data)

# 计算每次订单的折扣率
df['discount_rate'] = 1 - df['actual_paid'] / df['original_price']

# 用户维度统计
user_stats = df.groupby('user_id')['discount_rate'].agg(['mean', 'std']).reset_index()
user_stats.columns = ['user_id', 'avg_discount_rate', 'std_discount_rate']

# 计算变异系数 CV = std / mean
user_stats['cv'] = user_stats['std_discount_rate'] / user_stats['avg_discount_rate']
user_stats['cv'] = user_stats['cv'].fillna(0)

print("用户折扣率统计：")
print(user_stats)

# 分类用户
def classify_by_cv(row):
    if row['cv'] == 0:
        return '稳定型'
    elif row['cv'] <= 0.3:
        return '稳定型'
    else:
        return '不稳定型'

user_stats['user_behavior'] = user_stats.apply(classify_by_cv, axis=1)

print("\n用户行为分类：")
print(user_stats)

print("\n分类说明：")
print("  稳定型：折扣使用行为一致（固定使用或不固定使用折扣）")
print("  不稳定型：折扣使用行为波动大，有时用折扣，有时不用")`,
        expectedOutput: '使用变异系数识别用户行为模式',
        hint: '提示：高CV表示用户折扣使用行为不稳定'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '高折扣率用户对券敏感但复购低，可能的业务解释是？',
        options: ['用户忠诚度高', '用户只在有折扣时购买', '商品质量好', '价格太低'],
        correctAnswer: 1,
        explanation: '可能的解释包括：用户只在有折扣时购买，缺乏品牌忠诚度；折扣吸引了价格敏感的新用户但体验不佳；用户等待更大折扣。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：A/B测试验证优惠券效果',
        explanation: '请模拟A/B测试，比较不同类型用户对优惠券的响应。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟A/B测试数据
np.random.seed(42)

# 价格敏感用户组
sensitive_users = {
    'user_id': range(1, 51),
    'user_type': '价格敏感',
    'group': np.random.choice(['对照组', '实验组'], 50)
}

# 品质型用户组
quality_users = {
    'user_id': range(51, 101),
    'user_type': '品质型',
    'group': np.random.choice(['对照组', '实验组'], 50)
}

# 合并数据
df1 = pd.DataFrame(sensitive_users)
df2 = pd.DataFrame(quality_users)
df = pd.concat([df1, df2], ignore_index=True)

# 模拟转化率和客单价
df['received_coupon'] = (df['group'] == '实验组').astype(int)
df['coupon_amount'] = np.where(df['received_coupon'] == 1, 
                                np.where(df['user_type'] == '价格敏感', 10, 50),  # 价格敏感发小额券，品质型发大额券
                                0)

# 模拟转化率和客单价
conversion_base = np.where(df['user_type'] == '价格敏感', 0.3, 0.5)
conversion_increase = np.where(df['user_type'] == '价格敏感', 0.2, 0.1)  # 价格敏感用户对券更敏感
df['converted'] = ((np.random.rand(100) < (conversion_base + conversion_increase * df['received_coupon']))).astype(int)

df['revenue'] = np.where(df['converted'] == 1,
                         np.where(df['user_type'] == '价格敏感', 
                                  100 + df['coupon_amount'],
                                  300 + df['coupon_amount']),
                         0)

print("A/B测试数据：")
print(df.head(10))

# 分析结果
print("\n" + "="*50)
print("A/B测试结果分析")
print("="*50)

for user_type in ['价格敏感', '品质型']:
    print(f"\n【{user_type}用户】")
    type_df = df[df['user_type'] == user_type]
    
    for group in ['对照组', '实验组']:
        group_df = type_df[type_df['group'] == group]
        conv_rate = group_df['converted'].mean() * 100
        avg_revenue = group_df['revenue'].mean()
        print(f"  {group}: 转化率={conv_rate:.1f}%, 客单价={avg_revenue:.1f}")
    
    # 计算提升
    ctrl = type_df[type_df['group'] == '对照组']
    exp = type_df[type_df['group'] == '实验组']
    conv_lift = (exp['converted'].mean() - ctrl['converted'].mean()) / ctrl['converted'].mean() * 100
    revenue_lift = (exp['revenue'].mean() - ctrl['revenue'].mean()) / ctrl['revenue'].mean() * 100
    print(f"  转化率提升: {conv_lift:+.1f}%")
    print(f"  客单价提升: {revenue_lift:+.1f}%")`,
        expectedOutput: '完成A/B测试结果分析',
        hint: '提示：A/B测试需要对照组和实验组对比，计算各指标提升'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '用户折扣率变异系数CV=std/mean，高CV代表什么用户类型？',
        options: ['折扣使用稳定', '折扣使用不稳定', '从不使用折扣', '总是使用折扣'],
        correctAnswer: 1,
        explanation: '高CV代表用户的折扣使用行为不稳定，可能有时使用高折扣，有时不使用折扣。'
      },
      {
        id: 'q10',
        type: 'quiz',
        content: '高折扣率用户对券敏感但复购低，给出的业务解释是？',
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
    teaching: [
      {
        title: '聚类分析概述',
        content: '聚类分析是一种无监督学习方法，用于将数据集中的样本分成多个类别，使得同一类别内的数据点相似度较高，不同类别间的数据点相似度较低。'
      },
      {
        title: 'K-Means算法原理',
        content: 'K-Means算法步骤：\n1. 随机选择K个初始聚类中心\n2. 将每个数据点分配到最近的聚类中心\n3. 更新聚类中心为各簇的均值\n4. 重复步骤2-3直到收敛',
        code: `from sklearn.cluster import KMeans

# 创建K-Means模型
kmeans = KMeans(n_clusters=5, random_state=42)

# 训练模型
kmeans.fit(X)

# 获取聚类标签
labels = kmeans.labels_`
      },
      {
        title: 'K值选择',
        content: '选择合适的K值：\n1. 肘部法则：绘制K值与SSE的关系图，选择拐点处的K\n2. 轮廓系数：计算轮廓系数，选择最大值对应的K'
      },
      {
        title: '数据标准化',
        content: '聚类前需要对数据进行标准化处理：\n- 确保各特征具有相同的量纲\n- 避免数值范围大的特征主导聚类结果',
        code: `from sklearn.preprocessing import StandardScaler

# 数据标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)`
      },
      {
        title: '聚类结果分析',
        content: '分析聚类结果：\n1. 统计每个簇的样本数量\n2. 分析每个簇的特征分布\n3. 为每个簇命名并描述特征\n4. 制定针对性的运营策略'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '聚类前必须标准化：消费金额0~100万、购买频次0~100，不标准化会有什么后果？',
        options: ['计算更快', '消费金额权重远大于购买频次', '结果更准确', '无影响'],
        correctAnswer: 1,
        explanation: '不标准化会导致消费金额的权重远大于购买频次，因为金额的数值范围更大，聚类结果主要由消费金额决定。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：使用 sklearn 进行用户聚类',
        explanation: '请完成标准化、K-Means聚类并将结果合并回原表的完整流程。',
        initialCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# 模拟用户数据
np.random.seed(42)
data = {
    'user_id': range(1, 101),
    'total_amount': np.concatenate([
        np.random.normal(5000, 1000, 30),   # 普通用户
        np.random.normal(20000, 5000, 30),  # 高消费用户
        np.random.normal(1000, 500, 30),    # 低消费用户
        np.random.normal(100000, 20000, 10) # VIP用户（异常簇）
    ]),
    'purchase_frequency': np.concatenate([
        np.random.normal(10, 3, 30),
        np.random.normal(30, 5, 30),
        np.random.normal(5, 2, 30),
        np.random.normal(50, 10, 10)
    ])
}

df = pd.DataFrame(data)

print("用户原始数据：")
print(df.describe())

# 1. 标准化特征
features = df[['total_amount', 'purchase_frequency']]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

print("\n标准化后的特征统计：")
scaled_df = pd.DataFrame(scaled_features, columns=['total_amount_scaled', 'purchase_frequency_scaled'])
print(scaled_df.describe())

# 2. 确定最佳K值（肘部法则）
print("\n计算不同K值的SSE：")
sse = []
K_range = range(2, 8)
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(scaled_features)
    sse.append(kmeans.inertia_)
    print(f"  K={k}: SSE={kmeans.inertia_:.2f}")

# 3. 选择K=4进行聚类
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(scaled_features)

print("\n各簇用户数量：")
print(df['cluster'].value_counts().sort_index())

# 4. 分析簇特征
print("\n各簇特征均值：")
print(df.groupby('cluster')[['total_amount', 'purchase_frequency']].mean())

# 5. 簇命名
cluster_names = {
    0: '低价值用户',
    1: '高价值高活跃',
    2: '中等价值用户',
    3: 'VIP用户'
}
df['cluster_name'] = df['cluster'].map(cluster_names)

print("\n用户分类结果：")
print(df[['user_id', 'total_amount', 'purchase_frequency', 'cluster_name']].head(10))`,
        expectedOutput: '完成用户聚类的完整流程',
        hint: '提示：肘部法则选择SSE下降趋势减缓的点作为最佳K值'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: '肘部法则：K=3→4 SSE下降明显，4→5平缓，选择K=？',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '选择K=4。肘部法则的核心是找到SSE下降趋势明显减缓的点。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：识别和处理异常簇',
        explanation: '请识别异常簇（人数极少但客单价极高），并进行合理处理。',
        initialCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# 创建包含异常簇的数据
np.random.seed(42)
data = {
    'user_id': range(1, 101),
    'total_amount': np.concatenate([
        np.random.normal(5000, 1000, 40),
        np.random.normal(20000, 3000, 30),
        np.random.normal(1000, 500, 20),
        np.random.normal(500000, 100000, 5),  # 异常簇
        np.random.normal(3000, 800, 5)         # 小型异常簇
    ]),
    'purchase_frequency': np.concatenate([
        np.random.normal(10, 3, 40),
        np.random.normal(25, 5, 30),
        np.random.normal(5, 2, 20),
        np.random.normal(100, 20, 5),  # 异常簇
        np.random.normal(8, 2, 5)
    ])
}

df = pd.DataFrame(data)

# 标准化和聚类
scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[['total_amount', 'purchase_frequency']])

kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(scaled_features)

# 分析簇
cluster_stats = df.groupby('cluster').agg({
    'user_id': 'count',
    'total_amount': 'mean',
    'purchase_frequency': 'mean'
}).rename(columns={'user_id': 'count'})

print("各簇统计：")
print(cluster_stats)

# 识别异常簇
cluster_stats['is_anomaly'] = (cluster_stats['count'] < 10) & (cluster_stats['total_amount'] > 100000)

print("\n异常簇识别：")
print(cluster_stats[cluster_stats['is_anomaly']])

# 处理策略
for cluster_id in cluster_stats[cluster_stats['is_anomaly']].index:
    anomaly_users = df[df['cluster'] == cluster_id]
    print(f"\n簇{cluster_id}包含{len(anomaly_users)}个用户:")
    print(anomaly_users[['user_id', 'total_amount', 'purchase_frequency']])

print("\n处理建议：")
print("  1. 分析这些用户的购买行为，判断是真实高价值用户还是刷单/测试账号")
print("  2. 如果是真实高价值用户，应单独建立VIP用户档案进行运营")
print("  3. 如果是刷单/测试账号，应从分析数据中排除")`,
        expectedOutput: '识别并合理处理异常簇',
        hint: '提示：异常簇特征是人数少但客单价极高'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: '两个簇所有特征接近，仅折扣敏感度不同，应合并还是保留？',
        options: ['合并', '保留', '随机决定', '看簇大小'],
        correctAnswer: 1,
        explanation: '保留。折扣敏感度是重要的用户特征，可能反映不同的购买行为模式和营销策略需求。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：使用轮廓系数评估聚类效果',
        explanation: '请使用轮廓系数评估不同K值的聚类效果。',
        initialCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 创建模拟数据
np.random.seed(42)
data1 = np.random.multivariate_normal([5, 5], [[1, 0], [0, 1]], 50)
data2 = np.random.multivariate_normal([10, 10], [[1, 0], [0, 1]], 50)
data3 = np.random.multivariate_normal([5, 10], [[1, 0], [0, 1]], 50)

data = np.vstack([data1, data2, data3])
df = pd.DataFrame(data, columns=['feature1', 'feature2'])

# 标准化
scaler = StandardScaler()
scaled_data = scaler.fit_transform(df)

# 评估不同K值
print("轮廓系数评估：")
print("-" * 40)

results = []
for k in range(2, 6):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = kmeans.fit_predict(scaled_data)
    
    # 计算轮廓系数
    if k < len(data):  # 确保簇数小于样本数
        score = silhouette_score(scaled_data, labels)
        results.append({'k': k, 'score': score, 'sse': kmeans.inertia_})
        print(f"K={k}: 轮廓系数={score:.3f}, SSE={kmeans.inertia_:.2f}")

# 选择最佳K
best_k = max(results, key=lambda x: x['score'])['k']
print(f"\n最佳K值（基于轮廓系数）: {best_k}")

print("\n轮廓系数说明：")
print("  轮廓系数范围: [-1, 1]")
print("  接近1: 簇内紧密，簇间分离")
print("  接近0: 簇重叠")
print("  接近-1: 样本分配到错误簇")`,
        expectedOutput: '使用轮廓系数选择最佳聚类数',
        hint: '提示：轮廓系数越接近1，聚类效果越好'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: 'K-Means要求簇为凸形且大小相近，非凸用户群应换用什么算法？',
        options: ['决策树', 'DBSCAN', '线性回归', '随机森林'],
        correctAnswer: 1,
        explanation: '可以使用DBSCAN或层次聚类算法，它们对非凸形状的簇有更好的处理能力。'
      },
      {
        id: 'q8',
        type: 'quiz',
        content: '新注册3天用户消费额极高，如何验证是真实行为还是数据错误？',
        options: ['直接信任', '检查用户行为模式和交易真实性', '忽略', '标记为异常'],
        correctAnswer: 1,
        explanation: '需要检查注册和购买时间戳、分析购买行为模式、检查支付和物流信息、与历史数据对比。'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '聚类后如何用簇中心客观命名？',
        options: ['主观命名', '基于簇中心特征值命名', '随机命名', '按数字命名'],
        correctAnswer: 1,
        explanation: '可以基于簇中心的特征值进行客观命名，如"高消费高频用户"、"低消费低频用户"等。'
      },
      {
        id: 'q10',
        type: 'quiz',
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
    teaching: [
      {
        title: '异常检测概述',
        content: '异常检测是识别数据集中与正常模式显著不同的数据点的过程。在电商场景中，异常检测可用于防范欺诈交易、刷单行为等。'
      },
      {
        title: '统计方法',
        content: '常用的统计异常检测方法：\n1. IQR方法：基于四分位数间距检测极端值\n2. Z-score方法：基于标准差检测离群点\n3. 百分位数方法：使用特定百分位数作为阈值',
        code: `# IQR方法
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
outliers = data[(data < lower_bound) | (data > upper_bound)]`
      },
      {
        title: '规则引擎',
        content: '基于业务规则的异常检测：\n- 金额异常：单笔交易金额超过阈值\n- 频率异常：短时间内频繁交易\n- 行为异常：不符合正常用户行为模式\n- 地理位置异常：异地登录、异常IP'
      },
      {
        title: '机器学习方法',
        content: '使用机器学习进行异常检测：\n1. 孤立森林（Isolation Forest）\n2. 自编码器（Autoencoder）\n3. 支持向量机（One-class SVM）',
        code: `from sklearn.ensemble import IsolationForest

# 创建孤立森林模型
model = IsolationForest(contamination=0.05, random_state=42)
model.fit(X)

# 预测异常
predictions = model.predict(X)`
      },
      {
        title: '异常处理流程',
        content: '异常处理流程：\n1. 检测：识别异常交易\n2. 验证：人工复核确认\n3. 处置：采取相应措施（拦截、标记、报警）\n4. 反馈：将结果反馈到模型进行优化'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: 'IQR异常阈值用1.5倍IQR的原因？改为3.0会有什么变化？',
        options: ['习惯用法', '1.5倍约对应99.7%数据范围，改为3.0会减少异常检测数量', '无特殊原因', '计算方便'],
        correctAnswer: 1,
        explanation: '1.5倍IQR是经验值，在正态分布中约对应99.7%的数据范围。改为3.0倍会减少异常值检测数量，降低误报率但可能增加漏报率。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：使用 IQR 和 Z-Score 双方法检测异常',
        explanation: '请分别使用IQR和Z-Score方法检测异常交易，并对比结果。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟订单数据（包含异常）
np.random.seed(42)
data = {
    'order_id': range(1, 101),
    'user_id': np.random.randint(1, 21, 100),
    'amount': np.concatenate([
        np.random.normal(200, 50, 90),  # 正常订单
        [5000, 6000, 8000, 10000]        # 异常大额订单
    ])
}

df = pd.DataFrame(data)

print("订单金额统计：")
print(df['amount'].describe())

# 方法1: IQR
Q1 = df['amount'].quantile(0.25)
Q3 = df['amount'].quantile(0.75)
IQR = Q3 - Q1
lower_iqr = Q1 - 1.5 * IQR
upper_iqr = Q3 + 1.5 * IQR

df['is_outlier_iqr'] = (df['amount'] < lower_iqr) | (df['amount'] > upper_iqr)

print(f"\nIQR方法：")
print(f"  Q1={Q1:.2f}, Q3={Q3:.2f}, IQR={IQR:.2f}")
print(f"  正常范围: [{lower_iqr:.2f}, {upper_iqr:.2f}]")
print(f"  异常订单数: {df['is_outlier_iqr'].sum()}")

# 方法2: Z-Score
mean_amount = df['amount'].mean()
std_amount = df['amount'].std()
df['z_score'] = (df['amount'] - mean_amount) / std_amount
df['is_outlier_zscore'] = abs(df['z_score']) > 3

print(f"\nZ-Score方法：")
print(f"  均值={mean_amount:.2f}, 标准差={std_amount:.2f}")
print(f"  异常订单数: {df['is_outlier_zscore'].sum()}")

# 综合判断
df['is_outlier_combined'] = df['is_outlier_iqr'] | df['is_outlier_zscore']

print(f"\n综合判断（IQR OR Z-Score）：")
print(f"  异常订单数: {df['is_outlier_combined'].sum()}")

print("\n异常订单详情：")
print(df[df['is_outlier_combined']][['order_id', 'user_id', 'amount', 'z_score', 'is_outlier_iqr', 'is_outlier_zscore']])`,
        expectedOutput: '使用双方法检测异常并对比结果',
        hint: '提示：使用OR逻辑可以捕获更多潜在异常'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: 'VIP用户订单金额Z-Score=10，统计异常但业务正常，应如何处理？',
        options: ['直接标记为异常', '为VIP用户设置单独阈值', '删除记录', '忽略'],
        correctAnswer: 1,
        explanation: '不应简单标记为异常。应为VIP用户设置单独的异常检测阈值，或根据用户历史行为调整标准。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：按用户分组计算Z-Score检测异常行为',
        explanation: '请按用户分组计算日下单量Z-Score，识别异常用户。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟订单数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', '2023-01-15', freq='D')

orders = []
for user_id in range(1, 21):
    # 正常用户每天1-5单
    n_orders = np.random.randint(1, 6)
    for _ in range(n_orders):
        orders.append({
            'user_id': user_id,
            'order_date': np.random.choice(dates)
        })

# 添加异常用户
for _ in range(50):
    orders.append({
        'user_id': 99,  # 异常用户
        'order_date': np.random.choice(dates)
    })

df = pd.DataFrame(orders)

# 按用户和日期统计下单量
daily_orders = df.groupby(['user_id', 'order_date']).size().reset_index(name='order_count')

# 按用户计算统计量
user_stats = daily_orders.groupby('user_id')['order_count'].agg(['mean', 'std']).reset_index()
user_stats.columns = ['user_id', 'avg_orders', 'std_orders']

# 合并统计量
daily_orders = daily_orders.merge(user_stats, on='user_id')

# 计算Z-Score
daily_orders['z_score'] = (daily_orders['order_count'] - daily_orders['avg_orders']) / daily_orders['std_orders'].replace(0, 1)

# 标记异常
daily_orders['is_anomaly'] = abs(daily_orders['z_score']) > 3

print("用户日下单量统计：")
print(daily_orders.groupby('user_id')['order_count'].agg(['mean', 'max']))

print("\n异常检测结果：")
anomalies = daily_orders[daily_orders['is_anomaly']]
if len(anomalies) > 0:
    print(anomalies)
else:
    print("未检测到异常（所有用户行为在3倍标准差内）")

# 检测异常用户
anomaly_users = anomalies['user_id'].unique()
print(f"\n异常用户ID: {list(anomaly_users)}")`,
        expectedOutput: '按用户分组检测异常下单行为',
        hint: '提示：需要先按用户计算历史均值和标准差，再计算Z-Score'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: 'IQR和Z-Score结果冲突（一个异常一个正常），用什么逻辑？',
        options: ['与逻辑', '或逻辑', '随机选择', '取平均值'],
        correctAnswer: 1,
        explanation: '建议使用"或"逻辑，可以捕获更多潜在的异常情况，减少漏报率。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：优化异常检测效率',
        explanation: '请对比向量化方法和循环方法的性能差异。',
        initialCode: `import pandas as pd
import numpy as np
import time

# 创建大量模拟数据
np.random.seed(42)
n_users = 10000

data = {
    'user_id': np.random.randint(1, n_users + 1, 50000),
    'order_date': pd.date_range('2023-01-01', periods=50000)
}

df = pd.DataFrame(data)

print(f"数据量: {len(df)} 条订单, {df['user_id'].nunique()} 个用户")

# 低效方法：逐用户循环
start = time.time()
user_orders = df.groupby('user_id').size()
user_mean = user_orders.mean()
user_std = user_orders.std()
inefficient_time = time.time() - start

# 高效方法：向量化操作
start = time.time()
daily_orders = df.groupby(['user_id', df['order_date'].dt.date]).size().reset_index(name='count')
user_stats = daily_orders.groupby('user_id')['count'].agg(['mean', 'std']).reset_index()
user_stats.columns = ['user_id', 'avg', 'std']
user_stats['std'] = user_stats['std'].fillna(0)

daily_orders = daily_orders.merge(user_stats, on='user_id')
daily_orders['z_score'] = (daily_orders['count'] - daily_orders['avg']) / user_stats.set_index('user_id').loc[daily_orders['user_id'], 'std'].values
daily_orders['z_score'] = daily_orders['z_score'].fillna(0)

anomalies = daily_orders[abs(daily_orders['z_score']) > 3]
efficient_time = time.time() - start

print(f"\n低效方法耗时: {inefficient_time:.4f}秒")
print(f"高效方法耗时: {efficient_time:.4f}秒")
print(f"性能提升: {inefficient_time/efficient_time:.1f}倍")

print(f"\n检测到的异常记录数: {len(anomalies)}")`,
        expectedOutput: '对比并优化异常检测方法性能',
        hint: '提示：向量化操作比循环快很多倍'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '异常清单包含大促正常囤货，如何调整检测策略？',
        options: ['删除所有大促数据', '在检测中加入时间因素', '忽略异常', '降低阈值'],
        correctAnswer: 1,
        explanation: '调整方法包括：大促期间提高异常阈值、结合用户历史购买模式、分析商品类型等。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：设计百分位数规则替代固定阈值',
        explanation: '请使用99分位数替代固定阈值来检测异常订单。',
        initialCode: `import pandas as pd
import numpy as np

# 模拟订单数据
np.random.seed(42)
data = {
    'order_id': range(1, 1001),
    'discount_rate': np.concatenate([
        np.random.beta(2, 5, 900),  # 正常折扣率
        np.random.beta(1, 10, 90),   # 高折扣订单（部分是正常促销）
        np.random.beta(1, 20, 10)    # 极高折扣（可疑）
    ])
}

df = pd.DataFrame(data)

print("折扣率统计：")
print(df['discount_rate'].describe())

# 固定阈值方法（>90%异常）
fixed_threshold = 0.9
df['is_anomaly_fixed'] = df['discount_rate'] > fixed_threshold

print(f"\n固定阈值方法（>{fixed_threshold*100}%）：")
print(f"  异常订单数: {df['is_anomaly_fixed'].sum()}")
print(f"  异常比例: {df['is_anomaly_fixed'].mean()*100:.1f}%")

# 百分位数方法（>99分位数异常）
percentile_99 = df['discount_rate'].quantile(0.99)
df['is_anomaly_percentile'] = df['discount_rate'] > percentile_99

print(f"\n百分位数方法（>{percentile_99:.3f}）：")
print(f"  异常订单数: {df['is_anomaly_percentile'].sum()}")
print(f"  异常比例: {df['is_anomaly_percentile'].mean()*100:.1f}%")

# 对比
print("\n方法对比：")
print(f"  固定阈值异常数: {df['is_anomaly_fixed'].sum()}")
print(f"  百分位数异常数: {df['is_anomaly_percentile'].sum()}")

print("\n百分位数方法优点：")
print("  1. 自动适应数据分布变化")
print("  2. 即使整体折扣率提高，也能正确识别异常")
print("  3. 结果更稳定，不会因数据分布变化而失效")`,
        expectedOutput: '使用百分位数规则替代固定阈值',
        hint: '提示：百分位数规则会根据数据分布自动调整阈值'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '用户日均下单2次，今日50次，是否立即冻结？',
        options: ['立即冻结', '进一步检查IP/设备/支付方式等特征', '忽略', '联系用户'],
        correctAnswer: 1,
        explanation: '不应立即冻结，应进一步检查IP地址、设备信息、支付方式、商品类型、收货地址等特征。'
      },
      {
        id: 'q10',
        type: 'quiz',
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
    teaching: [
      {
        title: '情感分析概述',
        content: '情感分析是对文本中的情感倾向进行分析的技术。在电商场景中，情感分析可用于分析用户评论、评价产品满意度、发现潜在问题。'
      },
      {
        title: '情感分类',
        content: '情感分析的分类：\n1. 正面情感：积极、满意、推荐\n2. 负面情感：消极、不满、抱怨\n3. 中性情感：客观描述、无明显倾向'
      },
      {
        title: '关键词提取',
        content: '从文本中提取有意义的关键词：\n1. TF-IDF：基于词频和逆文档频率\n2. TextRank：基于图的排序算法\n3. RAKE：针对非结构化文本的关键词提取',
        code: `from sklearn.feature_extraction.text import TfidfVectorizer

# TF-IDF关键词提取
vectorizer = TfidfVectorizer(max_features=100)
tfidf_matrix = vectorizer.fit_transform(texts)
keywords = vectorizer.get_feature_names_out()`
      },
      {
        title: '情感分析方法',
        content: '情感分析方法：\n1. 基于词典的方法：使用情感词典进行匹配\n2. 机器学习方法：训练分类模型\n3. 深度学习方法：使用预训练模型',
        code: `# 使用TextBlob进行情感分析
from textblob import TextBlob

text = "这个产品非常好，我很满意！"
analysis = TextBlob(text)
sentiment = analysis.sentiment.polarity  # -1到1之间，正数为正面`
      },
      {
        title: '业务应用',
        content: '情感分析的业务应用：\n1. 产品改进：发现用户抱怨的问题\n2. 服务优化：改进客户服务质量\n3. 竞品分析：对比竞品评价\n4. 品牌监控：监控品牌声誉'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'quiz',
        content: '评论「物流快，但包装破、客服差」3星，词典法得分中性，应归类为？',
        options: ['正面', '负面', '中性', '无法判断'],
        correctAnswer: 2,
        explanation: '应归类为中性。评论中既有正面信息也有负面信息，整体情感较为复杂，3星评分也符合中性评价。'
      },
      {
        id: 'q2',
        type: 'practice',
        content: '实操练习：使用 TextBlob 进行情感分析',
        explanation: '请使用 TextBlob 对评论进行情感分析，并划分情感类别。',
        initialCode: `import pandas as pd

# 模拟评论数据
comments = [
    "这个产品太棒了，非常满意！",
    "物流很快，但是质量一般",
    "包装破了，客服态度差",
    "还行吧，一般般",
    "非常好用，已经推荐给朋友了",
    "等了很久才到，失望",
    "性价比很高，会回购",
    "产品不错，就是有点贵"
]

df = pd.DataFrame({'comment': comments})

# 模拟TextBlob情感分析（实际应使用textblob库）
def simulate_sentiment(text):
    # 简化模拟：基于关键词判断
    positive_words = ['棒', '满意', '好', '推荐', '回购', '高', '不错']
    negative_words = ['差', '破', '失望', '久', '贵', '一般']
    
    pos_count = sum(1 for w in positive_words if w in text)
    neg_count = sum(1 for w in negative_words if w in text)
    
    if pos_count > neg_count:
        return 0.5 + pos_count * 0.1
    elif neg_count > pos_count:
        return -0.5 - neg_count * 0.1
    else:
        return 0.0

df['sentiment_score'] = df['comment'].apply(simulate_sentiment)

# 设置情感分类阈值
def classify_sentiment(score):
    if score > 0.1:
        return '积极'
    elif score < -0.1:
        return '消极'
    else:
        return '中性'

df['sentiment'] = df['sentiment_score'].apply(classify_sentiment)

print("情感分析结果：")
print(df)

print("\n情感分布：")
print(df['sentiment'].value_counts())

print("\n各情感类别的平均评分：")
# 模拟评分
ratings = [5, 3, 2, 3, 5, 2, 4, 4]
df['rating'] = ratings
print(df.groupby('sentiment')['rating'].mean())`,
        expectedOutput: '对评论进行情感分析并分类',
        hint: '提示：TextBlob情感得分在[-1,1]之间，需要设置合理的分类阈值'
      },
      {
        id: 'q3',
        type: 'quiz',
        content: 'TF-IDF中，高频词（快递/包装）为何不一定重要？',
        options: ['出现次数少', '在大多数文档中都出现，缺乏区分度', '不重要', '计算错误'],
        correctAnswer: 1,
        explanation: '因为高频词在大多数文档中都出现，缺乏区分度。TF-IDF通过计算逆文档频率降低常见词的权重。'
      },
      {
        id: 'q4',
        type: 'practice',
        content: '实操练习：提取好评和差评的差异关键词',
        explanation: '请使用 TF-IDF 方法提取好评和差评中的高频差异关键词。',
        initialCode: `import pandas as pd
import numpy as np
from collections import Counter
import re

# 模拟评论数据
comments = [
    # 好评
    ("质量很好，发货很快，包装也很精美", 5),
    ("性价比高，值得购买", 5),
    ("物流速度快，服务态度好", 5),
    ("产品超出预期，会回购的", 5),
    ("非常好用，推荐给大家", 5),
    # 差评
    ("质量太差了，等了很久才到", 2),
    ("包装破了，产品有瑕疵", 1),
    ("客服态度差，不推荐", 1),
    ("等了好久，物流太慢", 2),
    ("产品与描述不符，失望", 1),
]

df = pd.DataFrame(comments, columns=['comment', 'rating'])

# 分离好评和差评
positive = df[df['rating'] >= 4]['comment'].tolist()
negative = df[df['rating'] <= 2]['comment'].tolist()

print(f"好评数: {len(positive)}, 差评数: {len(negative)}")

# 模拟分词
def simple_tokenize(text):
    # 简化分词
    words = re.findall(r'[a-zA-Z0-9\u4e00-\u9fa5]+', text)
    stopwords = {'的', '了', '很', '也', '和', '是', '有', '我', '在', '不', '会', '给', '大', '都'}
    return [w for w in words if w not in stopwords]

# 统计词频
pos_words = Counter()
for c in positive:
    pos_words.update(simple_tokenize(c))

neg_words = Counter()
for c in negative:
    neg_words.update(simple_tokenize(c))

print("\n好评高频词：")
for word, count in pos_words.most_common(5):
    print(f"  {word}: {count}")

print("\n差评高频词：")
for word, count in neg_words.most_common(5):
    print(f"  {word}: {count}")

# 计算差异词（差评特有词）
print("\n差评特有词（好评中未出现）：")
for word, count in neg_words.most_common():
    if word not in pos_words:
        print(f"  {word}: {count}")`,
        expectedOutput: '提取好评和差评的差异关键词',
        hint: '提示：差评特有词往往是产品改进的关键点'
      },
      {
        id: 'q5',
        type: 'quiz',
        content: 'TextBlob情感得分[-1,1]，划分积极/中性/消极的阈值应如何选？',
        options: ['0分界', '[-0.1,0.1]为中性', '[-0.5,0.5]为中性', '随机选择'],
        correctAnswer: 1,
        explanation: '建议阈值：积极>0.1，中性[-0.1,0.1]，消极<-0.1。设置中性区间可以减少误判。'
      },
      {
        id: 'q6',
        type: 'practice',
        content: '实操练习：识别差评中的产品问题',
        explanation: '请统计差评中出现的关键词，识别主要的产品问题。',
        initialCode: `import pandas as pd
from collections import Counter
import re

# 模拟差评数据
negative_comments = [
    "物流太慢了，等了一周才到",
    "包装破了，产品有损坏",
    "质量太差，用了几天就坏了",
    "客服态度恶劣，不解决问题",
    "产品与描述不符",
    "等了太久，包装也破了",
    "质量一般，不值这个价",
    "产品漏液了，非常糟糕",
    "客服不理人，很失望",
    "物流慢，产品也有问题"
]

# 定义问题类别关键词
problem_keywords = {
    '物流问题': ['慢', '久', '等'],
    '包装问题': ['破', '漏', '损'],
    '质量问题': ['坏', '差', '问题'],
    '客服问题': ['客服', '态度', '不理']
}

# 统计各类问题出现次数
problem_counts = {category: 0 for category in problem_keywords}
problem_examples = {category: [] for category in problem_keywords}

for comment in negative_comments:
    for category, keywords in problem_keywords.items():
        if any(kw in comment for kw in keywords):
            problem_counts[category] += 1
            if len(problem_examples[category]) < 2:
                problem_examples[category].append(comment)

print("差评问题统计：")
print("-" * 40)

for category, count in sorted(problem_counts.items(), key=lambda x: -x[1]):
    percentage = count / len(negative_comments) * 100
    print(f"\n{category}: {count}条 ({percentage:.1f}%)")
    for example in problem_examples[category]:
        print(f"  - {example}")

print("\n" + "=" * 40)
print("结论：")
most_common = max(problem_counts, key=problem_counts.get)
print(f"最严重的问题: {most_common} ({problem_counts[most_common]}条)")
print("建议优先改进该方面的问题")`,
        expectedOutput: '统计差评中的产品问题分布',
        hint: '提示：频繁出现在差评中的问题是需要优先解决的'
      },
      {
        id: 'q7',
        type: 'quiz',
        content: '词典法无法识别比较级（比上次好），如何改进？',
        options: ['扩展词典', '使用深度学习模型如BERT', '忽略比较级', '手动标注'],
        correctAnswer: 1,
        explanation: '改进方法包括：使用BERT等深度学习模型、扩展词典包含比较级、结合语法分析等。'
      },
      {
        id: 'q8',
        type: 'practice',
        content: '实操练习：处理多条评论的情感聚合',
        explanation: '请对同一用户的多条评论进行情感聚合，分析不同聚合方法的结果差异。',
        initialCode: `import pandas as pd

# 模拟用户评论数据
data = [
    {'user_id': 1, 'comment': '质量很好', 'sentiment': 0.8, 'rating': 5, 'date': '2023-01-01'},
    {'user_id': 1, 'comment': '发货有点慢', 'sentiment': -0.2, 'rating': 3, 'date': '2023-01-15'},
    {'user_id': 1, 'comment': '客服态度一般', 'sentiment': 0.0, 'rating': 3, 'date': '2023-02-01'},
    {'user_id': 2, 'comment': '非常满意', 'sentiment': 0.9, 'rating': 5, 'date': '2023-01-01'},
    {'user_id': 2, 'comment': '物超所值', 'sentiment': 0.8, 'rating': 5, 'date': '2023-01-20'},
    {'user_id': 3, 'comment': '很差', 'sentiment': -0.8, 'rating': 1, 'date': '2023-01-01'},
    {'user_id': 3, 'comment': '失望', 'sentiment': -0.7, 'rating': 2, 'date': '2023-01-10'},
]

df = pd.DataFrame(data)

print("用户评论数据：")
print(df)

# 不同聚合方法
user_sentiment = df.groupby('user_id')['sentiment'].agg(['mean', 'min', 'max', 'count']).reset_index()
user_sentiment.columns = ['user_id', 'avg_sentiment', 'worst_sentiment', 'best_sentiment', 'comment_count']

print("\n不同聚合方法对比：")
print(user_sentiment)

# 情感分类
def classify(x, method='mean'):
    if method == 'mean':
        if x > 0.1:
            return '积极'
        elif x < -0.1:
            return '消极'
        else:
            return '中性'
    elif method == 'min':
        if x > 0:
            return '积极'
        else:
            return '消极'
    elif method == 'max':
        if x >= 0.5:
            return '积极'
        elif x <= -0.5:
            return '消极'
        else:
            return '中性'

user_sentiment['type_by_mean'] = user_sentiment['avg_sentiment'].apply(lambda x: classify(x, 'mean'))
user_sentiment['type_by_worst'] = user_sentiment['worst_sentiment'].apply(lambda x: classify(x, 'min'))
user_sentiment['type_by_latest'] = df.sort_values('date').groupby('user_id')['sentiment'].last().values
user_sentiment['type_by_latest'] = user_sentiment['type_by_latest'].apply(lambda x: classify(x, 'mean'))

print("\n不同聚合方法分类结果：")
print(user_sentiment[['user_id', 'type_by_mean', 'type_by_worst', 'type_by_latest']])

print("\n方法说明：")
print("  平均值：反映整体情感倾向")
print("  最差值：关注用户痛点")
print("  最新值：反映最新体验")`,
        expectedOutput: '对比不同情感聚合方法的结果',
        hint: '提示：不同聚合方法适用于不同场景'
      },
      {
        id: 'q9',
        type: 'quiz',
        content: '词典法无法识别比较级（比上次好），如何改进？',
        options: ['扩展词典', '使用深度学习模型如BERT', '忽略比较级', '手动标注'],
        correctAnswer: 1,
        explanation: '改进方法包括：使用BERT等深度学习模型、扩展词典包含比较级、结合语法分析等。'
      },
      {
        id: 'q10',
        type: 'quiz',
        content: '商品情感得分低但销量高，可能的解释是？',
        options: ['数据错误', '价格低廉或功能满足基本需求', '情感分析错误', '销量统计错误'],
        correctAnswer: 1,
        explanation: '可能的解释：商品价格低廉，用户虽然不满意但仍购买；商品功能满足基本需求，小问题不影响核心使用。'
      }
    ]
  }
];