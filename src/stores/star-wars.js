import { defineStore } from "pinia";
import SwapiService from "@/services/swapi-service";
import generatePeopleArray from "@/utilities/generatePeopleArray";

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

      let data;
      const localData = localStorage.getItem(`starWarsPeoplePage${page}`);

      if (!localData) {
        data = await SwapiService.getAllPeople(page);
        localStorage.setItem(`starWarsPeoplePage${page}`, JSON.stringify(data));
      } else {
        data = JSON.parse(localData);
      }

      this.numberOfPeople = data.count;
      this.people = generatePeopleArray(data);
      this.isFetchingPeople = false;
    },

    async fetchFilteredPeople(filter, page) {
      this.isFetchingPeople = true;

      const data = await SwapiService.getFilteredPeople(filter, page);

      this.numberOfPeople = data.count;
      this.people = generatePeopleArray(data);
      this.isFetchingPeople = false;
    },
  },
});
