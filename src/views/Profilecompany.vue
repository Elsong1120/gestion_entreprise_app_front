<template>
  <v-card>
    <v-toolbar color="cyan" dark flat>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Your Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card v-if="item == 'Profile'">
          <v-card-text>
            <v-form>
              <v-text-field
                v-for="(fieldName, index) in tabNameRef"
                :key="index"
                :label="fieldnames[index] + '...'"
                v-model="companyDatas[tabNameRef[index]]"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-text>
            <v-form>
              <v-text-field
                v-for="(fieldName, index) in tabNameRef2"
                :key="index"
                :label="fieldName + '...'"
                v-model="contactPersonDatas[tabNameRef2[index]]"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapFields } from "vuex-map-fields";

// import BaseInput from "../components/BaseInput.vue";
// import BasePanel from "../components/BasePanel.vue";
export default {
  //   components: {
  //     BaseInput,
  //     BasePanel,
  //   },
  beforeMount() {
    if (
      localStorage.getItem("companyDatas") &&
      localStorage.getItem("contactPersonDatas")
    ) {
      this.companyDatas = JSON.parse(localStorage.getItem("companyDatas"));
      this.contactPersonDatas = JSON.parse(
        localStorage.getItem("contactPersonDatas")
      );
    }
  },
  data: () => ({
    tab: null,
    items: ["Profile", "Person of contact"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

    tabNameRef: [
      "vatNumber",
      "name",
      "activity",
      "strAddress",
      "city",
      "zip_code",
      "country",
      "fix_number",
    ],
    fieldnames: [
      "VAT Number",
      "Company Name",
      "Activity",
      "Adress",
      "City",
      "Postcode",
      "Country",
      "Fix line Number",
    ],
    tabNameRef2: ["email", "nom", "num"],

    fieldnames2: [["email", "name", "phone number"]],
  }),

  computed: {
    ...mapFields(["companyDatas", "contactPersonDatas"]),
  },
};
</script>

<style></style>
