// This functions will be used to slow down API calls
export const delay = (time: number) =>
  new Promise((res) => {
    setTimeout(() => res(1), time);
  });
