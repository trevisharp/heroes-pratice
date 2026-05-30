import { HeroDto } from "../../schemas/hero.schema";
import { HeroService } from "../services/hero.service";

export type GetHeroRequest = {
    id: string
};

export type GetHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildGetHeroUseCase = (heroSerice: HeroService) => 
    async (request: GetHeroRequest): Promise<GetHeroResponse> => {
        throw new Error("Not implemented");
    }