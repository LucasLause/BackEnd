import { Router } from "express";
import { purchaseCart } from "../controllers/purchases.controller.js";


export const purchasesRouter = Router()


purchasesRouter.post('/:cid', purchaseCart)
