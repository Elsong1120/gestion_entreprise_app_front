<template>
  <v-card width="500" class="mx-auto mt-9">
    <v-card-title>Register</v-card-title>
    <v-card-text>
      <v-form lazy-validation>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          prepend-icon="mdi-at"
        />
        <v-text-field
          :error-messages="passwordErrors"
          v-model="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="logginUser" color="success">Register</v-btn>
      <v-btn @click="showRegister = false" color="secondary">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { required, email } from "vuelidate/lib/validators";

export default {
  validations: {
    name: { required },
    email: { required, email },
    password: { required },
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      showPassword: false,
    };
  },
  computed: {
    ...mapFields(["isLoggin", "showRegister"]),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;

      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
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

<style></style>
