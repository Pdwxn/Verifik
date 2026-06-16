export interface NutrientThreshold {
  nutrient: string
  thresholds: { max: number; points: number }[]
}

export const NEGATIVE_NUTRIENTS: NutrientThreshold[] = [
  {
    nutrient: 'calories',
    thresholds: [
      { max: 335, points: 10 },
      { max: 270, points: 8 },
      { max: 205, points: 6 },
      { max: 120, points: 4 },
      { max: 80, points: 2 },
    ],
  },
  {
    nutrient: 'sugar',
    thresholds: [
      { max: 45, points: 10 },
      { max: 36, points: 8 },
      { max: 27, points: 6 },
      { max: 18, points: 4 },
      { max: 9, points: 2 },
    ],
  },
  {
    nutrient: 'saturatedFat',
    thresholds: [
      { max: 10, points: 10 },
      { max: 8, points: 8 },
      { max: 6, points: 6 },
      { max: 4, points: 4 },
      { max: 2, points: 2 },
    ],
  },
  {
    nutrient: 'salt',
    thresholds: [
      { max: 2.3, points: 10 },
      { max: 1.8, points: 8 },
      { max: 1.3, points: 6 },
      { max: 0.9, points: 4 },
      { max: 0.5, points: 2 },
    ],
  },
]

export const POSITIVE_NUTRIENTS: NutrientThreshold[] = [
  {
    nutrient: 'fiber',
    thresholds: [
      { max: 999, points: 5 },
      { max: 4.7, points: 4 },
      { max: 3.7, points: 3 },
      { max: 2.8, points: 2 },
      { max: 0.9, points: 1 },
    ],
  },
  {
    nutrient: 'protein',
    thresholds: [
      { max: 999, points: 5 },
      { max: 8, points: 4 },
      { max: 6.4, points: 3 },
      { max: 4.8, points: 2 },
      { max: 1.6, points: 1 },
    ],
  },
]
