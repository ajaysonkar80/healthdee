// server/utils/pagination.ts

/**
 * Input parameters for pagination
 */
export type PaginationParams = {
  page?: number;
  pageSize?: number;
};

/**
 * Normalized pagination state
 */
export type PaginationResult = {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
};

/**
 * Metadata returned alongside paginated results
 */
export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

/**
 * Default limits
 */
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

/**
 * Normalize pagination params into offset/limit form
 * (perfect for SQL, Prisma, Drizzle, etc.)
 */
export function getPagination(
  params: PaginationParams = {}
): PaginationResult {
  const page =
    params.page && params.page > 0 ? Math.floor(params.page) : DEFAULT_PAGE;

  const pageSize =
    params.pageSize && params.pageSize > 0
      ? Math.min(Math.floor(params.pageSize), MAX_PAGE_SIZE)
      : DEFAULT_PAGE_SIZE;

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return {
    page,
    pageSize,
    offset,
    limit,
  };
}

/**
 * Build pagination metadata from total item count
 */
export function getPaginationMeta(
  totalItems: number,
  pagination: PaginationResult
): PaginationMeta {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pagination.pageSize)
  );

  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    totalItems,
    totalPages,
    hasNextPage: pagination.page < totalPages,
    hasPreviousPage: pagination.page > 1,
  };
}

/**
 * Convenience helper for paginating in-memory arrays
 */
export function paginateArray<T>(
  items: T[],
  params: PaginationParams = {}
): {
  data: T[];
  meta: PaginationMeta;
} {
  const pagination = getPagination(params);

  const data = items.slice(
    pagination.offset,
    pagination.offset + pagination.limit
  );

  const meta = getPaginationMeta(items.length, pagination);

  return { data, meta };
}
