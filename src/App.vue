<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Content from "./components/Content.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Content,
    Header,
    Footer
  }
};
</script>

<style lang="scss">
body {
  background-color: #f1f2f6;
  height: 100%;
}

.no-border-style {
  border-radius: unset;
  border: unset;
}

.dark-border {
  border-radius: 3px;
  border: 1px solid rgb(178, 190, 195);
  &:focus {
    border: 2px solid #000;
    box-shadow: unset !important;
  }
}

.w-90 {
  width: 90% !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
