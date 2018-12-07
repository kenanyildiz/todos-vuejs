<template>
  <footer class="footer" :class="{ 'hidden': !todos.length }">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong class="count">0</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a :class="{ 'selected': activeFilter === 'ALL' }" href="#/" @click="filterBy('ALL')">All</a>
      </li>
      <li>
        <a  :class="{ 'selected': activeFilter === 'ACTIVE' }" href="#/active" @click="filterBy('ACTIVE')">Active</a>
      </li>
      <li>
        <a  :class="{ 'selected': activeFilter === 'COMPLETED' }" href="#/completed" @click="filterBy('COMPLETED')">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed">Clear completed</button>
    <label for="toggle-all" id="markAllCompleted">Mark all as complete</label>
  </footer>
</template>

<script>
import * as types from "@/types";
import { mapGetters } from "vuex";

export default {
  name: "AppFooter",
  computed: {
    ...mapGetters({
      todos: types.TODOS
    })
  },
  data() {
    return {
      activeFilter: "ALL"
    };
  },
  methods: {
    filterBy($filter) {
      this.activeFilter = $filter;
      this.todos = this.getFilteredTodos({ filterBy: this.activeFilter });
    }
  },
  created() {
    this.filterBy("ALL")
  }
};
</script>

<style scoped lang="scss">
.footer {
  min-height: 20px;
  height: auto;
}

label[for="toggle-all"] {
  clear: both;
  margin-top: 28px;
  position: relative;
}
</style>
