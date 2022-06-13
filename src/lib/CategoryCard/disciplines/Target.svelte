<script lang="ts">
  import { type Category } from "$lib/data"
  import { NumberBox } from "fluent-svelte"

  export let category: Category<"target">
</script>

<div class="fields">
  <NumberBox placeholder="Distance to Target" min="1"  bind:value={category.distance} />
  <NumberBox placeholder="Target size" min="1" bind:value={category.targetSize} />
</div>

<style lang="scss">
  .fields {
    display: flex;
    gap: 1rem;
  }
</style>