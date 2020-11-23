<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    display: flex;
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
  import Card from './components/Card.svelte';
  import type { Card as CardModel } from './interfaces/card';

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

  let won = false;

  let cardToCompare = [];
  let correctCards = [] as CardModel[];

  function resetGame() {
    cards = shuffleArray(cards.map((card) => ({ ...card, filpped: false })));
    correctCards = [];
    cardToCompare = [];
    won = false;
  }

  function flip(card: CardModel, index: number) {
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
          setTimeout(() => (won = true), 1000);
        }
      }

      cardToCompare = [];
    }
  }

  function replaceElementAtIndex(index: number, newElement: CardModel): CardModel[] {
    console.log({ index });

    return cards.map((value, i) => (i === index ? newElement : value));
  }

  function shuffleArray<T>(array: T[]): T[] {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }
</script>

<main>
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
