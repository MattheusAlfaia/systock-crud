<template>
  <v-dialog max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Novo Usuário</v-card-title>
      <v-form validate-on="lazy input" ref="form" @submit.prevent="submit">
        <v-card-text>
          <v-text-field
            v-model="userModal.name"
            :rules="validateName"
            label="Nome"
            required
            :error-messages="errors.name"
          ></v-text-field>
          <v-text-field
            v-model="userModal.email"
            :rules="validateEmail"
            label="E-mail"
            required
            :error-messages="errors.email"
          ></v-text-field>
          <v-text-field
            v-model="userModal.cpf"
            :rules="validateCpf"
            label="CPF"
            required
            :error-messages="errors.cpf"
            maxlength="14"
          />
          <v-text-field
            v-model="userModal.password"
            :rules="validatePassword"
            label="Senha"
            required
            :error-messages="errors.password"
          ></v-text-field>
          <v-text-field
            v-model="userModal.password_confirmation"
            :rules="validatePassword"
            label="Confirme a senha"
            required
            :error-messages="errors.password_confirmation"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue-darken-1" text @click="closeModal()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" text type="submit"> Salvar </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { User } from "@/types/user";
import { UserService } from "@/services/userService";

const emit = defineEmits(["refreshData"]);

const props = defineProps<{
  closeModal: Function;
}>();

const userModal = ref<User>({
  name: "",
  email: "",
  cpf: "",
  password: "",
  password_confirmation: "",
});

const validateName = [
  (value: string) => {
    if (value) return true;
    return "Nome é obrigatório.";
  },
  (value: string) => {
    if (value.length <= 255) return true;
    return "Nome deve ter no máximo 255 caracteres.";
  },
];
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
const validateCpf = [
  (value: string) => {
    if (value) return true;
    return "CPF é obrigatório.";
  },
  (value: string) => {
    if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) return true;
    return "CPF inválido.";
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

watch(() => userModal.value.cpf, (newCpf) => {
  userModal.value.cpf = formatCpf(newCpf);
});

const formatCpf = (cpf: string) => {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2');
};

const errors = reactive({
  enabled: false,
  message: "",
  name: "",
  email: "",
  cpf: "",
  password: "",
  password_confirmation: "",
});

const form = ref<any>(null);
const submit = async () => {
  try {
    await form.value.validate();
    await UserService.createUser(userModal.value);
    emit("refreshData");
    props.closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response);
  }
};
</script>
