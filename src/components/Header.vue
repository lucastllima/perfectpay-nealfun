<template>
  <div class="header">
    <b-navbar toggleable="lg" class="header__navbar">
      <b-navbar-brand class="header__navbar__brand" href="#"
        >Neal.fun</b-navbar-brand
      >
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
.header {
  &__navbar {
    padding: 21px 35px;
    background-color: white !important;
    margin-bottom: 23px;

    &__brand {
      color: #000;
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>
