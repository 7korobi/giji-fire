{ mount } = require '@vue/test-utils'
Logo = require '~/components/AppLogo.vue'
# ABook = require '~/components/a-book.vue'

describe 'AppLogo', => 
  test 'is a Vue instance', =>
    wrapper = mount Logo,
      propsData: {}
    expect( wrapper.isVueInstance() ).toBeTruthy()

  test 'snapshot', =>
    wrapper = mount Logo,
      propsData: {}
    expect( wrapper.html() ).toMatchSnapshot()
