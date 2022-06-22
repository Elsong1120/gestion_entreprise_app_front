<template>
  <div>
    <!-- <h1>Bienvenue sur ma page Home</h1> -->
    <stepper-component></stepper-component>
  </div>
</template>

<script>
import Stepper from "./Stepper.vue";
export default {
    name:"Home",
  components: {
    "stepper-component": Stepper,
  },
};
</script>

<style></style>
