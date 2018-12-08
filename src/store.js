import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as types from "./types";

Vue.use(Vuex);
const filters = ["all", "active", "completed"];
export default new Vuex.Store({
  plugins: [
    createPersistedState({ key: "todos-vuejs", paths: ["todos"] }),
  ],
  state: {
    prefix: "todos-vuejs",
    todos: [
      {
        id: 1,
        completed: false,
        title: "go home",
        checked: false,
        isVisible: true
      },
      {
        id: 2,
        completed: true,
        title: "drink water",
        checked: true,
        isVisible: true
      },
      {
        id: 3,
        completed: false,
        title: "cry",
        checked: false,
        isVisible: true
      }
    ],
    todo: {
      id: 1,
      completed: false,
      title: "title",
      checked: false
    },
    activeFilter:
      filters.indexOf(window.location.hash.slice(2)) > -1
        ? window.location.hash.slice(2)
        : "all"
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
    },
    [types.MUTATE_CHANGE_FILTER]: (state, payload) => {
      state.activeFilter =
        filters.indexOf(payload.filterBy) > -1 ? payload.filterBy : "all";
    },
    [types.MUTATE_CLEAR_COMPLETED]: state => {
      state.todos = state.todos.filter(todo => todo.completed !== true);
    },
    [types.MUTATE_MARK_ALL_COMPLETED]: state => {
      state.todos = state.todos.map(todo => {
        todo.completed = true;
        todo.checked = true;
        return todo;
      });
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
    },
    [types.ACTIONS_CHANGE_FILTER]: ({ commit }, payload) => {
      commit(types.MUTATE_CHANGE_FILTER, payload);
    },
    [types.ACTIONS_CLEAR_COMPLETED]: ({ commit }) => {
      commit(types.MUTATE_CLEAR_COMPLETED);
    },
    [types.ACTIONS_MARK_ALL_COMPLETED]: ({ commit }) => {
      commit(types.MUTATE_MARK_ALL_COMPLETED);
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
      let todos = [];
      switch (payload.filterBy) {
        case "active":
          todos = state.todos.filter(todo => todo.checked !== true);
          break;
        case "completed":
          todos = state.todos.filter(todo => todo.completed === true);
          break;
        default:
          todos = state.todos;
      }
      return todos;
    },
    [types.GET_ACTIVE_FILTER]: state => {
      return state.activeFilter;
    }
  }
});
