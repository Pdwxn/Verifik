import type { IProduct } from '@/types/product'
import type { HealthProfile } from '@/types/user'

export async function analyzeProductImage(_imageBase64: string): Promise<never> {
  throw new Error('[aiService] analyzeProductImage: not implemented until Phase 2')
}

export async function getPersonalizedScore(
  _product: IProduct,
  _userProfile: HealthProfile
): Promise<never> {
  throw new Error('[aiService] getPersonalizedScore: not implemented until Phase 2')
}
