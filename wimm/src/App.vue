<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <Header />
    <!-- Page Content -->
    <div id="content-wrapper" class="d-flex flex-column">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/Header";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>
<style>
@import "../src/assets/styles/dashboard.css";
</style>
