export type WithId<T, I = string> = T & { id: I }

export const groupBy = <T, V>(list: T[], keyGetter: (element: T) => V): Map<V, T[]> => {
  const map = new Map<V, T[]>()

  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)

    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })

  return map
}

export const valuesArr = <T>(map: Map<any, T[]>) => [...map.values()]

export const flattenMapValues = <T>(map: Map<any, T[]>): T[] => valuesArr(map)
  .reduce((acc, c) => [...acc, ...c])

export const shuffle = <T>(list: T[]): T[] => list.sort(() => Math.random() - 0.5)

export const windowed = <T>(list: T[], size: number): T[][] => list.reduce((resultArray, item, i) => {
  const chunkIndex = Math.floor(i / size)

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] // start a new chunk
  }

  resultArray[chunkIndex].push(item)

  return resultArray
}, [] as T[][])

export const map = <K, V, N>(map: Map<K, V>, fn: (value: V, key: K) => N): Map<K, N> => {
  const newMap = new Map<K, N>()

  map.forEach((value, key) => {
    newMap.set(key, fn(value, key))
  })

  return newMap
}