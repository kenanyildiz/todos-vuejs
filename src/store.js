import Vue from "vue";
import Vuex from "vuex";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    prefix: "vue.todo",
    todos: [
      { id: 1, completed: false, title: "go home", checked: false },
      { id: 2, completed: true, title: "drink water", checked: true },
      { id: 3, completed: false, title: "cry", checked: false }
    ],
    todo: {
      id: 1,
      completed: false,
      title: "title",
      checked: false
    }
  },
  mutations: {
    [types.MUTATE_ADD_TODO]: (state, todo) => {
      state.todos.push(todo);
    },
    [types.MUTATE_UPDATE_TODO]: (state, payload) => {
      const item = state.todos.find(todo => todo.id === payload.id);
      state.todos[state.todos.indexOf(item)] = payload;
    },
    [types.MUTATE_REMOVE_TODO]: (state, payload) => {
      const item = state.todos.find(todo => todo.id === payload.id);
      const index = state.todos.indexOf(item);
      state.todos.splice(index, 1);
    }
  },
  actions: {
    [types.ACTIONS_ADD_TODO]: ({ commit }, todo) => {
      commit(types.MUTATE_ADD_TODO, todo);
    },
    [types.ACTIONS_UPDATE_TODO]: ({ commit }, todo) => {
      commit(types.MUTATE_UPDATE_TODO, todo);
    },
    [types.ACTIONS_REMOVE_TODO]: ({ commit }, payload) => {
      commit(types.MUTATE_REMOVE_TODO, payload);
    }
  },
  getters: {
    [types.TODOS]: state => {
      return state.todos;
    },
    [types.GET_TODO_BY_ID]: state => id => {
      return state.todos.find(todo => todo.id === id);
    },
    [types.GET_TODO]: state => {
      return state.todo;
    },
    [types.GET_FILTERED_TODOS]: state => payload => {
      let todo = [];
      if (payload.filterBy === "ACTIVE") {
        todo = state.todos.filter(todo => (todo.checked !== true))
      } else if (payload.filterBy === "COMPLETED") {
        todo = state.todos.filter(todo => (todo.checked === true))
      } else if (payload.filterBy === "ALL") {
        todo = state.todos;
      }
      return todo;
    }
  }
});
