export type AdditiveRisk = 'high' | 'moderate' | 'low'

export interface Additive {
  code: string
  name: string
  risk: AdditiveRisk
  reason: string
}

export const ADDITIVES_BLACKLIST: Additive[] = [
  { code: 'E102', name: 'Tartrazina', risk: 'high', reason: 'Colorante azo, hiperactividad en niños' },
  { code: 'E110', name: 'Amarillo ocaso FCF', risk: 'high', reason: 'Colorante azo, posible carcinógeno' },
  { code: 'E122', name: 'Azorrubina', risk: 'high', reason: 'Colorante azo, hiperactividad' },
  { code: 'E124', name: 'Rojo Ponceau 4R', risk: 'high', reason: 'Colorante azo, hiperactividad' },
  { code: 'E129', name: 'Rojo Allura AC', risk: 'high', reason: 'Colorante azo, hiperactividad' },
  { code: 'E211', name: 'Benzoato de sodio', risk: 'high', reason: 'Conservante, puede formar benceno' },
  { code: 'E621', name: 'Glutamato monosódico', risk: 'high', reason: 'Potenciador de sabor, posibles efectos neurológicos' },
  { code: 'E951', name: 'Aspartamo', risk: 'high', reason: 'Edulcorante artificial, clasificado como posible carcinógeno (IARC)' },
  { code: 'E954', name: 'Sacarina', risk: 'high', reason: 'Edulcorante artificial, posible carcinógeno' },
  { code: 'E104', name: 'Amarillo de quinoleína', risk: 'moderate', reason: 'Colorante sintético, hiperactividad' },
  { code: 'E150d', name: 'Caramelo sulfito-amónico', risk: 'moderate', reason: 'Colorante, posible carcinógeno (4-MEI)' },
  { code: 'E250', name: 'Nitrito de sodio', risk: 'moderate', reason: 'Conservante en carnes, puede formar nitrosaminas' },
  { code: 'E320', name: 'BHA', risk: 'moderate', reason: 'Antioxidante sintético, posible carcinógeno' },
  { code: 'E321', name: 'BHT', risk: 'moderate', reason: 'Antioxidante sintético, disruptor endocrino' },
  { code: 'E407', name: 'Carragenano', risk: 'moderate', reason: 'Espesante, inflamación intestinal en estudios animales' },
  { code: 'E965', name: 'Maltitol', risk: 'moderate', reason: 'Edulcorante, efecto laxante en exceso' },
  { code: 'E415', name: 'Goma xantana', risk: 'low', reason: 'Espesante, puede causar molestias digestivas en exceso' },
  { code: 'E471', name: 'Mono y diglicéridos de ácidos grasos', risk: 'low', reason: 'Emulsionante, puede contener grasas trans' },
]

export const ADDITIVE_CODES = new Set(ADDITIVES_BLACKLIST.map(a => a.code.toLowerCase()))

export function getAdditiveInfo(code: string): Additive | undefined {
  return ADDITIVES_BLACKLIST.find(a => a.code.toLowerCase() === code.toLowerCase())
}
