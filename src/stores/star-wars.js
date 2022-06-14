import { defineStore } from "pinia";
import SwapiService from "@/services/swapi-service";

export const useStarWarsStore = defineStore({
  id: "star-wars",

  state: () => ({
    people: [],
    totalNumberOfPeople: null,
    isFetchingPeople: false,
    currentPage: 1,
  }),

  getters: {
    numberOfPages: (state) => Math.ceil(state.totalNumberOfPeople / 10),
  },

  actions: {
    async fetchPeople(page) {
      this.isFetchingPeople = true;
      const response = await SwapiService.getAllPeople(page);

      if (!this.totalNumberOfPeople) {
        this.totalNumberOfPeople = response.count;
      }

      this.people = response.results;
      this.isFetchingPeople = false;
    },

    setCurrentPage(newPage) {
      this.currentPage = newPage;
    },
  },
});
