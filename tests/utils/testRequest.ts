import { NextRequest } from "next/server";

export function createRequest({
  method = "POST",
  body,
  headers = {},
}: {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}) {
  return new NextRequest("http://localhost/api/", {
    method,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}