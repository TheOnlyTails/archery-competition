<script lang="ts">
  import type { Archer } from "$lib/data"
  import { competition } from "$lib/data"
  import { parse } from "csv-parse/browser/esm/sync"
  import { InfoBar, TextBlock } from "fluent-svelte"
  import { afterNavigate } from "$app/navigation"

  import Upload from "@fluentui/svg-icons/icons/attach_24_regular.svg?raw"
  import "fluent-svelte/Button/Button.scss"

  let filePath: string
  $: fileName = filePath?.slice(filePath?.lastIndexOf(`\\`) + 1) ?? ""
  let archers: Archer[] = []

  afterNavigate(({ to }) => {
    if (to.pathname === "/targets") {
      $competition.categories = $competition.categories.map(category => {
        const className = (category.age ?? "") + category.gender

        category.archers = archers.filter(archer => archer.division === category.bowType && archer.class === className)
        return category
      }).filter(c => c.archers.length > 0)
    }
  })

  const parseArchersFile = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files[0]

    await file.text().then(content => {
      archers = parse(content, {
        cast: true,
        skipEmptyLines: true,
        columns: [
          "_", "id", "_a",
          "division", "class", "target",
          "_b", "_c", "_d", "_e", "_f",
          "lastName", "firstName", "gender",
          "clubId", "clubName",
          "birthDate",
        ],
      })
    })
  }
</script>

<div class="archers">
  <TextBlock variant="titleLarge">Upload Archers Data</TextBlock>
  <TextBlock>
    To assign archers to categories, upload a CSV file with Ianseo archers data.
  </TextBlock>

  <label>
    <span
      class="archers-upload-button"
      role="button"
    >
      {#if !filePath}
        {@html Upload} &nbsp; Upload data file
      {:else}
        <code>{fileName}</code>
      {/if}
    </span>
    <input type="file" accept="text/csv" on:change={parseArchersFile} bind:value={filePath} hidden />
  </label>

  {#if archers.length > 0}
    <InfoBar severity="caution" closable={false}>
      Upon submission, all unused categories will be purged.
    </InfoBar>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Target</th>
        <th>Club</th>
        <th>Birth Date</th>
      </tr>
      </thead>
      {#each archers as archer (archer.id)}
        <tr>
          <td dir="auto"><code>{archer.id}</code></td>
          <td dir="auto">{archer.firstName} {archer.lastName}</td>
          <td dir="auto">{archer.division}{archer.class}</td>
          <td dir="auto">{archer.target.length === 0 ? "unset" : archer.target}</td>
          <td dir="auto">{archer.clubName}</td>
          <td dir="auto">{new Date(archer.birthDate).toLocaleDateString()}</td>
        </tr>
      {/each}
    </table>
  {/if}
</div>

<style lang="scss">
	.archers {
		display: flex;
		flex-direction: column;
		align-items: center;
    gap: 1rem;

		&-upload-button {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			user-select: none;
			font: {
				family: var(--fds-font-family-text);
				size: var(--fds-body-font-size);
				weight: normal;
			}
			line-height: 20px;

			position: relative;
			box-sizing: border-box;
			padding-block: 4px 6px;
			padding-inline: 11px;
			text-decoration: none;
			outline: none;
			cursor: pointer;
			border-radius: var(--fds-control-corner-radius);
			transition: var(--fds-control-faster-duration) ease background;

			&:focus-visible {
				box-shadow: var(--fds-focus-stroke);
			}

			border: 1px solid var(--fds-control-border-default);
			background-color: var(--fds-control-fill-default);
			color: var(--fds-text-primary);
			background-clip: padding-box;

			&:hover {
				background-color: var(--fds-control-fill-secondary);
			}

			&:active {
				border-color: var(--fds-control-stroke-default);
				background-color: var(--fds-control-fill-tertiary);
				color: var(--fds-text-secondary);
			}
		}
	}
</style>