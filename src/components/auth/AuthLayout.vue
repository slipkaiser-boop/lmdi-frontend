<script setup lang="ts">
import { computed } from "vue";

interface Props {
  backgroundImage?: string;
  showSidebar?: boolean;
  sidebarContent?: {
    badge?: string;
    title: string;
    description: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  backgroundImage:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
  showSidebar: false,
});

const bgGradient = computed(() =>
  props.showSidebar
    ? "from-ink-black-950/95 via-ink-black-900/90 to-cerulean-900/40"
    : "from-ink-black-950/90 to-ink-black-900/85",
);
</script>

<template>
  <div
    class="relative min-h-screen w-full flex overflow-hidden bg-ink-black-950 font-sans"
  >
    <!-- Background Image -->
    <img
      :src="backgroundImage"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
    />

    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br z-10 transition-all duration-700"
      :class="bgGradient"
    />

    <!-- Decorative Elements -->
    <div
      class="absolute top-0 right-0 w-[600px] h-[600px] bg-cerulean-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 z-10 animate-pulse-soft"
    />
    <div
      class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tropical-teal-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 z-10 animate-pulse-soft"
    />

    <!-- Sidebar (apenas em telas grandes quando habilitado) -->
    <aside
      v-if="showSidebar && sidebarContent"
      class="hidden lg:flex lg:w-5/12 xl:w-1/2 relative z-20 flex-col justify-between p-12 xl:p-16"
    >
      <slot name="sidebar-top">
        <!-- Logo + Nome -->
        <div class="flex items-center gap-6">
          <div
            class="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl bg-gradient-to-br from-cerulean-500/20 to-tropical-teal-500/10 border border-cerulean-400/30 flex items-center justify-center p-4 shadow-[0_0_80px_rgba(80,151,175,0.3)] backdrop-blur-sm"
          >
            <img
              src="/logo.png"
              alt="Logo"
              class="w-full h-full object-contain"
            />
          </div>

          <h1
            class="text-4xl xl:text-5xl font-extrabold text-white leading-none"
          >
            Let Me<span class="text-cerulean-400">Do It!</span>
          </h1>
        </div>
      </slot>

      <!-- Conteúdo Principal -->
      <div class="mt-auto max-w-xl space-y-8">
        <div
          v-if="sidebarContent.badge"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cerulean-500/10 border border-cerulean-400/20 text-cerulean-100 text-sm backdrop-blur-sm"
        >
          <i class="pi pi-sparkles text-xs" />
          <span>{{ sidebarContent.badge }}</span>
        </div>

        <h2
          class="text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight"
        >
          {{ sidebarContent.title }}
        </h2>

        <p class="text-lg xl:text-xl text-ash-grey-200 leading-relaxed">
          {{ sidebarContent.description }}
        </p>

        <!-- Decorative dots -->
        <div class="flex gap-2 pt-4">
          <div class="w-2 h-2 rounded-full bg-cerulean-400" />
          <div class="w-2 h-2 rounded-full bg-tropical-teal-400" />
          <div class="w-2 h-2 rounded-full bg-ash-grey-400" />
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main
      class="flex-1 relative z-20 flex items-center justify-center p-6 sm:p-12"
      :class="showSidebar ? 'lg:w-7/12 xl:w-1/2' : 'w-full'"
    >
      <slot />
    </main>
  </div>
</template>
