import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

function factory({ data, propsData } = {}) {
  return shallowMount(HelloWorld, {
    data() {
      return { ...data };
    },
    propsData: { ...propsData },
  });
}

describe("HelloWorld", () => {
  it("renders HelloWorld component", () => {
    const wrapper = factory();
    expect(wrapper.findComponent(HelloWorld).exists()).toBe(true);
  });
});
