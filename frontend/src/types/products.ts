export interface Products {
  _id: string;
  name: string;
  monitor: string;
  price: number;
  ratingsAverage: number | undefined;
  ratingsQuantity: number | undefined;
  coverImg: string;
  images: [string];
  priceDiscount: number;
  version: number;
  summary: string;
  description: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string | null;
    _id: string;
  };
}
