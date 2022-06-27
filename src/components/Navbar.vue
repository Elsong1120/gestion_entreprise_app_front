<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <template        v-for="(dataLink, index) in navigationDatas">

      <v-list-item
        v-if="index<1 || profileCompleted "
        :key="'navigation-item--' + index"
        link
        exact
        :to="dataLink.link"
      >
        <v-list-item-action>
          <v-icon>{{ dataLink.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ dataLink.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      drawer: true,

      navigationDatas: [
        {
          text: "Home",
          link: "/",
          icon: "mdi-home",
        },
        {
          text: "Profile Company",
          link: "/dashboard/profilecompany",
          icon: "mdi-domain",
        },
      ],
    };
  },

  computed: {
    ...mapFields(["profileCompleted"]),
  },
};
</script>
