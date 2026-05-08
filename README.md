# 🎮 Games - 网页小游戏合集

一个精心设计的网页小游戏集合，包含十二款风格各异的游戏，全部使用纯 HTML/CSS/JavaScript 构建，无需安装，即开即玩。

🔗 **在线体验**: [https://mufeesama.github.io/Games/](https://mufeesama.github.io/Games/)

---

## 🎯 游戏列表

### 🔢 2048
经典数字合成游戏，滑动方块合并相同数字。

- **玩法**: 滑动方向移动所有方块，相同数字合并翻倍
- **特色**: 10种主题风格，游戏规则帮助说明，触屏/键盘双支持
- **文件**: [2048.html](./2048.html)

---

### 🧱 俄罗斯方块 (Tetris)
经典方块堆叠游戏，快速消除获得高分。

- **玩法**: 旋转移动下落的方块，填满一行即消除
- **特色**: 8种主题风格，方块预览，键盘/触屏控制
- **文件**: [tetris.html](./tetris.html)

---

### 💣 扫雷 (Minesweeper)
经典踩雷排雷游戏，考验逻辑推理能力。

- **玩法**: 点击格子揭开，数字表示周围雷数，标记地雷
- **特色**: 自定义难度，计时计分，智能提示
- **文件**: [minesweeper.html](./minesweeper.html)

---

### ⚫ 奥赛罗/黑白棋 (Othello)
经典翻转棋游戏，包围翻转对手棋子。

- **玩法**: 放置棋子翻转对手被夹住的棋子，最终棋子多者胜
- **特色**: 8种主题风格，人机对战，实时棋子统计
- **文件**: [othello.html](./othello.html)

---

### 💧 十滴水 (Ten Drop)
策略消除类游戏，点击水滴使其破裂并引发连锁反应。

- **玩法**: 点击水滴，当其达到临界点时会破裂并向四周溅射
- **特色**: 物理引擎模拟，玻璃质感视觉效果
- **文件**: [ten-drop.html](./ten-drop.html)

---

### 📖 成语接龙 (Chengyu)
考验成语知识的接龙挑战游戏，竹简长卷风格设计。

- **玩法**: 根据提示输入正确的成语进行接龙
- **特色**: 古风竹简UI，中华传统文化氛围
- **文件**: [chengyu.html](./chengyu.html)

---

### ⚫ 五子棋 (Gomoku)
经典双人对弈游戏，支持多种主题风格。

- **玩法**: 黑白双方轮流落子，先连成五子者获胜
- **特色**: 赛博朋克/古典/极简多主题切换
- **文件**: [gomoku.html](./gomoku.html)

---

### 🔢 数独 (Sudoku)
数字逻辑谜题，经典的 9×9 网格填数游戏。

- **玩法**: 填满网格使每行、每列、每个 3×3 宫格都包含 1-9
- **特色**: 多种难度级别，自动检查功能
- **文件**: [sudoku.html](./sudoku.html)

---

### 🌸 飞花令 (Feihua)
古风诗词对决游戏，考验古诗词功底。

- **玩法**: 根据关键字对出含有该字的诗句
- **特色**: 宣纸纹理背景，书法字体，古典美学
- **文件**: [feihua.html](./feihua.html)

---

### ♟️ 中国象棋 (Chinese Chess)
经典对弈游戏，与AI一决高下。

- **玩法**: 传统中国象棋规则，与AI对战
- **特色**: 典雅木纹棋盘，立体雕刻棋子，Minimax算法AI
- **文件**: [ChineseChess.html](./ChineseChess.html)

---

### 🐱 围小猫 (Trap the Cat)
策略围堵游戏，在六边形棋盘上放置路障围住小猫。

- **玩法**: 点击浅色圆点放置路障，阻止小猫逃出边缘
- **特色**: BFS寻路AI，四档难度，11种主题风格，盾牌路障图标
- **文件**: [TrapTheCat.html](./TrapTheCat.html)

---

### 🧩 华容道 (Klotski)
经典中国传统益智游戏，移动棋子帮助曹操逃出华容道。

- **玩法**: 滑动棋子移出空位，将曹操移至出口即可获胜
- **特色**: 4种经典布局，步数记录，多主题风格
- **文件**: [klotski.html](./klotski.html)

---

## 🚀 快速开始

### 方式一：直接打开
直接在浏览器中打开 `index.html` 文件即可进入游戏导航页。

### 方式二：启动本地服务器
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 然后访问 http://localhost:8000
```

### 方式三：访问在线版本
访问 [GitHub Pages](https://mufeesama.github.io/Games/) 直接游玩。

---

## 📁 项目结构

```
Games/
├── index.html          # 游戏导航主页
├── 2048.html           # 2048游戏
├── tetris.html         # 俄罗斯方块游戏
├── minesweeper.html    # 扫雷游戏
├── othello.html       # 奥赛罗/黑白棋游戏
├── ten-drop.html      # 十滴水游戏
├── chengyu.html       # 成语接龙游戏
├── gomoku.html        # 五子棋游戏
├── sudoku.html        # 数独游戏
├── feihua.html        # 飞花令游戏
├── ChineseChess.html  # 中国象棋游戏
├── TrapTheCat.html   # 围小猫游戏
├── klotski.html       # 华容道游戏
└── README.md          # 项目说明
```

---

## 🛠️ 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 动画、渐变、响应式布局
- **JavaScript** - 游戏逻辑、Canvas 绘图
- **Tailwind CSS** - 部分游戏使用 CDN 版本
- **Google Fonts** - 中文字体优化

---

## 📱 兼容性

- ✅ Chrome / Edge / Firefox / Safari 最新版
- ✅ 移动端浏览器（iOS Safari / Android Chrome）
- ✅ 支持触摸操作

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进游戏！

---

## 📄 许可证

MIT License - 自由使用、修改和分发

---

<p align="center">Made with ❤️ for fun</p>
