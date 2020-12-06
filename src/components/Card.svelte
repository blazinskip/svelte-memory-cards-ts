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
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transform-origin: center right;
    transition: transform 1s;
  }

  .card.card--flipped {
    transform: translateX(-100%) rotateY(-180deg);
  }

  .card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card__face--front {
    background: #98b4a0;
  }

  .card__face--back {
    transform: rotateY(180deg);
  }
</style>

<div
  class="card"
  class:card--flipped={card.filpped}
  on:click={cardClickHandler}>
  <div class="card__face card__face--front" />
  <div class="card__face card__face--back" style="background: white">
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
</div>
