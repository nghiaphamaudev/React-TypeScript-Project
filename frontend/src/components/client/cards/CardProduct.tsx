import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Products } from 'src/types/products';
import { Link } from 'react-router-dom';
import TextRating from 'src/components/ratings/rating';
import { useState } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useSnackbar } from 'src/contexts/Snackbar';

type CardProductProps = {
  product: Products;
};
const CardProduct = ({ product }: CardProductProps, key: number) => {
  const { showSnackbar } = useSnackbar();
  const [heart, setHeart] = useState<boolean>(false);
  const hanleClickHeart = () => {
    setHeart(() => !heart);
  };
  if (heart) {
    showSnackbar('success', 'Added product to favorite!');
  }
  return (
    <div>
      <div
        className="card rounded-lg border h-full border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 shadow-xl"
        key={key}
      >
        <div className="image-container h-56 w-full">
          <Link to={`/product/${product._id}`}>
            <img
              className="mx-auto w-full h-full object-cover dark:hidden"
              src={`/img/products/${product.coverImg}`}
            />
          </Link>
        </div>
        <div className="content pt-6">
          <div className="header mb-4 flex items-center justify-between gap-4">
            <span className="discount-tag me-2 rounded bg-sky-200 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              Up to 35% off
            </span>
            <div className="actions flex items-center justify-end gap-1">
              <Link
                to={`/product/${product._id}`}
                type="button"
                data-tooltip-target="tooltip-quick-look"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <VisibilityIcon fontSize="small" />
              </Link>

              <button
                onClick={hanleClickHeart}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {!heart ? (
                  <FavoriteBorderIcon fontSize="small" />
                ) : (
                  <FavoriteOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>
          <div
            style={{
              display: 'block',
              overflow: 'hidden',
              maxHeight: '3.6em',
              lineHeight: '1.8em',
            }}
          >
            <Link
              to={`/product/${product._id}`}
              className="product-name text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white block overflow-hidden text-ellipsis"
              style={{
                maxHeight: '3.6em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.name}, 1TB HDD, {product.monitor}, M3 Max
            </Link>
          </div>

          <div className="ratings mt-2 flex items-center gap-2">
            <div className="stars flex items-center">
              <TextRating value={product.ratingsAverage} />
            </div>
            <p className="rating-value text-sm font-medium text-gray-900 dark:text-white">
              {product.ratingsAverage}
            </p>
            <p className="rating-quantity text-sm font-medium text-gray-500 dark:text-gray-400">
              ({product.ratingsQuantity})
            </p>
          </div>
          <ul className="features mt-2 flex items-center gap-4">
            <li className="flex items-center gap-2">
              <LocalShippingIcon sx={{ fontSize: 15 }} />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Fast Delivery
              </p>
            </li>
            <li className="flex items-center gap-2">
              <LocalAtmIcon sx={{ fontSize: 15 }} />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Best Price
              </p>
            </li>
          </ul>
          <div className="price-and-cart mt-4 flex items-center justify-between gap-4">
            <p className="price text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
              ${product.price}
            </p>
            <Link
              to={`/product/${product._id}`}
              className="add-to-cart text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <AddShoppingCartIcon fontSize="small" />
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
