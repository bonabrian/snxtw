type Booleanish = boolean | 'true' | 'false'

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? '' : undefined) as Booleanish

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined

export const unique = <T, Key extends keyof T>(
  array: Array<T> | T[],
  property?: Key,
): Array<T> => {
  if (!property) return Array.from(new Set([...array]))

  const set = new Set()
  return array.filter((o: T) => !set.has(o[property]) && set.add(o[property]))
}

export const getBaseUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  return isDevelopment
    ? 'http://localhost:3000'
    : 'https://tsnext-tw.vercel.app'
}
