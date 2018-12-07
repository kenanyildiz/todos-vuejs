<template>
  <div class="home">
    <section class="todoapp">
      <app-header></app-header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <app-body></app-body>
      <!-- This footer should hidden by default and shown when there are todos -->
      <app-footer></app-footer>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from "@/components/AppHeader.vue";
import AppBody from "@/components/AppBody.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "home",
  components: {
    AppHeader,
    AppBody,
    AppFooter
  }
};
</script>
