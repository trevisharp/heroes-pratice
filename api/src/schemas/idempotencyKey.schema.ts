import { z } from "zod";

export const IdempotencyKeySchema = z.object({
    "idempotency-key": z
        .uuid()
        .optional()
})