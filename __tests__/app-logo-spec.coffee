{ mount } = require '@vue/test-utils'
Logo = require '~/components/AppLogo.vue'

describe 'AppLogo', => 
  test 'is a Vue instance', =>
    wrapper = mount Logo,
      propsData: {}
    expect( wrapper.isVueInstance() ).toBeTruthy()
  undefined