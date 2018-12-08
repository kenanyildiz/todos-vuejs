<template>
  <section class="main" v-show="todos.length">
    <input class="toggle-all" type="checkbox" autofocus>
    <todos></todos>
  </section>
</template>

<script>
import * as types from "@/types"
import Todos from "@/components/todo/Todos.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppBody",
  components: {
    Todos
  },
  computed: {
    ...mapGetters({
      todos: types.TODOS
    })
  }
};
</script>

<style scoped>
</style>
