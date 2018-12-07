<template>
  <ul class="todo-list">
    <todo-item v-for="(todo, index) in filteredTodos" :todo="todo" :key="index"></todo-item>
  </ul>
</template>

<script>
import * as types from "@/types";
import { mapGetters, mapActions } from "vuex";
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
  computed: {
    ...mapGetters({
      getFilteredTodos: types.GET_FILTERED_TODOS,
      activeFilter: types.GET_ACTIVE_FILTER
    }),
    filteredTodos: {
      get() {
        return this.getFilteredTodos({ filterBy: this.activeFilter });
      },
      set() {
        this.filteredTodos = this.getFilteredTodos({ filterBy: this.activeFilter });
      }
    }
  },
  methods: {
    ...mapActions({
      _activeFilter: types.ACTIONS_CHANGE_FILTER
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

<style scoped>
</style>
