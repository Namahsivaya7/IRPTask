import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/productRoute.js";
import cors from "cors";
// import multer from "multer";

//used for upload files
// const upload = multer({ dest: "uploads/" });
//configure env
dotenv.config();

//rest object
const app = express();
//database config
connectDB();
//middlewares
app.use(cors());
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public"));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductRoutes);
//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome To andhari shop</h1>");
});

// app.post("/upload", upload.single("photo"), (req, res) => {
//   const photo = req.files.photo;
//   if (!photo) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

// Handle the uploaded file
//   const uploadPath = __dirname + "/uploads/" + photo.originalname;
//   photo.mv(uploadPath, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Failed to upload file" });
//     }
//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", path: uploadPath });
//   });
// });

const p = process.env.DEV_MODE;
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running ${p} on ${PORT}`);
});
