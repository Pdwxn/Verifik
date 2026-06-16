import type { RawProduct, RawFoodProduct, RawCosmeticProduct, ScoreLabel, ScoreBreakdown } from '@/types/product'
import { getAdditiveInfo } from '@/lib/constants/additives'
import { NEGATIVE_NUTRIENTS, POSITIVE_NUTRIENTS } from '@/lib/constants/nutrients'
import { findCosmeticIngredients } from '@/lib/constants/cosmeticIngredients'

export interface ScoringResult {
  score: number
  scoreLabel: ScoreLabel
  scoreBreakdown: ScoreBreakdown
  scoringMethod: 'rules'
}

function getLabel(score: number): ScoreLabel {
  if (score >= 75) return 'excellent'
  if (score >= 50) return 'good'
  if (score >= 25) return 'mediocre'
  return 'poor'
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function getNutritionPoints(product: RawFoodProduct): number {
  const facts = product.nutritionFacts ?? {}
  let negativePoints = 0
  let positivePoints = 0

  for (const threshold of NEGATIVE_NUTRIENTS) {
    const value = facts[threshold.nutrient as keyof typeof facts] as number | undefined
    if (value === undefined) continue
    for (const t of threshold.thresholds) {
      if (value >= t.max) { negativePoints += t.points; break }
    }
  }

  for (const threshold of POSITIVE_NUTRIENTS) {
    const value = facts[threshold.nutrient as keyof typeof facts] as number | undefined
    if (value === undefined) continue
    for (const t of threshold.thresholds) {
      if (value >= t.max) { positivePoints += t.points; break }
    }
  }

  const fsaScore = Math.max(0, negativePoints - positivePoints)
  return clamp(60 - (fsaScore / 40) * 60, 0, 60)
}

function getAdditivePoints(product: RawFoodProduct): number {
  const additives = product.additives ?? []
  let penalty = 0
  for (const code of additives) {
    const info = getAdditiveInfo(code)
    if (!info) continue
    if (info.risk === 'high') penalty += 10
    else if (info.risk === 'moderate') penalty += 5
    else penalty += 2
  }
  return clamp(30 - penalty, 0, 30)
}

function scoreFood(product: RawFoodProduct): ScoringResult {
  const nutrition = getNutritionPoints(product)
  const additives = getAdditivePoints(product)
  const organic = product.isOrganic ? 10 : 0
  const total = clamp(Math.round(nutrition + additives + organic), 0, 100)

  return {
    score: total,
    scoreLabel: getLabel(total),
    scoreBreakdown: { nutrition: Math.round(nutrition), additives: Math.round(additives), organic },
    scoringMethod: 'rules',
  }
}

function scoreCosmetic(product: RawCosmeticProduct): ScoringResult {
  const flagged = findCosmeticIngredients(product.rawIngredients ?? '')
  let penalty = 0

  for (const ing of flagged) {
    if (ing.severity === 'high') penalty += 15
    else if (ing.severity === 'moderate') penalty += 8
    else penalty += 3
  }

  const hazardous = clamp(30 - (flagged.filter(i => i.severity === 'high').length * 10), 0, 30)
  const ingredients = clamp(70 - (penalty - (30 - hazardous)), 0, 70)
  const total = clamp(Math.round(ingredients + hazardous), 0, 100)

  return {
    score: total,
    scoreLabel: getLabel(total),
    scoreBreakdown: { ingredients: Math.round(ingredients), hazardous: Math.round(hazardous) },
    scoringMethod: 'rules',
  }
}

export function calculate(product: RawProduct): ScoringResult {
  if (product.productType === 'food' || product.productType === 'beverage') {
    return scoreFood(product as RawFoodProduct)
  }
  return scoreCosmetic(product as RawCosmeticProduct)
}
