<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  label?: string;
  icon?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputClasses = computed(() => [
  "w-full px-4 py-3.5 bg-ink-black-950/50 border rounded-xl text-white placeholder-ash-grey-600 outline-none transition-all duration-200",
  props.icon ? "pl-11" : "",
  props.error
    ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    : "border-ink-black-700/50 focus:border-cerulean-500 focus:ring-2 focus:ring-cerulean-500/20 hover:border-ink-black-600",
  props.disabled ? "opacity-50 cursor-not-allowed" : "",
]);
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      class="block text-xs font-semibold uppercase tracking-wider text-ash-grey-400 ml-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-400 ml-0.5">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative group">
      <!-- Ícone -->
      <i
        v-if="icon"
        :class="`pi ${icon}`"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-ash-grey-500 text-sm transition-colors group-focus-within:text-cerulean-400"
      />

      <!-- Input -->
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>

    <!-- Error Message -->
    <p
      v-if="error"
      class="text-xs text-red-400 ml-1 flex items-center gap-1.5 animate-slide-in"
    >
      <i class="pi pi-exclamation-circle text-[10px]" />
      {{ error }}
    </p>
  </div>
</template>
