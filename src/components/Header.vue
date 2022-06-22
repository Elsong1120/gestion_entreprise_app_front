<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon
      @click.stop="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Company</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- start -->
    <v-list color="indigo mt-5" dark>
      <v-list-group :value="true" prepend-icon="mdi-account-circle">
        <template v-slot:activator>
          <v-list-item-title>John Leider</v-list-item-title>
        </template>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase"
              >Log out</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-icon class="w-25">
            <v-icon color="red">mdi-power</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-btn icon @click="toggle_dark_mode">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
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
