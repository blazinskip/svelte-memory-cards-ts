<script lang="ts">
  import Board from '$components/Board.svelte';

  let started = false;
  let seconds = 0;
</script>

<svelte:head>
  <title>Card game</title>
</svelte:head>

<main class="flex flex-col justify-center max-w-2xl min-h-screen p-4 mx-auto">
  <header class="mb-6 text-3xl text-green-100 mb">
    <h2>
    Time:
    {#if started}&nbsp;{seconds}{/if}
    </h2>
  </header>
  <Board
    started="{started}"
    seconds="{seconds}"
    on:started="{() => (started = true)}"
    on:ended="{() => (started = false)}"
    on:secondPassed="{() => seconds++}"
  />
</main>
