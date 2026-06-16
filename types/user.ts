export interface HealthProfile {
  conditions: string[]
  allergies: string[]
  preferences: string[]
  skinType?: string
}

export interface IUser {
  _id: string
  email: string
  name?: string
  avatarUrl?: string
  healthProfile: HealthProfile
  createdAt: Date
}
