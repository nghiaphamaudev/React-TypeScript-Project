const connectDB = require('./config/db.config');
require('dotenv').config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE;
const PORT = process.env.PORT;

connectDB(DB);

app.listen(PORT, () => {
  console.log(`The server is listening at ${PORT}...`);
});
