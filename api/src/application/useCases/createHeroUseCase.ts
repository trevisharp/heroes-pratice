import { CreateHeroDto, HeroDto } from "../../schemas/hero.schema";
import { Deps } from "../services/deps";

export type CreateHeroRequest = {
    idempotencyKey?: string;
    hero: CreateHeroDto;
};

export type CreateHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "IDEMPOTENCY_CONFLICT"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildCreateHeroUseCase = (deps: Deps) => 
    async (request: CreateHeroRequest): Promise<CreateHeroResponse> => {
        throw new Error("Not implemented");
    }