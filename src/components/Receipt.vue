<template>
  <div class="receipt">
    <b-card class="text-center receipt__card no-border-style">
      <div>
        <h1 class="receipt__card__title">Your Receipt</h1>
      </div>
      <b-row>
        <b-col sm="12" lg="6" offset-lg="3" md="6" offset-md="3">
          <b-table-simple class="receipt__card__table" borderless>
            <b-tbody>
              <b-tr
                class="receipt__card__table__item"
                v-for="(item, index) in selectedItens"
                :key="index"
              >
                <b-th
                  class="receipt__card__table__item__field text-left"
                  colspan="1"
                  >{{ item.name }}</b-th
                >
                <b-th colspan="2" class="receipt__card__table__item__field"
                  ><span class="float-left">x{{ item.amount }} </span>
                  <span
                    class="receipt__card__table__item__field--green float-right font-weight-bold"
                    >$ {{ getPrice(item) }}</span
                  ></b-th
                >
              </b-tr>
            </b-tbody>
            <b-tfoot>
              <b-tr class="receipt__card__table__footer">
                <b-td class="receipt__card__table__footer__item text-left"
                  ><span class="receipt__card__table__footer__item__left"
                    >TOTAL</span
                  ></b-td
                >
                <b-td
                  colspan="2"
                  class="receipt__card__table__footer__item text-right"
                  ><span class="receipt__card__table__footer__item__right">
                    {{ totalCost | currency }}</span
                  ></b-td
                >
              </b-tr>
            </b-tfoot>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatShortener } from "@/helpers/format";

export default {
  name: "Receipt",
  computed: {
    ...mapState("products", ["selectedItens", "totalCost"])
  },
  methods: {
    formatShortener(number) {
      return formatShortener(number);
    },
    getPrice(item) {
      return this.formatShortener(item.price * item.amount);
    }
  }
};
</script>

<style scoped lang="scss">
.receipt {
  &__card {
    &__title {
      text-align: center;
      font-size: 28px;
      padding: 15px 15px 25px;
      font-weight: bold;
    }
    &__table {
      font-size: 18px;
      &__item {
        &__field {
          text-overflow: ellipsis;
          font-weight: 500;
          &--green {
            color: rgb(36, 196, 134);
          }
        }
      }
      &__footer {
        &__item {
          font-weight: bold;
          &__left {
            color: #000;
          }
          &__right {
            color: rgb(36, 196, 134);
          }
        }
        border-top: 1px solid rgb(51, 51, 51);
      }
    }
  }
}
</style>
