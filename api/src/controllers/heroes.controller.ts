import z from "zod";
import { Request, Response } from "express";
import { IdempotencyKeySchema } from "../schemas/idempotencyKey.schema";
import { CreateHeroSchema } from "../schemas/hero.schema";
import { createHeroUseCase } from "../application/createHeroUseCase";
import { IdSchema } from "../schemas/id.schema";
import { getHeroUseCase } from "../application/getHeroUseCase";

export async function getHeroes(req: Request, res: Response) {
    res.status(501).end()
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
        id: headerResult.data["id"]
    });
    
    if (!result.success) {
        switch (result.error) {
            case "NOT_FOUND":
                return res.status(404);

            default:
                return res.status(500);
        }
    }

    return res
        .status(201)
        .json(result.hero);
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
                return res.status(409);

            default:
                return res.status(500);
        }
    }

    return res
        .status(201)
        .json(result.hero);
}

export async function editHero(req: Request, res: Response) {
    res.status(501).end()
}

export async function deleteHero(req: Request, res: Response) {
    res.status(501).end()
}