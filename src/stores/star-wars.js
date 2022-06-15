import { defineStore } from "pinia";
import SwapiService from "@/services/swapi-service";

export const useStarWarsStore = defineStore({
  id: "star-wars",

  state: () => ({
    people: [],
    numberOfPeople: null,
    isFetchingPeople: false,
    currentPage: 1,
  }),

  getters: {
    numberOfPages: (state) => Math.ceil(state.numberOfPeople / 10),
  },

  actions: {
    async fetchPeople(page = this.currentPage) {
      this.isFetchingPeople = true;

      let res;
      const localPeoplePage = localStorage.getItem(`starWarsPeoplePage${page}`);

      if (!localPeoplePage) {
        res = await SwapiService.getAllPeople(page);
        localStorage.setItem(`starWarsPeoplePage${page}`, JSON.stringify(res));
      } else {
        res = JSON.parse(localPeoplePage);
      }

      this.numberOfPeople = res.count;
      this.people = res.results;
      this.isFetchingPeople = false;
    },

    async fetchFilteredPeople(filter, page) {
      this.isFetchingPeople = true;

      const res = await SwapiService.getFilteredPeople(filter, page);

      this.numberOfPeople = res.count;
      this.people = res.results;
      this.isFetchingPeople = false;
    },

    setCurrentPage(newPage) {
      this.currentPage = newPage;
    },
  },
});
