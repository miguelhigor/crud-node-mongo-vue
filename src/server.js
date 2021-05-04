import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import { routes } from "./routes.js";
import "./database/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use('/api/clientes', routes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
    })
}

app.listen( process.env.PORT || 5555, () => {console.log("Server is running...")});

