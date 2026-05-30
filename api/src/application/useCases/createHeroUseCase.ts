import { CreateHeroDto, HeroDto } from "../../schemas/hero.schema";
import { HeroService } from "../services/hero.service";
import { IdempotencyService } from "../services/idempotency.service";

export type CreateHeroRequest = {
    idempotencyKey?: string;
    hero: CreateHeroDto;
};

export type CreateHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "IDEMPOTENCY_CONFLICT"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildCreateHeroUseCase = (heroSerice: HeroService, idempotencyService: IdempotencyService) => 
    async (request: CreateHeroRequest): Promise<CreateHeroResponse> => {
        throw new Error("Not implemented");
    }