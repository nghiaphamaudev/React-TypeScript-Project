import { Products } from 'src/types/products';
import CardProduct from '../cards/CardProduct';
type categoryProductProps = {
  products: Products[];
  category: string;
};
const categoryProduct = ({ products, category }: categoryProductProps) => {
  return (
    <div>
      <h2 className="mt-3 text-xl mb-4 ml-1 font-semibold text-gray-900 dark:text-white sm:text-2xl">
        {category}
      </h2>
      <div className="mb-12 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => {
          return <CardProduct product={product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default categoryProduct;
