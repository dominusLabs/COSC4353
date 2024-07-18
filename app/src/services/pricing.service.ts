import { Injectable } from '@nestjs/common';

export interface Pricing {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class PricingService {
  private prices: Pricing[] = [
    { id: '1', name: 'Free', price: 0 },
    { id: '2', name: 'Basic', price: 40 },
    { id: '3', name: 'Professional', price: 80 },
    { id: '4', name: 'Enterprise', price: 100 },
  ];

  getAllPricing(): Pricing[] {
    return this.prices;
  }

  getPricingById(id: string): Pricing {
    return this.prices.find(price => price.id === id);
  }
}