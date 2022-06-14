import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import StarWarsTable from "@/components/StarWarsTable.vue";

function factory({ data, propsData } = {}) {
  return shallowMount(StarWarsTable, {
    data() {
      return { ...data };
    },
    propsData: { ...propsData },
  });
}

describe("StarWarsTable", () => {
  it("renders StarWarsTable component", () => {
    const wrapper = factory();
    expect(wrapper.findComponent(StarWarsTable).exists()).toBe(true);
  });
});
