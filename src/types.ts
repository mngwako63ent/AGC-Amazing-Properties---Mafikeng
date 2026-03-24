import { Building2, TrendingUp, Key, HardHat } from 'lucide-react';
import React from 'react';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  description: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  features: string[];
  images?: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}
