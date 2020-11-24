<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 95vh;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .board {
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: repeat(4, 150px);
    gap: 20px;
  }

  .won-alert {
    position: absolute;
    height: 100vh;
    top: 0;
    left: 0;
    background: #0000008f;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .won-alert__alert {
    background: white;
    font-size: 64px;
    padding: 32px 8px;
    border-radius: 8px;
  }
</style>

<script lang="ts">
  import { onDestroy } from 'svelte';

  import Card from './components/Card.svelte';
  import type { Card as CardModel } from './interfaces/card';

  let won = false;
  let started = false;
  let secondsCounterInterval = null;

  let cardToCompare = [];
  let correctCards = [] as CardModel[];

  let seconds = 0;

  $: cards = shuffleArray<CardModel>([
    { filpped: false, color: 'orange' },
    { filpped: false, color: 'orange' },
    { filpped: false, color: 'grey' },
    { filpped: false, color: 'grey' },
    { filpped: false, color: 'pink' },
    { filpped: false, color: 'pink' },
    { filpped: false, color: 'green' },
    { filpped: false, color: 'green' },
    { filpped: false, color: 'antiquewhite' },
    { filpped: false, color: 'antiquewhite' },
    { filpped: false, color: 'aquamarine' },
    { filpped: false, color: 'aquamarine' },
    { filpped: false, color: 'blueviolet' },
    { filpped: false, color: 'blueviolet' },
    { filpped: false, color: 'lightcoral' },
    { filpped: false, color: 'lightcoral' },
  ]);

  function resetGame() {
    cards = shuffleArray(cards.map((card) => ({ ...card, filpped: false })));
    correctCards = [];
    cardToCompare = [];
    won = false;
    started = false;
    seconds = 0;
  }

  function flip(card: CardModel, index: number) {
    if (!started) {
      started = true;
      secondsCounterInterval = setInterval(() => {
        seconds++;
      }, 1000);
    }

    if (card.filpped) {
      return;
    }

    const fillpedCard = { ...card, filpped: true };
    cards = replaceElementAtIndex(index, fillpedCard);

    cardToCompare = [...cardToCompare, fillpedCard];

    if (cardToCompare.length === 2) {
      const [first, second] = cardToCompare;

      if (first.color !== second.color) {
        setTimeout(() => {
          const firstHidden = { ...first, filpped: false };
          const secondHidden = { ...second, filpped: false };
          cards = replaceElementAtIndex(cards.indexOf(first), firstHidden);
          cards = replaceElementAtIndex(cards.indexOf(second), secondHidden);
        }, 1500);
      } else {
        correctCards = [...correctCards, first, second];
        if (correctCards.length === cards.length) {
          clearInterval(secondsCounterInterval);
          setTimeout(() => (won = true), 1000);
        }
      }

      cardToCompare = [];
    }
  }

  function replaceElementAtIndex(index: number, newElement: CardModel): CardModel[] {
    return cards.map((value, i) => (i === index ? newElement : value));
  }

  function shuffleArray<T>(array: T[]): T[] {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  onDestroy(() => clearInterval(secondsCounterInterval));
</script>

<main>
  <h2>
    Time:
    {#if started}&nbsp;{seconds}{/if}
  </h2>
  <section class="board">
    {#each cards as card, i}
      <Card card="{card}" cardClickHandler="{() => flip(card, i)}" />
    {/each}
  </section>

  {#if won === true}
    <div class="won-alert" on:click="{resetGame}">
      <section class="won-alert__alert">Congratulations! You have won!</section>
    </div>
  {/if}
</main>
