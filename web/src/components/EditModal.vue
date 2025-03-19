<template>
  <v-dialog max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Editar Usuário</v-card-title>
      <v-form validate-on="lazy input" @submit.prevent="sendUpdateUser" ref="form">
        <v-text-field
          v-model="updateUserForm.name"
          label="Nome"
          required
          dense
          outlined
        ></v-text-field>
        <v-text-field
          v-model="updateUserForm.email"
          label="Email"
          required
          dense
          outlined
        ></v-text-field>
        <v-text-field
          v-model="updateUserForm.cpf"
          label="CPF"
          required
          dense
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeModal"> Cancelar </v-btn>
          <v-btn class="my-4" color="green" size="large" variant="tonal" type="submit">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { User } from "@/types/user";
import { UserService } from "@/services/userService";

const emit = defineEmits(['refreshData']);

const props = defineProps<{
  userModal: User;
  closeModal: Function;
}>();

const updateUserForm = ref({
  name: "",
  email: "",
  cpf: "",
});

const erros = ref([]);

watch(
  () => props.userModal,
  (newUser) => {
    updateUserForm.value = { ...newUser };
  },
  { immediate: true }
);

const sendUpdateUser = () => {
  const updatedFields: Partial<User> = {};

  if (updateUserForm.value.name !== props.userModal.name) {
    updatedFields.name = updateUserForm.value.name;
  }
  if (updateUserForm.value.email !== props.userModal.email) {
    updatedFields.email = updateUserForm.value.email;
  }
  if (updateUserForm.value.cpf !== props.userModal.cpf) {
    updatedFields.cpf = updateUserForm.value.cpf;
  }

  if (Object.keys(updatedFields).length > 0) {
    UserService.updateUser(props.userModal.id ?? 0, updatedFields)
      .then(() => {
        emit('refreshData');
        props.closeModal();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const validationErrors = error.response.data.errors;
          alert(`Erro de validação: ${Object.values(validationErrors).join(", ")}`);
        } else {
          if(error.response.status === 422) {
            if (error.response.data.cpf || error.response.data.email || error.response.data.name) {
              alert("Erro de validação: " +
              (error.response.data.cpf || "") +
              (error.response.data.email ? ", " + error.response.data.email : "") +
              (error.response.data.name ? ", " + error.response.data.name : ""));
            }
          }
        }
      });
  } else {
    alert("Nenhum campo foi modificado.");
  }
};
</script>