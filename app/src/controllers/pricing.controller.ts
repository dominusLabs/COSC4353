import { Controller, Get, Param } from '@nestjs/common';
import { PricingService, Pricing } from '../services/pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  getAllPricing(): Pricing[] {
    return this.pricingService.getAllPricing();
  }

  @Get(':id')
  getPricingById(@Param('id') id: string): Pricing {
    return this.pricingService.getPricingById(id);
  }
}
