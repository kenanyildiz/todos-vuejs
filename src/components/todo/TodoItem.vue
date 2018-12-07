<template>
  <!-- These are here just to show the structure of the list items -->
  <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
  <li :class="{ 'completed': todo.completed, 'editing': editable }"><!-- completed -->
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.checked" v-model="todo.checked" @change="updateTodo"><!-- checked -->
      <label @dblclick="makeEditable">{{ todo.title }}</label>
      <button class="destroy" @click="removeTodo"></button>
    </div>
    <input class="edit" ref="editTodo" v-model.trim="todo.title" @keyup.enter="updateTodo">
  </li>
</template>

<script>
import * as types from "@/types";
import { mapActions } from "vuex";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      editable: false
    };
  },
  methods: {
    ...mapActions({
      _updateTodo: types.ACTIONS_UPDATE_TODO,
      _removeTodo: types.ACTIONS_REMOVE_TODO
    }),
    makeEditable() {
      this.editable = true;
    },
    updateTodo() {
      if (this.todo.title) {
        this.todo.completed = this.todo.checked;
        this._updateTodo(this.todo);
        this.editable = false;
      }
    },
    removeTodo() {
      this._removeTodo({ id: this.todo.id });
    },
    blurInput() {
      this.$refs.editTodo.blur();
    }
  }
};
</script>

<style scoped>
</style>
