<script lang="ts">
  import { Button, ComboBox, RadioButton } from "fluent-svelte"
  import { type Category, competition } from "$lib/data"
  import { custom, indoor, outdoor } from "$lib/category-presets"
  import { Card, CategoryCard } from "$lib"
  import { derived } from "svelte/store"
  import { writable } from "svelte-local-storage-store"

  import Add from "@fluentui/svg-icons/icons/add_28_regular.svg?raw"
  import Clear from "@fluentui/svg-icons/icons/delete_16_regular.svg?raw"
  import Reset from "@fluentui/svg-icons/icons/arrow_reset_48_filled.svg?raw"
  import { crossfade } from "svelte/transition"
  import { circOut } from "svelte/easing"

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node) {
      const style = getComputedStyle(node)
      const transform = style.transform === "none" ? "" : style.transform

      return {
        duration: 600,
        easing: circOut,
        css: t => `
          transform: ${ transform } scale(${ t });
          opacity: ${ t }
        `,
      }
    },
  })

  const presetMap: { [discipline: string]: { [preset: string]: Category<typeof $competition.discipline>[] } } = {
    target: {
      outdoor, indoor,
    },
  }

  const presetName = writable("presetName", Object.keys(presetMap[$competition.discipline])[0] ?? "custom")
  const preset = derived(presetName, (name) => {
    return (presetMap[$competition.discipline]?.[name] ?? presetMap[$competition.discipline]?.[1]) ?? custom
  })

  preset.subscribe(value => {
    // noinspection JSUnreachableSwitchBranches
    $competition.categories = value
  })

  $: {
    try {
      $presetName = Object.keys(presetMap?.[$competition.discipline] ?? {})?.[0] ?? "custom"
    } catch {
      $presetName = "custom"
    }
  }

  const resetToPreset = () => {
    $competition.categories = $preset
  }

  const clearAll = () => {
    $competition.categories = []
    $presetName = "custom"
  }

  const newCategory = () => {
    $competition.categories = [
      ...$competition.categories,
      { id: crypto.randomUUID() },
    ]
  }

  const deleteCategory = (id: string) => {
    $competition.categories = $competition.categories.filter(c => c.id !== id)
  }
</script>

<div class="comp-category-selector">
  <div class="comp-category-selector-presets">
    <ComboBox
      class="comp-category-selector-discipline"
      placeholder="Discipline"
      bind:value={$competition.discipline}
      items={[
        { name: "Target", value: "target" },
        { name: "Field", value: "field" },
      ]}
    />

    {#if $competition.discipline === "target"}
      <RadioButton bind:group={$presetName} value="outdoor">Outdoor</RadioButton>
      <RadioButton bind:group={$presetName} value="indoor">Indoor</RadioButton>
    {/if}
    <RadioButton bind:group={$presetName} value="custom">Custom</RadioButton>

    <Button variant="accent" on:click={clearAll} form="">
      {@html Clear} &nbsp; Clear All
    </Button>

    {#if $presetName !== "custom"}
      <Button variant="accent" on:click={resetToPreset} form="">
        {@html Reset} &nbsp; Reset to {$presetName.charAt(0).toUpperCase() + $presetName.slice(1)} Preset
      </Button>
    {/if}
  </div>

  <div class="comp-category-selector-space">
    {#each $competition.categories as category, i (category.id)}
      <div class="transition-wrapper" in:receive={{ key: category.id }} out:send={{ key: category.id }}>
        <CategoryCard
          bind:category
          discipline={$competition.discipline}
          on:delete={() => deleteCategory(category.id)}
        />
      </div>
    {/each}

    <Card class="new-category-card" on:click={newCategory} tabindex="0">
      {@html Add}
    </Card>
  </div>
</div>

<style lang="scss">
	@use "../styles/pages/categories";
</style>