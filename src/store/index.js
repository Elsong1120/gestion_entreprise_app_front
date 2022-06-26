import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggin: true,
    showRegister: false,
    companyDatas: {
      valid: true,
      countryCode: "",
      vatNumber: "",
      name: "",
      address: {
        street: "",
        number: "",
        zip_code: "",
        city: "",
        country: "",
        countryCode: "",
      },
      strAddress: "",
    },
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {},
  modules: {},
});
