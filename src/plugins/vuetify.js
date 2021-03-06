import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// import '~vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi", // default - only for display purposes
    },
    theme: {
        themes: {
            light: {
                primary: "#3f51b5",
                secondary: "#696969",
                accent: "#8c9eff",
                error: "#b71c1c",
            },
        },
    },
});
