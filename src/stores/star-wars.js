import { defineStore } from "pinia";
import SwapiService from "@/services/swapi-service";

export const useStarWarsStore = defineStore({
  id: "star-wars",

  state: () => ({
    people: [],
    currentPage: 1,
  }),

  actions: {
    async fetchPeople() {
      const response = await SwapiService.getAllPeople(this.currentPage);

      this.people = response.results;
    },
  },
});
