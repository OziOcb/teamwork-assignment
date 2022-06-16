import formatDate from "@/utilities/formatDate";
import findPlanetName from "@/utilities/findPlanetName";

export default (data) => {
  const peopleArray = [];

  data.results.forEach((person) => {
    peopleArray.push({
      name: person.name,
      height: +person.height,
      mass: +person.mass,
      created: formatDate(person.created),
      edited: formatDate(person.edited),
      planetName: findPlanetName(person.homeworld),
      planetUrl: person.homeworld,
    });
  });

  return peopleArray;
};
