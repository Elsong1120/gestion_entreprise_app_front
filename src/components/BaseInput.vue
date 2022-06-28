<template>
    <label class="block">
        <span class="text-gray-700"
              v-if="label"
              v-text="label"
        ></span>
        <input class="form-input bg-gray-200 border-gray-300 focus:border-indigo-400 focus:shadow-none focus:bg-white mt-1 block w-full"
               :type="type"
               :value="value"
               @input="$emit('input', $event.target.value)"
               :placeholder="placeholder"
               :required="required"
        >
    </label>
</template>

<template>
  <v-tabs fixed-tabs background-color="indigo" dark>
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab> Profile company </v-tab>

    <v-tab-items v-model="tab">
      <v-tab-item>
        <v-card color="grey lighten-1" class="mb-12">
          <v-card-text>
            <v-form>
              <v-text-field
                v-for="(companydata, index) in companyDatas"
                :key="index"
                v-model="companyDatas[tabNameRef[idex]]"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tab-items>
    <v-tab> Person of contact </v-tab>
  </v-tabs>
</template>
<script>
    export default {
        name: "BaseInput",
        props: {
            value: null,
            label: String,
            placeholder: String,
            required: String,
            type: {
                type: String,
                default: 'text',
            }
        }
    }
</script>

<style scoped>
</style>