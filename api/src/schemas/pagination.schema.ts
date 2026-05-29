import { z } from "zod";

export const PaginationSchema = z.object({
    search: z.string().trim().min(1).optional(),
    cursor: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(100)
        .default(20).describe("min data (2026-01-01T00:00:00Z_150 format) of retreived data.")
})