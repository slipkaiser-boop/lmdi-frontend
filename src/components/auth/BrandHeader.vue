<script setup lang="ts">
interface Props {
  icon?: string;
  title: string;
  subtitle?: string;
  iconColor?: 'primary' | 'success' | 'warning' | 'danger';
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'primary',
});

const iconColorClasses = {
  primary: 'bg-cerulean-500/10 border-cerulean-500/20 text-cerulean-400',
  success: 'bg-tropical-teal-500/10 border-tropical-teal-500/20 text-tropical-teal-400',
  warning: 'bg-cornsilk-500/10 border-cornsilk-500/20 text-cornsilk-400',
  danger: 'bg-red-500/10 border-red-500/20 text-red-400',
};
</script>

<template>
  <div class="flex flex-col items-center text-center mb-10 space-y-5">
    <!-- Ícone (se fornecido) -->
    <div 
      v-if="icon"
      class="w-16 h-16 rounded-2xl border flex items-center justify-center transition-transform hover:scale-105"
      :class="iconColorClasses[iconColor]"
    >
      <i :class="`pi ${icon} text-3xl`" />
    </div>

    <!-- Título -->
    <div class="space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        {{ title }}
      </h2>

      <p 
        v-if="subtitle"
        class="text-sm sm:text-base text-ash-grey-300 leading-relaxed max-w-sm mx-auto"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>