import express from "express";
import morgan from "morgan"
import cors from "cors"

import { routes } from "./routes.js";
import "./database/index.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use('/api/clientes', routes);

app.listen(5555, () => {console.log("Server running on port 5555...")})

