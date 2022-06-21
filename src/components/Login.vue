<template>
  <v-app>
    <v-app-bar app dark color="blue">
      <v-toolbar-title>Vue Login</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn text rounded>Home</v-btn>
            <v-btn text rounded>Login</v-btn>
            <v-btn text rounded>About</v-btn>
            <v-btn text rounded>Contact us</v-btn> -->
      <v-btn icon @click="toggle_dark_mode">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <login-card v-if="!showRegister"></login-card>
      <register-card v-if="showRegister"></register-card>
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import RegisterCard from "./RegisterCard.vue";
import LoginCard from "./LoginCard.vue";
export default {
  name: "Login",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      showPassword: false,
    };
  },
  components: {
    "register-card": RegisterCard,
    "login-card": LoginCard,
  },
  computed: {
    ...mapFields(["isLoggin", "showRegister"]),
  },
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },

    logginUser() {
      this.isLoggin = true;
    },
  },
};
</script>
