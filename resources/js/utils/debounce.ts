export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: NodeJS.Timeout | null = null;

  return function (this: any, arg: any, ...args: any[]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, [arg, ...args]);
    }, delay);
  } as T;
}

