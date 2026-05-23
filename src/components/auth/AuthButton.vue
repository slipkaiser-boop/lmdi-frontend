<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: true,
  type: 'button',
});

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-cerulean-600 hover:bg-cerulean-500 text-white shadow-lg shadow-cerulean-900/30 hover:shadow-cerulean-900/50',
    secondary: 'bg-tropical-teal-600 hover:bg-tropical-teal-500 text-white shadow-lg shadow-tropical-teal-900/30',
    outline: 'bg-transparent border-2 border-cerulean-500/30 hover:border-cerulean-500 hover:bg-cerulean-500/5 text-cerulean-400',
    ghost: 'bg-ink-black-800/50 hover:bg-ink-black-700/50 text-ash-grey-200 border border-ink-black-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return [
    base,
    variants[props.variant],
    sizes[props.size],
    props.fullWidth ? 'w-full' : '',
  ].join(' ');
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
  >
    <!-- Loading Spinner -->
    <i v-if="loading" class="pi pi-spin pi-spinner" />
    
    <!-- Icon (se não estiver loading) -->
    <i v-else-if="icon" :class="`pi ${icon}`" />

    <!-- Slot de conteúdo -->
    <slot />
  </button>
</template>