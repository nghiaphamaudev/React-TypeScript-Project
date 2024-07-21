export interface Cart {
  _id: string;
  user: string;
  orderItems: [
    {
      product: {
        coverImg: string;
        monitor: string;
        name: string;
        version: number;
        id: string;
        ratingsAverage: number;
      };
      price: number;
      quantity: number;
    }
  ];
}
