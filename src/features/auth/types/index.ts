export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
  role?: number;
  specialty?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: number;
  specialty: string;
} 