import { HeroesDto } from "../../schemas/hero.schema";

export type GetHeroesRequest = {
    search: string | undefined,
    cursor: string | undefined,
    limit: number
};

export type GetHeroesResponse =
    { success: true; notModified: false; heroes: HeroesDto; etag: string; } |
    { success: true; notModified: true; etag: string; } |
    { success: false; error: "INTERNAL_ERROR"; };

export async function getHeroesUseCase(request: GetHeroesRequest): Promise<GetHeroesResponse> {
    throw new Error("Not implemented");
}