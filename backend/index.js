import express from 'express';
import { connectDb } from './db/connectDb.js';
import dotenv from 'dotenv';
import cors  from 'cors';
import path  from 'path';
import router from './routers/mainRoute.js';
const app = express();
dotenv.config();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT || 5000;
const __dirname = path.resolve();
app.use("/v1", router);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
// app.use("/");

app.listen(PORT,()=>{
    connectDb()
    console.log("Server started on port:",PORT);
});

