<script lang="ts">
  import { type Category } from "$lib/data"
  import { NumberBox, TextBox } from "fluent-svelte"

  export let category: Category<"field">
  let minDistance = category?.range?.[0] ?? undefined
  let maxDistance = category?.range?.[1] ?? undefined

  $: category = Object.assign({}, { range: [minDistance, maxDistance] }, category)
</script>

<div class="distance">
  <NumberBox placeholder="Minimum Distance" min={1} max={maxDistance} bind:value={minDistance} />
  <NumberBox placeholder="Maximum Distance" min={minDistance} bind:value={maxDistance} />
</div>
<TextBox placeholder="Peg Color" bind:value={category.pegColor} />
<NumberBox placeholder="Target Count" min="1" inline bind:value={category.targetCount} />

<style lang="scss">
	.distance {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}
</style>