import { Controller, Get } from '@nestjs/common';
import { PricingService } from '../services/pricing.service';


@Controller("/api/pricing")
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get("/")
  getHello(): string {
    return this.pricingService.getHello();
  }
}
