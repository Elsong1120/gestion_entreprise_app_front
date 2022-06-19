<template>
    <div>
        <Login />
        <Main v-if="fasle" />
    </div>
</template>

<script>
import Login from "./Login.vue";
import Main from "./Main.vue";
export default {
    name: "App",

    components: {
        Login,
        Main,
    },
};
</script>
