<template>
  <v-dialog max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Excluir Usuário</v-card-title>
      <v-card-text>
        <p>Deseja realmente excluir o usuário {{ userModal.name }}?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="closeModal()"> Cancelar </v-btn>
        <v-btn color="red" text @click="deleteUser(userModal)"> Excluir </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "@/types/user";
import { UserService } from "@/services/userService";

const emit = defineEmits(['refreshData']);

const props = defineProps<{
  userModal: User;
  closeModal: Function;
}>();

const { closeModal } = props;

const deleteUser = (item: User) => {
  try{
    if (item.id !== undefined) {
      UserService.deleteUser(item.id);
    } else {
      console.error("Erro: ID do usuário é indefinido.");
    }
    emit('refreshData');
    closeModal();
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error);
  }
};
</script>
