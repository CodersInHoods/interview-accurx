export function debounce(func: any, timeout = 300) {
  let timer = setTimeout(() => {
    clearTimeout(timer);
    // @ts-ignore
    func.apply(this);
  }, timeout);
}
