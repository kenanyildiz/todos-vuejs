<template>
  <footer class="footer" v-show="filteredTodos.length || todos.length">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count" v-show="active"><strong class="count">{{ active }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li v-for="(item, index) in filters" :key="index">
        <a :class="{ 'selected': item.isSelected }" :href="item.href"
           @click="filterBy(item.id)">{{ item.text }}</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" v-show="remaining" @click="clearCompleted">Clear completed</button>
    <label for="toggle-all" v-show="remaining" @click="markAllCompleted">Mark all as complete</label>
  </footer>
</template>

<script>
import * as types from "@/types";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppFooter",
  data() {
    return {
      filters: [
        { isSelected: false, id: "all", text: "All", href: "#/all" },
        { isSelected: false, id: "active", text: "Active", href: "#/active" },
        {
          isSelected: false,
          id: "completed",
          text: "Completed",
          href: "#/completed"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      todos: types.TODOS,
      getFilteredTodos: types.GET_FILTERED_TODOS,
      activeFilter: types.GET_ACTIVE_FILTER
    }),
    filteredTodos: {
      get() {
        return this.getFilteredTodos({ filterBy: this.activeFilter });
      },
      set() {
        this.filteredTodos = this.getFilteredTodos({
          filterBy: this.activeFilter
        });
      }
    },
    active() {
      return this.getFilteredTodos({ filterBy: "active" }).length;
    },
    remaining() {
      return this.getFilteredTodos({ filterBy: "completed" }).length;
    }
  },
  methods: {
    ...mapActions({
      _activeFilter: types.ACTIONS_CHANGE_FILTER,
      clearCompleted: types.ACTIONS_CLEAR_COMPLETED,
      markAllCompleted: types.ACTIONS_MARK_ALL_COMPLETED
    }),
    filterBy($filter) {
      this._activeFilter($filter);
    }
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      this.filterBy(window.location.hash.split("/")[1]);
    }
  }
};
</script>

<style scoped lang="scss">
.footer {
  min-height: 20px;
  height: auto;
}

label[for="toggle-all"] {
  margin-top: 50px;
  margin-bottom: 7px;
  justify-content: center;
  display: flex;
  position: relative;
  z-index: 1;
}
</style>
