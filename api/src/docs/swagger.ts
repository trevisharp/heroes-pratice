import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { CreateHeroSchema, HeroesSchema, HeroSchema, UpdateHeroSchema } from "../schemas/hero.schema";
import { IdempotencyKeySchema } from "../schemas/idempotencyKey.schema";
import { ValidationErrorSchema } from "../schemas/error.schema";
import { PaginationSchema } from "../schemas/pagination.schema";
import { IdSchema } from "../schemas/id.schema";

const registry = new OpenAPIRegistry();

registry.registerPath({
    method: "get",
    path: "/heroes/{id}",
    tags: ["Heroes"],
    summary: "Returns a specific hero data",
    request: {
        params: IdSchema
    },
    responses: {
        200: {
            description: "Hero retrived",
            content: {
                "application/json": {
                    schema: HeroSchema
                }
            }
        },
        404: {
            description: "Hero not found"
        }
    }
})

registry.registerPath({
    method: "get",
    path: "/heroes",
    tags: ["Heroes"],
    summary: "Returns a paginated list of heroes",
    request: {
        query: PaginationSchema
    },
    responses: {
        200: {
            description: "Heroes retrived",
            headers: {
                "Cache-Control": {
                    schema: { type: "string" },
                    description: "Caching policy",
                    example: "public, max-age=60"
                },
                "ETag": {
                    schema: { type: "string" },
                    description: "Entity version identifier",
                    example: "\"heroes-v1-abc123\""
                }
            },
            content: {
                "application/json": {
                    schema: HeroesSchema
                }
            }
        },
        304: { 
            description: "Not modified"
        }
    }
});

registry.registerPath({
    method: "post",
    path: "/heroes",
    tags: ["Heroes"],
    summary: "Create a new hero",
    request: {
        headers: IdempotencyKeySchema,
        body: {
            content: {
                "application/json": {
                    schema: CreateHeroSchema
                }
            }
        }
    },
    responses: {
        201: {
            description: "Hero created",
            content: {
                "application/json": {
                    schema: HeroSchema
                }
            }
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: ValidationErrorSchema
                }
            }
        },
        409: {
            description: "Conflicting idempotency request"
        }
    }
});

registry.registerPath({
    method: "patch",
    path: "/heroes/{id}",
    tags: ["Heroes"],
    summary: "Update a hero info",
    request: {
        params: IdSchema,
        body: {
            content: {
                "application/json": {
                    schema: UpdateHeroSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Hero updated",
            content: {
                "application/json": {
                    schema: HeroSchema
                }
            }
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: ValidationErrorSchema
                }
            }
        },
    }
})

registry.registerPath({
    method: "delete",
    path: "/heroes/{id}",
    tags: ["Heroes"],
    summary: "Delete a hero",
    request: {
        params: IdSchema
    },
    responses: {
        204: {
            description: "Hero deleted"
        },
        404: {
            description: "Hero not found"
        },
    }
})

const generator =
    new OpenApiGeneratorV3(
        registry.definitions
    );

export const openApiDocument =
    generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Heroes API",
            version: "1.0.0"
        }
    });