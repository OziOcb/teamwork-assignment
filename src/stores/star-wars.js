import { defineStore } from "pinia";
import SwapiService from "@/services/swapi-service";
import generatePeopleArray from "@/utilities/generatePeopleArray";

const spinnerMinimumTimeout = 300;

export const useStarWarsStore = defineStore({
  id: "star-wars",

  state: () => ({
    people: [],
    numberOfPeople: null,
    isFetchingPeople: false,
    currentPage: 1,
    isPopupOpen: false,
    isFetchingPlanet: false,
    planet: {},
  }),

  getters: {
    numberOfPages: (state) => Math.ceil(state.numberOfPeople / 10),
  },

  actions: {
    async fetchPeople(page = this.currentPage) {
      let data;
      const localData = localStorage.getItem(`starWarsPeoplePage${page}`);

      if (!localData) {
        this.isFetchingPeople = true;
        const res = await SwapiService.getAllPeople(page);

        data = {
          count: res.count,
          results: generatePeopleArray(res.results),
        };

        localStorage.setItem(`starWarsPeoplePage${page}`, JSON.stringify(data));

        // TODO: Find a better solution. Right now if the API response already takes 2s, The loading spinner would be visible for 2.3s
        setTimeout(() => {
          this.isFetchingPeople = false;
        }, spinnerMinimumTimeout);
      } else {
        data = JSON.parse(localData);
      }

      this.numberOfPeople = data.count;
      this.people = data.results;
    },

    async fetchFilteredPeople(filter, page) {
      this.isFetchingPeople = true;

      const res = await SwapiService.getFilteredPeople(filter, page);

      this.numberOfPeople = res.count;
      this.people = generatePeopleArray(res.results);
      setTimeout(() => {
        this.isFetchingPeople = false;
      }, spinnerMinimumTimeout);
    },

    async fetchPlanet(url) {
      const planetNo = url.split("/")[5];

      let data;
      const localData = localStorage.getItem(`starWarsPlanet${planetNo}`);

      if (!localData) {
        this.isFetchingPlanet = true;
        const res = await SwapiService.getPlanet(planetNo);

        data = {
          name: res.name,
          diameter: res.diameter,
          climate: res.climate,
          population: res.population,
        };

        localStorage.setItem(`starWarsPlanet${planetNo}`, JSON.stringify(data));

        setTimeout(() => {
          this.isFetchingPlanet = false;
        }, spinnerMinimumTimeout);
      } else {
        data = JSON.parse(localData);
      }

      this.planet = data;
    },
  },
});
