import * as types from "@/types";
import { mapGetters, mapActions } from "vuex";

export const utilityMixin = {
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
        this.filteredTodos = this.getFilteredTodos({
          filterBy: this.activeFilter
        });
      }
    }
  },
  methods: {
    ...mapActions({
      changeActiveFilter: types.ACTIONS_CHANGE_FILTER
    })
  },
  watch: {
    $route() {
      // react to route changes...
      this.changeActiveFilter({ filterBy: window.location.hash.slice(2) });
    }
  }
};
