import express from "express";
import {
  registerAgentController,
  loginAgentController,
} from "../controllers/agents.controller.js";

const router = express.Router();

router.post("/register", registerAgentController);
router.post("/login", loginAgentController);


export default router;
