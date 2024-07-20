export interface Pricing {
    id: string;
    name: string;
    price: number;
  }
  
  export interface CreatePricing {
    name: string;
    price: number;
  }
  
  export interface UpdatePricing {
    id: string;
    name?: string;
    price?: number;
  }  