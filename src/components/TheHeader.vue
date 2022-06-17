<template>
  <header class="header">
    <div class="header__inner container">
      <div class="header__logo">LOGO</div>

      <div class="header__hamburger">
        <button
          ref="hamburger"
          class="hamburger"
          aria-controls="dropdowMenuContent"
          :aria-expanded="ariaExpanded.toString()"
          aria-label="Toggle navigation"
          @click="handleAriaExpanded"
        >
          <span class="hamburger__line line01"></span>
          <span class="hamburger__line line02"></span>
          <span class="hamburger__line line03"></span>
          <span class="hamburger__line line04"></span>
        </button>
      </div>
    </div>

    <div id="dropdowMenuContent" class="header__menu">
      <nav class="nav">
        <ul class="nav__list">
          <li v-for="(page, index) in pages" :key="index" class="nav__item">
            <RouterLink class="nav__link" :to="page.url">
              {{ page.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { gsap, Sine, Power1 } from "gsap";
import { ref, onMounted } from "vue";

const hamburger = ref(null);
const ariaExpanded = ref(false);
const pages = ref([
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Assignment",
    url: "/assignment/",
  },
]);

onMounted(() => {
  const hamburgerMotion = gsap.timeline();

  gsap.set(".nav", { xPercent: -50, yPercent: -50 });
  gsap.set(".nav li", { translateX: -300 });
  gsap.set(".header__socialIcons--mobile", { translateX: 110 });

  hamburgerMotion
    .addLabel("step1")
    .to(".hamburger", 0.4, { backgroundColor: "transparent" }, "step1")
    .to(".line01", 0.4, { translateX: "+=40" }, "step1")
    .to(".line04", 0.4, { translateX: "-=40" }, "step1")
    .to(".header__menu", 0.4, { autoAlpha: 1 }, "step1")
    .addLabel("step2")
    .staggerTo(".nav li", 0.45, { translateX: 0, ease: Sine.easeOut }, 0.3, 0.5)
    .to(".header__socialIcons--mobile", 0.4, {
      translateX: 0,
      ease: Sine.easeOut,
    })
    .to(".line02", 0.4, { translateY: "+=5", background: "#494446" }, "step2")
    .to(".line03", 0.4, { translateY: "-=4", background: "#494446" }, "step2")
    .addLabel("step3")
    .to(".nav li", 1, { marginBottom: "20px", ease: Power1.easeOut }, "step3")
    .to(".line02", 1, { rotation: 45, transformOrigin: "center" }, "step3")
    .to(".line03", 1, { rotation: -45, transformOrigin: "center" }, "step3")
    .reverse();

  hamburger.value.addEventListener("click", function () {
    hamburgerMotion.reversed(!hamburgerMotion.reversed());
  });

  // Hide menu after clicking on .nav__link
  const navList = document.querySelector(".nav__list");

  const clickNavLinkHandler = gsap.timeline({ paused: true });
  clickNavLinkHandler
    .to(".nav", 0.3, { autoAlpha: 0 }, 0.1, 0)
    .to(
      ".header__socialIcons--mobile",
      0.4,
      { translateX: 110, ease: Sine.easeOut },
      0
    )
    .to(".pageTransitionOverlay", 0.01, { zIndex: 11 }, 0)
    .to(".pageTransitionOverlay", 0.6, { autoAlpha: 1 }, 0.5);

  navList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("router-link-exact-active")) {
      clickNavLinkHandler.play();
    } else {
      hamburgerMotion.reverse(0);
    }
  });
});

function handleAriaExpanded() {
  ariaExpanded.value = !ariaExpanded.value;
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: $layer-header-z-index;
  top: 0;
  right: 0;
  left: 0;

  &__inner {
    padding-top: 1em;
    padding-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    z-index: $layer-hamburger-z-index;
    width: 5rem;
  }

  &__hamburger {
    z-index: $layer-hamburger-z-index;
  }

  &__menu {
    position: absolute;
    z-index: $layer-dropdown-z-index;
    top: 0;
    left: 0;
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    background: $color-menu-gradient;
    background-blend-mode: $color-menu-gradient-blend-mode;
  }
}

.hamburger {
  padding: 0.2rem;
  display: flex;
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  flex-direction: column;
  justify-content: space-around;
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;
  transition: box-shadow $duration-transition-base linear;
  cursor: pointer;

  &__line {
    display: block;
    width: 3.6rem;
    height: 0.2rem;
    background-color: $color-white;
    transition: background-color $duration-transition-base linear;

    &.line01,
    &.line04 {
      width: 1.8rem;
    }
    &.line01 {
      align-self: flex-end;
    }
  }
}

.nav {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;

  &__list {
    margin: 0;
    padding: 2em 0.5em;
  }

  &__item {
    list-style-type: none;
  }

  &__link {
    padding: 0.5em;
    text-decoration: none;
    border-radius: 0.5rem;
    color: $color-text-primary;
    font-size: 2em;
  }
}

.nav .router-link-exact-active {
  text-decoration: underline;
}
</style>
