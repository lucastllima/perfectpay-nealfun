<template>
  <div class="item">
    <b-card class="text-center item__card border-0 rounded-0">
      <b-img v-bind="imgProps" :src="getImgUrl(item.name)" alt="Item"></b-img>
      <h1 class="item__card__title">{{ item.name }}</h1>
      <h1 class="item__card__subtitle">{{ item.price | currency }}</h1>
      <b-row class="item__card__row mt-4">
        <b-col cols="3" md="4" class="text-left">
          <b-button
            @click="decrementAmount()"
            class="item__card__row__btn btn-sell w-90 dark-border"
            :disabled="!item.amount"
            >Sell</b-button
          >
        </b-col>
        <b-col cols="6" md="4" class="p-0">
          <input
            class="text-center dark-border w-100 h-100"
            type="number"
            v-model.number="amount"
            @input="onChangeAmount"
          />
        </b-col>
        <b-col cols="3" md="4" class="text-right">
          <b-button
            @click="incrementAmount()"
            :disabled="!canBuy"
            class="item__card__row__btn btn-buy w-90 dark-border"
            >Buy</b-button
          >
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CardItem",
  props: {
    item: { type: Object, required: true }
  },
  computed: {
    ...mapState("products", ["billGatesMoney", "selectedItens"]),
    canBuy() {
      return this.item.price <= this.billGatesMoney && this.validateLimit();
    }
  },
  data() {
    return {
      imgProps: {
        height: 125,
        class: "item__card__img"
      },
      amount: 0
    };
  },
  created() {
    this.amount = this.item.amount;
  },
  methods: {
    ...mapActions({
      updateBillGatesMoney: "products/updateBillGatesMoney",
      updateSelectedItems: "products/updateSelectedItems",
      updateTotalCost: "products/updateTotalCost"
    }),
    getImgUrl(name) {
      let fileName = name.replace(/ /g, "-").toLowerCase() + ".jpg";
      return require("@/assets/img/items/" + fileName);
    },
    decrementAmount() {
      this.item.amount = --this.amount;
      if (this.amount < 0) {
        this.item.amount = this.amount = 0;
      }
      this.updateAmount();
    },
    incrementAmount() {
      this.item.amount = ++this.amount;
      this.updateAmount();
    },
    onChangeAmount() {
      let billGatesMoneyCopy = this.billGatesMoney;
      if (billGatesMoneyCopy > 0) {
        if (!this.validateLimit()) {
          this.amount = this.item.limit;
        }
        // To recalculate current total Bill Gates money, we need to remove the total
        // of the current item from his wallet
        billGatesMoneyCopy = this.billGatesMoneyMinusCurrentItemAmount(
          billGatesMoneyCopy
        );

        if (this.totalAmount() > billGatesMoneyCopy) {
          this.amount = Math.floor(billGatesMoneyCopy / this.item.price);
        }
        this.item.amount = this.amount;
        this.updateAmount();
      }
    },
    billGatesMoneyMinusCurrentItemAmount(billGatesMoneyCopy) {
      const receiptItem = this.selectedItens.find(
        i => i.name == this.item.name
      );
      if (receiptItem) {
        billGatesMoneyCopy += receiptItem.amount * this.item.price;
      }
      return billGatesMoneyCopy;
    },
    updateAmount() {
      const maxMoney = 100000000000;
      let totalCost = 0;

      let billGatesMoney = this.billGatesMoney;
      this.updateItems();

      for (const item of this.selectedItens) {
        totalCost += item.amount * item.price;
      }
      billGatesMoney = maxMoney;
      billGatesMoney -= totalCost;
      billGatesMoney = billGatesMoney < 0 ? 0 : billGatesMoney;
      this.updateBillGatesMoney(billGatesMoney);
      this.updateTotalCost(totalCost);
    },
    updateItems() {
      const selectedItens = this.selectedItens;
      const itemIndexSelected = selectedItens.findIndex(
        i => this.item.name == i.name
      );

      if (itemIndexSelected > -1) {
        if (this.item.amount) {
          selectedItens[itemIndexSelected] = this.item;
        } else {
          selectedItens.splice(itemIndexSelected, 1);
        }
      } else if (this.item.amount) {
        selectedItens.push(this.item);
      }
      this.updateSelectedItems(selectedItens);
    },
    totalAmount() {
      return this.amount * this.item.price;
    },
    validateLimit() {
      return this.item.limit == 0 ? true : this.amount < this.item.limit;
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  &__card {
    &__img {
      max-width: 100%;
    }
    &__title {
      font-size: 22px;
      font-weight: bold;
    }
    &__subtitle {
      font-size: 20px;
      color: rgb(36, 196, 134);
    }
    &__row {
      $breakpoint-mobile-devices: 1024px;
      @media (max-width: $breakpoint-mobile-devices) {
        margin: auto;
        [class*="col-"] {
          padding: unset;
        }
      }
      &__btn {
        font-size: 16px;
        cursor: pointer;
        border-radius: 3px;
        text-align: center;
        color: white;
        border: none;
        font-weight: bold;
        user-select: none;
        touch-action: manipulation;
        &:disabled {
          color: rgb(51, 51, 51);
          background: rgb(241, 242, 246) !important;
          opacity: 1;
        }
        &.btn-sell {
          background: linear-gradient(rgb(245, 59, 130), rgb(245, 59, 87));
        }

        &.btn-buy {
          background: linear-gradient(rgb(46, 204, 113), rgb(26, 188, 156));
        }
      }
    }
  }
}
</style>
