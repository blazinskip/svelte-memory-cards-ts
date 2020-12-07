<script lang="ts">
  import Bear from "./Bear.svelte";
  import Bunny from "./Bunny.svelte";
  import Donkey from "./Donkey.svelte";
  import Duck from "./Duck.svelte";
  import Elephant from "./Elephant.svelte";
  import Lion from "./Lion.svelte";
  import Pig from "./Pig.svelte";
  import Reindeer from "./Reindeer.svelte";
  import type { CardModel } from "../interfaces/card";

  export let card: CardModel;
  export let cardClickHandler = () => {};
</script>

<style type="scss">
  .card {
    transform-style: preserve-3d;
    transform-origin: center right;
  }

  .card.card--flipped {
    transform: translateX(-100%) rotateY(-180deg);
  }

  .card__face--back {
    transform: rotateY(180deg);
  }
</style>

<button
  class="relative w-full h-full transition duration-500 origin-center outline-none card focus:outline-none"
  class:card--flipped={card.filpped}
  on:click={cardClickHandler}>
<div class="absolute inset-0 flex items-center justify-center w-full h-full {card.filpped ? 'bg-transparent' : 'bg-blue-200'}" />
<div class="absolute inset-0 flex items-center justify-center w-full h-full card__face--back {card.filpped ? 'bg-opacity-0 bg-blue-200' : 'bg-blue-200'} transition-colors ease-in-out duration-500">
    {#if card.backgroundSvg === 'Bear'}
      <Bear />
    {/if}
    {#if card.backgroundSvg === 'Bunny'}
      <Bunny />
    {/if}
    {#if card.backgroundSvg === 'Donkey'}
      <Donkey />
    {/if}
    {#if card.backgroundSvg === 'Duck'}
      <Duck />
    {/if}
    {#if card.backgroundSvg === 'Elephant'}
      <Elephant />
    {/if}
    {#if card.backgroundSvg === 'Lion'}
      <Lion />
    {/if}
    {#if card.backgroundSvg === 'Pig'}
      <Pig />
    {/if}
    {#if card.backgroundSvg === 'Reindeer'}
      <Reindeer />
    {/if}
  </div>
</button>
