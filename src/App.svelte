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

  <div style="height: 100%; width: 100%">
    <svg
      xmlns:x="http://ns.adobe.com/Extensibility/1.0/"
      xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/"
      xmlns:graph="http://ns.adobe.com/Graphs/1.0/"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 500 350"
      enable-background="new 0 0 500 350"
      xml:space="preserve"
    >
      <g>
        <g>
          <path
            fill="#FBD4D9"
            d="M639,168.5c-22.4-6.6-53.2,36.7-59.7,61.4c-6.4,24.7,6.5,50.1,28.9,56.7c22.4,6.6,45.8-8.1,52.2-32.8       C666.9,229.1,661.4,175.1,639,168.5z"
          ></path>
          <path
            fill="#F8BBC7"
            d="M634.3,186.5c-13.4-4-34.8,33.4-38.7,48.2c-3.8,14.8,3.9,30,17.3,33.9c13.4,4,27.4-4.8,31.2-19.6       C648,234.3,647.7,190.5,634.3,186.5z"
          ></path>
          <path
            fill="#FBD4D9"
            d="M525.7,229.9c-6.4-24.7-37.3-68-59.7-61.4c-22.4,6.6-27.9,60.6-21.5,85.3c6.4,24.7,29.8,39.4,52.2,32.8       C519.2,280,532.1,254.6,525.7,229.9z"
          ></path>
          <path
            fill="#F8BBC7"
            d="M509.4,234.7c-3.8-14.8-25.3-52.2-38.7-48.2c-13.4,4-13.7,47.8-9.9,62.5c3.8,14.8,17.8,23.6,31.2,19.6       C505.5,264.7,513.2,249.5,509.4,234.7z"
          ></path>
        </g>
        <g>
          <path
            fill="#FBD4D9"
            d="M666.8,308.5c0,63.1-51.2,114.8-114.3,114.8s-114.3-51.7-114.3-114.8s51.2-113.8,114.3-113.8       S666.8,245.4,666.8,308.5z"
          ></path>
        </g>
        <g>
          <path
            fill="#F8BBC7"
            d="M521.8,339c0-16.9,13.7-35,30.7-35s30.7,18.1,30.7,35s-13.7,26.3-30.7,26.3S521.8,355.9,521.8,339z"
          ></path>
        </g>
        <g>
          <circle cx="593.5" cy="303.3" r="8.7"></circle>
        </g>
        <g>
          <ellipse cx="566.5" cy="336.5" rx="7.3" ry="9.7"></ellipse>
        </g>
        <g>
          <ellipse cx="538.5" cy="336.5" rx="7.3" ry="9.7"></ellipse>
        </g>
        <g>
          <circle cx="511.5" cy="303.3" r="8.7"></circle>
        </g>
      </g>
    </svg>
  </div>

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
