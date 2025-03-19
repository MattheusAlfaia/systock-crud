<template>
  <v-data-table-virtual :items="props.items" :headers="headers" fixed-header>
    <template v-slot:top>
      <v-toolbar flat class="d-flex align-center gap-4">
        <v-toolbar-title>
          <v-icon icon="mdi-account-group"></v-icon>
        </v-toolbar-title>
        <v-btn color="primary" @click="openModalCreate()">Novo Usuário</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        class="ma-2"
        color="blue-darken-1"
        icon="mdi mdi-pencil-box-outline"
        variant="text"
        @click="openModalEdit(item)"
      ></v-btn>
      <v-btn
        class="ma-2"
        color="red-lighten-1"
        icon="mdi mdi-trash-can-outline"
        variant="text"
        @click="openModalDelete(item)"
      ></v-btn>
    </template>
  </v-data-table-virtual>

  <NovoUserModal
    v-model="modalNovoUser"
    :closeModal="() => (modalNovoUser = false)"
    @refreshData="getDataUsers"
    />

  <EditModal
    :userModal="userModal"
    v-model="modalEdit"
    :closeModal="() => (modalEdit = false)"
    @refreshData="getDataUsers"
  />
  <DeleteModal
    :userModal="userModal"
    v-model="modalDelete"
    :closeModal="() => (modalDelete = false)"
    @refreshData="getDataUsers"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "@/types/user";

const props = defineProps<{
  items: User[];
}>();

const headers: Array<{
  title: string;
  align?: "start" | "center" | "end";
  key: string;
  value?: (item: any) => string;
}> = [
  { title: "Nome", align: "start", key: "name" },
  { title: "E-mail", align: "start", key: "email" },
  { title: "Cpf", align: "center", key: "cpf", value: (item) => formatCpf(item.cpf) },
  { title: "Ações", align: "center", key: "actions" },
];

const formatCpf = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const emit = defineEmits(["refreshData"]);
const getDataUsers = () => {
  emit("refreshData");
};

const modalNovoUser = ref(false);
const modalEdit = ref(false);
const modalDelete = ref(false);
const userModal = ref<User>({} as User);

const openModalCreate = () => {
  modalNovoUser.value = true;
};

const openModalEdit = (item: User) => {
  modalEdit.value = true;
  userModal.value = item;
};

const openModalDelete = (item: User) => {
  modalDelete.value = true;
  userModal.value = item;
};
</script>
