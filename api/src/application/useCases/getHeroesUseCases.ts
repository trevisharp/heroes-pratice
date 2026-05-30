import { HeroesDto } from "../../schemas/hero.schema";
import { HeroService } from "../services/hero.service";

export type GetHeroesRequest = {
    search: string | undefined,
    cursor: string | undefined,
    limit: number
};

export type GetHeroesResponse =
    { success: true; notModified: false; heroes: HeroesDto; etag: string; } |
    { success: true; notModified: true; etag: string; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildGetHeroesUseCase = (heroSerice: HeroService) => 
    async (request: GetHeroesRequest): Promise<GetHeroesResponse> => {
        throw new Error("Not implemented");
    }