<template>
    <div>
        <Login v-if="!isLoggin" />
        <Main v-if="isLoggin" />
    </div>
</template>

<script>
import Login from "./components/Login.vue";
import Main from "./components/Main.vue";
import { mapFields } from 'vuex-map-fields';
export default {
    name: "App",

    components: {
        Login,
        Main,
    },

    computed:{
    ...mapFields([
        'isLoggin'
    ]),
    }
};
</script>
