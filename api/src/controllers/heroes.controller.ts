import z from "zod";
import { Request, Response } from "express";
import { IdempotencyKeySchema } from "../schemas/idempotencyKey.schema";
import { CreateHeroSchema, UpdateHeroSchema } from "../schemas/hero.schema";
import { buildCreateHeroUseCase } from "../application/useCases/createHeroUseCase";
import { IdSchema } from "../schemas/id.schema";
import { buildGetHeroUseCase } from "../application/useCases/getHeroUseCase";
import { PaginationSchema } from "../schemas/pagination.schema";
import { buildGetHeroesUseCase } from "../application/useCases/getHeroesUseCases";
import { buildEditHeroUseCase } from "../application/useCases/editHeroUseCase";
import { buildDeleteHeroUseCase } from "../application/useCases/deleteHeroUseCase";
import { HeroMockService } from "../infrastructure/heroService/heroMockService";
import { IdempotencyMockService } from "../infrastructure/idempotencyService/idempotencyMockService";

const deps = {
    heroService: new HeroMockService(),
    idempotencyService: new IdempotencyMockService()
}

const getHeroUseCase = buildGetHeroUseCase(deps)
const getHeroesUseCase = buildGetHeroesUseCase(deps)
const createHeroUseCase = buildCreateHeroUseCase(deps)
const editHeroUseCase = buildEditHeroUseCase(deps)
const deleteHeroUseCase = buildDeleteHeroUseCase(deps)

export async function getHeroes(req: Request, res: Response) {
    const queryResult = PaginationSchema.safeParse(req.query);
    if (!queryResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(queryResult.error)
            }
        });
    }

    const result = await getHeroesUseCase({
        search: queryResult.data.search,
        cursor: queryResult.data.cursor,
        limit: queryResult.data.limit
    })
    
    if (!result.success) {
        return res.status(500).end();
    }

    if (result.notModified) {
        res.setHeader("ETag", result.etag);
        return res.status(304).end();
    }

    res.setHeader("ETag", result.etag);
    res.setHeader("Cache-Control", "public, max-age=900");

    return res.status(200).json(result.heroes);
}

export async function getHero(req: Request, res: Response) {
    const headerResult = IdSchema.safeParse(req.headers);
    if (!headerResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(headerResult.error)
            }
        });
    }

    const result = await getHeroUseCase({
        id: headerResult.data.id
    });
    
    if (!result.success) {
        switch (result.error) {
            case "NOT_FOUND":
                return res.status(404).end();

            default:
                return res.status(500).end();
        }
    }

    return res.status(200).json(result.hero);
}

export async function createHero(req: Request, res: Response) { 
    const headerResult = IdempotencyKeySchema.safeParse(req.headers);
    if (!headerResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(headerResult.error)
            }
        });
    }

    const bodyResult = CreateHeroSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(bodyResult.error)
            }
        });
    }

    const result = await createHeroUseCase({
        idempotencyKey: headerResult.data["idempotency-key"],
        hero: bodyResult.data
    });
    
    if (!result.success) {
        switch (result.error) {
            case "IDEMPOTENCY_CONFLICT":
                return res.status(409).end();

            default:
                return res.status(500).end();
        }
    }

    return res.status(201).json(result.hero);
}

export async function editHero(req: Request, res: Response) {
    const headerResult = IdSchema.safeParse(req.headers);
    if (!headerResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(headerResult.error)
            }
        });
    }

    const bodyResult = UpdateHeroSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(bodyResult.error)
            }
        });
    }

    const result = await editHeroUseCase({
        id: headerResult.data.id,
        hero: bodyResult.data
    })
    
    if (!result.success) {
        switch (result.error) {
            case "NOT_FOUND":
                return res.status(404).end();

            default:
                return res.status(500).end();
        }
    }

    return res.status(200).json(result.hero);
}

export async function deleteHero(req: Request, res: Response) {
    const headerResult = IdSchema.safeParse(req.headers);
    if (!headerResult.success) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                fields: z.flattenError(headerResult.error)
            }
        });
    }

    const result = await deleteHeroUseCase({
        id: headerResult.data.id
    })
    
    if (!result.success) {
        switch (result.error) {
            case "NOT_FOUND":
                return res.status(404).end();

            default:
                return res.status(500).end();
        }
    }

    return res.status(200).end();
}