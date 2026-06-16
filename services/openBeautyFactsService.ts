import type { RawCosmeticProduct } from '@/types/product'
import { findCosmeticIngredients, CosmeticRiskCategory } from '@/lib/constants/cosmeticIngredients'

const OBF_BASE_URL = 'https://world.openbeautyfacts.org/api/v2/product'

interface OBFProduct {
  product_name?: string
  brands?: string
  image_url?: string
  categories?: string
  ingredients_text?: string
  product_type?: string
}

interface OBFResponse {
  status: 0 | 1
  product?: OBFProduct
}

function mapProductType(categories: string): 'cosmetic' | 'personal_care' | 'household' {
  const lower = categories.toLowerCase()
  if (lower.includes('household') || lower.includes('cleaning') || lower.includes('limpieza')) return 'household'
  if (lower.includes('hair') || lower.includes('skin') || lower.includes('body') || lower.includes('face')) return 'personal_care'
  return 'cosmetic'
}

export async function fetch(barcode: string): Promise<RawCosmeticProduct | null> {
  try {
    const res = await globalThis.fetch(
      `${OBF_BASE_URL}/${barcode}.json?fields=product_name,brands,image_url,categories,ingredients_text`,
      { next: { revalidate: 86400 } }
    )

    if (!res.ok) return null

    const data: OBFResponse = await res.json()

    if (data.status !== 1 || !data.product) return null

    const p = data.product
    const ingredients = p.ingredients_text ?? ''
    const flagged = findCosmeticIngredients(ingredients)

    const groupByCategory = (cat: CosmeticRiskCategory) =>
      flagged.filter(i => i.category === cat).map(i => i.inci)

    return {
      productType: mapProductType(p.categories ?? ''),
      name: p.product_name,
      brand: p.brands?.split(',')[0].trim(),
      imageUrl: p.image_url,
      category: p.categories?.split(',')[0].trim(),
      rawIngredients: ingredients,
      cosmeticFlags: {
        endocrineDisruptors: groupByCategory('endocrine_disruptor'),
        carcinogens: groupByCategory('carcinogen'),
        allergens: groupByCategory('allergen'),
        irritants: groupByCategory('irritant'),
      },
      source: 'open_beauty_facts',
    }
  } catch {
    return null
  }
}
