import * as types from "./mutation.type";

export default {
  [types.SET_BILL_GATES_MONEY](state, billGatesMoney) {
    state.billGatesMoney = billGatesMoney;
  },
  [types.SET_SELECTED_ITEMS](state, selectedItens) {
    state.selectedItens = selectedItens;
  },
  [types.SET_TOTAL_COST](state, totalCost) {
    state.totalCost = totalCost;
  }
};
