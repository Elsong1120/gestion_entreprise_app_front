<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item
        v-for="(dataLink, index) in navigationDatas"
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
      ],
    };
  },
};
</script>
