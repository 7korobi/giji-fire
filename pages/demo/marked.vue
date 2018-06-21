
<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
  div(v-for="o in talks")
    c-talk(:head="o.head", :deco="o.deco", :handle="o.handle", :face_id="o.face_id", :write_at="o.write_at", :log="o.log")
    c-report(:head="o.deco", deco="mono", :handle="o.handle", :write_at="o.write_at") {{ o.log }}
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
module.exports =
  data: ->
    now = Date.now()
    idx = 0
    talks: [
      id: 'demo-1-SS-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "SSAY"
      face_id: "c100"
      write_at: now - 1000000
      log: """
        ## ヘッドライン
        
        大きなテーブルも作れます。^[まああんまり==大きい==と困りますけど。]

        | Tables        | Are             | Cool  |
        | ------------- |:---------------:| -----:|
        | col ^3^ is    | [other]         | $1600 |
        | col ~2~ is    | [short]         |   $12 |
        | zebra stripes | [ガイド][guide] |    $1 |

        [guide]: <http://crazy-crazy.sakura.ne.jp/giji/?%28Knowledge%29Guidance#l1> "手引き"
        [other]: http://wolfbbs.jp/%BF%CD%CF%B5%A5%AF%A5%ED%A1%BC%A5%F3.html#content_1_18 "短期サーバー紹介"
        [short]: # "１０分とか、５分とか。……ひどいときは１分だぜ。クール！"

      """
    ,
      id: 'demo-1-SS-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "GSAY"
      face_id: "c101"
      write_at: now - 2000000
      log: """
        *[振り仮名]: ふりがな
        *[嬉]: うれ
        *[思]: おも
        *[使]: つか
        *[幅]: はば
        *[電脳都市]: ｴﾚｸﾄﾛ・ｼﾃｨ
        ―電脳都市―
        ===
        ―電脳都市―
        ---

        ### ―電脳都市―


        #### ―電脳都市―
        ##### ―電脳都市―
        ###### ―電脳都市―

        振り仮名はあったほうが嬉しいと思う。
        沢山使うと幅をとってしまうし、
      """
    ,
      id: 'demo-1-SS-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "WSAY"
      face_id: "c102"
      write_at: now - 3000000
      log: """
        *[六弦]: ｷﾞﾀｰ
        *[低音太鼓]: ﾊﾞｽﾄﾞﾗﾑ
        *[拡声器]: ﾏｲｸ
        *[紛]: まぎ
        [アンカー](http://google.com)と紛らわしいかもしれないけれど。
        などと。
        <auto@test.jp>
        <ftp://test>
        ****


        >>> 鞭打つように唸る[六弦](五弦や四弦ではいかんのである。)に　
        >>> 熱狂の声は暫しの沈黙従順にも従う小悪魔達の顔を　一瞥　見渡して

        >> 覚醒の時を待つ低音太鼓の　重低音に酔わされ


        > 唄の寵愛を受けし罪人は　拡声器を握る……
      """
    ,
      id: 'demo-1-SS-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "PSAY"
      face_id: "c103"
      write_at: now - 4000000
      log: """
        あとさ、こまいところ。
        1. [x] HTMLかくのは**禁止** <hr>
        2. [ ] ~~検閲により削除~~したら--strikeout--するほうがいいかしら。
      """
    ,
      id: 'demo-1-SS-' + (++idx)
      head: "発言レンダーてすと"
      deco: "mermaid"
      handle: "TSAY"
      face_id: "c104"
      write_at: now - 5000000
      log: """
        graph LR
          A[Square Rect] -- Link text --> B((Circle))
          A --> C(Round Rect)
          B --> D{Rhombus}
          C --> D
      """
    ,
      id: 'demo-1-SS-' + (++idx)
      head: "発言レンダーてすと"
      deco: "mermaid"
      handle: "TSAY"
      face_id: "c105"
      write_at: now - 6000000
      log: """
        gantt
          dateFormat YYYY-MM-DD

          section 日程
          プロローグ:  2018-03-01, 3d
          1日目:                   2d
          2日目:                   2d
          3日目:                   2d
          4日目:                   2d
          5日目:                   2d
          エピローグ:              3d
      """
    ]

  computed:
    now: ->
      Date.now()

</script>


