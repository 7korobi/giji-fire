{ createRenderer } = require 'vue-server-renderer'
{ shallow } = require 'vue-test-utils'
GMarked = require '@/components/g-marked.vue'

describe 'g-marked.vue', ->
  it 'matches snapshot', ->
    value = """
      *[す]: るび
      [guide]: <http://crazy-crazy.sakura.ne.jp/giji/?%28Knowledge%29Guidance#l1> "手引き"
      [other]: http://wolfbbs.jp/%BF%CD%CF%B5%A5%AF%A5%ED%A1%BC%A5%F3.html#content_1_18 "短期サーバー紹介"
      [short]: # "１０分とか、５分とか。……ひどいときは１分だぜ。クール！"

      ## ヘッドライン

      ## テーブル

      大きなテーブルも作れます。^[まああんまり==大きい==と困りますけど。]

      | Tables        | Are             | Cool  |
      | ------------- |:---------------:| -----:|
      | col ^3^ is    | [other]         | $1600 |
      | col ~2~ is    | [short]         |   $12 |
      | zebra stripes | [ガイド][guide] |    $1 |
    """
    wrapper = shallow GMarked.default,
      propsData: { value }
    createRenderer().renderToString wrapper.vm, (err, str)->
      if err
        throw new Error(err)
      expect(str).toMatchSnapshot()
