import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductByBarcode } from '@/services/productService'
import ScoreCircle from '@/components/product/ScoreCircle'
import IngredientList from '@/components/product/IngredientList'
import type { IProduct } from '@/types/product'

interface Props {
  params: Promise<{ barcode: string }>
}

function NutritionSection({ product }: { product: IProduct }) {
  const facts = product.nutritionFacts
  if (!facts) return null

  const items = [
    { label: 'Calorías', value: facts.calories, unit: 'kcal' },
    { label: 'Grasas', value: facts.fat, unit: 'g' },
    { label: 'G. saturadas', value: facts.saturatedFat, unit: 'g' },
    { label: 'Azúcar', value: facts.sugar, unit: 'g' },
    { label: 'Sal', value: facts.salt, unit: 'g' },
    { label: 'Fibra', value: facts.fiber, unit: 'g' },
    { label: 'Proteínas', value: facts.protein, unit: 'g' },
  ].filter(i => i.value !== undefined)

  return (
    <section className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="font-bold text-gray-800 mb-3">Información nutricional</h2>
      <p className="text-xs text-gray-400 mb-3">Por cada 100g / 100ml</p>
      <div className="divide-y divide-gray-50">
        {items.map(item => (
          <div key={item.label} className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-800">{item.value}{item.unit}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default async function ProductPage({ params }: Props) {
  const { barcode } = await params

  let product: IProduct | null
  try {
    product = await getProductByBarcode(barcode)
  } catch {
    product = null
  }
  if (!product) notFound()

  const isFood = product.productType === 'food' || product.productType === 'beverage'
  const isCosmetic = ['cosmetic', 'personal_care', 'household'].includes(product.productType)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 pt-6 pb-8 shadow-sm">
        <div className="flex items-start gap-4">
          {product.imageUrl && (
            <Image src={product.imageUrl} alt={product.name ?? ''} width={80} height={80}
              className="w-20 h-20 object-contain rounded-xl bg-gray-50 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-gray-900 text-lg leading-tight">{product.name ?? 'Producto desconocido'}</h1>
            {product.brand && <p className="text-sm text-gray-500 mt-1">{product.brand}</p>}
            {product.category && (
              <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {product.category}
              </span>
            )}
          </div>
        </div>

        {product.score !== undefined && product.scoreLabel && (
          <div className="flex justify-center mt-6">
            <ScoreCircle score={product.score} label={product.scoreLabel} size="lg" />
          </div>
        )}
      </div>

      <div className="px-4 py-4 space-y-4">
        {isFood && <NutritionSection product={product} />}

        {isFood && product.additives && product.additives.length > 0 && (
          <section className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-3">Aditivos detectados</h2>
            <div className="space-y-2">
              {product.additives.map(code => (
                <div key={code} className="flex items-center gap-2 text-sm">
                  <span className="bg-red-100 text-red-600 font-mono text-xs px-2 py-0.5 rounded">{code}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {isCosmetic && product.rawIngredients && (
          <section className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-3">Análisis de ingredientes</h2>
            <IngredientList
              rawIngredients={product.rawIngredients}
              productType={product.productType as 'cosmetic' | 'personal_care' | 'household'}
            />
          </section>
        )}

        <p className="text-center text-xs text-gray-400 pb-4">
          Datos de {product.source === 'open_food_facts' ? 'Open Food Facts' : 'Open Beauty Facts'}
        </p>
      </div>
    </div>
  )
}
