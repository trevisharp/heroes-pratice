import { Router } from "express";
import { createHero, deleteHero, editHero, getHeroes } from "../controllers/heroes.controller";

export const heroesRouter = Router();

heroesRouter.get("/", getHeroes)
heroesRouter.get("/:id", getHeroes)
heroesRouter.post("/", createHero)
heroesRouter.patch("/:id", editHero)
heroesRouter.delete("/:id", deleteHero)