import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { grey, yellow } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Products } from 'src/types/products';
import { Link } from 'react-router-dom';

type CardProductProps = {
  product: Products;
};
const CardProduct = ({ product }: CardProductProps, key: number) => {
  const arrayStar = [1, 2, 3, 4, 5];

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
              src={product.coverImg}
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
              <div
                id="tooltip-quick-look"
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                data-popper-placement="top"
              >
                Quick look
                <div className="tooltip-arrow" data-popper-arrow="" />
              </div>
              <button
                type="button"
                data-tooltip-target="tooltip-add-to-favorites"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only"> Add to Favorites </span>
                <FavoriteBorderIcon fontSize="small" />
              </button>
              <div
                id="tooltip-add-to-favorites"
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                data-popper-placement="top"
              >
                Add to favorites
                <div className="tooltip-arrow" data-popper-arrow="" />
              </div>
            </div>
          </div>
          <a
            href="#"
            className="product-name text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
          >
            {product.name}, 1TB HDD, {product.monitor}, M3 Max
          </a>
          <div className="ratings mt-2 flex items-center gap-2">
            <div className="stars flex items-center">
              {arrayStar.map((currentValue, index) => {
                if (
                  product?.ratingsAverage &&
                  Math.round(product?.ratingsAverage) > currentValue
                )
                  return (
                    <StarIcon
                      key={index}
                      fontSize="small"
                      sx={{ color: yellow[700] }}
                    />
                  );
                return (
                  <StarIcon
                    fontSize="small"
                    key={index}
                    sx={{ color: grey[500] }}
                  />
                );
              })}
            </div>
            <p className="rating-value text-sm font-medium text-gray-900 dark:text-white">
              {product.ratingsAverage && Math.round(product.ratingsAverage)}
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
            <p className="price text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
              ${product.price}
            </p>
            <button
              type="button"
              className="add-to-cart text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <AddShoppingCartIcon fontSize="small" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
