<script lang="ts">
  import { musicConfig } from '../config/site';

  const playlist = musicConfig.playlist;
  const playerHeight = musicConfig.playerHeight;

  let current = -1;

  $: currentItem = current >= 0 && current < playlist.length ? playlist[current] : null;
  $: iframeSrc = currentItem
    ? `https://music.163.com/outchain/player?type=2&id=${currentItem.sid}&auto=0&height=${playerHeight}`
    : '';

  function play(idx: number) {
    if (idx < 0 || idx >= playlist.length) return;
    current = idx;
  }

  function next() {
    if (!playlist.length) return;
    play((current + 1) % playlist.length);
  }

  function prev() {
    if (!playlist.length) return;
    play((current - 1 + playlist.length) % playlist.length);
  }
</script>

{#if !musicConfig.enabled}
  <p class="py-8 text-center text-sm font-bold text-slate-400 dark:text-slate-500 font-mono">
    {musicConfig.disabledText}
  </p>
{:else if playlist.length === 0}
  <p class="py-8 text-center text-sm font-bold text-slate-400 dark:text-slate-500 font-mono">
    {musicConfig.emptyText}
  </p>
{:else}
  {#if currentItem}
    <iframe
      src={iframeSrc}
      title={`${currentItem.title} — ${currentItem.artist}`}
      width="100%"
      height={playerHeight}
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      allowtransparency="yes"
      class="block border-2 border-[#0284c7] rounded-sm shadow-[3px_3px_0px_0px_#0284c7] bg-white dark:bg-slate-800"
    ></iframe>
  {:else}
    <p class="py-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500 font-mono border-2 border-dashed border-[#0284c7]/30 rounded-sm">
      点击下方曲目开始播放
    </p>
  {/if}

  <div class="flex gap-3 my-4">
    <button
      on:click={prev}
      aria-label="上一首"
      class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border-2 border-[#0284c7] rounded-sm font-black text-sm text-[#0284c7] dark:text-sky-300 shadow-[3px_3px_0px_0px_#0284c7] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
      </svg>
      上一首
    </button>
    <button
      on:click={next}
      aria-label="下一首"
      class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border-2 border-[#0284c7] rounded-sm font-black text-sm text-[#0284c7] dark:text-sky-300 shadow-[3px_3px_0px_0px_#0284c7] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 cursor-pointer"
    >
      下一首
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  <div class="border-2 border-[#0284c7] rounded-sm overflow-hidden">
    {#each playlist as item, idx (item.sid + '-' + idx)}
      <button
        on:click={() => play(idx)}
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 cursor-pointer border-b-2 last:border-b-0 {idx === current
          ? 'bg-[#0284c7] text-white'
          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#fde68a]/40 dark:hover:bg-slate-700'} {idx !== current && 'border-[#0284c7]/15'}"
      >
        <span
          class="text-[10px] font-mono font-black w-6 h-6 shrink-0 inline-flex items-center justify-center border {idx === current
            ? 'border-white/70 text-white'
            : 'border-[#0284c7]/40 text-[#0284c7] dark:text-sky-300'} rounded-sm"
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span class="font-bold text-sm truncate">
          {item.title} — {item.artist}
        </span>
      </button>
    {/each}
  </div>
{/if}
