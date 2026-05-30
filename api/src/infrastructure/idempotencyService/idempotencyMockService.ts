import { IdempotencyResult, IdempotencyService } from "../../application/services/idempotency.service";

type Entry = {
    requestHash: string;
    completed: boolean;
    response?: unknown;
};

export class IdempotencyMockService implements IdempotencyService {

    private entries = new Map<string, Entry>();

    async begin(key: string, reqHash: string): Promise<IdempotencyResult> {
        const existing = this.entries.get(key);

        if (!existing) {
            this.entries.set(key, {
                requestHash: reqHash, completed: false
            });
            return IdempotencyResult.New
        }

        if (existing.requestHash !== reqHash) {
            return IdempotencyResult.Conflict
        }

        if (existing.completed) {
            return IdempotencyResult.Replay
        }

        return IdempotencyResult.Conflict
    }

    async complete(key: string, response: unknown): Promise<void> {
        const existing = this.entries.get(key);
        if (!existing) {
            throw new Error(
                `Unknown idempotency key: ${key}`
            );
        }

        existing.completed = true;
        existing.response = response;
    }

    async getStoredResponse(key: string): Promise<unknown> {
        return this.entries.get(key)?.response;
    }
}