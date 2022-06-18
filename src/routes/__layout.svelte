<script lang="ts">
  import { Button, ContentDialog, InfoBadge, InfoBar, TextBlock } from "fluent-svelte"
  import { competition } from "$lib/data"
  import { page } from "$app/stores"

  import Previous from "@fluentui/svg-icons/icons/arrow_left_32_filled.svg?raw"
  import Next from "@fluentui/svg-icons/icons/arrow_right_32_filled.svg?raw"
  import Submit from "@fluentui/svg-icons/icons/checkmark_32_filled.svg?raw"
  import Target from "@fluentui/svg-icons/icons/target_24_filled.svg?raw"
  import Person from "@fluentui/svg-icons/icons/person_24_filled.svg?raw"
  import Categories from "@fluentui/svg-icons/icons/text_bullet_list_square_24_regular.svg?raw"
  import "fluent-svelte/theme.css"
  import "../styles/_global.scss"

  $: pages = [
    {
      title: "Categories",
      path: "/",
      icon: Categories,
    },
    {
      title: "Archers",
      path: "/archers",
      icon: Person,
    },
    ($competition.discipline === "target" ? {
      title: "Targets",
      path: "/targets",
      icon: Target,
    } : null),
  ].filter(page => !!page)
  $: currentPage = pages.findIndex(p => p.path === $page.url.pathname)

  let submitDialogOpen = false
  const submitCompetition = () => {
    submitDialogOpen = false
  }
</script>

<svelte:head>
  <title>New Competition &bullet; {pages[currentPage].title}</title>
  <meta name="og:title" content="New Competition &bullet; {pages[currentPage].title}">
</svelte:head>

<nav>
  <TextBlock variant="titleLarge" class="new-comp-title">
    Create New Competition
  </TextBlock>

  <Button variant="accent" href={pages[currentPage - 1]?.path} disabled={currentPage <= 0}
          style="cursor: pointer">
    {@html Previous} &nbsp; Previous Page
  </Button>

  <div class="new-comp-progress" role="progressbar">
    {#each pages as { title, path, icon }, i (path)}
      {@const isCurrentPage = currentPage === i}
      <a
        class="new-comp-progress-page"
        class:current={isCurrentPage}
        href={path}
      >
        <InfoBadge
          class="new-comp-progress-page-badge"
          severity={isCurrentPage ? "attention" : (i < currentPage ? "success" : "information")}
        >
          {@html icon}
        </InfoBadge>
        <TextBlock variant="subtitle">{@html title}</TextBlock>
      </a>
    {/each}
  </div>

  {#if currentPage < pages.length - 1}
    <Button variant="accent" style="cursor: pointer" href={pages[currentPage + 1].path}>
      Next Page &nbsp; {@html Next}
    </Button>
  {:else}
    <Button variant="accent" type="submit" form="new-comp-form" style="cursor: pointer">
      Submit &nbsp; {@html Submit}
    </Button>
  {/if}
</nav>

<main>
  <form on:submit|preventDefault={() => submitDialogOpen = true} id="new-comp-form">
    <slot />
  </form>
</main>

<ContentDialog bind:open={submitDialogOpen} title="Confirm Submission">
  <InfoBar severity="caution" closable={false}>
    Please read through your competition's info thoroughly and make sure no errors have been made.
    You can always edit your competition later.
  </InfoBar>

  <svelte:fragment slot="footer">
    <Button on:click={() => submitDialogOpen = false}>
      Cancel
    </Button>
    <Button variant="accent" on:click={submitCompetition}>
      Submit &nbsp; {@html Submit}
    </Button>
  </svelte:fragment>
</ContentDialog>

<style lang="scss">
	@use "../styles/pages/main";
</style>