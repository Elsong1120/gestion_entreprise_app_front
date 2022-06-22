<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon
      @click.stop="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Company</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        style="background:none; box-shadow:none;"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="mr-2">mdi-account-circle</v-icon>

          John Leider
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list color="indigo" dark>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          @click="isLoggin = false"
        >
          <v-list-item-title class="text-uppercase">{{
            item
          }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon color="red">mdi-power</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon @click="toggle_dark_mode">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      items: ["log out"],
    };
  },
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
  },
  computed: {
    ...mapFields(["isLoggin"]),
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
};
</script>
