import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IProduct, ProductType, ScoreLabel, ScoringMethod, DataSource } from '@/types/product'

export interface ProductDocument extends Omit<IProduct, '_id'>, Document {}

const NutritionFactsSchema = new Schema(
  {
    calories: Number,
    fat: Number,
    saturatedFat: Number,
    sugar: Number,
    salt: Number,
    fiber: Number,
    protein: Number,
  },
  { _id: false }
)

const CosmeticFlagsSchema = new Schema(
  {
    endocrineDisruptors: [String],
    carcinogens: [String],
    allergens: [String],
    irritants: [String],
  },
  { _id: false }
)

const ScoreBreakdownSchema = new Schema(
  {
    nutrition: Number,
    additives: Number,
    organic: Number,
    ingredients: Number,
    hazardous: Number,
  },
  { _id: false }
)

const ProductSchema = new Schema<ProductDocument>(
  {
    barcode: { type: String, required: true, unique: true, index: true },
    name: String,
    brand: String,
    imageUrl: String,
    productType: {
      type: String,
      enum: ['food', 'beverage', 'cosmetic', 'personal_care', 'household', 'other'] as ProductType[],
      required: true,
    },
    category: String,
    rawIngredients: String,
    nutritionFacts: NutritionFactsSchema,
    additives: [String],
    isOrganic: Boolean,
    nutriScore: String,
    cosmeticFlags: CosmeticFlagsSchema,
    score: { type: Number, min: 0, max: 100 },
    scoreLabel: {
      type: String,
      enum: ['excellent', 'good', 'mediocre', 'poor'] as ScoreLabel[],
    },
    scoreBreakdown: ScoreBreakdownSchema,
    scoringMethod: {
      type: String,
      enum: ['rules', 'ai', 'hybrid'] as ScoringMethod[],
      default: 'rules',
    },
    source: {
      type: String,
      enum: ['open_food_facts', 'open_beauty_facts', 'ai_vision', 'manual'] as DataSource[],
      default: 'open_food_facts',
    },
  },
  { timestamps: true }
)

const Product: Model<ProductDocument> =
  mongoose.models.Product ?? mongoose.model<ProductDocument>('Product', ProductSchema)

export default Product
