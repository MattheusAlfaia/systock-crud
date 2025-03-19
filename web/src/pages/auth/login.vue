<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card class="login-card mx-auto pa-8" elevation="8" max-width="800" rounded="lg">
      <v-form validate-on="lazy input" @submit.prevent="sendLogin(loginForm)" ref="form">
        <div class="text-center mb-6">
          <h2 class="text-h2 font-weight-bold">Systock</h2>
          <p class="text-body-1 text-medium-emphasis">Faça login para continuar</p>
        </div>

        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          required
          density="compact"
          variant="outlined"
          autocomplete="username"
          :rules="validateEmail"
          v-model="loginForm.email"
          placeholder="Digite seu e-mail"
          prepend-inner-icon="mdi-email-outline"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha
        </div>
        <v-text-field
          required
          density="compact"
          variant="outlined"
          :error="errors.enabled"
          :onclick="clearErrors"
          :rules="validatePassword"
          v-model="loginForm.password"
          autocomplete="current-password"
          placeholder="Digite sua senha"
          :error-messages="errors.message"
          :type="visible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible = !visible"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        ></v-text-field>

        <v-btn
          class="my-4"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
          :loading="loading"
        >
          Entrar
        </v-btn>

        <div class="text-center mt-4">
          <a href="#" class="text-blue text-decoration-none">Criar Conta</a>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const visible = ref(false);
const form = ref();
const loginForm = reactive({
  email: "",
  password: "",
});

const validateEmail = [
  (value: string) => {
    if (value) return true;
    return "E-mail é obrigatório.";
  },
  (value: string) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
    )
      return true;
    return "E-mail inválido.";
  },
];
const validatePassword = [
  (value: string) => {
    if (value) return true;
    return "Senha é obrigatória.";
  },
  (value: string) => {
    if (value.length >= 8) return true;
    return "A senha deve ter pelo menos 8 caracteres.";
  },
  (value: string) => {
    if (/[A-Z]/.test(value)) return true;
    return "A senha deve conter pelo menos uma letra maiúscula.";
  },
  (value: string) => {
    if (/\d/.test(value)) return true;
    return "A senha deve conter pelo menos um número.";
  },
];
const errors = reactive({
  enabled: false,
  message: "",
});
const loading = ref(false);
const sendLogin = async (loginForm: any) => {
  loading.value = true;
  try {
    await authStore.login(loginForm);
    router.push("/");
  } catch (error: any) {
    errors.enabled = true;
    // errors.message = error.response;
    errors.message = error.response.data.message;
  } finally {
    loading.value = false;
  }
};

const clearErrors = () => {
  errors.enabled = false;
  errors.message = "";
};
</script>

<style scoped>
.login-card {
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
}

.v-text-field {
  margin-bottom: 10px;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
