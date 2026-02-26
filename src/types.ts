export interface AppState {
  title: string;
  subtitle: string;
  content: string;
  author: string;
  date: string;
  theme: 'insurance-blue' | 'insurance-gold' | 'minimalist' | 'warm-family';
  coverImage: string | null;
  agentImage: string | null;
  agentName: string;
  agentTitle: string;
  agentPhone: string;
  showAgentCard: boolean;
  aspectRatio: '3:4' | '9:16';
  fontSize: number;
}

export const DEFAULT_STATE: AppState = {
  title: "重疾险避坑指南",
  subtitle: "买保险前必看的5个真相",
  content: `## 为什么买重疾险？

很多朋友觉得社保够用了，其实**社保只能报销医疗费**，而重疾险解决的是**收入损失**和**康复费用**。

### 常见的误区：

1. **确诊即赔？**
   - 并不是所有病种都是确诊即赔，大部分需要达到某种状态或实施了某种手术。

2. **返还型更划算？**
   - 羊毛出在羊身上，同样的保障，返还型保费可能贵一倍。

### 建议方案：
- **保额优先**：至少覆盖3-5年的年收入。
- **保障期限**：预算有限选定期，预算充足选终身。
- **缴费期限**：拉长缴费期，减轻压力，增加豁免机会。

> "保险不是为了改变生活，而是为了防止生活被改变。"

@---

## 如何挑选高性价比产品？

### 关注这几点：

- **轻中症赔付比例**：越高越好。
- **癌症二次赔付**：非常有必要，癌症复发率高。
- **身故责任**：看预算，预算不足可不带身故，单独买定寿。

### 避坑指南：

| 关注点 | 建议 |
| :--- | :--- |
| 等待期 | 越短越好 (90天 vs 180天) |
| 健康告知 | 一定要如实告知 |
| 增值服务 | 绿通服务很实用 |

**总结：**
买保险就是买条款，不要被花里胡哨的宣传语迷惑。`,
  author: "@金牌保险规划师",
  date: "VOL.01",
  theme: 'insurance-blue',
  coverImage: null,
  agentImage: null,
  agentName: "李专业",
  agentTitle: "资深保险经纪人",
  agentPhone: "138-0000-8888",
  showAgentCard: true,
  aspectRatio: '3:4',
  fontSize: 16,
};
