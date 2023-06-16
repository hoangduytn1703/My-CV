import { defineStore } from "pinia";
import {
  LIST_SHOP,
  GET_SHOP,
} from "./type";


export const storeShop = defineStore({
  id: "storeShop",
  state: () => ({
    dataShop: {
      listShop: <any>[],
      msg: "",
    },

  }),

  getters: {
    [GET_SHOP]: (state) => {
      return state.dataShop;
    },
    
  },
  actions: {
    async [LIST_SHOP](payload: any) {
      console.log("file: index.ts:45  payload:", payload)
      return payload
      // const { data, errors } = await ApiService.searchShop(payload);
    },
    
  },
});
