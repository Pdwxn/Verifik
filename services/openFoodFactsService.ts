import type { RawFoodProduct } from '@/types/product'

const OFF_BASE_URL = 'https://world.openfoodfacts.org/api/v2/product'

interface OFFNutriments {
  'energy-kcal_100g'?: number
  fat_100g?: number
  'saturated-fat_100g'?: number
  sugars_100g?: number
  salt_100g?: number
  fiber_100g?: number
  proteins_100g?: number
}

interface OFFProduct {
  product_name?: string
  brands?: string
  image_url?: string
  categories?: string
  ingredients_text?: string
  additives_tags?: string[]
  labels_tags?: string[]
  nutriments?: OFFNutriments
  nutriscore_grade?: string
  product_type?: string
}

interface OFFResponse {
  status: 0 | 1
  product?: OFFProduct
}

function mapProductType(categories: string): 'food' | 'beverage' {
  const lower = categories.toLowerCase()
  if (lower.includes('beverage') || lower.includes('drink') || lower.includes('bebida')) {
    return 'beverage'
  }
  return 'food'
}

function parseAdditives(tags: string[]): string[] {
  return tags
    .map(tag => tag.replace('en:', '').toUpperCase())
    .filter(tag => tag.startsWith('E'))
}

export async function fetch(barcode: string): Promise<RawFoodProduct | null> {
  try {
    const res = await globalThis.fetch(
      `${OFF_BASE_URL}/${barcode}.json?fields=product_name,brands,image_url,categories,ingredients_text,additives_tags,labels_tags,nutriments,nutriscore_grade`,
      { next: { revalidate: 86400 } }
    )

    if (!res.ok) return null

    const data: OFFResponse = await res.json()

    if (data.status !== 1 || !data.product) return null

    const p = data.product
    const n = p.nutriments ?? {}

    return {
      productType: mapProductType(p.categories ?? ''),
      name: p.product_name,
      brand: p.brands?.split(',')[0].trim(),
      imageUrl: p.image_url,
      category: p.categories?.split(',')[0].trim(),
      rawIngredients: p.ingredients_text,
      nutritionFacts: {
        calories: n['energy-kcal_100g'],
        fat: n.fat_100g,
        saturatedFat: n['saturated-fat_100g'],
        sugar: n.sugars_100g,
        salt: n.salt_100g,
        fiber: n.fiber_100g,
        protein: n.proteins_100g,
      },
      additives: p.additives_tags ? parseAdditives(p.additives_tags) : [],
      isOrganic: p.labels_tags?.includes('en:organic') ?? false,
      nutriScore: p.nutriscore_grade?.toUpperCase(),
      source: 'open_food_facts',
    }
  } catch {
    return null
  }
}
