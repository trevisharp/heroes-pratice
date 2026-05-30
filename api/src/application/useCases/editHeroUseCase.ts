import { CreateHeroDto, EditHeroDto, HeroDto } from "../../schemas/hero.schema";

export type CreateHeroRequest = {
    id: string;
    hero: EditHeroDto;
};

export type CreateHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export async function editHeroUseCase(request: CreateHeroRequest): Promise<CreateHeroResponse> {
    throw new Error("Not implemented");
}