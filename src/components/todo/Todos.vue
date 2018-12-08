<template>
  <ul class="todo-list">
    <todo-item v-for="(todo, index) in filteredTodos" :todo="todo" :key="index"></todo-item>
  </ul>
</template>

<script>
import TodoItem from "@/components/todo/TodoItem.vue";
import { utilityMixin } from "../../utility.mixin";

export default {
  name: "Todos",
  mixins: [utilityMixin],
  components: {
    TodoItem
  }
};
</script>

<style scoped>
</style>
