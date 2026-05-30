import { CreateHeroDto, EditHeroDto, HeroDto } from "../../schemas/hero.schema";

export type DeleteHeroRequest = {
    id: string;
};

export type DeleteHeroResponse =
    { success: true; } |
    { success: false; error: "NOT_FOUND"; } |
    { success: false; error: "INTERNAL_ERROR"; };

export async function deleteHeroUseCase(request: DeleteHeroRequest): Promise<DeleteHeroResponse> {
    throw new Error("Not implemented");
}