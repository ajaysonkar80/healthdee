// Location: server/utils/pagination.test.ts

import { describe, it, expect } from "vitest";
import { getPagination, getPaginationMeta, paginateArray } from "./pagination";

const makeUsers = (n: number) =>
  Array.from({ length: n }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }));

// ---------------------------------------------------------------------------
// getPagination
// ---------------------------------------------------------------------------
describe("getPagination", () => {
  it("uses defaults when called with no arguments", () => {
    expect(getPagination()).toEqual({
      page: 1,
      pageSize: 20,
      offset: 0,
      limit: 20,
    });
  });

  it("computes correct offset and limit for page 2 size 10", () => {
    const result = getPagination({ page: 2, pageSize: 10 });
    expect(result).toEqual({ page: 2, pageSize: 10, offset: 10, limit: 10 });
  });

  it("offset is 0 on page 1", () => {
    expect(getPagination({ page: 1, pageSize: 15 }).offset).toBe(0);
  });

  it("falls back to page 1 when page is 0", () => {
    expect(getPagination({ page: 0 }).page).toBe(1);
  });

  it("falls back to page 1 when page is negative", () => {
    expect(getPagination({ page: -99 }).page).toBe(1);
  });

  it("falls back to default pageSize when pageSize is 0", () => {
    expect(getPagination({ pageSize: 0 }).pageSize).toBe(20);
  });

  it("falls back to default pageSize when pageSize is negative", () => {
    expect(getPagination({ pageSize: -5 }).pageSize).toBe(20);
  });

  it("caps pageSize at 100", () => {
    expect(getPagination({ pageSize: 9999 }).pageSize).toBe(100);
  });

  it("exactly 100 is allowed", () => {
    expect(getPagination({ pageSize: 100 }).pageSize).toBe(100);
  });

  it("floors fractional page numbers", () => {
    expect(getPagination({ page: 2.9 }).page).toBe(2);
  });

  it("floors fractional pageSize", () => {
    expect(getPagination({ pageSize: 15.8 }).pageSize).toBe(15);
  });
});

// ---------------------------------------------------------------------------
// getPaginationMeta
// ---------------------------------------------------------------------------
describe("getPaginationMeta", () => {
  it("calculates totalPages correctly for 53 items at size 10", () => {
    const pagination = getPagination({ page: 1, pageSize: 10 });
    expect(getPaginationMeta(53, pagination).totalPages).toBe(6);
  });

  it("exactly divisible total gives correct page count", () => {
    const pagination = getPagination({ page: 1, pageSize: 10 });
    expect(getPaginationMeta(50, pagination).totalPages).toBe(5);
  });

  it("totalPages is at least 1 for empty list", () => {
    const pagination = getPagination({ page: 1, pageSize: 10 });
    const meta = getPaginationMeta(0, pagination);
    expect(meta.totalPages).toBe(1);
  });

  it("hasNextPage is true in the middle", () => {
    const pagination = getPagination({ page: 2, pageSize: 10 });
    expect(getPaginationMeta(53, pagination).hasNextPage).toBe(true);
  });

  it("hasNextPage is false on the last page", () => {
    const pagination = getPagination({ page: 6, pageSize: 10 });
    expect(getPaginationMeta(53, pagination).hasNextPage).toBe(false);
  });

  it("hasPreviousPage is false on page 1", () => {
    const pagination = getPagination({ page: 1, pageSize: 10 });
    expect(getPaginationMeta(53, pagination).hasPreviousPage).toBe(false);
  });

  it("hasPreviousPage is true on page 2+", () => {
    const pagination = getPagination({ page: 2, pageSize: 10 });
    expect(getPaginationMeta(53, pagination).hasPreviousPage).toBe(true);
  });

  it("mirrors page and pageSize from pagination input", () => {
    const pagination = getPagination({ page: 3, pageSize: 25 });
    const meta = getPaginationMeta(100, pagination);
    expect(meta.page).toBe(3);
    expect(meta.pageSize).toBe(25);
  });

  it("totalItems mirrors input", () => {
    const pagination = getPagination();
    expect(getPaginationMeta(99, pagination).totalItems).toBe(99);
  });

  it("single item fits on one page", () => {
    const pagination = getPagination({ page: 1, pageSize: 10 });
    const meta = getPaginationMeta(1, pagination);
    expect(meta.totalPages).toBe(1);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPreviousPage).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// paginateArray
// ---------------------------------------------------------------------------
describe("paginateArray", () => {
  it("returns correct slice for page 2 size 10", () => {
    const { data } = paginateArray(makeUsers(53), { page: 2, pageSize: 10 });
    expect(data.map((u) => u.id)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it("first item on page 1 is id 1", () => {
    const { data } = paginateArray(makeUsers(53), { page: 1, pageSize: 10 });
    expect(data[0].id).toBe(1);
  });

  it("returns partial last page (53 items ÷ 10 → 3 on page 6)", () => {
    const { data } = paginateArray(makeUsers(53), { page: 6, pageSize: 10 });
    expect(data).toHaveLength(3);
    expect(data[0].id).toBe(51);
    expect(data[2].id).toBe(53);
  });

  it("returns all items when pageSize exceeds total", () => {
    const { data } = paginateArray(makeUsers(5), { page: 1, pageSize: 100 });
    expect(data).toHaveLength(5);
  });

  it("returns empty data for an out-of-range page", () => {
    const { data } = paginateArray(makeUsers(10), { page: 99, pageSize: 10 });
    expect(data).toHaveLength(0);
  });

  it("meta.hasNextPage is false on out-of-range page", () => {
    const { meta } = paginateArray(makeUsers(10), { page: 99, pageSize: 10 });
    expect(meta.hasNextPage).toBe(false);
  });

  it("returns empty data and correct meta for empty array", () => {
    const { data, meta } = paginateArray([], { page: 1, pageSize: 10 });
    expect(data).toHaveLength(0);
    expect(meta.totalItems).toBe(0);
    expect(meta.totalPages).toBe(1);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPreviousPage).toBe(false);
  });

  it("works with default params", () => {
    const users = makeUsers(5);
    const { data, meta } = paginateArray(users);
    expect(data).toHaveLength(5);
    expect(meta.page).toBe(1);
    expect(meta.pageSize).toBe(20);
  });

  it("data + remaining items equals total", () => {
    const users = makeUsers(53);
    const pages = [1, 2, 3, 4, 5, 6].map(
      (page) => paginateArray(users, { page, pageSize: 10 }).data.length
    );
    expect(pages.reduce((a, b) => a + b, 0)).toBe(53);
  });
});