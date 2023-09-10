import Vue from "vue";
import { defineStore } from "pinia";
import axios from "@/api/api.ts"; // Đường dẫn tương đối tới file api.ts bạn vừa tạo
import ApiService from "@/core/service/shop.service";

export const homeStore = defineStore({
  id: "homeStore",

  state: () => ({
    personalInfo: {},
    // ... các state khác
  }),

  actions: {
    fetchPersonalInfo(payload) {
      const { data, errors } = await ApiService.searchShop(payload);
    },
    // ... các actions khác
  },
});
