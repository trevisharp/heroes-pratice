import { EditHeroDto, HeroDto } from "../../schemas/hero.schema";
import { HeroService } from "../services/hero.service";

export type EditHeroRequest = {
    id: string;
    hero: EditHeroDto;
};

export type EditHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export const buildEditHeroUseCase = (heroSerice: HeroService) => 
    async (request: EditHeroRequest): Promise<EditHeroResponse> => {
        throw new Error("Not implemented");
    }