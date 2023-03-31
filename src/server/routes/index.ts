import * as express from "express";
import chirpsRouter from "./chirps";

let router = express.Router();

router.use('/chirps', chirpsRouter);

export default router;