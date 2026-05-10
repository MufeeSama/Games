# 游戏合集开发规范

## 概述

本文档为 HTML5 游戏合集项目制定开发规范，确保新增游戏与现有项目保持一致的代码风格和用户体验。

---

## 第一部分：代码结构规范

### 1.1 文件组织

```
/workspace/
├── index.html          # 首页（游戏入口）
├── *.html              # 各游戏页面
└── docs/               # 文档目录
    └── DEVELOPMENT_GUIDE.md
```

**命名规则：**
- 游戏页面：`{game-name}.html`（英文小写，单词间用连字符）
- 示例：`klotski.html`、`tower-of-hanoi.html`

### 1.2 HTML 骨架模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>游戏名称 - 简短描述</title>
    <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
    <style>
        /* CSS 变量主题定义 */
        /* 核心样式 */
        /* 游戏特定样式 */
    </style>
</head>
<body>
    <!-- 返回按钮（固定定位） -->
    <a href="index.html" class="back-btn">← 返回</a>

    <!-- 游戏主容器 -->
    <div class="game-container">
        <!-- 游戏标题 -->
        <!-- 游戏区域 -->
        <!-- 控制面板 -->
    </div>

    <script>
        // 游戏逻辑
    </script>
</body>
</html>
```

### 1.3 必需元素

每个游戏页面必须包含：

1. **返回按钮**
   ```css
   .back-btn {
       position: fixed;
       top: 16px;
       left: 16px;
       z-index: 40;
       padding: 8px 16px;
       border-radius: var(--radius);
       background: var(--bg-panel);
       color: var(--primary);
       border: var(--card-border);
       text-decoration: none;
       font-size: 14px;
   }
   ```

2. **移动端适配**
   - `<meta name="viewport">` 必须包含 `maximum-scale=1.0, user-scalable=no`
   - `touch-action: manipulation` 防止双击缩放

---

## 第二部分：主题系统规范

### 2.1 CSS 变量结构

每个主题需要定义以下变量：

```css
[data-theme="theme-name"] {
    /* 背景与面板 */
    --bg: #xxxxxx;
    --bg-panel: rgba(xx, xx, xx, x.x);

    /* 主色调 */
    --primary: #xxxxxx;
    --secondary: #xxxxxx;
    --accent: #xxxxxx;

    /* 文字颜色 */
    --text: #xxxxxx;
    --text-dim: #xxxxxx;

    /* 字体 */
    --font-display: 'Font Name', sans-serif;
    --font-mono: 'Font Name', sans-serif;

    /* 特效 */
    --glow-primary: 0 x px x px rgba(xx, xx, xx, x.x);

    /* 卡片样式 */
    --card-bg: rgba(xx, xx, xx, x.x);
    --card-border: 1px solid rgba(xx, xx, xx, x.x);
    --radius: xxpx;
    --shadow: 0 x px x px rgba(xx, xx, xx, x.x);
}
```

### 2.2 必需主题列表

新增游戏必须支持以下 11 个主题：

| 主题名称 | 特征 | 圆角 | 风格 |
|----------|------|------|------|
| cyberpunk | 霓虹色 | 0px | 锐利 |
| ocean-depths | 海洋蓝 | 20px | 柔和 |
| sunset-boulevard | 日落暖色 | 16px | 浪漫 |
| forest-canopy | 森林绿 | 12px | 自然 |
| modern-minimalist | 黑白灰 | 8px | 极简 |
| golden-hour | 金色系 | 4px | 复古 |
| arctic-frost | 冰蓝白 | 24px | 清冷 |
| desert-rose | 玫瑰粉 | 16px | 优雅 |
| tech-innovation | 深空灰 | 6px | 科技 |
| botanical-garden | 翠绿黄 | 20px | 活力 |
| midnight-galaxy | 紫蓝渐变 | 16px | 神秘 |

### 2.3 中文字体支持

对于包含中文的游戏，需要添加中文字体变量：

```css
--font-chinese: 'Ma Shan Zheng', 'ZCOOL XiaoWei', cursive;
```

**字体引入（Google Fonts）：**
```html
<link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
```

### 2.4 字体加载顺序

```html
<link href="https://fonts.googleapis.com/css2?family=
    Orbitron:wght@400;600;700;900&
    Share+Tech+Mono&
    Cinzel:wght@400;700&
    Playfair+Display:wght@400;700&
    Space+Mono:wght@400;700&
    Work+Sans:wght@400;700&
    Crimson+Text:wght@400;700&
    Noto+Serif+SC:wght@400;700&
    Noto+Sans+SC:wght@400;700&
    Ma+Shan+Zheng&
    ZCOOL+XiaoWei&display=swap" rel="stylesheet">
```

### 2.5 主题切换机制

游戏页面必须包含主题初始化逻辑：

```javascript
const savedTheme = localStorage.getItem('theme') || 'cyberpunk';
document.documentElement.setAttribute('data-theme', savedTheme);
```

---

## 第三部分：游戏机制规范

### 3.1 存档机制

使用 `localStorage` 保存游戏进度，遵循以下键名规范：

```javascript
// 键名格式：{game-name}_{data-type}
// 示例：
localStorage.setItem('klotski_best_moves', moves);
localStorage.setItem('klotski_best_time', time);
localStorage.setItem('klotski_current_level', level);
```

**标准存档字段：**
- `{game}_best_moves` - 最佳步数（数字）
- `{game}_best_time` - 最佳时间（秒）
- `{game}_current_level` - 当前关卡（数字）

### 3.2 游戏状态管理

```javascript
const gameState = {
    board: [],        // 游戏板状态
    moves: 0,         // 当前步数
    isRunning: false, // 游戏是否进行中
    isPaused: false,  // 游戏是否暂停
};
```

### 3.3 计时器规范

```javascript
let timerInterval = null;
let elapsedSeconds = 0;

function startTimer() {
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    elapsedSeconds = 0;
    updateTimerDisplay();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
```

### 3.4 胜负判定

```javascript
function checkWinCondition() {
    // 胜利条件判断
    if (/* 胜利条件 */) {
        showWinModal();
        stopTimer();
        saveBestScore();
    }
}

function showWinModal() {
    alert(`恭喜通关！用时 ${formatTime(elapsedSeconds)}，步数 ${gameState.moves}`);
}
```

### 3.5 响应式设计

**断点规范：**
```css
/* 移动端优先 */
.game-board {
    width: min(90vw, 400px);
    height: min(90vw, 400px);
}

/* 字体响应式 */
.game-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
}
```

---

## 第四部分：UI/UX 规范

### 4.1 按钮样式

**主按钮：**
```css
.btn-primary {
    padding: 12px 24px;
    border-radius: var(--radius);
    background: var(--primary);
    color: var(--bg);
    border: none;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-primary);
}
```

**次要按钮：**
```css
.btn-secondary {
    padding: 10px 20px;
    border-radius: var(--radius);
    background: transparent;
    color: var(--primary);
    border: var(--card-border);
    font-family: var(--font-mono);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}
```

### 4.2 动画效果

**悬停动画：**
```css
.interactive-element {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.interactive-element:hover {
    transform: scale(1.05);
}
```

**选中状态：**
```css
.selected {
    box-shadow: 0 0 0 3px var(--primary), var(--glow-primary);
    transform: scale(1.02);
}
```

### 4.3 游戏板设计

**容器样式：**
```css
.game-board {
    background: var(--bg-panel);
    border-radius: var(--radius);
    border: var(--card-border);
    box-shadow: var(--shadow);
    padding: 12px;
    display: grid;
    gap: 8px;
}
```

### 4.4 信息面板

**统计显示：**
```css
.stats-panel {
    display: flex;
    gap: 24px;
    justify-content: center;
    padding: 16px;
    background: var(--bg-panel);
    border-radius: var(--radius);
    border: var(--card-border);
}

.stat-item {
    text-align: center;
}

.stat-label {
    font-size: 12px;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-value {
    font-size: 24px;
    font-family: var(--font-display);
    color: var(--primary);
}
```

### 4.5 触摸交互

```javascript
// 触摸反馈
element.addEventListener('touchstart', () => {
    element.classList.add('touch-active');
});

element.addEventListener('touchend', () => {
    element.classList.remove('touch-active');
});
```

```css
.touch-active {
    transform: scale(0.95);
    opacity: 0.8;
}
```

### 4.6 移动端方向控制

对于需要方向输入的游戏，提供方向按钮：

```css
.direction-controls {
    display: grid;
    grid-template-areas:
        ". up ."
        "left . right"
        ". down .";
    gap: 8px;
    margin-top: 16px;
}

.direction-btn {
    width: 60px;
    height: 60px;
    border-radius: var(--radius);
    background: var(--bg-panel);
    border: var(--card-border);
    color: var(--primary);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.direction-btn:active {
    background: var(--primary);
    color: var(--bg);
}
```

---

## 第五部分：游戏规则与说明规范

每个游戏必须包含清晰的游戏规则说明界面，帮助玩家快速理解游戏玩法。

### 5.1 说明内容结构

游戏说明应包含以下要素：

```
┌─────────────────────────────────────┐
│           游戏规则说明               │
├─────────────────────────────────────┤
│  🎯 游戏目标                         │
│  描述胜利条件和成就目标               │
│                                     │
│  📋 基本规则                         │
│  列出所有游戏规则和限制条件           │
│                                     │
│  🎮 操作方式                         │
│  键盘/鼠标/触摸操作说明              │
│                                     │
│  💡 提示技巧                         │
│  可选的游戏技巧和策略建议             │
└─────────────────────────────────────┘
```

### 5.2 说明界面设计

```css
.rules-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.rules-modal.active {
    opacity: 1;
    visibility: visible;
}

.rules-content {
    background: var(--bg-panel);
    border: var(--card-border);
    border-radius: var(--radius);
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow);
}

.rules-section {
    margin-bottom: 20px;
}

.rules-section h3 {
    font-family: var(--font-display);
    color: var(--primary);
    margin-bottom: 8px;
    font-size: 16px;
}

.rules-section p,
.rules-section li {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text);
}

.rules-section ul {
    padding-left: 20px;
    margin-top: 8px;
}

.rules-section li {
    margin-bottom: 6px;
}
```

### 5.3 说明界面 HTML 结构

```html
<button class="help-btn" onclick="showRules()">❓ 规则</button>

<div class="rules-modal" id="rulesModal">
    <div class="rules-content">
        <h2>🎯 游戏目标</h2>
        <p>描述游戏的胜利条件...</p>

        <div class="rules-section">
            <h3>📋 基本规则</h3>
            <ul>
                <li>规则 1</li>
                <li>规则 2</li>
                <li>规则 3</li>
            </ul>
        </div>

        <div class="rules-section">
            <h3>🎮 操作方式</h3>
            <ul>
                <li><strong>键盘：</strong>方向键或 WASD</li>
                <li><strong>鼠标：</strong>点击目标位置</li>
                <li><strong>触摸：</strong>滑动或点击</li>
            </ul>
        </div>

        <button class="btn-primary" onclick="closeRules()">开始游戏</button>
    </div>
</div>
```

### 5.4 帮助按钮样式

```css
.help-btn {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 40;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bg-panel);
    border: var(--card-border);
    color: var(--primary);
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.help-btn:hover {
    background: var(--primary);
    color: var(--bg);
    transform: scale(1.1);
}
```

### 5.5 游戏特定元素说明

**棋盘类游戏（如华容道）：**
```javascript
const rulesContent = {
    goal: '将曹操移动到棋盘底部的出口处',
    rules: [
        '棋子只能移动到空位',
        '大棋子可以移动一格',
        '小棋子可以移动到任意空位',
        '不能斜向移动'
    ],
    controls: {
        desktop: '点击棋子，再点击目标空位',
        mobile: '触摸选择棋子，再次触摸移动'
    }
};
```

**益智类游戏（如汉诺塔）：**
```javascript
const rulesContent = {
    goal: '将所有圆盘移动到第三根柱子上',
    rules: [
        '每次只能移动一个圆盘',
        '只能移动柱子上最顶层的圆盘',
        '大圆盘不能放在小圆盘上面'
    ],
    controls: {
        desktop: '点击柱子选中，再点击目标柱子移动',
        mobile: '触摸点击操作'
    }
};
```

### 5.6 操作方式规范

#### 桌面端操作
| 操作类型 | 实现方式 |
|----------|----------|
| 键盘控制 | `keydown` 事件监听 |
| 鼠标点击 | `click` 事件监听 |
| 拖拽操作 | `mousedown/mousemove/mouseup` |

```javascript
// 键盘控制示例
document.addEventListener('keydown', (e) => {
    const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up', 'W': 'up',
        's': 'down', 'S': 'down',
        'a': 'left', 'A': 'left',
        'd': 'right', 'D': 'right'
    };

    if (keyMap[e.key]) {
        e.preventDefault();
        handleMove(keyMap[e.key]);
    }
});
```

#### 移动端操作
| 操作类型 | 实现方式 |
|----------|----------|
| 触摸点击 | `touchstart/touchend` |
| 滑动方向 | `touchstart/touchmove/touchend` 计算滑动角度 |
| 长按 | `touchstart` + `setTimeout` |

```javascript
// 滑动方向检测
let touchStartX = 0;
let touchStartY = 0;

gameBoard.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

gameBoard.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > minSwipeDistance) handleMove('right');
        else if (deltaX < -minSwipeDistance) handleMove('left');
    } else {
        if (deltaY > minSwipeDistance) handleMove('down');
        else if (deltaY < -minSwipeDistance) handleMove('up');
    }
});
```

### 5.7 关卡/难度说明

对于包含多关卡的游戏，需要显示关卡信息：

```javascript
const levelInfo = {
    current: 1,
    total: 5,
    difficulty: '简单' // 简单/中等/困难
};
```

```html
<div class="level-indicator">
    <span>关卡 {{current}} / {{total}}</span>
    <span class="difficulty-tag">{{difficulty}}</span>
</div>
```

---

## 第六部分：新增游戏检查清单

添加新游戏时，确保完成以下所有项目：

### 6.1 文件创建
- [ ] 创建 `{game-name}.html` 文件
- [ ] 使用标准 HTML 骨架
- [ ] 包含返回按钮
- [ ] 包含帮助/规则按钮

### 6.2 主题系统
- [ ] 定义所有 11 个主题的 CSS 变量
- [ ] 确保字体正确加载
- [ ] 测试所有主题显示效果
- [ ] 实现主题切换持久化

### 6.3 游戏逻辑
- [ ] 实现游戏核心玩法
- [ ] 添加步数/时间统计
- [ ] 实现胜利条件判定
- [ ] 添加最佳成绩保存
- [ ] 支持重新开始功能
- [ ] 实现撤销/重做（如适用）

### 6.4 规则说明
- [ ] 编写游戏目标说明
- [ ] 列出所有游戏规则
- [ ] 说明键盘/鼠标操作
- [ ] 说明触摸操作（移动端）
- [ ] 添加提示技巧（可选）

### 6.5 响应式适配
- [ ] 移动端触摸操作
- [ ] 方向键支持
- [ ] 屏幕适配测试
- [ ] 横竖屏适配

### 6.6 首页集成
- [ ] 在 `index.html` 添加游戏入口卡片
- [ ] 使用游戏图标或 emoji
- [ ] 添加适当的描述文字

---

## 附录：代码示例

### 快速开始模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>游戏名称</title>
    <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
    <style>/* 完整主题系统 */</style>
</head>
<body>
    <a href="index.html" class="back-btn">← 返回</a>
    <button class="help-btn" onclick="showRules()">❓</button>

    <h1 class="game-title">游戏名称</h1>

    <div class="stats-panel">
        <div class="stat-item">
            <div class="stat-label">步数</div>
            <div class="stat-value" id="moves">0</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">时间</div>
            <div class="stat-value" id="time">00:00</div>
        </div>
    </div>

    <div class="game-board" id="board"></div>

    <div class="controls">
        <button class="btn-primary" onclick="restartGame()">重新开始</button>
    </div>

    <!-- 规则说明弹窗 -->
    <div class="rules-modal" id="rulesModal">
        <div class="rules-content">
            <h2>🎯 游戏目标</h2>
            <p>描述游戏的胜利条件...</p>
            <!-- 规则内容 -->
        </div>
    </div>

    <script>
        // 游戏逻辑
    </script>
</body>
</html>
```

---

*文档版本：1.1*
*最后更新：2026-05-10*
