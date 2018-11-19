{ shallowMount } = require '@vue/test-utils'

require '~/plugins/components'
AHeader = require '~/components/a-header.vue'

describe "index", ->
  test 'snapshot', ->
    context =
      title: '人狼議事'
    wrapper = shallowMount AHeader,
      propsData: { value, context }
    expect(wrapper.html().replace /></g, ">\n<").toMatchSnapshot()
