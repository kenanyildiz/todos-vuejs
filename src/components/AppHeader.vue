<template>
  <header class="header">
    <h1>todos</h1>
    <new-todo></new-todo>
  </header>
</template>

<script>
import NewTodo from "@/components/todo/NewTodo";

export default {
  name: "AppHeader",
  components: {
    NewTodo
  }
};
</script>

<style scoped>
</style>
