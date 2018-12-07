<template>
  <ul class="todo-list">
    <todo-item v-for="(todo, index) in todos" :todo="todo" :key="index"></todo-item>
  </ul>
</template>

<script>
import * as types from "@/types"
import { mapGetters } from "vuex"
import TodoItem from "@/components/todo/TodoItem.vue";

export default {
  name: "Todos",
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  computed:{
    ...mapGetters({
      getFilteredTodos: types.GET_FILTERED_TODOS
    })
  },
  created() {
    this.todos = this.getFilteredTodos({ filterBy: "ALL" });
  }
};
</script>

<style scoped>
</style>
