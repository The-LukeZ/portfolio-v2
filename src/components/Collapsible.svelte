<script lang="ts">
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import type { Snippet } from "svelte";

  let open = $state(false);

  let {
    title = "Collapsible Section",
    children,
  }: {
    title?: string;
    children?: Snippet;
  } = $props();

  function toggle() {
    open = !open;
  }
</script>

<div class="collapsible" class:open>
  <!-- Header / Trigger -->
  <button class="collapsible-header" onclick={toggle} aria-expanded={open}>
    <span class="title">{title}</span>
    <span class="icon" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="M18 15l-6-6-6 6" /></svg
      >
    </span>
  </button>

  {#if open}
    <div
      class="collapsible-content"
      transition:slide={{ duration: 300, easing: quintOut }}
    >
      <div class="content-inner">
        {@render children?.()}
      </div>
    </div>
  {/if}
</div>

<style>
  .collapsible {
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    overflow: hidden;
    background: var(--primary-bg);
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .collapsible-header {
    width: 100%;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s;
    color: var(--text-primary);
  }

  .collapsible-header:hover {
    background: var(--secondary-bg);
  }

  .title {
    flex: 1;
    margin-right: 1rem;
  }

  .icon {
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .open .icon {
    transform: rotate(180deg);
  }

  .collapsible-content {
    border-top: 1px solid var(--border);
  }

  .content-inner {
    padding: 1.25rem;
  }

  /* Optional: subtle focus style for accessibility */
  .collapsible-header:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
</style>
