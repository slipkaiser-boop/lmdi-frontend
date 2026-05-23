<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";
import AuthLayout from "@/components/auth/AuthLayout.vue";
import AuthCard from "@/components/auth/AuthCard.vue";
import BrandHeader from "@/components/auth/BrandHeader.vue";
import AuthInput from "@/components/auth/AuthInput.vue";
import AuthButton from "@/components/auth/AuthButton.vue";
import AlertMessage from "@/components/auth/AlertMessage.vue";

const route = useRoute();
const token = route.params.token;

const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function handleResetPassword() {
  errorMessage.value = "";
  successMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "As senhas não coincidem!";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "A senha deve ter no mínimo 6 caracteres.";
    return;
  }

  try {
    loading.value = true;
    await api.post(`/auth/reset-password/${token}`, {
      password: password.value,
    });

    successMessage.value =
      "Senha alterada com sucesso! Você já pode acessar sua conta.";
    password.value = "";
    confirmPassword.value = "";
  } catch (error) {
    errorMessage.value =
      "Erro ao redefinir senha. O link pode ter expirado ou ser inválido.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout
    background-image="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
  >
    <AuthCard max-width="md">
      <!-- Header -->
      <BrandHeader
        icon="pi-shield"
        icon-color="success"
        title="Nova Senha"
        subtitle="Quase lá! Escolha uma senha segura para voltar aos estudos."
      />

      <!-- Success Message -->
      <AlertMessage
        v-if="successMessage"
        type="success"
        title="Senha Redefinida!"
        class="mb-6"
      >
        <p class="mb-4">{{ successMessage }}</p>

        <RouterLink to="/signin">
          <AuthButton variant="secondary" size="md" full-width>
            Fazer Login
          </AuthButton>
        </RouterLink>
      </AlertMessage>

      <!-- Error Message -->
      <AlertMessage v-else-if="errorMessage" type="error" class="mb-6">
        {{ errorMessage }}
      </AlertMessage>

      <!-- Formulário (apenas se não houver sucesso) -->
      <form
        v-if="!successMessage"
        @submit.prevent="handleResetPassword"
        class="space-y-5"
      >
        <AuthInput
          v-model="password"
          type="password"
          label="Nova Senha"
          placeholder="Mínimo 6 caracteres"
          icon="pi-lock"
          required
        />

        <AuthInput
          v-model="confirmPassword"
          type="password"
          label="Confirmar Senha"
          placeholder="Digite a senha novamente"
          icon="pi-lock-open"
          required
        />

        <!-- Password Strength Indicator -->
        <div v-if="password.length > 0" class="space-y-2 animate-slide-in">
          <div class="flex gap-1">
            <div
              class="h-1 flex-1 rounded-full transition-all"
              :class="
                password.length >= 6
                  ? 'bg-tropical-teal-500'
                  : 'bg-ink-black-700'
              "
            />
            <div
              class="h-1 flex-1 rounded-full transition-all"
              :class="
                password.length >= 8
                  ? 'bg-tropical-teal-500'
                  : 'bg-ink-black-700'
              "
            />
            <div
              class="h-1 flex-1 rounded-full transition-all"
              :class="
                password.length >= 10
                  ? 'bg-tropical-teal-500'
                  : 'bg-ink-black-700'
              "
            />
          </div>
          <p class="text-xs text-ash-grey-500">
            {{
              password.length >= 10
                ? "Senha forte"
                : password.length >= 8
                  ? "Senha média"
                  : "Senha fraca"
            }}
          </p>
        </div>

        <AuthButton
          type="submit"
          :loading="loading"
          variant="primary"
          size="lg"
          class="mt-8"
        >
          {{ loading ? "Salvando..." : "Redefinir Senha" }}
        </AuthButton>
      </form>

      <!-- Footer (apenas se não houver sucesso) -->
      <div v-if="!successMessage" class="mt-8 text-center">
        <RouterLink
          to="/signin"
          class="inline-flex items-center gap-2 text-sm font-semibold text-ash-grey-400 hover:text-cerulean-400 transition-colors"
        >
          <i class="pi pi-arrow-left text-xs" />
          Voltar ao Login
        </RouterLink>
      </div>
    </AuthCard>
  </AuthLayout>
</template>
