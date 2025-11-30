<script lang="ts">
import {theme, type Theme} from '$lib/stores/theme';
import {Sun, Moon} from 'lucide-svelte';

function toggleTheme(){
    theme.update((currentTheme: Theme) => (currentTheme === 'light' ? 'dark' : 'light'));
}
</script>

<button
    on:click={toggleTheme}
    class="p-2 rounded-full shadow-lg bg-white/70 backdrop-blur-sm 
            text-gray-700 hover:text-indigo-600 transition-colors duration-300
            dark:bg-gray-700/70 dark:text-gray-300 dark:hover:text-indigo-400" 
    aria-label="Toggle theme"
>
    {#if $theme === 'dark'}
        <Sun class="w-6 h-6"/>
    {:else}
        <Moon class="w-6 h-6"/>
    {/if}
</button>