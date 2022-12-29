import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* CONFIGURATION */
dotenv.config(); // allows you to use env variables, standard across all projects in javascript
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000; // process.env allows you to access env variables and give backup port 9000
// console.log(PORT);
// console.log(process.env);
mongoose.set('strictQuery', true); // warning for mongoose prevented with this because of change with Mongoose 7

// Below code for mongoose .connect .then .catch is for connecting to our database, remember this syntax for future connections
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
  .catch((error) => console.log(`${error} did not connect`));