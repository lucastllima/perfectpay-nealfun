<template>
  <div class="content">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="text-center content__card no-border-style">
            <div>
              <b-img
                v-bind="imgProps"
                src="@/assets/img/items/billgates.jpg"
                rounded="circle"
                alt="Bill Gates"
              ></b-img>
              <h1 class="content__card__title">Spend Bill Gate's Money</h1>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" class="content__money mt-2 mb-2">
          <div class="content__money__item">
            <animated-number
              :value="billGatesMoney"
              :formatValue="formatToPrice"
              :duration="500"
            />
          </div>
        </b-col>
        <b-col cols="12" class="content__items mb-2">
          <b-row>
            <b-col
              sm="12"
              md="6"
              lg="4"
              v-for="(item, index) in items"
              :key="index"
            >
              <CardItem :item="item" :index="index" />
            </b-col>
          </b-row>
        </b-col>
        <b-col
          cols="12"
          class="content__items mb-2"
          v-if="selectedItens && selectedItens.length"
        >
          <Receipt />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";
import Receipt from "./Receipt.vue";
import { mapState } from "vuex";
import items from "../data/items";
import AnimatedNumber from "animated-number-vue";

export default {
  name: "Content",
  components: {
    CardItem,
    Receipt,
    AnimatedNumber
  },
  computed: {
    ...mapState("products", ["billGatesMoney", "selectedItens", "itemsStorage"])
  },
  methods: {
    formatToPrice(value) {
      return this.$options.filters.currency(value);
    }
  },
  data() {
    return {
      imgProps: {
        width: 125,
        height: 125,
        class: "content__card__img"
      },
      items: items
    };
  }
};
</script>

<style scoped lang="scss">
.content {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  &__card {
    &__title {
      font-size: 32px;
      background: white;
      padding: 20px 20px;
      padding-bottom: 10px;
      font-weight: bold;
      text-align: center;
      line-height: 1.6em;
    }
  }

  &__money {
    top: 0px;
    position: sticky;
    z-index: 9999;
    &__item {
      color: white;
      background: linear-gradient(rgb(46, 204, 113), rgb(26, 188, 156));
      text-align: center;
      padding: 10px;
      margin: b 10px 0px;
      font-family: Roboto, sans-serif;
      font-size: 32px;
      font-weight: bold;
    }
  }

  &__items {
    [class*="col-"]:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
