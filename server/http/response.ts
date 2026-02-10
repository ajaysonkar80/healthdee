import { NextResponse } from "next/server";

export type ErrorResponseOptions = {
  message: string;
  status?: number;
  code?: string;
};

export function success<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: meta ?? null,
    },
    { status: 200 }
  );
}

export function error({ message, status = 400, code }: ErrorResponseOptions) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
      },
    },
    { status }
  );
}

export function paginationMeta({
  page,
  limit,
  total,
}: {
  page: number;
  limit: number;
  total: number;
}) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
