export interface ProductCart {
  slug: string;
  name: string;
  productImage: string;
  price: number;
  quantity: number;
  added?: boolean;
  category: string;
}
