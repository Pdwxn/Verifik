export type CosmeticRiskCategory =
  | 'endocrine_disruptor'
  | 'carcinogen'
  | 'allergen'
  | 'irritant'

export interface CosmeticIngredient {
  inci: string
  commonNames?: string[]
  category: CosmeticRiskCategory
  reason: string
  severity: 'high' | 'moderate' | 'low'
}

export const COSMETIC_INGREDIENTS_BLACKLIST: CosmeticIngredient[] = [
  { inci: 'methylparaben', category: 'endocrine_disruptor', severity: 'high', reason: 'Disruptor endocrino, imita estrógenos' },
  { inci: 'propylparaben', category: 'endocrine_disruptor', severity: 'high', reason: 'Disruptor endocrino, imita estrógenos' },
  { inci: 'butylparaben', category: 'endocrine_disruptor', severity: 'high', reason: 'Disruptor endocrino, imita estrógenos' },
  { inci: 'ethylparaben', category: 'endocrine_disruptor', severity: 'moderate', reason: 'Parabeno, potencial disruptor endocrino' },
  { inci: 'bha', commonNames: ['butylated hydroxyanisole'], category: 'endocrine_disruptor', severity: 'high', reason: 'Disruptor endocrino y posible carcinógeno' },
  { inci: 'triclosan', category: 'endocrine_disruptor', severity: 'high', reason: 'Disruptor endocrino, resistencia antibacteriana' },
  { inci: 'oxybenzone', category: 'endocrine_disruptor', severity: 'high', reason: 'Filtro UV, disruptor endocrino' },
  { inci: 'formaldehyde', category: 'carcinogen', severity: 'high', reason: 'Carcinógeno grupo 1 (IARC)' },
  { inci: 'coal tar', category: 'carcinogen', severity: 'high', reason: 'Carcinógeno, presente en tintes y champús anticaspa' },
  { inci: '1,4-dioxane', category: 'carcinogen', severity: 'high', reason: 'Contaminante frecuente en ethoxilados, posible carcinógeno' },
  { inci: 'resorcinol', category: 'carcinogen', severity: 'moderate', reason: 'Disruptor tiroideo, posible carcinógeno' },
  { inci: 'fragrance', commonNames: ['parfum', 'aroma'], category: 'allergen', severity: 'moderate', reason: 'Mezcla de hasta 3000 químicos, fuente frecuente de alergias' },
  { inci: 'methylisothiazolinone', category: 'allergen', severity: 'high', reason: 'Conservante, alérgeno de contacto potente' },
  { inci: 'methylchloroisothiazolinone', category: 'allergen', severity: 'high', reason: 'Conservante, alérgeno de contacto potente' },
  { inci: 'linalool', category: 'allergen', severity: 'low', reason: 'Alérgeno floral, potencial sensibilizante' },
  { inci: 'limonene', category: 'allergen', severity: 'low', reason: 'Alérgeno cítrico, potencial sensibilizante' },
  { inci: 'sodium lauryl sulfate', commonNames: ['sls'], category: 'irritant', severity: 'moderate', reason: 'Surfactante irritante, altera barrera de la piel' },
  { inci: 'alcohol denat', category: 'irritant', severity: 'moderate', reason: 'Alcohol desnaturalizado, reseca la piel' },
  { inci: 'propylene glycol', category: 'irritant', severity: 'low', reason: 'Humectante irritante en pieles sensibles' },
]

export function findCosmeticIngredients(rawIngredients: string): CosmeticIngredient[] {
  const lower = rawIngredients.toLowerCase()
  return COSMETIC_INGREDIENTS_BLACKLIST.filter(ing => {
    const mainMatch = lower.includes(ing.inci)
    const aliasMatch = ing.commonNames?.some(alias => lower.includes(alias)) ?? false
    return mainMatch || aliasMatch
  })
}
