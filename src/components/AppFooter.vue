<template>
  <footer class="footer" v-show="filteredTodos.length || todos.length">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count" v-show="active"><strong class="count">{{ active }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li v-for="(item, index) in filters" :key="index">
        <a :class="{ 'selected': item.isSelected }" :href="item.href"
           @click="changeActiveFilter({ filterBy: item.id })">{{ item.text }}</a>
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
import { utilityMixin } from "../utility.mixin";

export default {
  name: "AppFooter",
  mixins: [utilityMixin],
  data() {
    return {
      filters: [
        {
          isSelected: false,
          id: "all",
          text: "All",
          href: "#/all"
        },
        {
          isSelected: false,
          id: "active",
          text: "Active",
          href: "#/active"
        },
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
    }),
    active() {
      return this.getFilteredTodos({ filterBy: "active" }).length;
    },
    remaining() {
      return this.getFilteredTodos({ filterBy: "completed" }).length;
    }
  },
  methods: {
    ...mapActions({
      clearCompleted: types["ACTIONS_CLEAR_COMPLETED"],
      markAllCompleted: types["ACTIONS_MARK_ALL_COMPLETED"]
    })
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
