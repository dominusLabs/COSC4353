export interface RegisterAccount {
  email: string;
  password: string;
  accountType: string;
}

export interface LoginAccount { 
    email: string;
    password: string;
}

export interface VerifyAccount {
    email: string;
}