export function changeBrandCssVar(name: string, colorName: string) {
  const style = document.documentElement.style
  style.setProperty(`--color-b-${name}`, `var(--color-${colorName}-6)`)
  style.setProperty(`--color-b-${name}-hover`, `var(--color-${colorName}-5)`)
  style.setProperty(`--color-b-${name}-active`, `var(--color-${colorName}-7)`)
  style.setProperty(`--color-b-${name}-disabled`, `var(--color-${colorName}-3)`)
  style.setProperty(`--color-b-${name}-background`, `var(--color-${colorName}-1)`)
}
