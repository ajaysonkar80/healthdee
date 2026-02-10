export interface RateLimitStore {
  incr(key: string, windowMs: number): Promise<number>;
}
