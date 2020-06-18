<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
      <div class="sidebar-brand-icon rotate-n-15">
        <i>
          <fai icon="coins" />
        </i>
      </div>
      <div class="h3 sidebar-brand-text mx-3">W.I.M.M.</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <li class="nav-item">
      <router-link class="nav-link" to="/">
        <i>
          <fai icon="tachometer-alt" />
        </i>
        <span>Dashboard</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Interface</div>

    <li class="nav-item">
      <router-link class="nav-link" to="/transactions">
        <i>
          <fai icon="exchange-alt" />
        </i>
        <span>Transactions</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/categories">
        <i>
          <fai icon="th-large" />
        </i>
        <span>Categories</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
</style>