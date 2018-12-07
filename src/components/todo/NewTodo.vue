<template>
  <input class="new-todo" ref="newTodo" v-model.trim="title" placeholder="What needs to be done?"
         @keyup.esc="blurInput" @keyup.enter="addNewTodo" autofocus>
</template>

<script>
import * as types from "@/types"
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewTodo",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions({
      addTodo: types.ACTIONS_ADD_TODO
    }),
    addNewTodo() {
      if (this.title) {
        let newTodo = { id: new Date().getTime(), title: this.title };
        this.addTodo(Object.assign({}, this.defaultTodo, newTodo));
        this.resetTitle()
      }
    },
    blurInput() {
      this.$refs.newTodo.blur();
      this.resetTitle();
    },
    resetTitle() {
      this.title = "";
    }
  },
  computed: {
    ...mapGetters({
      defaultTodo: types.GET_TODO
    })
  }
};
</script>

<style scoped>
</style>
