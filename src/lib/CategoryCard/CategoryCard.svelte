<script lang="ts">
  import { Checkbox, ComboBox, IconButton, InfoBadge, TextBlock, TextBox, TextBoxButton } from "fluent-svelte"
  import { type Category, type Discipline } from "$lib/data"
  import { Card } from "$lib"
  import { Field, Target } from "./disciplines"
  import { createEventDispatcher } from "svelte"

  import Delete from "@fluentui/svg-icons/icons/delete_28_regular.svg?raw"
  import Warning from "@fluentui/svg-icons/icons/warning_28_regular.svg?raw"

  export let discipline: Discipline
  export let category: Category<typeof discipline>

  const disciplineForms = {
    target: Target,
    field: Field,
  }

  const dispatch = createEventDispatcher()
</script>

<Card class="category-card">
  <TextBlock variant="subtitle" style="text-align: center;">
    {@html (category.bowType ?? "&nbsp;") + (category.age ?? "&nbsp;") + (category.gender ?? "&nbsp;")}
  </TextBlock>

  <div class="basic-info">
    <TextBox
      class="category-age-input"
      pattern="U?\d&lcub;1,2&rcub;"
      placeholder="Age (Default: Adults)"
      bind:value={category.age}
    >
      {#if !(/U?\d{1,2}/.test(category?.age?.toString() ?? "")) && category.age}
        <TextBoxButton slot="buttons">
          <InfoBadge severity="caution" title="{category.age} is invalid">
            {@html Warning}
          </InfoBadge>
        </TextBoxButton>
      {/if}
    </TextBox>

    <ComboBox class="category-gender-input" placeholder="Gender" items={[
      { name: "Male", value: "M" },
      { name: "Female", value: "W" },
      { name: "Mixed", value: "" },
    ]} bind:value={category.gender} />

    <ComboBox class="category-bow-input" placeholder="Bow&nbsp;Type" items={[
      { name: "Recurve", value: "R" },
      { name: "Compound", value: "C" },
      { name: "Barebow", value: "B" },
      { name: "Traditional", value: "T" },
    ]} bind:value={category.bowType} />
  </div>

  <svelte:component this={disciplineForms[discipline]} bind:category />

  <div class="footer">
    <Checkbox bind:checked={category.accessibility}>Accessibility</Checkbox>
    <IconButton on:click={() => dispatch("delete")} type="button">
      {@html Delete}
    </IconButton>
  </div>
</Card>

<style lang="scss">
	:global {
		.category-card {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-inline-size: 29vw;

			.category-age-input:user-invalid {
				--fds-accent-default: var(--fds-system-critical);
			}

			.footer, .basic-info {
				display: flex;
				gap: 1rem;
				justify-content: space-between;
			}
		}
	}
</style>