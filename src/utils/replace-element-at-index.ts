export function replaceElementAtIndex<T>(array: T[], index: number, newElement: T): T[] {
  return array.map((value, i) => (i === index ? newElement : value));
}
