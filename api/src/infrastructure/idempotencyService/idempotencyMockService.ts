import { IdempotencyResult, IdempotencyService } from "../../application/services/idempotency.service";

export class IdempotencyMockService implements IdempotencyService {
    begin(key: string, reqHash: string): Promise<IdempotencyResult> {
        throw new Error("Method not implemented.");
    }
    complete(key: string, response: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getStoredResponse(key: string): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

}