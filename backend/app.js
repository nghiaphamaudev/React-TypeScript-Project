const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const laptopRouter = require('./routes/laptopRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const globalHandleError = require('./controllers/errorController');
const AppError = require('./utils/appError');

//Middleware
const app = express();
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(compression());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use('/api/v1/laptops', laptopRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      ` Can't find  ${req.originalUrl} not on this server. Try again!`,
      404
    )
  );
});

app.use(globalHandleError);

module.exports = app;
