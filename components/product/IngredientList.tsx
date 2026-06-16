import { findCosmeticIngredients } from '@/lib/constants/cosmeticIngredients'

interface Props {
  rawIngredients: string
  productType: 'cosmetic' | 'personal_care' | 'household'
}

const CATEGORY_LABELS = {
  endocrine_disruptor: { label: 'Disruptor endocrino', color: 'bg-purple-100 text-purple-700' },
  carcinogen:          { label: 'Carcinógeno',         color: 'bg-red-100 text-red-700' },
  allergen:            { label: 'Alérgeno',            color: 'bg-yellow-100 text-yellow-700' },
  irritant:            { label: 'Irritante',           color: 'bg-orange-100 text-orange-700' },
}

export default function IngredientList({ rawIngredients, productType }: Props) {
  const flagged = findCosmeticIngredients(rawIngredients)

  if (flagged.length === 0) {
    return (
      <div className="bg-emerald-50 rounded-xl p-4 text-center">
        <p className="text-emerald-700 font-medium text-sm">✓ No se detectaron ingredientes problemáticos</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {flagged.map(ing => {
        const meta = CATEGORY_LABELS[ing.category]
        return (
          <div key={ing.inci} className="bg-white rounded-xl p-3 border border-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-800 capitalize">{ing.inci}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ing.reason}</p>
              </div>
              <span className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${meta.color}`}>
                {meta.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
