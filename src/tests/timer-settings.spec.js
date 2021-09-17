import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import TimerSettings from '@/components/settingsBar/timer-settings.vue'


describe("TimerSettings", () => {
  it ('should render correctly', () => {
    let wrapper = shallowMount(TimerSettings);
  })
});
