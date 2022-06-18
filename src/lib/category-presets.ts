import type { Category, Discipline, Gender } from "$lib/data"

export const outdoor = (["M", "W"] as Gender[]).map(gender => [
  {
    name: "R" + gender,
    bowType: "R",
    gender,
    distance: 70,
    targetSize: 122,
  },
  {
    name: "RU21" + gender,
    bowType: "R",
    age: "U21",
    gender,
    distance: 70,
    targetSize: 122,
  },
  {
    name: "RU18" + gender,
    bowType: "R",
    age: "U18",
    gender,
    distance: 60,
    targetSize: 122,
  },
  {
    name: "R50" + gender,
    bowType: "R",
    age: 50,
    gender,
    distance: 60,
    targetSize: 122,
  },
  {
    name: "C" + gender,
    bowType: "C",
    gender,
    distance: 50,
    targetSize: 80,
  },
  {
    name: "CU21" + gender,
    bowType: "C",
    age: "U21",
    gender,
    distance: 50,
    targetSize: 80,
  },
  {
    name: "CU18" + gender,
    bowType: "C",
    age: "U18",
    gender,
    distance: 50,
    targetSize: 80,
  },
  {
    name: "C50" + gender,
    bowType: "C",
    age: 50,
    gender,
    distance: 50,
    targetSize: 80,
  },
  {
    name: "B" + gender,
    bowType: "B",
    gender,
    distance: 50,
    targetSize: 122,
  },
  {
    name: "BU21" + gender,
    bowType: "B",
    age: "U21",
    gender,
    distance: 50,
    targetSize: 122,
  },
  {
    name: "BU18" + gender,
    bowType: "B",
    age: "U18",
    gender,
    distance: 50,
    targetSize: 122,
  },
  {
    name: "B50" + gender,
    bowType: "B",
    age: 50,
    gender,
    distance: 50,
    targetSize: 122,
  },
  {
    name: "T" + gender,
    bowType: "T",
    gender,
    distance: 30,
    targetSize: 122,
  },
  {
    name: "TU18" + gender,
    bowType: "T",
    age: "U18",
    gender,
    distance: 30,
    targetSize: 122,
  },
] as Category<"target">[])
  .map((cs) =>
    cs.map((c) => {
      c.id = crypto.randomUUID()
      return c
    }),
  ) // add id
  .flat()

export const indoor = (["M", "W"] as Gender[]).map((gender) => [
  {
    name: "R" + gender,
    bowType: "R",
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "RU21" + gender,
    bowType: "R",
    age: "U21",
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "R50" + gender,
    bowType: "R",
    age: 50,
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "C" + gender,
    bowType: "C",
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "CU21" + gender,
    bowType: "C",
    age: "U21",
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "C50" + gender,
    bowType: "C",
    age: 50,
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "B" + gender,
    bowType: "B",
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "BU21" + gender,
    bowType: "B",
    age: "U21",
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "B50" + gender,
    bowType: "B",
    age: 50,
    gender,
    distance: 18,
    targetSize: 40,
  },
  {
    name: "T" + gender,
    bowType: "T",
    gender,
    distance: 18,
    targetSize: 80,
  },
  {
    name: "TU18" + gender,
    bowType: "T",
    age: "U18",
    gender,
    distance: 18,
    targetSize: 80,
  },
] as Category<"target">[])
  .map(cs =>
    cs.map(c => {
      c.id = crypto.randomUUID()
      return c
    }),
  ) // add id
  .flat()

export const custom: Category<Discipline>[] = []