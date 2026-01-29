export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  area: string;
  phone: string;
  whatsapp?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  images?: string[];
  features?: string[];
  openingHours?: {
    [key: string]: string;
  };
  verified?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

