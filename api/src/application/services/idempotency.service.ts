export enum IdempotencyResult {
    New, Replay, Conflict
}

export interface IdempotencyService {
    begin(key: string, reqHash: string): Promise<IdempotencyResult>
    complete(key: string, response: unknown): Promise<void>
    getStoredResponse(key: string): Promise<unknown>
}