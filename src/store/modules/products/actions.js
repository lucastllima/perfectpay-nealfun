import * as types from "./mutation.type";

export default {
  updateBillGatesMoney: ({ commit }, data) =>
    commit(types.SET_BILL_GATES_MONEY, data),
  updateTotalCost: ({ commit }, data) => commit(types.SET_TOTAL_COST, data),
  updateSelectedItems: ({ commit }, data) =>
    commit(types.SET_SELECTED_ITEMS, data)
};
