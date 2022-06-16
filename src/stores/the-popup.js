import { defineStore } from "pinia";

export const usePopupStore = defineStore({
  id: "the-popup",

  state: () => ({
    isPopupOpen: false,
    content: {
      header: "popup header",
      body: "<h1>elo</h1> elo elo",
    },
  }),
});
