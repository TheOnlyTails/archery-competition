<script lang="ts">
  import { Card } from "$lib"
  import type { Archer, Category, Target } from "$lib/data"
  import { groupBy, map, shuffle, valuesArr, windowed } from "$lib/util"
  import { competition } from "$lib/data"

  const getTargets = (categories: Category<"target">[]) => {
    // noinspection TypeScriptUnresolvedFunction
    const groupings: typeof categories = valuesArr(
      groupBy(categories, (c) => c.bowType), // sort by bow
    ).map(shuffle) // shuffle each bow type group
      .flat()

    const byDistance: Map<number, Archer[]> = map(groupBy(
      groupings,
      (c) => c.distance, // group by distance
    ), (g) => g.map(c => c.archers).flat())

    // split up each distance group into 4-sized groups
    const windowedByDistance = map(byDistance, (g) => windowed(g, 4))

    return map(windowedByDistance, ([a, b, c, d]) => ({
      a, b, c, d,
    }) as Target)
  }

  $: targets = getTargets($competition.categories)
  $: console.log("targets: ", targets)
</script>

<div class="targets">
  {#each [...targets.entries()] as [distance, targetsAtDistance]}
    {#each targetsAtDistance as archers}
      <Card class="target-card">
        <div class="target-card-header">{distance}m</div>
        <div class="target-card-archers">
          {#each archers as archer}
            <div class="target-card-archer">
              <div class="target-card-archer-name">{archer.firstName} {archer.lastName}</div>
              <div class="target-card-archer-bow">{archer.division}</div>
            </div>
          {/each}
        </div>
      </Card>
    {/each}
  {/each}
</div>

<style lang="scss">
	.targets {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;

		:global {
			.target-card {
				display: flex;
				flex-direction: column;
				align-items: center;

				&-archers {
					display: grid;
					grid-template-columns: 1fr 1fr;
					grid-template-rows: 1fr 1fr;
					place-items: center;

					&-archer {
						text-align: center;
					}
				}
			}
		}
	}
</style>