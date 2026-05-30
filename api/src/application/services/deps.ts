import { HeroService } from "./hero.service"
import { IdempotencyService } from "./idempotency.service"

export type Deps = {
    heroService: HeroService,
    idempotencyService: IdempotencyService
}