<template>
  <v-container>
    <h1 class="mb-4">Informations of the company</h1>
    <v-stepper v-model="curr" color="green">
      <v-stepper-header class="overflow-x-auto d-flex justify-content-evenly">
        <v-stepper-step
          v-for="(step, n) in steps"
          :key="n"
          :complete="stepComplete(n + 1)"
          :step="n + 1"
          :rules="[(value) => !!step.valid]"
          :color="stepStatus(n + 1)"
        >
          {{ step.name }}
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-content v-for="(step, n) in steps" :step="n + 1" :key="n">
        {{ step.name }}
        <v-card color="grey lighten-1" class="mb-12">
          <v-card-text>
            <v-form :ref="'stepForm'" v-model="step.valid" lazy-validation>
              <template v-for="(fieldName, index) in step.fieldnames">
                <v-text-field
                  v-if="step.name == 'Company'"
                  :key="index"
                  :label="fieldName + '...'"
                  :rules="step.rules"
                  @blur="fieldName == 'VAT Number' ? checkVatNumber() : ''"
                  v-model="companyDatas[tabNameRef[index]]"
                ></v-text-field>
                <v-text-field
                  v-else
                  :key="index"
                  :label="fieldName + '...'"
                  :rules="step.rules"
                  v-model="contactPersonDatas[tabNameRef2[index]]"
                ></v-text-field>
              </template>
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn
          v-if="n + 1 < lastStep"
          color="primary"
          @click="validate(n)"
          :disabled="!step.valid"
          >Continue</v-btn
        >
        <v-btn v-else color="success" @click="done()">Done</v-btn>
        <v-btn text @click="curr > 1 ? (curr = n) : ''">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
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
    tabNameRef2: ["email", "nom", "num"],
    companyDatas: {
      valid: null,
      vatNumber: "",
      name: "",
      street: "",
      number: "",
      zip_code: "",
      city: "",
      country: "",
      countryCode: "",

      strAddress: "",
    },
    contactPersonDatas: {
      email: "",
      nom: "",
      num: "",
    },
    curr: 1,
    lastStep: 2,
    steps: [
      {
        name: "Company",
        rules: [(v) => !!v || "Required."],
        valid: true,
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
      },
      {
        name: "Person of contact",
        rules: [(v) => !!v || "Required."],
        valid: true,
        fieldnames: ["email", "name", "phone number"],
      },
    ],
    valid: false,
    stepForm: [],
  }),
  computed: {
    ...mapFields(["profileCompleted"]),
  },
  methods: {
    checkVatNumber() {
      let vatNumber = this.companyDatas.vatNumber;
      console.log(vatNumber);
      axios
        .get(
          //   "http://13.38.138.92/api/companies/" +
          //     this.companyDatas.num_tva +
          //     "/info"
          " http://127.0.0.1:8000/api/v1/vatnumber/" + vatNumber + "/check"
        )
        .then((response) => {
          console.log("controler", response);
          let RequestisValid = response.status == 200 && response.data.valid;
          if (RequestisValid) {
            this.companyDatas.vatNumber = response.data.vatNumber;
            this.companyDatas.name = response.data.name;
            this.companyDatas.strAddress = response.data.strAddress;
            this.companyDatas.city = response.data.address.city;
            this.companyDatas.zip_code = response.data.address.zip_code;
            this.companyDatas.country = response.data.address.country;
          }

          console.log(vatNumber);
        });
    },
    stepComplete(step) {
      return this.curr > step;
    },
    stepStatus(step) {
      return this.curr > step ? "green" : "blue";
    },
    validate(n) {
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v) {
        this.steps[n].valid = true;
        if (n == 1) this.profileCompleted = true;
        // continue to next
        this.curr = n + 2;
      }
      localStorage.setItem("companyDatas", JSON.stringify(this.companyDatas));
      localStorage.setItem(
        "contactPersonDatas",
        JSON.stringify(this.contactPersonDatas)
      );
    },
    done() {
      this.validate(1);

      this.curr = 2;
      this.$router.push({ path: "/dashboard/profilecompany" });
    },
  },
};
</script>

<style></style>
