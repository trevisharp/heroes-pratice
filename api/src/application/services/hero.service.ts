import { HeroDto, HeroesDto } from "../../schemas/hero.schema";

export interface HeroService {
    getById(id: string): Promise<HeroDto | null>
    search(search: string, cursor: string, limit: number): Promise<HeroesDto>
    create(hero: HeroDto): Promise<HeroDto>
    save(hero: HeroDto): Promise<HeroDto>
    delete(id: string): Promise<boolean>
}