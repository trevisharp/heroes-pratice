import { z } from "zod";

export const HeroSchema = z.object({
	id: z.uuid(),
    name: z.string().min(3).max(64),
	nickname: z.string().min(1).max(32),
	date_of_birth: z.iso.datetime(),
	universe: z.string().min(3).max(32),
	main_power: z.string().min(3).max(256),
	avatar_url: z.url(),
	is_active: z.boolean(),
	created_at: z.iso.datetime(),
	updated_at: z.iso.datetime()
})

export const HeroesSchema = z.array(HeroSchema)

export const UpdateHeroSchema = z.object({
    name: z.string().min(3).max(64).optional(),
	nickname: z.string().min(1).max(32).optional(),
	date_of_birth: z.iso.datetime().optional(),
	universe: z.string().min(3).max(32).optional(),
	main_power: z.string().min(3).max(256).optional(),
	avatar_url: z.url().optional(),
	is_active: z.boolean().optional()
})

export const CreateHeroSchema = z.object({
    name: z.string().min(3).max(64),
	nickname: z.string().min(1).max(32),
	date_of_birth: z.iso.datetime(),
	universe: z.string().min(3).max(32),
	main_power: z.string().min(3).max(256),
	avatar_url: z.url(),
});

export type HeroDto = z.infer<typeof HeroSchema>;
export type HeroesDto = z.infer<typeof HeroesSchema>;
export type CreateHeroDto = z.infer<typeof CreateHeroSchema>;