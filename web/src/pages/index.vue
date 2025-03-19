<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <div class="d-flex align-center">
          <h1 class="text-h4 md:text-h6 font-weight-bold">Systock</h1>
        </div>
        <v-spacer></v-spacer>
        <v-responsive max-width="160">
          <v-avatar class="" color="grey-darken-1" size="32"
            ><span class="text-h6">{{ user.name ? user.name[0] + user.name[1] : "U"}}</span>
          </v-avatar>
          <v-btn color="error" dark @click="logout">Sair</v-btn>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-2">
      <v-container>
        <v-row>
         <DataTable v-show="users" :items="users" @refreshData="getDataUsers" />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { UserService } from "@/services/userService";

const router = useRouter();
const authStore = useAuthStore();
const user = authStore.user;
const users = ref([]);

const logout = () => {
  try {
    authStore.logout();
    router.push("/auth/login");
  } catch (error) {
    console.error(error);
  }
};

const drawer = ref(null);

const getDataUsers = () => {
  UserService.getUsers().then((response) => {
    users.value = response;
  });
};

onMounted(() => {
  getDataUsers();
});
</script>
