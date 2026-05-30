import { HeroDto } from "../schemas/hero.schema";

export type GetHeroRequest = {
    id: string
};

export type GetHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export async function getHeroUseCase(request: GetHeroRequest): Promise<GetHeroResponse> {
    throw new Error("Not implemented");
}