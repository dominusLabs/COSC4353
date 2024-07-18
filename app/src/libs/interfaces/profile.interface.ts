export interface UpdateProfile {
  userID: string 
  name: string 
  addressOne: string 
  addressTwo: string 
  city: string 
  state: string 
  zipCode: string 
  skills: string[]
  preferences: string[]
  availability: []
}

export interface GetProfile {
  userID: string
}