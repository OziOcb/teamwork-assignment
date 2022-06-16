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
    isPopupOpen: false,
    isFetchingPlanet: false,
    planet: {},
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

    async fetchPlanet(url) {
      this.isFetchingPlanet = true;

      const planetNo = url.split("/")[5];

      let data;
      const localData = localStorage.getItem(`starWarsPlanet${planetNo}`);

      if (!localData) {
        const res = await SwapiService.getPlanet(planetNo);

        data = {
          name: res.name,
          diameter: res.diameter,
          climate: res.climate,
          population: res.population,
        };

        localStorage.setItem(`starWarsPlanet${planetNo}`, JSON.stringify(data));
      } else {
        data = JSON.parse(localData);
      }

      this.planet = data;
      this.isFetchingPlanet = false;
    },
  },
});
