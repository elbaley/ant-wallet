import { Transaction, User } from "@prisma/client";

type CustomFetchProps = {
  url: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
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
    const { error } = await res.json();
    console.log("RES IS NOT OK API");
    console.log(error);
    throw new Error(error.message);
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

export const updateTransaction = async (transaction: Partial<Transaction>) => {
  return customFetch({
    url: "/api/transactions",
    method: "PUT",
    body: transaction,
    json: true,
    cache: "no-store",
  });
};
export const deleteTransaction = async (transaction: Partial<Transaction>) => {
  return customFetch({
    url: "/api/transactions",
    method: "DELETE",
    body: transaction,
    json: true,
    cache: "no-store",
  });
};
