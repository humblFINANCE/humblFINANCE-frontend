export function formatNoUnderscore(params: string) {
  return params
    .split('_')
    .map((item) => {
      // uppercase the first letter
      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    .join(' ')
}
