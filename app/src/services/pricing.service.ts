import { Injectable } from '@nestjs/common';
import { Pricing, CreatePricing, UpdatePricing } from '../libs/interfaces/pricing.interface';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class PricingService {
  constructor(
    private supabaseService: SupabaseService,
  ) {}

  async createPricing(pricing: CreatePricing): Promise<any> {
    try {
      const { success, data, error } = await this.supabaseService.PricingDBService.createPricing(pricing);
      if (!success) {
        return { status: 400, message: error };
      }
      return { status: 200, data: data, message: "Pricing created successfully" };
    } catch (error) {
      return { status: 500, message: `Failed to create pricing - ${error.message}` };
    }
  }

  async updatePricing(id: string, pricing: UpdatePricing): Promise<any> {
    try {
      const { success, data, error } = await this.supabaseService.PricingDBService.updatePricing(id, pricing);
      if (!success) {
        return { status: 400, message: error };
      }
      return { status: 200, data: data, message: "Pricing updated successfully" };
    } catch (error) {
      return { status: 500, message: `Failed to update pricing - ${error.message}` };
    }
  }
}