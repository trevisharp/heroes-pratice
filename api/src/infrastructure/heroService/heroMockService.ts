import { HeroService } from "../../application/services/hero.service";
import { HeroDto, HeroesDto } from "../../schemas/hero.schema";

export class HeroMockService implements HeroService {

    private heroes: HeroesDto = [];

    async getById(id: string): Promise<HeroDto | null> {
        const hero = this.heroes.find(h => h.id === id);

        if (!hero) {
            return null
        }

        return hero;
    }

    async search(search: string, cursor: string, limit: number): Promise<HeroesDto> {
        let result = this.heroes;
        if (search) {
            const normalized = search.toLowerCase();
            result = result.filter(
                h => h.name.toLowerCase().includes(normalized) ||
                     h.nickname.toLowerCase().includes(normalized)
            );
        }

        if (cursor) {
            result = result.filter(h => h.id < cursor);
        }

        return result.slice(0, limit);
    }

    async create(hero: HeroDto): Promise<HeroDto> {
        const exists = this.heroes.some(
            h => h.id === hero.id
        );

        if (exists) {
            throw new Error("Hero already exists");
        }

        this.heroes.push(hero);
        return hero;
    }

    async save(hero: HeroDto): Promise<HeroDto> {
        const index = this.heroes.findIndex(
            h => h.id === hero.id
        );

        if (index === -1) {
            throw new Error("Hero not found");
        }

        this.heroes[index] = hero;
        return hero;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.heroes.findIndex(
            h => h.id === id
        );

        if (index === -1) {
            return false;
        }

        this.heroes.splice(index, 1);
        return true;
    }
}