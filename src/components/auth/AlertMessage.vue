<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  closable: false,
});

const emit = defineEmits<{
  close: [];
}>();

const alertConfig = computed(() => {
  const configs = {
    success: {
      bg: 'bg-tropical-teal-500/10',
      border: 'border-tropical-teal-500/30',
      text: 'text-tropical-teal-300',
      icon: 'pi-check-circle',
      iconBg: 'bg-tropical-teal-500/20',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-300',
      icon: 'pi-exclamation-circle',
      iconBg: 'bg-red-500/20',
    },
    warning: {
      bg: 'bg-cornsilk-500/10',
      border: 'border-cornsilk-500/30',
      text: 'text-cornsilk-300',
      icon: 'pi-exclamation-triangle',
      iconBg: 'bg-cornsilk-500/20',
    },
    info: {
      bg: 'bg-cerulean-500/10',
      border: 'border-cerulean-500/30',
      text: 'text-cerulean-300',
      icon: 'pi-info-circle',
      iconBg: 'bg-cerulean-500/20',
    },
  };

  return configs[props.type];
});
</script>

<template>
  <div 
    class="rounded-xl border p-4 animate-slide-in"
    :class="[alertConfig.bg, alertConfig.border, alertConfig.text]"
  >
    <div class="flex items-start gap-3">
      <!-- Ícone -->
      <div 
        class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        :class="alertConfig.iconBg"
      >
        <i :class="`pi ${alertConfig.icon} text-lg`" />
      </div>

      <!-- Conteúdo -->
      <div class="flex-1 min-w-0 pt-0.5">
        <h4 
          v-if="title"
          class="font-semibold mb-1 text-white"
        >
          {{ title }}
        </h4>

        <div class="text-sm leading-relaxed">
          <slot />
        </div>
      </div>

      <!-- Botão Fechar -->
      <button
        v-if="closable"
        @click="emit('close')"
        class="text-current opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 p-1"
      >
        <i class="pi pi-times text-sm" />
      </button>
    </div>
  </div>
</template>