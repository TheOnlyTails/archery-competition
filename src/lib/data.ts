import { writable } from "svelte-local-storage-store"
import { writable as writableStore, get } from "svelte/store"
import { groupBy, map, shuffle, valuesArr, windowed, type WithId } from "$lib/util"

export const competition = writable<Competition>("competition", {
  discipline: "target",
  categories: [],
})

export const getTargets = (categories: Category<"target">[]): Target[] => {
  const groupings = valuesArr(
    groupBy(categories, (c) => c.bowType), // sort by bow
  ).flatMap(shuffle) // shuffle each bow type group

  const byDistance = map(
    groupBy(groupings, (c) => c.distance),
    g => g.flatMap(c => c.archers),
  )

  // split up each distance group into 4-sized groups
  const windowedByDistance = map(byDistance, (g) => windowed(g, 4))

  // noinspection TypeScriptUnresolvedFunction
  return [...windowedByDistance.entries()].flatMap(([distance, targets]) => targets.map(([a, b, c, d]) => (
      { id: crypto.randomUUID(), distance, a, b, c, d }
    ),
  )).sort((a, b) => b.distance - a.distance)
}

export const targets = writableStore(getTargets(get(competition).categories as Category<"target">[]))

export type Competition<T extends Discipline = Discipline> = {
  discipline: T,
  categories: Category<T>[],
}

export type Category<T extends Discipline> = WithId<DisciplineOptions[T] & CategoryOptions>

export type CategoryOptions = {
  name?: string,
  gender?: Gender,
  bowType?: BowDivision,
  age?: `U${ number }` | undefined | number,
  archers: Archer[],
}

export type DisciplineOptions = {
  target: {
    targetSize?: number,
    distance: number,
    targets?: Target[] | undefined,
    accessibility?: boolean,
  },
  field: {
    range?: [min: number, max: number],
    pegColor?: string,
    targetCount?: number,
  }
}

export type Target = WithId<{
  distance: number,
  a: Archer,
  b?: Archer,
  c?: Archer,
  d?: Archer,
}>

export type Archer = {
  _: number, id: number, _a: number,
  division: BowDivision,
  class: `${ "U" | "" }${ number }${ Gender }` | Gender,
  target: `${ number }${ string }` | "",
  _b: number, _c: number, _d: number, _e: number, _f: number,
  lastName: string, firstName: string, gender: "M" | "W",
  clubId: string, clubName: string,
  birthDate: `${ number }${ number }${ number }${ number }-${ number }${ number }-${ number }${ number }`,
}

export type Gender = "M" | "W" | ""
export type Discipline = "target" | "field"
export type BowDivision = "R" | "C" | "B" | "T" | "L"