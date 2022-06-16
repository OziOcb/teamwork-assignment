import formatDate from "@/utilities/formatDate";
import findPlanetName from "@/utilities/findPlanetName";

export default (data) => {
  const peopleArray = [];

  data.forEach((person) => {
    peopleArray.push({
      name: person.name,
      height: !isNaN(+person.height) ? +person.height : 0,
      mass: !isNaN(+person.mass) ? +person.mass : 0,
      created: formatDate(person.created),
      edited: formatDate(person.edited),
      planetName: findPlanetName(person.homeworld),
      planetUrl: person.homeworld,
    });
  });

  return peopleArray;
};
