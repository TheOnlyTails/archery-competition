<script lang="ts">
  let className = ""
  export { className as class }
</script>

<div class="card {className}" on:click {...$$restProps}>
  <slot />
</div>

<style lang="scss">
  .card {
    block-size: fit-content;
    padding: 1rem;

    background: var(--fds-card-background-default);
    border: 1px solid var(--fds-card-stroke-default);
    border-radius: 1rem;
    box-shadow: var(--fds-card-shadow);

    &:hover {
      border: 1px solid var(--fds-card-background-secondary);
    }
  }
</style>