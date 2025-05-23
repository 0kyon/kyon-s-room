export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  image?: string;
  images?: string[];
  metadata?: Record<string, string>;
}; 