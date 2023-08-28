import { Transaction, User } from "@prisma/client";

type CustomFetchProps = {
  url: string;
  method: "POST" | "GET" | "PUT" | "PATCH";
  body?: Partial<User> | Partial<Transaction>;
  cache?: RequestCache;
  json?: boolean;
};
export const customFetch = async ({
  url,
  method,
  body,
  cache = "force-cache",
  json = true,
}: CustomFetchProps) => {
  const res = await fetch(url, {
    method,
    // adds a body and sets it to body if body is truthy otherwise it wont add body
    ...(body && { body: JSON.stringify(body) }),
    cache,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // handle error
    throw new Error("API error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: Partial<User>) => {
  return customFetch({
    url: "/api/register",
    method: "POST",
    body: user,
    json: true,
  });
};

export const updateUser = async (user: Partial<User>) => {
  return customFetch({
    url: "/api/updateuser",
    method: "PUT",
    body: user,
    json: true,
  });
};

export const signin = async (user: Partial<User>) => {
  return customFetch({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: true,
  });
};
export const signout = async () => {
  return customFetch({
    url: "/api/signout",
    method: "POST",
    json: false,
  });
};

export const getTransactionsData = async (from?: string, to?: string) => {
  let apiURL = "/api/transactions";
  if (from && to) {
    apiURL += `?from=${from}&to=${to}`;
  }
  return customFetch({
    url: apiURL,
    method: "GET",
    json: true,
    cache: "no-store",
  });
};

export const addTransaction = async (transaction: Partial<Transaction>) => {
  return customFetch({
    url: "/api/transactions",
    method: "POST",
    body: transaction,
    json: true,
    cache: "no-store",
  });
};
