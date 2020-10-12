<template>
  <footer class="footer text-center mt-2">
    <h2 class="footer__title">
      Made with <span role="img" aria-label="heart">❤️</span> by
      <a target="_blank" href="https://github.com/lucastllima"
        >Lucas Teixeira</a
      >
    </h2>
    <h2 class="footer__subtitle">
      Project based on
      <a target="_blank" href="https://neal.fun/spend/">Neal.fun</a>
    </h2>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped lang="scss">
.footer {
  background: white;
  padding: 30px 20px 45px;
  height: 125px;
  &__title {
    font-size: 18px;
  }

  &__subtitle {
    font-size: 25px;
    margin-top: 10px;
    text-decoration: none;
    color: rgb(51, 51, 51) !important;
  }
  a {
    text-decoration: underline;
    color: inherit;
  }
}
</style>
