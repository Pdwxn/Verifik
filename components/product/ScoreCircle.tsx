import type { ScoreLabel } from '@/types/product'

interface Props {
  score: number
  label: ScoreLabel
  size?: 'sm' | 'md' | 'lg'
}

const COLORS: Record<ScoreLabel, { stroke: string; text: string; bg: string }> = {
  excellent: { stroke: '#1DB954', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  good:      { stroke: '#A8D08D', text: 'text-lime-600',    bg: 'bg-lime-50'    },
  mediocre:  { stroke: '#F4A261', text: 'text-orange-500',  bg: 'bg-orange-50'  },
  poor:      { stroke: '#E63946', text: 'text-red-500',     bg: 'bg-red-50'     },
}

const LABEL_ES: Record<ScoreLabel, string> = {
  excellent: 'Excelente',
  good:      'Bueno',
  mediocre:  'Mediocre',
  poor:      'Malo',
}

const SIZES = {
  sm: { size: 64,  stroke: 4,  textSize: 'text-lg',   labelSize: 'text-[9px]'  },
  md: { size: 100, stroke: 6,  textSize: 'text-2xl',  labelSize: 'text-[11px]' },
  lg: { size: 140, stroke: 8,  textSize: 'text-4xl',  labelSize: 'text-xs'     },
}

export default function ScoreCircle({ score, label, size = 'lg' }: Props) {
  const color = COLORS[label]
  const dim = SIZES[size]
  const radius = (dim.size - dim.stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const center = dim.size / 2

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`rounded-full p-2 ${color.bg}`}>
        <svg width={dim.size} height={dim.size} viewBox={`0 0 ${dim.size} ${dim.size}`}>
          <circle
            cx={center} cy={center} r={radius}
            fill="none" stroke="#f3f4f6" strokeWidth={dim.stroke}
          />
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={dim.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
          <text x={center} y={center - 6} textAnchor="middle"
            className={`font-bold fill-current ${color.text}`}
            fontSize={dim.size * 0.22} fontWeight="700">
            {score}
          </text>
          <text x={center} y={center + dim.size * 0.14} textAnchor="middle"
            fontSize={dim.size * 0.085} fill="#6b7280">
            /100
          </text>
        </svg>
      </div>
      <span className={`font-semibold ${color.text}`}>{LABEL_ES[label]}</span>
    </div>
  )
}
