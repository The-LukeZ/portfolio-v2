<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    variant?: "primary" | "accent" | "subtle";
    disabled?: boolean;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    children: Snippet;
    class?: ClassValue;
  }

  let {
    type,
    onClick,
    variant = "primary",
    disabled = false,
    href,
    target,
    class: className,
    children,
  }: Props = $props();
</script>

{#if href}
  <a
    class="button {variant} {disabled ? 'disabled' : ''} {className}"
    href={disabled ? undefined : href}
    onclick={onClick}
    {target}
    tabindex={disabled ? -1 : 0}
    aria-disabled={disabled}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    class="button {variant} {disabled ? 'disabled' : ''} {className}"
    {type}
    onclick={onClick}
    {disabled}
  >
    {@render children?.()}
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
    background-color: var(--secondary-bg);
    color: var(--text-primary);
    border-color: var(--border);
  }

  .button.primary:hover:not(.disabled) {
    border-color: var(--accent);
    transform: translateY(-2px);
    background-color: mix(in oklch, var(--accent) 25%, black);
  }

  .button.accent {
    background-color: var(--accent);
    color: var(--primary-bg);
    border-color: var(--accent);
  }

  .button.accent:hover:not(.disabled) {
    background-color: var(--accent-hover);
    border-color: var(--accent-hover);
    transform: translateY(-2px);
  }

  .button.subtle {
    background-color: transparent;
    color: var(--text-secondary);
    border-color: transparent;
  }

  .button.subtle:hover:not(.disabled) {
    color: var(--accent);
    background-color: var(--secondary-bg);
  }

  .button:focus-visible {
    outline: 2px solid var(--accent);
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
