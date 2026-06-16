export type ProductType =
  | 'food'
  | 'beverage'
  | 'cosmetic'
  | 'personal_care'
  | 'household'
  | 'other'

export type ScoreLabel = 'excellent' | 'good' | 'mediocre' | 'poor'
export type ScoringMethod = 'rules' | 'ai' | 'hybrid'
export type DataSource =
  | 'open_food_facts'
  | 'open_beauty_facts'
  | 'ai_vision'
  | 'manual'

export interface NutritionFacts {
  calories?: number
  fat?: number
  saturatedFat?: number
  sugar?: number
  salt?: number
  fiber?: number
  protein?: number
}

export interface CosmeticFlags {
  endocrineDisruptors: string[]
  carcinogens: string[]
  allergens: string[]
  irritants: string[]
}

export interface ScoreBreakdown {
  nutrition?: number
  additives?: number
  organic?: number
  ingredients?: number
  hazardous?: number
}

export interface IProduct {
  _id: string
  barcode: string
  name?: string
  brand?: string
  imageUrl?: string
  productType: ProductType
  category?: string
  rawIngredients?: string
  nutritionFacts?: NutritionFacts
  additives?: string[]
  isOrganic?: boolean
  nutriScore?: string
  cosmeticFlags?: CosmeticFlags
  score?: number
  scoreLabel?: ScoreLabel
  scoreBreakdown?: ScoreBreakdown
  scoringMethod: ScoringMethod
  source: DataSource
  createdAt: Date
  updatedAt: Date
}

export interface RawFoodProduct {
  productType: 'food' | 'beverage'
  name?: string
  brand?: string
  imageUrl?: string
  category?: string
  rawIngredients?: string
  nutritionFacts?: NutritionFacts
  additives?: string[]
  isOrganic?: boolean
  nutriScore?: string
  source: 'open_food_facts'
}

export interface RawCosmeticProduct {
  productType: 'cosmetic' | 'personal_care' | 'household'
  name?: string
  brand?: string
  imageUrl?: string
  category?: string
  rawIngredients?: string
  cosmeticFlags?: CosmeticFlags
  source: 'open_beauty_facts'
}

export type RawProduct = RawFoodProduct | RawCosmeticProduct
