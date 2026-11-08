// Saves a preference as a cookie so the SERVER can read it and render the right
// <html data-theme / data-palette> on every page load, including after a language switch.
const ONE_YEAR = 60 * 60 * 24 * 365;

export function setPref(name: string, value: string | null) {
  document.cookie =
    value === null
      ? `${name}=; path=/; max-age=0; samesite=lax`
      : `${name}=${value}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
