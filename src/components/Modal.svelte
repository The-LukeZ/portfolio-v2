<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade, scale } from "svelte/transition";

  let { id, children }: { id: string; children: Snippet } = $props();
  let isOpen = $state(false);

  function checkHash() {
    isOpen = window.location.hash === `#${id}`;
  }

  function closeModal() {
    location.hash = "";
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
</script>

<svelte:window onhashchange={checkHash} {@attach checkHash} />

{#if isOpen}
  <div
    class="modal-backdrop"
    onclick={closeModal}
    onkeydown={(e) => {
      if (e.key === "Enter" || e.key === " ") closeModal();
    }}
    role="button"
    tabindex="0"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="modal-content"
      onclick={(e) => e.stopPropagation()}
      onkeydown={() => {}}
      role="dialog"
      tabindex="0"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <button class="close-btn" onclick={closeModal}>&times;</button>
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--color-secondary-bg);
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    color: white;
  }
</style>
