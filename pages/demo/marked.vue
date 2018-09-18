
<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
  div(v-for="o in talks")
    chat(:id="o.id" :key="o.id")
    c-report(:head="o.deco" :handle="o.handle" :write_at="o.write_at")
      text-editor(v-model="o.log" :deco="o.deco" :rows="7" :maxRow="20" :maxSize="999")
        select(v-model="o.handle" key="handle")
          option(v-for="phase in phases" :value="phase.handle" :class="phase.handle" :key="phase.handle") ∞ {{ phase.label }}
        select(v-model="o.deco" key="deco")
          option(value="giji")  文字
          option(value="diagram") 作図

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
{ Set, Query } = require "~/plugins/memory-record"

module.exports =
  data: ->
    now = Date.now()
    idx = 0

    Set.phase.merge phases = [
      _id: 'demo-1-1-S'
      handle: 'SSAY'
      label: '会話'
    ,
      _id: 'demo-1-1-T'
      handle: 'TSAY'
      label: '独言'
    ,
    ]
    Set.chat.merge talks = [
      _id: 'demo-1-1-S-' + (++idx)
      head: ""
      deco: "giji"
      show: "talk"
      handle: "TITLE"
      face_id: "c100"
      write_at: now - 1000000
      log: """
        | | 
        |--:|:--
        | ポチ | azubu~ciel-48~
        | クラリッサ | ななころび
        | グレッグ | ななころび
        | ウォーレン | ななころび
      """
    ,

      _id: 'demo-1-1-S-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      show: "talk"
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

      _id: 'demo-1-1-S-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      show: "talk"
      handle: "SSAY"
      face_id: "c60"
      write_at: now - 1000000
      log: """
        () 大丈夫(だいじょうぶ)　採用(さいよう)　立入禁止(keep out)
        ## ―コントロール--ルーム--―

        　これで大丈夫、かしら？

        ::: name
        * * *
        送り終えた::メッセージ::を何度も読み返し、やっと~~モニター~~から顔をあげた。
        と思えばまた別の画面を開き、[[モニター]]とにらめっこ。
        客室に眠る参加者達がかわるがわる映し出される。
        * * *
        :::

        　++**14人、ちゃんといるわね**。++
        　それから==++立入禁止++区域==のロックは...~~......~~

        > 隅々まで設定の~~チェック~~を終えると、両手を広げ椅子の背に思い切りもたれかかった。

        　よぉし、大丈夫、完璧！
        　ポチにだってやればできるんだから。
        　お父様ったら「ポチに`GM`はまだ早い」だなんて。

        > 娘は父親に隠れて``GM``志願し、晴れてこの度採用されたのである。
      """
    ,

      _id: 'demo-1-1-S-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      show: "talk"
      handle: "GSAY"
      face_id: "c101"
      write_at: now - 2000000
      log: """
        () 振り仮名(ふりがな) 嬉(うれ) 思(おも) 使(つか) 幅(はば) 電脳都市(ｴﾚｸﾄﾛ・ｼﾃｨ)
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
      _id: 'demo-1-1-S-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      show: "talk"
      handle: "WSAY"
      face_id: "c102"
      write_at: now - 3000000
      log: """
        () 六弦(ｷﾞﾀｰ) 低音太鼓(ﾊﾞｽﾄﾞﾗﾑ) 拡声器(ﾏｲｸ) 紛(まぎ)
        [アンカー](http://google.com)と紛らわしいかもしれないけれど。
        などと。
        <auto@test.jp>
        <ftp://test>
        ****


        >>> 鞭打つように唸る[六弦](五弦や四弦ではいかんのである。)に　
        >>> 熱狂の声は暫しの沈黙従順にも従う小悪魔達の顔を　一瞥　見渡して

        >> 覚醒の時を待つ低音太鼓の　重低音《じゅうていおん》に酔わされ


        > 唄の寵愛を受けし罪人は　拡声器を握る……
      """
    ,
      _id: 'demo-1-1-S-' + (++idx)
      head: "発言レンダーてすと"
      deco: "giji"
      show: "talk"
      handle: "PSAY"
      face_id: "c103"
      write_at: now - 4000000
      log: """
        あとさ、こまいところ。
        1. [x] ::HTML::かくのは**禁止** <hr>
        1. [ ] ~~検閲により削除~~したら--strikeout--するほうがいいかしら。
          1. ``コード``[[ブロック]]についてはよし。
          1. f*ck'n f*ck'n
      """
    ]
    { talks, phases }

  computed:
    now: ->
      Date.now()
  methods:
    console: ->
      console.log arguments

</script>


