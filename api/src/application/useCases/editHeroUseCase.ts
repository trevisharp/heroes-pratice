import { EditHeroDto, HeroDto } from "../../schemas/hero.schema";

export type EditHeroRequest = {
    id: string;
    hero: EditHeroDto;
};

export type EditHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export async function editHeroUseCase(request: EditHeroRequest): Promise<EditHeroResponse> {
    throw new Error("Not implemented");
}