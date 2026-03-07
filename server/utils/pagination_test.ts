// server/utils/pagination_test.ts

import {
  getPagination,
  paginateArray,
} from "./pagination";

// Fake data
const users = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
}));

// --- getPagination ---
const pagination = getPagination({ page: 2, pageSize: 10 });

//console.log("Pagination:", pagination);
// { page: 2, pageSize: 10, offset: 10, limit: 10 }

// --- paginateArray ---
const { data, meta } = paginateArray(users, {
  page: 2,
  pageSize: 10,
});

//console.log("Data:", data.map((u) => u.id));
// [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

//console.log("Meta:", meta);
/*
{
  page: 2,
  pageSize: 10,
  totalItems: 53,
  totalPages: 6,
  hasNextPage: true,
  hasPreviousPage: true
}
*/
