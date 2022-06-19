<template>
  <main class="assignment container">
    <h1>Teamwork - Front-end developer assignment</h1>

    <p>
      Your mission, should you choose to accept it, is to create a one-page
      application with a list of people and the details about their related home
      planet. The list of people and the information related to a planet can be
      accessed using the swapi api:
    </p>

    <ul>
      <li>SWAPI api details: https://swapi.dev/</li>
      <li>Live Demo: https://teamwork-assignment.netlify.app/</li>
    </ul>

    <h2>Wireframe description:</h2>

    <p>
      The candidate should implement a table that contains a list of users with
      the following columns:
    </p>
    <ul>
      <li>Name</li>
      <li>Height</li>
      <li>Mass</li>
      <li>Created</li>
      <li>Edited</li>
      <li>Planet Name</li>
    </ul>

    <p>
      When the user clicks on the planet name link a popup is displayed showing
      the following information regarding the planet:
    </p>
    <ul>
      <li>Name</li>
      <li>Diameter</li>
      <li>Climate</li>
      <li>Population</li>
    </ul>

    <p>
      The user should be able to sort the table by each column. The user should
      also be able to filter by searching the person’s name.
    </p>

    <h2>Stack</h2>
    <ul>
      <li>ES6.</li>
      <li>Webpack</li>
      <li>
        VueJs and vue router are a plus but not necessary, use the JS framework
        you like, eg React, Angular, Vue etc
      </li>
    </ul>

    <p>
      The candidate has 5 days to complete this assignment. The completed
      assignment should be sent to your recruiter. This can either be a public
      git repository that we can access or a zipped attachment or a link to a
      zipped file of the completed assessment.
    </p>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .assignment,
  ul {
    margin-bottom: 2rem;
  }
}
</style>
