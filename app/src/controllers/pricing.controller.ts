import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { Pricing, CreatePricing, UpdatePricing } from '../libs/interfaces/pricing.interface';
import { PricingService } from '../services/pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  async createPricing(@Body() pricing: CreatePricing): Promise<any> {
    return this.pricingService.createPricing(pricing);
  }

  @Put(':id')
  async updatePricing(@Param('id') id: string, @Body() pricing: UpdatePricing): Promise<any> {
    return this.pricingService.updatePricing(id, pricing);
  }
}
