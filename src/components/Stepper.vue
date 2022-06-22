<template>
  <v-container>
    <h1 class="mb-4">Informations of the company</h1>
    <v-stepper v-model="curr" color="green">
      <v-stepper-header class="overflow-x-auto">
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
              <v-text-field
                v-for="(fieldName, index) in step.fieldnames"
                :key="index"
                :label="fieldName + '...'"
                :rules="step.rules"
              ></v-text-field>
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
        <v-btn text @click="curr = n">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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

      { name: "Complete" },
    ],
    valid: false,
    stepForm: [],
  }),
  methods: {
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
        // continue to next
        this.curr = n + 2;
      }
    },
    done() {
      this.curr = 5;
    },
  },
};
</script>

<style></style>
