<script setup lang="ts">
interface Props {
  maxWidth?: 'sm' | 'md' | 'lg';
  showMobileLogo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'md',
  showMobileLogo: true,
});

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};
</script>

<template>
  <div class="w-full" :class="widthClasses[maxWidth]">
    <!-- Mobile Logo (apenas em telas pequenas) -->
    <div 
      v-if="showMobileLogo"
      class="lg:hidden flex flex-col items-center mb-10 gap-5 animate-fade-up"
    >
      <div 
        class="w-20 h-20 rounded-2xl bg-gradient-to-br from-cerulean-500/20 to-tropical-teal-500/10 border border-cerulean-400/30 flex items-center justify-center p-3 shadow-[0_0_60px_rgba(80,151,175,0.25)]"
      >
        <img
          src="/logo.png"
          alt="Logo"
          class="w-full h-full object-contain"
        />
      </div>

      <h1 class="text-2xl font-bold text-white">
        LetMe<span class="text-cerulean-400">DoIt</span>
      </h1>
    </div>

    <!-- Card Principal -->
    <div 
      class="relative bg-ink-black-900/60 backdrop-blur-2xl ring-1 ring-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] animate-fade-up"
      style="animation-delay: 0.1s"
    >
      <!-- Glow Effect (sutil) -->
      <div class="absolute -inset-px bg-gradient-to-b from-cerulean-500/10 to-transparent rounded-3xl -z-10 blur-sm" />

      <slot />
    </div>
  </div>
</template>