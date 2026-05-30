import { HeroMockService } from "./infrastructure/heroService/heroMockService";
import { IdempotencyMockService } from "./infrastructure/idempotencyService/idempotencyMockService";
import { HeroController } from "./presentation/controllers/heroes.controller";

export const heroesController = new HeroController(
    new HeroMockService(),
    new IdempotencyMockService()
)
