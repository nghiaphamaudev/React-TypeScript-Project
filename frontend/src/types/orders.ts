export interface Order {
  _id: string;
  user: string;
  name: string;
  phone: string;
  address: string;
  payment: string;
  products: Product[];
  createdAt: string;
  totalOrder: number;
}

export interface Product {
  product: DetailProduct;
  quantity: number;
  price: number;
  _id: string;
  id: string;
}

export interface DetailProduct {
  _id: string;
  name: string;
  coverImg: string;
  summary: string;
  category: Category;
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  id: string;
}
