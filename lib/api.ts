import { Transaction, User } from "@prisma/client";

type CustomFetchProps = {
  url: string;
  method: "POST" | "GET" | "PUT" | "PATCH";
  body?: Partial<User> | Partial<Transaction>;
  json?: boolean;
};
export const customFetch = async ({
  url,
  method,
  body,
  json = true,
}: CustomFetchProps) => {
  const res = await fetch(url, {
    method,
    // adds a body and sets it to body if body is truthy otherwise it wont add body
    ...(body && { body: JSON.stringify(body) }),
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
    return data.data;
  }
};

export const register = async (user: Partial<User>) => {
  return customFetch({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user: Partial<User>) => {
  return customFetch({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};
export const signout = async () => {
  return customFetch({
    url: "/api/signout",
    method: "POST",
    json: false,
  });
};
