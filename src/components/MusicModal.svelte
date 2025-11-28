<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade, scale } from "svelte/transition";
  import Button from "./Button.svelte";

  let {
    isOpen = $bindable(false),
    onClose,
  }: {
    isOpen?: boolean;
    onClose?: () => void;
  } = $props();

  function closeModal() {
    isOpen = false;
    onClose?.();
  }
</script>

<Button onClick={() => (isOpen = !isOpen)}>Did somebody say Music?</Button>

{#if isOpen}
  <div
    class="modal-backdrop"
    onclick={closeModal}
    onkeydown={(e) => {
      if (e.key === "Escape") closeModal();
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
      <h3>Music is Life</h3>
      <p>
        I’m that person who’s always got tunes playing in the background.
        Whether I’m coding, driving, or doing grocery shopping, music usually
        plays.<br />
        My go-to genres are Meavy Metal (especially Power Metal and... yeah specific
        stuff), Country (plus sub-genres) and basically anything with a good beat.
        You can check out my Spotify stats here:
        <a class="text-accent" href="https://stats.fm/lukez" target="_blank">stats.fm/lukez</a>
      </p>
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
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--secondary-bg);
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
