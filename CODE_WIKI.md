# Code Wiki - 经典游戏合集

## 项目概述

本项目是一个基于浏览器的经典游戏合集，包含多种传统益智和策略游戏。所有游戏均使用纯 HTML、CSS 和 JavaScript 开发，无需任何后端或外部依赖，可直接在浏览器中运行。

### 项目信息

| 属性 | 值 |
|------|-----|
| 项目类型 | 前端静态网站 |
| 技术栈 | HTML5, CSS3, JavaScript (ES6+) |
| 部署方式 | 直接部署至静态服务器或 CDN |
| 运行环境 | 现代浏览器 (Chrome, Firefox, Safari, Edge) |
| 响应式支持 | 完整支持桌面端和移动端 |

---

## 项目结构

```
/workspace
├── index.html              # 首页 - 游戏选择界面
├── 2048.html               # 2048 数字益智游戏
├── ChineseChess.html       # 中国象棋
├── klotski.html            # 华容道
├── minesweeper.html         # 扫雷
├── gomoku.html              # 五子棋
├── sudoku.html              # 数独
├── tetris.html              # 俄罗斯方块
├── docs/
│   └── DEVELOPER_GUIDE.md   # 开发者指南
└── public/                  # 公共资源目录 (如存在)
```

---

## 核心架构

### 设计模式

所有游戏文件均采用以下架构模式：

1. **模块化设计**: 每个游戏作为独立 HTML 文件，包含内联 CSS 和 JavaScript
2. **类封装**: 使用 JavaScript 类封装游戏逻辑和音效引擎
3. **CSS 变量主题系统**: 通过 CSS 自定义属性实现多主题切换
4. **响应式布局**: 使用 CSS Grid 和 Flexbox 实现自适应布局

### 通用组件

#### SoundEngine 类

所有游戏都包含一个 `SoundEngine` 类，用于处理音效播放：

```javascript
class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  _ensureCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playWin() { /* 胜利音效 */ }
  playLose() { /* 失败音效 */ }
  playError() { /* 错误音效 */ }
  toggle() { /* 切换音效开关 */ }
}
```

**依赖关系**: Web Audio API

#### 主题系统

```javascript
// 主题定义示例 (data-theme 属性)
[data-theme="cyberpunk"] {
  --bg: #0a0a0f;
  --primary: #00fff0;
  --secondary: #ff00ff;
  --accent: #fcee0a;
  --text: #e0e0e0;
  --font-display: 'Orbitron', sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}

[data-theme="ocean-depths"] {
  --bg: linear-gradient(180deg, #0a1628 0%, #1a3a52 50%, #0d2137 100%);
  --primary: #4dd0e1;
  // ...
}
```

---

## 游戏模块详解

### 1. 首页 (index.html)

#### 功能描述
游戏选择界面，提供所有游戏的入口导航。

#### 关键元素

| 元素 | 说明 |
|------|------|
| 游戏卡片 | 展示每个游戏的图标和名称 |
| 主题切换器 | 全局主题选择下拉框 |
| 音效开关 | 全局音效控制按钮 |

#### 核心函数

```javascript
function initTheme() {
  // 从 URL 参数或 localStorage 读取主题
  const urlTheme = new URLSearchParams(window.location.search).get('theme');
  const savedTheme = urlTheme || localStorage.getItem('theme') || 'cyberpunk';
  document.body.setAttribute('data-theme', savedTheme);
}
```

---

### 2. 2048 游戏 (2048.html)

#### 游戏规则
滑动合并数字方块，相同数字碰撞时相加，最终得到 2048。

#### 核心数据结构

```javascript
let grid = [];          // 4x4 游戏网格
let score = 0;          // 当前分数
let bestScore = 0;      // 最高分
let gameOver = false;   // 游戏结束标志
```

#### 关键类

| 类名 | 职责 |
|------|------|
| `Game` | 游戏主逻辑：移动、合并、分数计算 |
| `Grid` | 网格管理：初始化、随机生成、状态查询 |

#### 核心函数

| 函数名 | 功能 |
|--------|------|
| `move(direction)` | 处理指定方向的滑动 |
| `merge(line)` | 合并相邻相同数字 |
| `addRandomTile()` | 在空位置添加随机方块 (2 或 4) |
| `checkGameOver()` | 判断是否还有可移动的空间 |
| `updateDisplay()` | 刷新界面显示 |

---

### 3. 中国象棋 (ChineseChess.html)

#### 游戏规则
红黑双方对弈，轮流移动棋子，吃掉对方将/帅获胜。

#### 棋子定义

```javascript
const PIECES = {
  // 红方
  'k': { name: '帥', type: 'red', moves: 'cross' },
  'r': { name: '車', type: 'red', moves: 'rook' },
  'n': { name: '馬', type: 'red', moves: 'knight' },
  'b': { name: '象', type: 'red', moves: 'bishop' },
  'a': { name: '士', type: 'red', moves: 'advisor' },
  'c': { name: '炮', type: 'red', moves: 'cannon' },
  'p': { name: '兵', type: 'red', moves: 'pawn' },
  // 黑方 (小写字母)
  'K': { name: '將', type: 'black', moves: 'cross' },
  'R': { name: '車', type: 'black', moves: 'rook' },
  // ...
};
```

#### 移动规则验证

| 棋子类型 | 移动规则 |
|----------|----------|
| 帥/將 | 九宫内直线移动一格 |
| 車 | 直线任意距离 |
| 馬 | 日字移动，有蹩马腿 |
| 象 | 田字移动，不能过河，不能塞象眼 |
| 士 | 九宫内斜线移动一格 |
| 炮 | 走直线，吃子需隔一子(炮架) |
| 兵 | 过河前只能前进，过河后可横向移动 |

---

### 4. 华容道 (klotski.html)

#### 游戏规则
滑动方块，将最大的红色方块移动到出口位置。

#### 核心数据结构

```javascript
let pieces = [
  { id: 1, width: 2, height: 2, x: 0, y: 0, isTarget: true },  // 主块
  { id: 2, width: 1, height: 2, x: 2, y: 0 },  // 竖块
  // ...
];
let history = [];  // 移动历史记录
```

#### 关键函数

| 函数名 | 功能 |
|--------|------|
| `canMove(piece, dx, dy)` | 检查指定方块是否可以移动 |
| `movePiece(piece, dx, dy)` | 执行移动操作 |
| `checkWin()` | 检查是否达成胜利条件 |
| `undo()` | 撤销上一步操作 |

---

### 5. 扫雷 (minesweeper.html)

#### 游戏规则
点击揭开方块，数字表示周围雷的数量，避免踩到地雷。

#### 核心配置

```javascript
const LEVELS = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
};
```

#### 关键算法

```javascript
function revealCell(row, col) {
  if (board[row][col].revealed) return;
  board[row][col].revealed = true;

  if (board[row][col].mine) {
    gameOver(false);  // 踩雷
    return;
  }

  // 如果周围没有雷，自动递归揭开
  if (board[row][col].adjacent === 0) {
    getNeighbors(row, col).forEach(([r, c]) => revealCell(r, c));
  }
}

function getNeighbors(row, col) {
  const neighbors = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr, nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        neighbors.push([nr, nc]);
      }
    }
  }
  return neighbors;
}
```

---

### 6. 五子棋 (gomoku.html)

#### 游戏规则
黑白双方轮流落子，先在横、竖、斜任意方向连成五子获胜。

#### AI 算法

| 难度 | 算法 |
|------|------|
| Easy | 随机选择空位 |
| Medium | 基于评估函数 + 攻防判断 |
| Hard | Minimax + Alpha-Beta 剪枝 |

#### 核心评估函数

```javascript
function evaluateBoard(b, player) {
  let score = 0;
  // 检查所有方向的棋型
  const patterns = {
    '五连': 10000000,
    '活四': 500000,
    '冲四': 80000,
    '活三': 10000,
    '眠三': 1000,
    '活二': 400,
    '眠二': 50,
    '活一': 15
  };
  // ... 评估逻辑
  return score;
}
```

---

### 7. 数独 (sudoku.html)

#### 游戏规则
9x9 网格，每行、每列、每个 3x3 宫格数字 1-9 不重复。

#### 关卡难度

```javascript
const difficultySettings = {
  easy: { remove: 36 },    // 简单：移除 36 个数字
  medium: { remove: 46 }, // 中等：移除 46 个数字
  hard: { remove: 52 },    // 困难：移除 52 个数字
  expert: { remove: 56 }   // 专家：移除 56 个数字
};
```

#### 数独生成算法

```javascript
function generateSolvedBoard() {
  let b = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(b);
  return b;
}

function fillBoard(b) {
  const empty = findEmptyCell(b);
  if (!empty) return true;
  const [row, col] = empty;
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of numbers) {
    if (isValidPlacement(b, row, col, num)) {
      b[row][col] = num;
      if (fillBoard(b)) return true;
      b[row][col] = 0;
    }
  }
  return false;
}
```

---

### 8. 俄罗斯方块 (tetris.html)

#### 方块定义

```javascript
const SHAPES = {
  I: [[0,0],[1,0],[2,0],[3,0]],  // I 形
  O: [[0,0],[1,0],[0,1],[1,1]],  // O 形 (无法旋转)
  T: [[0,0],[1,0],[2,0],[1,1]],  // T 形
  S: [[1,0],[2,0],[0,1],[1,1]],  // S 形
  Z: [[0,0],[1,0],[1,1],[2,1]],  // Z 形
  J: [[0,0],[0,1],[1,1],[2,1]],  // J 形
  L: [[2,0],[0,1],[1,1],[2,1]]   // L 形
};
```

#### 核心游戏循环

```javascript
function gameLoop(timestamp) {
  if (gameActive && !paused) {
    if (flashTimer > 0) {
      flashTimer--;
    } else if (timestamp - lastDrop > getDropSpeed()) {
      moveDown();
      lastDrop = timestamp;
    }
  }
  draw();
  requestAnimationFrame(gameLoop);
}
```

#### 计分规则

```javascript
function clearLines() {
  // 消除行数对应分数
  const pts = [0, 100, 300, 500, 800];  // 0, 1, 2, 3, 4 行
  score += pts[fullRows.length] * level;
  lines += fullRows.length;
  level = Math.floor(lines / 10) + 1;  // 每 10 行升一级
}
```

---

## 主题系统

### 可用主题

| 主题名称 | 风格描述 | 适合场景 |
|----------|----------|----------|
| `cyberpunk` | 霓虹科技风 | 科幻游戏 |
| `ocean-depths` | 深海渐变风 | 海洋/水系游戏 |
| `sunset-boulevard` | 日落暖色风 | 休闲游戏 |
| `forest-canopy` | 森林自然风 | 户外/自然游戏 |
| `modern-minimalist` | 现代极简风 | 专业/办公场景 |
| `golden-hour` | 黄金奢华风 | 高端游戏 |
| `arctic-frost` | 北极清新风 | 冬季/冰雪游戏 |
| `desert-rose` | 沙漠玫瑰风 | 浪漫场景 |
| `tech-innovation` | 科技创新风 | 科技类游戏 |
| `botanical-garden` | 植物园活力风 | 植物/花园游戏 |
| `midnight-galaxy` | 午夜银河风 | 星空/宇宙游戏 |

### 主题切换机制

```javascript
function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  localStorage.setItem('game-theme', themeName);
  // 触发 UI 刷新
  draw();
}
```

---

## 音效系统

### Web Audio API 使用

所有游戏使用 Web Audio API 生成程序化音效，无需外部音频文件：

```javascript
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  _playTone(freq, duration, type = 'sine') {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.destination;
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playWin() {
    // 播放胜利音效 (和弦)
    const notes = [523.25, 659.25, 783.99];  // C5, E5, G5
    notes.forEach((freq, i) => this._playTone(freq, 1.2));
  }
}
```

### 音效类型

| 方法 | 触发时机 |
|------|----------|
| `playPlaceBlack()` | 放置黑色棋子 |
| `playPlaceWhite()` | 放置白色棋子 |
| `playWin()` | 玩家获胜 |
| `playLose()` | 玩家失败 |
| `playError()` | 操作错误 |
| `playInput()` | 正确输入 |
| `playHint()` | 使用提示 |
| `playErase()` | 擦除操作 |

---

## 依赖关系

### 外部依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| Google Fonts | 最新 | 字体加载 |

### 字体列表

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Share+Tech+Mono&family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&family=Work+Sans:wght@400;700&family=Crimson+Text:wght@400;700&family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
```

### 无后端依赖

本项目为纯前端项目，所有数据存储在客户端：
- **localStorage**: 存储用户偏好（主题、分数等）
- **sessionStorage**: 存储临时会话数据

---

## 运行方式

### 本地运行

#### 方法一：直接打开
```bash
# 使用浏览器直接打开 index.html
open index.html
```

#### 方法二：使用本地服务器
```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

然后访问: `http://localhost:8080`

#### 方法三：通过 URL 参数指定主题
```
http://localhost:8080/2048.html?theme=ocean-depths
http://localhost:8080/gomoku.html?theme=midnight-galaxy
```

### 生产部署

1. 将所有 HTML 文件上传至静态服务器或 CDN
2. 确保服务器正确处理 `.html` 文件的 MIME 类型
3. 可选：配置 CDN 加速以提高全球访问速度

---

## 浏览器兼容性

| 浏览器 | 最低版本 | 备注 |
|--------|----------|------|
| Chrome | 60+ | 完全支持 |
| Firefox | 55+ | 完全支持 |
| Safari | 11+ | 完全支持 |
| Edge | 79+ | 完全支持 |
| iOS Safari | 11+ | 支持触摸控制 |
| Android Chrome | 60+ | 支持触摸控制 |

### 必需 API

- **ES6+**: class, arrow functions, template literals, destructuring
- **CSS Grid**: 游戏板布局
- **CSS Custom Properties**: 主题系统
- **Web Audio API**: 音效播放
- **localStorage**: 持久化存储
- **Canvas API**: 棋盘绘制 (部分游戏)
- **Flexbox**: 响应式布局

---

## 开发指南

### 添加新游戏

1. 创建新的 `.html` 文件
2. 复制现有游戏的 HTML 结构作为模板
3. 实现游戏逻辑和 UI
4. 添加到 `index.html` 的游戏列表中

### 代码规范

- 使用语义化 HTML5 标签
- CSS 变量定义主题颜色
- JavaScript 类封装游戏逻辑
- 遵循 ESLint 标准 (如配置)

### 性能优化

- 使用 `requestAnimationFrame` 进行游戏循环
- 避免在游戏循环中创建对象
- 使用 Canvas 而非 DOM 进行频繁绘制
- 合理使用 CSS 硬件加速属性

---

## 文件清单

| 文件名 | 大小 | 功能 |
|--------|------|------|
| `index.html` | ~15KB | 首页导航 |
| `2048.html` | ~25KB | 2048 游戏 |
| `ChineseChess.html` | ~30KB | 中国象棋 |
| `klotski.html` | ~20KB | 华容道 |
| `minesweeper.html` | ~25KB | 扫雷 |
| `gomoku.html` | ~40KB | 五子棋 |
| `sudoku.html` | ~35KB | 数独 |
| `tetris.html` | ~30KB | 俄罗斯方块 |
| `docs/DEVELOPER_GUIDE.md` | ~5KB | 开发者指南 |

---

## 扩展建议

### 短期优化

- [ ] 添加游戏统计功能（游玩次数、胜率、平均时长）
- [ ] 实现好友对战功能（基于 WebSocket）
- [ ] 添加成就系统
- [ ] 支持游戏回放

### 中期优化

- [ ] 迁移到 Webpack/Vite 构建
- [ ] 实现 PWA 支持（离线游玩）
- [ ] 添加更多主题
- [ ] 实现排行榜系统

### 长期优化

- [ ] 添加 AI 对战功能
- [ ] 实现多人联机模式
- [ ] 添加关卡编辑器
- [ ] 移植到 Electron 实现桌面应用

---

*本文档最后更新于 2026-05-14*
