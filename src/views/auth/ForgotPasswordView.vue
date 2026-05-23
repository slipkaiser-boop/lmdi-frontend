<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import AuthCard from '@/components/auth/AuthCard.vue';
import BrandHeader from '@/components/auth/BrandHeader.vue';
import AuthInput from '@/components/auth/AuthInput.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import AlertMessage from '@/components/auth/AlertMessage.vue';

const email = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function handleForgotPassword() {
  successMessage.value = '';
  errorMessage.value = '';

  try {
    loading.value = true;
    await api.post('/auth/forgot-password', {
      email: email.value,
    });

    successMessage.value = 'Se o e-mail estiver cadastrado, você receberá um link em breve! Verifique também sua caixa de spam.';
    email.value = '';
  } catch (error: any) {
    errorMessage.value = error.response?.data?.error || 'Erro ao processar solicitação.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout background-image="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2068&auto=format&fit=crop">
    <AuthCard max-width="md">
      <!-- Header -->
      <BrandHeader
        icon="pi-key"
        icon-color="primary"
        title="Esqueceu a senha?"
        subtitle="Não se preocupe! Informe seu e-mail e enviaremos as instruções de recuperação."
      />

      <!-- Success Message -->
      <AlertMessage 
        v-if="successMessage"
        type="success"
        title="E-mail enviado!"
        class="mb-6"
      >
        <p class="mb-4">{{ successMessage }}</p>
        
        <RouterLink to="/signin">
          <AuthButton variant="secondary" size="sm" full-width>
            Voltar para o Login
          </AuthButton>
        </RouterLink>
      </AlertMessage>

      <!-- Error Message -->
      <AlertMessage 
        v-else-if="errorMessage"
        type="error"
        class="mb-6"
      >
        {{ errorMessage }}
      </AlertMessage>

      <!-- Formulário (apenas se não houver sucesso) -->
      <form 
        v-if="!successMessage"
        @submit.prevent="handleForgotPassword" 
        class="space-y-6"
      >
        <AuthInput
          v-model="email"
          type="email"
          label="E-mail de Acesso"
          placeholder="exemplo@escola.com"
          icon="pi-envelope"
          required
        />

        <AuthButton
          type="submit"
          :loading="loading"
          variant="primary"
          size="lg"
        >
          {{ loading ? 'Enviando link...' : 'Recuperar Acesso' }}
        </AuthButton>
      </form>

      <!-- Footer (apenas se não houver sucesso) -->
      <div 
        v-if="!successMessage"
        class="mt-8 pt-6 border-t border-ink-black-800 text-center"
      >
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