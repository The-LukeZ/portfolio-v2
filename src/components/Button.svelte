<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    variant?: "primary" | "accent" | "subtle";
    disabled?: boolean;
    href?: string;
    children: Snippet;
  }

  let {
    type,
    onClick,
    variant = "primary",
    disabled = false,
    href,
    children,
  }: Props = $props();
</script>

{#if href}
  <a
    class="button {variant} {disabled ? 'disabled' : ''}"
    href={disabled ? undefined : href}
    onclick={onClick}
    tabindex={disabled ? -1 : 0}
  >
    {@render children()}
  </a>
{:else}
  <button class="button {variant}" {type} onclick={onClick} {disabled}>
    {@render children()}
  </button>
{/if}

<style>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
  }

  .button.primary {
    background-color: var(--color-secondary-bg);
    color: var(--color-text-primary);
    border-color: var(--color-border);
  }

  .button.primary:hover:not(.disabled) {
    border-color: var(--color-accent);
    transform: translateY(-2px);
    background-color: color-mix(in oklch, var(--color-accent) 25%, black);
  }

  .button.accent {
    background-color: var(--color-accent);
    color: var(--color-primary-bg);
    border-color: var(--color-accent);
  }

  .button.accent:hover:not(.disabled) {
    background-color: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
    transform: translateY(-2px);
  }

  .button.subtle {
    background-color: transparent;
    color: var(--color-text-secondary);
    border-color: transparent;
  }

  .button.subtle:hover:not(.disabled) {
    color: var(--color-accent);
    background-color: var(--color-secondary-bg);
  }

  .button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .button.disabled,
  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .button :global(svg:first-child),
  .button :global(img:first-child) {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .button :global(svg:first-child:last-child),
  .button :global(img:first-child:last-child) {
    margin: 0;
  }
</style>
