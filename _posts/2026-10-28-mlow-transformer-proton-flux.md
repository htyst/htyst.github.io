---
layout: article
title: "MLOW-Transformer：空间天气中的高能质子通量预测"
date: 2026-10-28 00:00:00 +0800
permalink: /posts/mlow-transformer-proton-flux/
tags:
  - 科研记录
  - 时间序列预测
  - Transformer
  - 空间天气
mathjax: true
---

将低秩频域分解与 Transformer 结合，利用过去 12 小时的多变量空间天气观测，预测未来 1 小时的高能质子通量。

<!--more-->

> **版本说明：**本页分享论文手稿及其中文导读。下方 PDF 由本次提供的 LaTeX 稿件编译，研究内容、作者顺序、实验数值和七幅原始配图均保留。本页不表示论文已被期刊录用或正式发表。

## 论文信息

**英文题目：** MLOW-Transformer for High-Energy Proton Flux Forecasting in Space Weather Time Series

**作者：** Jinrong Guo, Zhiguo Wang, Zihao Shi, Laikai Shi, Xinbo Ma, Tingyi Hou, Mingwei Zhang

**单位：** School of Mathematics and Statistics, Xi’an Jiaotong University, Xi’an, China

<p><a href="{{ '/assets/papers/mlow-transformer-proton-flux/manuscript.pdf' | relative_url }}" target="_blank" rel="noopener">在新窗口阅读全文 PDF ↗</a> &nbsp;·&nbsp; <a href="{{ '/assets/papers/mlow-transformer-proton-flux/manuscript.pdf' | relative_url }}" download="MLOW-Transformer-Proton-Flux-Manuscript.pdf">下载论文 PDF ↓</a></p>

## 研究的问题

高能质子通量是描述空间辐射环境的重要指标。它在多数时段保持较低水平，但在少数扰动事件中会迅速增大。这种非平稳性、长尾分布与突发峰值，使模型既要拟合日常变化，又要尽可能捕捉少见的强事件。

原稿使用太阳风速度、Kp 指数、电子通量、低能质子通量和高能质子通量五个变量，以小时为时间分辨率，构造“过去 12 小时 → 未来 1 小时”的预测任务。训练集、验证集和测试集按时间顺序以 70%、15% 和 15% 划分。

## 方法思路

MLOW-Transformer 先通过低秩频域分解，将序列表示为均值背景、主要频率分量和残差，再使用 Transformer 学习分解后序列的时间依赖关系。论文将这一模型与 LSTM、标准 Transformer 进行比较，并将连续的质子通量预测映射为无预警、黄色、橙色和红色四个等级。

可以直观地理解为：先把复杂曲线中的背景与主要波动结构分开，再让预测模型学习它们如何随时间变化。

## 原稿报告的结果

以下数值直接摘录自手稿，预测误差指标在对数空间中计算。

| 模型 | 决定系数 R² | RMSE |
| :--- | ---: | ---: |
| LSTM | 0.9803 | 0.0924 |
| Transformer | 0.9785 | 0.0965 |
| MLOW-Transformer | 0.9841 | 0.0829 |

原稿报告，MLOW-Transformer 在三种模型中取得最高的 R² 和最低的 RMSE。基于预测结果构建的预警方案，其漏警率为 4.83%，低估率为 8.56%，误警率为 8.64%。各指标的具体定义见论文正文。

## 仍需改进的地方

手稿也指出，部分强质子增强事件的峰值仍被低估，极端红色预警的预测仍有困难。后续方向包括引入太阳耀斑、日冕物质抛射等多源观测，以及改进极端事件加权和预警等级优化。

## 在线阅读全文

<p>PDF 保留完整英文正文、公式、七幅原始配图及参考文献。手机或部分浏览器如未显示内嵌阅读器，可使用上方的“在新窗口阅读全文 PDF”链接。</p>

<object data="{{ '/assets/papers/mlow-transformer-proton-flux/manuscript.pdf' | relative_url }}" type="application/pdf" width="100%" height="850" aria-label="MLOW-Transformer 论文手稿 PDF" style="display:block;width:100%;border:1px solid #e1e5eb;border-radius:10px;">
  <p>当前浏览器未显示 PDF 阅读器，请<a href="{{ '/assets/papers/mlow-transformer-proton-flux/manuscript.pdf' | relative_url }}">点击打开完整论文</a>。</p>
</object>
