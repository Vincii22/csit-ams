export function clearSearchParams(...keys: string[]) {
  const url = new URL(window.location.href);
  keys.forEach((key) => url.searchParams.delete(key));
  window.history.replaceState({}, "", url.toString());
}

export function clearAllSearchParams() {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, "", url.toString());
}
