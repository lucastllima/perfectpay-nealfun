import Vue from "vue";
import VueCurrencyFilter from "vue-currency-filter";

Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  symbolPosition: "front",
  symbolSpacing: true
});
