// This functions will be used to slow down API calls on localhost
export const delay = (time: number) =>
  new Promise((res) => {
    setTimeout(() => res(1), time);
  });
