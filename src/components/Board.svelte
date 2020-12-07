<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';

  import Card from '$components/Card.svelte';
  import type { CardModel } from '../interfaces/card';

  export let started = false;
  export let seconds = 0;

  const dispatch = createEventDispatcher();

  const gameStarted = () => dispatch('started');
  const gameEnded = () => dispatch('ended');
  const secondPassed = () => dispatch('secondPassed');

  let won = false;
  let secondsCounterInterval = null;

  let cardToCompare = [];
  let correctCards = [] as CardModel[];

  $: cards = shuffleArray<CardModel>([
    { filpped: false, backgroundSvg: 'Bear' },
    { filpped: false, backgroundSvg: 'Bear' },
    { filpped: false, backgroundSvg: 'Bunny' },
    { filpped: false, backgroundSvg: 'Bunny' },
    { filpped: false, backgroundSvg: 'Donkey' },
    { filpped: false, backgroundSvg: 'Donkey' },
    { filpped: false, backgroundSvg: 'Duck' },
    { filpped: false, backgroundSvg: 'Duck' },
    { filpped: false, backgroundSvg: 'Elephant' },
    { filpped: false, backgroundSvg: 'Elephant' },
    { filpped: false, backgroundSvg: 'Lion' },
    { filpped: false, backgroundSvg: 'Lion' },
    { filpped: false, backgroundSvg: 'Pig' },
    { filpped: false, backgroundSvg: 'Pig' },
    { filpped: false, backgroundSvg: 'Reindeer' },
    { filpped: false, backgroundSvg: 'Reindeer' },
  ]);

  function resetGame() {
    cards = shuffleArray(cards.map((card) => ({ ...card, filpped: false })));
    correctCards = [];
    cardToCompare = [];
    won = false;
    gameEnded();
  }

  function flip(card: CardModel, index: number) {
    if (!started) {
      gameStarted();
      secondsCounterInterval = setInterval(() => {
        secondPassed();
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

      if (first.backgroundSvg !== second.backgroundSvg) {
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

<section class="grid grid-flow-row grid-cols-4 gap-4 h-96">
  {#each cards as card, i}
    <Card card="{card}" cardClickHandler="{() => flip(card, i)}" />
  {/each}
</section>

{#if won === true}
  <div
    class="absolute inset-0 flex items-center justify-center w-screen h-screen bg-blue-400 bg-opacity-30"
    on:click="{resetGame}"
  >
    <section
      class="flex items-center w-1/2 p-4 text-center break-words bg-white rounded justify-items-center text-7xl h-1/5"
    >
      <p>Congratulations! You have won! <br />With time: {seconds}</p>
    </section>
  </div>
{/if}
