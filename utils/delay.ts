export function delay(func: () => void, milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      func();
      resolve("resloved!"); // Resolving the promise after the specified delay
    }, milliseconds);
  });
}
