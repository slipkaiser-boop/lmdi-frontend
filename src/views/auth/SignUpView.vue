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
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

// Sidebar Content
const sidebarContent = {
  badge: "Painel Docente",
  title: "Automatize a correção das suas provas.",
  description:
    "Gestão de gabaritos, análise de submissões e acompanhamento em tempo real.",
};

async function handleSignup() {
  loading.value = true;
  errorMessage.value = "";

  try {
    await api.post("/auth/signup", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push("/signin");
  } catch (error: any) {
    if (error.response?.data) {
      const data = error.response.data;
      errorMessage.value = data.details
        ? data.error || "Verifique os dados preenchidos."
        : data.error || data.message || "Erro ao cadastrar.";
    } else {
      errorMessage.value = "Erro de conexão. Tente novamente.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout
    show-sidebar
    :sidebar-content="sidebarContent"
    background-image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
  >
    <AuthCard max-width="md">
      <!-- Header -->
      <BrandHeader
        title="Crie sua conta"
        subtitle="Preencha seus dados para começar a usar o LetMeDoIt."
      />

      <!-- Alert de Erro -->
      <AlertMessage v-if="errorMessage" type="error" class="mb-6">
        {{ errorMessage }}
      </AlertMessage>

      <!-- Formulário -->
      <form @submit.prevent="handleSignup" class="space-y-5">
        <AuthInput
          v-model="name"
          type="text"
          label="Nome Completo"
          placeholder="Ex: João Silva"
          icon="pi-user"
          required
        />

        <AuthInput
          v-model="email"
          type="email"
          label="E-mail"
          placeholder="exemplo@escola.com"
          icon="pi-envelope"
          required
        />

        <AuthInput
          v-model="password"
          type="password"
          label="Senha"
          placeholder="Mínimo 6 caracteres"
          icon="pi-lock"
          required
        />

        <AuthButton
          type="submit"
          :loading="loading"
          variant="primary"
          size="lg"
          class="mt-8"
        >
          {{ loading ? "Criando conta..." : "Criar Conta" }}
        </AuthButton>
      </form>

      <!-- Footer -->
      <div class="mt-8 pt-6 border-t border-ink-black-800 text-center">
        <p class="text-sm text-ash-grey-400">
          Já possui uma conta?
          <RouterLink
            to="/signin"
            class="font-semibold text-cerulean-400 hover:text-cerulean-300 transition-colors ml-1"
          >
            Entrar agora
          </RouterLink>
        </p>
      </div>
    </AuthCard>
  </AuthLayout>
</template>
