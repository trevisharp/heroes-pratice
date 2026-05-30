import { HeroDto } from "../../schemas/hero.schema";
import { Deps } from "../services/deps";

export type GetHeroRequest = {
    id: string
};

export type GetHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildGetHeroUseCase = (deps: Deps) => 
    async (request: GetHeroRequest): Promise<GetHeroResponse> => {
        throw new Error("Not implemented");
    }