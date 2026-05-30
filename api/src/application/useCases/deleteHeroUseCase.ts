import { CreateHeroDto, EditHeroDto, HeroDto } from "../../schemas/hero.schema";
import { Deps } from "../services/deps";

export type DeleteHeroRequest = {
    id: string;
};

export type DeleteHeroResponse =
    { success: true; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildDeleteHeroUseCase = (deps: Deps) => 
    async (request: DeleteHeroRequest): Promise<DeleteHeroResponse> => {
        throw new Error("Not implemented");
    }