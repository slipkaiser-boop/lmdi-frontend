<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import AuthLayout from "@/components/auth/AuthLayout.vue";
import AuthCard from "@/components/auth/AuthCard.vue";
import BrandHeader from "@/components/auth/BrandHeader.vue";
import AuthInput from "@/components/auth/AuthInput.vue";
import AuthButton from "@/components/auth/AuthButton.vue";
import AlertMessage from "@/components/auth/AlertMessage.vue";

const router = useRouter();

// Form State
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

async function handleLogin() {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.post("/auth/signin", {
      email: email.value,
      password: password.value,
    });

    const { id, name, token } = response.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("username", name);
    localStorage.setItem("userId", id);

    router.push("/");
  } catch (error: any) {
    if (error.response?.data) {
      const data = error.response.data;
      errorMessage.value = data.details
        ? data.error || "Dados inválidos."
        : data.error || data.message || "Credenciais incorretas.";
    } else {
      errorMessage.value = "Erro de conexão. Verifique sua internet.";
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <AuthLayout
    background-image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop"
  >
    <AuthCard max-width="md">
      <!-- Header -->
      <BrandHeader
        title="Bem-vindo de volta"
        subtitle="Acesse sua conta para continuar gerenciando suas provas."
      />

      <!-- Alert de Erro -->
      <AlertMessage v-if="errorMessage" type="error" class="mb-6">
        {{ errorMessage }}
      </AlertMessage>

      <!-- Formulário -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <AuthInput
          v-model="email"
          type="email"
          label="E-mail"
          placeholder="seu@email.com"
          icon="pi-envelope"
          required
        />

        <div class="space-y-2">
          <AuthInput
            v-model="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            icon="pi-lock"
            required
          />

          <div class="flex justify-end">
            <RouterLink
              to="/forgot-password"
              class="text-xs font-semibold text-cerulean-400 hover:text-cerulean-300 transition-colors"
            >
              Esqueceu sua senha?
            </RouterLink>
          </div>
        </div>

        <AuthButton
          type="submit"
          :loading="isLoading"
          variant="primary"
          size="lg"
          class="mt-8"
        >
          {{ isLoading ? "Entrando..." : "Entrar" }}
        </AuthButton>
      </form>

      <!-- Divider -->
      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-ink-black-800" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-ink-black-900 px-3 text-ash-grey-500 font-semibold"
            >ou</span
          >
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-sm text-ash-grey-400">
          Novo por aqui?
          <RouterLink
            to="/signup"
            class="font-semibold text-cerulean-400 hover:text-cerulean-300 transition-colors ml-1"
          >
            Criar conta gratuita
          </RouterLink>
        </p>
      </div>
    </AuthCard>
  </AuthLayout>
</template>
