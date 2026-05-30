import { CreateHeroDto, EditHeroDto, HeroDto } from "../../schemas/hero.schema";
import { HeroService } from "../services/hero.service";

export type DeleteHeroRequest = {
    id: string;
};

export type DeleteHeroResponse =
    { success: true; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildDeleteHeroUseCase = (heroSerice: HeroService) => 
    async (request: DeleteHeroRequest): Promise<DeleteHeroResponse> => {
        throw new Error("Not implemented");
    }