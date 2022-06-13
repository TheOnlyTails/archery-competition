import type { WithId } from "$lib/util"
import { writable } from "svelte-local-storage-store"

export const competition = writable<Competition>("competition", {
  discipline: "target",
  categories: [],
})

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
  archers?: Archer[] | undefined,
}

export type DisciplineOptions = {
  target: {
    targetSize?: number,
    distance?: number,
    targets?: Target[] | undefined,
    accessibility?: boolean,
  },
  field: {
    range?: [min: number, max: number],
    pegColor?: string,
    targetCount?: number,
  }
}

export type Target = {
  a: Archer,
  b?: Archer,
  c?: Archer,
  d?: Archer,
}

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