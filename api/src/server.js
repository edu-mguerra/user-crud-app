import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from "./routers";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}/`);
});
