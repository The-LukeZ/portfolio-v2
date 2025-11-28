<script lang="ts">
  import { setLocale, type Locale, getLocale } from "$lib/paraglide/runtime";
  import { Menu, XIcon } from "$lib/assets/index.js";
  import { fade } from "svelte/transition";
  import NavItems from "./NavItems.svelte";

  let { locale }: { locale?: string } = $props();

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<button
  class="mobile-menu-btn"
  onclick={toggleMobileMenu}
  aria-label="Toggle mobile menu"
>
  <Menu />
</button>

<ul class="nav-links">
  <NavItems onclose={closeMobileMenu} />
</ul>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
  <div
    aria-label="Close mobile menu"
    class="mobile-overlay open no-select"
    role="button"
    tabindex="0"
    onclick={closeMobileMenu}
    onkeydown={() => {}}
    transition:fade={{ duration: 250 }}
  ></div>
{/if}

<!-- Mobile Menu -->
<div class="mobile-menu no-select" class:open={mobileMenuOpen}>
  <button
    class="close-btn"
    onclick={closeMobileMenu}
    aria-label="Close mobile menu"
  >
    <XIcon />
  </button>

  <ul class="mobile-nav-links">
    <NavItems onclose={closeMobileMenu} />
  </ul>
</div>
