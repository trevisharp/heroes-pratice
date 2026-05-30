import { HeroesDto } from "../../schemas/hero.schema";
import { Deps } from "../services/deps";

export type GetHeroesRequest = {
    search: string | undefined,
    cursor: string | undefined,
    limit: number
};

export type GetHeroesResponse =
    { success: true; notModified: false; heroes: HeroesDto; etag: string; } |
    { success: true; notModified: true; etag: string; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildGetHeroesUseCase = (deps: Deps) => 
    async (request: GetHeroesRequest): Promise<GetHeroesResponse> => {
        throw new Error("Not implemented");
    }