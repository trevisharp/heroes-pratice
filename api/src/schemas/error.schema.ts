import { z } from "zod";

export const ValidationErrorSchema = z.object({
    error: z.object({
        code: z.literal(
            "VALIDATION_ERROR"
        ),
        message: z.string(),
        fields: z.record(
            z.string(),
            z.array(z.string()).optional()
        )
    })
});