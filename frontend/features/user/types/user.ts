export interface User {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: AppMetadata
  user_metadata: UserMetadata
  identities: Identity[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

export interface AppMetadata {
  provider: string
  providers: string[]
}

export interface UserMetadata {
  avatar_url: string
  custom_claims: CustomClaims
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  picture: string
  preferred_username: string
  provider_id: string
  sub: string
  user_name: string
}

export interface CustomClaims {
  global_name: string
}

export interface Identity {
  identity_id: string
  id: string
  user_id: string
  identity_data: IdentityData
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  email: string
}

export interface IdentityData {
  avatar_url: string
  custom_claims?: CustomClaims2
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  picture?: string
  provider_id: string
  sub: string
  preferred_username?: string
  user_name?: string
}

export interface CustomClaims2 {
  global_name: string
}
