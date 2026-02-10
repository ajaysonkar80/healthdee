import { RateLimitStore } from "./store";

type Entry = {
  count: number;
  resetAt: number;
};

export class MemoryRateLimitStore implements RateLimitStore {
  private store = new Map<string, Entry>();

  async incr(key: string, windowMs: number): Promise<number> {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || entry.resetAt <= now) {
      this.store.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      return 1;
    }

    entry.count += 1;
    return entry.count;
  }
}
