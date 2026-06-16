import type { ScoreLabel } from '@/types/product'

interface Props {
  score: number
  label: ScoreLabel
}

const STYLES: Record<ScoreLabel, string> = {
  excellent: 'bg-emerald-100 text-emerald-700',
  good:      'bg-lime-100 text-lime-700',
  mediocre:  'bg-orange-100 text-orange-600',
  poor:      'bg-red-100 text-red-600',
}

export default function ScoreBadge({ score, label }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold ${STYLES[label]}`}>
      {score}
    </span>
  )
}
