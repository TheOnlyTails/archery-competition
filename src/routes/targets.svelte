<script lang="ts">
  import { ArcherCard, Card } from "$lib"
  import { targets, getTargets, competition, type Category } from "$lib/data"
  import { Button } from "fluent-svelte"

  import Reset from "@fluentui/svg-icons/icons/arrow_reset_48_filled.svg?raw"

  const resetTargets = () => $targets = getTargets($competition.categories as Category<"target">[])
</script>

<div class="action-bar">
  <Button variant="accent" on:click={resetTargets} type="button">
    {@html Reset} &nbsp; Reset
  </Button>
</div>

<div class="targets">
  {#each $targets as target, i}
    <Card class="target-card">
      <div class="target-card-header">
        Target {i + 1} &bullet; {target.distance}m
      </div>
      <ArcherCard {target} />
    </Card>
  {/each}
</div>

<style lang="scss">
	@use "src/styles/pages/targets";
</style>