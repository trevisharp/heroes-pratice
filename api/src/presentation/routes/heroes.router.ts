import { Router } from "express";
import { heroesController } from "../../container";

export const heroesRouter = Router();

heroesRouter.get("/", heroesController.getHeroes)
heroesRouter.get("/:id", heroesController.getHero)
heroesRouter.post("/", heroesController.createHero)
heroesRouter.patch("/:id", heroesController.editHero)
heroesRouter.delete("/:id", heroesController.deleteHero)