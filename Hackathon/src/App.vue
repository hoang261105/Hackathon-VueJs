<template>
  <div>
    <header>
      <h1>Header</h1>
    </header>
    <div class="container">
      <nav class="sidebar">
        <ul>
          <li>
            <router-link to="/admin" exact-active-class="active"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="/admin/manager-category" active-class="active"
              >Manager Category</router-link
            >
          </li>
          <li>
            <router-link to="/admin/manager-product" active-class="active"
              >Manager Product</router-link
            >
          </li>
        </ul>
      </nav>
      <div style="width: 100%">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style></style>
