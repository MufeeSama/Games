import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Droplets, BookOpen, CircleDot, Grid3X3, Flower2, ExternalLink } from 'lucide-react'

interface Game {
  id: string
  name: string
  description: string
  file: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

const games: Game[] = [
  {
    id: 'ten-drop',
    name: '十滴水',
    description: '策略消除类游戏，点击水滴使其破裂并引发连锁反应',
    file: 'ten-drop.html',
    icon: <Droplets className="w-8 h-8" />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 hover:bg-cyan-100'
  },
  {
    id: 'chengyu',
    name: '成语接龙',
    description: '考验你的成语知识，接龙挑战看你能走多远',
    file: 'chengyu.html',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 hover:bg-amber-100'
  },
  {
    id: 'gomoku',
    name: '五子棋',
    description: '经典双人对弈游戏，先连成五子者获胜',
    file: 'gomoku.html',
    icon: <CircleDot className="w-8 h-8" />,
    color: 'text-slate-700',
    bgColor: 'bg-slate-100 hover:bg-slate-200'
  },
  {
    id: 'sudoku',
    name: '数独',
    description: '数字逻辑谜题，填满9x9网格使每行每列都包含1-9',
    file: 'sudoku.html',
    icon: <Grid3X3 className="w-8 h-8" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100'
  },
  {
    id: 'feihua',
    name: '飞花令',
    description: '诗词对答游戏，考验你的古诗词功底',
    file: 'feihua.html',
    icon: <Flower2 className="w-8 h-8" />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 hover:bg-rose-100'
  }
]

function App() {
  const handlePlayGame = (file: string) => {
    window.open(file, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">游戏中心</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            选择你喜欢的游戏
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            这里汇集了五款精心设计的网页小游戏，从策略消除到经典对弈，总有一款适合你
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className={`group cursor-pointer transition-all duration-300 border-0 shadow-sm hover:shadow-lg ${game.bgColor}`}
              onClick={() => handlePlayGame(game.file)}
            >
              <CardHeader className="pb-3">
                <div className={`${game.color} mb-3 transition-transform group-hover:scale-110 duration-300`}>
                  {game.icon}
                </div>
                <CardTitle className="text-xl text-slate-800">{game.name}</CardTitle>
                <CardDescription className="text-slate-600">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className={`w-full ${game.color} hover:bg-white/50`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  开始游戏
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>点击任意游戏卡片即可开始游玩</p>
        </footer>
      </main>
    </div>
  )
}

export default App