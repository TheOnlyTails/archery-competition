<script lang="ts">
  import { InfoBadge, TextBlock } from "fluent-svelte"
  import type { Archer, Target } from "$lib/data"
  import { targets } from "$lib/data"

  export let target: Target

  let draggedOver: [a: boolean, b: boolean, c: boolean, d: boolean] = [false, false, false, false]

  const dragStart = (e: DragEvent) => {
    e.dataTransfer.clearData("archer-type")

    const { targetId, targetSlot } = (e.target as HTMLElement).dataset
    e.dataTransfer.setData("archer-type", JSON.stringify({
      targetId,
      targetSlot,
    }))
  }

  const drop = (e: DragEvent, dropIndex: number) => {
    if (e.dataTransfer.types.includes("archer-type")) {
      // get the data of the dragged archer from dataTransfer
      const { targetId: dragTargetId, targetSlot: dragTargetSlot } = JSON.parse(e.dataTransfer.getData("archer-type"))
      const dragArcher: Archer = $targets.find(t => t.id === dragTargetId)?.[dragTargetSlot]
      const dragTargetIndex = $targets.findIndex(t => t.id === dragTargetId)

      // get the data of the archer at the drop location
      const { targetId: dropTargetId, targetSlot: dropTargetSlot } = (e.target as HTMLElement).dataset
      const dropArcher = $targets.find(t => t.id === dropTargetId)?.[dropTargetSlot]
      const dropTargetIndex = $targets.findIndex(t => t.id === dropTargetId) ?? dropIndex

      $targets[dropTargetIndex][dropTargetSlot] = dragArcher
      $targets[dragTargetIndex][dragTargetSlot] = dropArcher
    }

    draggedOver = draggedOver.fill(false)
  }

  const dragOver = (e: DragEvent, index: number) => {
    if (e.dataTransfer.types.includes("archer-type")) {
      e.preventDefault()
      draggedOver[index] = true
    }
  }
</script>

{#if $targets}
  <table class="target-card-archers">
    {#each [target.a, target.b, target.c, target.d] as archer, i}
      <tr
        class="target-card-archer"
        data-target-slot={String.fromCharCode('a'.codePointAt(0) + i)}
        data-target-id={target.id}
        draggable={!!archer}
        class:dragged-over={draggedOver[i]}
        on:dragstart={dragStart}
        on:dragover={e => dragOver(e, i)}
        on:dragleave={() => draggedOver[i] = false}
        on:dragend={() => draggedOver =  draggedOver.fill(false)}
        on:drop={e => drop(e, i)}
      >
        <InfoBadge severity={archer ? "attention" : "information"}>
          {String.fromCharCode("A".codePointAt(0) + i)}
        </InfoBadge>
        {#if archer}
          <TextBlock class="target-card-archer-name">{archer.firstName} {archer.lastName}</TextBlock>
          <TextBlock class="target-card-archer-bow">
            {archer.division}{archer.class}
          </TextBlock>
        {/if}
      </tr>
    {/each}
  </table>
{:else}
  <TextBlock variant="title">Loading Targets...</TextBlock>
{/if}

<style lang="scss">
	.target-card-archers .target-card-archer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1ch;

		padding: 1ch 1rem;

		border: 1px solid var(--fds-divider-stroke-default);
		user-select: none;

		&.dragged-over {
			border-color: var(--fds-accent-default);
		}

		:global :only-child {
			margin-inline: auto;
		}
	}
</style>