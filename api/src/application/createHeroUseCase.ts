import { CreateHeroDto, HeroDto } from "../schemas/hero.schema";

export type CreateHeroRequest = {
    idempotencyKey?: string;
    hero: CreateHeroDto;
};

export type CreateHeroResponse =
    { success: true; hero: HeroDto; } |
    { success: false; error: "IDEMPOTENCY_CONFLICT"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export async function createHeroUseCase(request: CreateHeroRequest): Promise<CreateHeroResponse> {
    throw new Error("Not implemented");
}