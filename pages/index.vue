<template lang="pug">
div
  c-post(@focus="focus" handle="XSAY" id="title" :write_at="1169852700003" style="height: 38ex")
    diagram-view(:value="d_pair")
      path(v-for="o in applogo_path" v-bind="o")
      text(text-anchor="middle" label="祝！人狼議事10周年！" x="57" y="260" class="path") 祝！人狼議事10周年！
  fire-oauth(@focus="focus" handle="TSAY" id="private")
    p ログイン中にできること。
    p #[i.mdi.mdi-map-marker]：過去ログビュアーでタップしたとき、栞を挟んで記録します。

  c-report(@focus="focus" handle="footer" deco="center" id="head-private" v-if="user") ロビー
  c-report(@focus="focus" handle="footer" deco="center" id="head-public") みんなの情報
  c-post.form(@focus="focus" handle="SSAY")
    nuxt-link(to="/rule-guide") 人狼議事のルール
    br
    .card 人狼議事を遊ぶとき、従うべきルールはこちら。

  c-post.form(@focus="focus" handle="VSSAY" id="character")
    nuxt-link(to="/chr/list")
      | キャラクター一覧
    nuxt-link(to="/chr/npc")
      | 最初の犠牲者一覧
    .card 人狼議事を遊ぶ参考にどうぞ。

  c-post.form(@focus="focus" handle="VSSAY" id="chr-sort")
    nuxt-link(to="/chr/sort") キャラクター並べ替えゲーム
    br
    .card 人狼議事キャラソートを作ってみました。長い！

  c-post.form(@focus="focus" handle="VSSAY" id="summary-face")
    nuxt-link(to="/summary/faces") キャラクター活躍記録
    br
    .card どこかの村で活躍したことのあるキャラクターはこちら。

  c-report(@focus="focus" handle="footer" deco="center" id="head-appendix") おまけの情報
  c-post.form(@focus="focus" handle="SSAY" id="history")
    | 更新履歴
    hr
    a(href="https://github.com/7korobi/giji-fire/commits/master") 総合トップ
    a(href="https://github.com/7korobi/giji_assets/commits/chr-add") キャラ更新
    a(href="https://github.com/7korobi/giji-sow-api/commits/master") 村ログAPI
    a(href="https://github.com/7korobi/giji_rails/commits/master") 村ログ収集
    a(href="https://github.com/7korobi/sow-giji/commits/cabala") 人狼
    a(href="https://github.com/7korobi/sow-giji/commits/show-fix") 人狼(ciel)

  c-post.form(@focus="focus" handle="VGSAY" id="appendix")
    a(href="https://giji-db923.firebaseapp.com/") テストサイト
    br
    .card つくりかけの人狼議事総合トップが置いてあります。

  c-post.form(@focus="focus" handle="VGSAY" id="creation")
    nuxt-link.button(to="/demo/names" no-prefetch) 人名単語索引
    a(href="http://naming.nobody.jp/") 創作支援名前倉庫
    a(href="https://ichiranya.com/") いちらん屋
    br
    .card 創作のお供にどうぞ。

  c-talk.form(@focus="focus" handle="GSAY" id="link-to" face_id="sf04" head="お散歩隊長 アシモフ").
    とたたたたたたんっ。

    ぼくはドメインの壁なんてへっちゃらでちゅ。
    #[span(data-ruby="おさんぽ") 広報活動]に#[a(href="https://twitter.com/jinrogiji") ついてきて]もかまわないでちゅよ？

  c-report(@focus="focus" handle="footer" deco="giji" id="fcm-head")
    h3.center 企画村予定／開始待ちの村／進行中の村
    div
      fcm(topic="init")
      | 新しい村について通知を受ける。
      br
      | ※下の通知ボタンでは、こういった通知を受けます。
      ul
        li 全員コミットによる更新の一時間くらい前
        li 日程更新の一時間くらい前
        li 更新後
        li 新しい参加者

  c-post(@focus="focus" handle="EVIL" v-for="o in progress" :id="o.id" :head="o.name" :key="o._id")
    fcm(:topic="o.id")
    | &nbsp;
    a(:href="o.folder.href") {{ o.folder.nation }}{{ o.vid }}
    | は、進行中だ。
    .date(v-if="o.is_full_commit")
      | コミット時刻　
      timeago(:since="o.timer.nextcommitdt")
    .date(v-else)
      | 更新時刻　
      timeago(:since="o.timer.nextupdatedt")
  c-post(@focus="focus" handle="MOB"  v-for="o in prologue" :id="o.id" :head="o.name" :key="o._id")
    fcm(:topic="o.id")
    | &nbsp;
    a(:href="o.folder.href") {{ o.folder.nation }}{{ o.vid }}
    | は、開始が楽しみだ。
    .date
      | 廃村期限　
      timeago(:since="o.timer.scraplimitdt")
  c-post(@focus="focus" handle="TSAY"  v-for="o in plan" :id="o.id" :key="o._id")
    p
      a(:href="o.link") {{ o.name }}
    hr
    p {{ o.state || '（開催地不明）' }}　
    
    .fine
      ul
        li(v-for="text in o.flavor") {{ text }}
        li.VSSAY(v-for="text in o.lock") {{ text }}
        li.VSSAY(v-for="text in o.card") {{ text }}

    .date
      | 企画更新　
      timeago(:since="o.write_at")

  c-report(@focus="focus" handle="footer" deco="center" id="demo")
    nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
_ = require 'lodash'
anime = require('animejs').default
{ Step, Query } = require 'memory-orm'
{ poll, replaceState, on_appear } = require "vue-petit-store"

pairs = [
  vs: ["c41","c47"]
  labels: ["ふうらいの"]
  lines: ['<=>']
,
  vs: ["c37","c75"]
  labels: ["オーケストラ"]
  lines: ['<=>']
,
  vs: ["c32","c33"]
  labels: ["双生児"]
  lines: ['<=>']
,
  vs: ["c67","c76"]
  labels: ["はじめての"]
  lines: ['<=>']
,
  vs: ["c103","c99"]
  labels: ["ひきこもり"]
  lines: ['<=>']
,
  vs: ["t50","t51"]
  labels: ["道居士"]
  lines: ['<=>']
,
  vs: ["m11","m12"]
  labels: ["騎士道"]
  lines: ['<=>']
,
  vs: ["m19","m20"]
  labels: ["ズッ友⭐"]
  lines: ['o=>']
,
  vs: ["sf18","sf19"]
  labels: ["絆（物理）"]
  lines: ['<=>']
,
  vs: ["w08","w07"]
  labels: ["双子"]
  lines: ['<=>']
]
d_pair_idx = 0

module.exports =
  directives:
    appear: on_appear 'applogo'
  mixins: [
    poll -> [["sow/plan"]]
    replaceState "idx"
  ]
  data: ->
    idx: ""
    applogo: [
      { x:  0, y:   90, height: -150, width:  87.5, fill: "#3b8070", to: [{ y:  30, height: 150 },{ x:  40 }]}
      { x:  0, y:  120, height: -180, width: 105,   fill: "#41b883", to: [{ y:   0, height: 180 },{ x: -12 }]}
      { x:  0, y:   60, height: -120, width:  70,   fill: "#35495e", to: [{ y:  60, height: 120 },{ x:  23 }]}
      { x:  0, y:    0, height:  -60, width:  35,   fill:    "#fff", to: [{ y: 120, height:  60 },{ x: -12, y: 180, width: 0, height: 0 }]}
    ]
    d_pair:
      icons: [
        v: "-1"
        roll: 0
        x: -170
        y:   70
      ,
        v: "-2"
        roll: 0
        x:  170
        y:   70
      ]
      lines: [
        v: "-1"
        w: "-2"
        vpos:   0
        wpos:   0
        line: "   "
      ]
      clusters: []
      random: []
      size: [2,4,18]

  computed:
    user: ->
      @$store.state.firebase.user
    plan: ->
      Query.sow_village_plans.sort('write_at','desc').list
    prologue: ->
      Query.sow_villages.prologue.list
    progress: ->
      Query.sow_villages.progress.list
    
    applogo_path: ->
      @applogo.map (o)->
        { x,y, width,height, fill } = o
        y += 60
        x += 45
        d = "M#{x},#{y} L#{ x - width },#{ y + height } #{ x + width },#{ y + height }"
        { d, fill, key: fill }

  mounted: ->
    @initialize()

  methods:
    focus: (@idx)->


    change_chr: (idx)->
      pair = pairs[idx]
      v_chr = Query.faces.find pair.vs[0]
      w_chr = Query.faces.find pair.vs[1]

      _.merge @d_pair,
        icons: [
          v: v_chr.id
          label: v_chr.name
        ,
          v: w_chr.id
          label: w_chr.name
        ]
        lines: [
          v: v_chr.id
          w: w_chr.id
          label: pair.labels[0]
          line: pair.lines[0]
        ]

    initialize: ->
      @$nextTick ->
        tl = anime.timeline()
        tl.add
          targets: @applogo
          delay:     500
          duration: 2500
          easing: 'easeInOutBack'
          y:      (o)=>  o.to[0].y
          height: (o)=>  o.to[0].height
        tl.add
          targets: @applogo[3..3]
          duration:     500
          easing: 'linear'
          x:      (o)=>  o.to[1].x
          y:      (o)=>  o.to[1].y
          width:  (o)=>  o.to[1].width
          height: (o)=>  o.to[1].height
        tl.add
          targets: @applogo[0..2]
          delay:    (el, i, l)-> 1000 - 500 * (l - i)
          duration: (el, i, l)->        500 * (l - i)
          easing: 'linear'
          x:      (o)=>  o.to[1].x

      @change_chr 0
      d_pair_idx = 0
      setInterval =>
        anime
          targets: @d_pair.icons[0]
          duration: 300
          easing: 'easeInOutSine'
          x: -400
          complete: =>
            anime
              targets: @d_pair.icons[0]
              duration: 400
              easing: 'easeInOutSine'
              x: -170
            d_pair_idx = (d_pair_idx + 1) % pairs.length
            @change_chr d_pair_idx

        anime
          targets: @d_pair.icons[1]
          duration: 300
          easing: 'easeInOutSine'
          x:  400
          complete: =>
            anime
              targets: @d_pair.icons[1]
              duration: 400
              easing: 'easeInOutSine'
              x:  170

      , 4000
</script>
<style lang="sass" scoped>
.card
  padding: 10px 0 10px 20px
</style>
