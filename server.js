import express from "express";

import dotenv from 'dotenv';
import morgan  from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/productRoute.js"
import cors from 'cors';
//configure env
dotenv.config();
//rest object
const app=express();
//database config
connectDB();
//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",CategoryRoutes);
app.use("/api/v1/product",ProductRoutes)
//rest api
app.get("/",(req,res)=>{
    res.send("<h1>welcome To andhari shop</h1>");
})

const p=process.env.DEV_MODE;
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server running ${p} on ${PORT}`);

});
