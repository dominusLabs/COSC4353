import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Pricing, CreatePricing, UpdatePricing } from '../interfaces/pricing.interface';

@Injectable()
export class PricingDBService {
    private serviceName: string = 'PricingDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async createPricing(pricing: CreatePricing) {
        try {
          const { data, error } = await this.supabaseClient.from('pricing').insert(pricing);
          if (error) {
            throw new Error(error.message);
          }
          return { success: true, data: data, error: null };
        } catch (error) {
          return { success: false, data: null, error: `Failed to create pricing - ${error.message}` };
        }
      }
    
      async updatePricing(id: string, pricing: UpdatePricing) {
        try {
          const { data, error } = await this.supabaseClient.from('pricing').update(pricing).eq('id', id);
          if (error) {
            throw new Error(error.message);
          }
          return { success: true, data: data, error: null };
        } catch (error) {
          return { success: false, data: null, error: `Failed to update pricing - ${error.message}` };
        }
      }
}

