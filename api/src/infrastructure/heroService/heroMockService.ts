import { HeroService } from "../../application/services/hero.service";
import { HeroDto, HeroesDto } from "../../schemas/hero.schema";

export class heroMockService implements HeroService {
    getById(id: string): Promise<HeroDto> {
        throw new Error("Method not implemented.");
    }
    search(search: string, cursor: string, limit: number): Promise<HeroesDto> {
        throw new Error("Method not implemented.");
    }
    create(hero: HeroDto): Promise<HeroDto> {
        throw new Error("Method not implemented.");
    }
    save(hero: HeroDto): Promise<HeroDto> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}