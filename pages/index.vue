<template lang="pug">
div
  br
  c-post(@focus="focus" handle="XSAY" id="title" :write_at="1169852700003")
    diagram-view(:value="d_pair")
    p.c
      app-logo(style="margin: -250px 0 70px 0")

  c-post(@focus="focus" handle="TSAY" id="private")
    fire-oauth(style="white-space: nowrap")
    p ログイン中にできること。
    p #[i.mdi.mdi-map-marker]：過去ログビュアーでタップしたとき、栞を挟んで記録します。

  c-report(@focus="focus" handle="footer" deco="center" id="head-private" v-if="mypage") ロビー
  c-post.form(@focus="focus" handle="TSAY" id="private" v-if="mypage")
    nuxt-link(:to="mypage") あなたの情報
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
  c-post.form(@focus="focus" handle="VGSAY" id="appendix")
    a(href="https://giji-db923.firebaseapp.com/") テストサイト
    br
    | つくりかけの人狼議事総合トップが置いてあります。

  c-post.form(@focus="focus" handle="SSAY" id="history")
    | 更新履歴
    hr
    a(href="https://github.com/7korobi/giji-fire/commits/master") 総合トップ
    a(href="https://github.com/7korobi/giji-sow-api/commits/master") 村ログAPI
    a(href="https://github.com/7korobi/giji_rails/commits/master") 村ログ収集・キャラ更新
    a(href="https://github.com/7korobi/sow-giji/commits/cabala") ゲーム
    a(href="https://github.com/7korobi/sow-giji/commits/show-fix") ゲーム（新）

  c-talk.form(@focus="focus" handle="GSAY" id="link-to" face_id="sf04" head="お散歩隊長 アシモフ").
    とたたたたたたんっ。

    ぼくはドメインの壁なんてなんともないでちゅ。
    #[a(href="https://twitter.com/jinrogiji") #[ruby 広報活動#[rt おさんぽ]]]についてきてもかまわないでちゅよ？

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
  c-post(@focus="focus" handle="TSAY"  v-for="o in plan" :id="o.id" :head="o.name" :key="o._id")
    | {{ o.state || '（開催地不明）' }}　
    a(:href="o.link") WIKI
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
{ poll, replaceState } = require "vue-petit-store"

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
  labels: ["厭世家"]
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
  labels: ["ハードワイヤード"]
  lines: ['<=>']
,
  vs: ["w08","w07"]
  labels: ["双子"]
  lines: ['<=>']
]
d_pair_idx = 0

module.exports =
  mixins: [
    poll -> [["sow/plan"]]
    replaceState "idx"
  ]

  data: ->
    idx: ""
    d_pair:
      icons: [
        v: "-1"
        roll: 0
        x: -400
        y: -200
      ,
        v: "-2"
        roll: 0
        x:  400
        y:  200
      ]
      lines: [
        v: "-1"
        w: "-2"
        vpos:   0
        wpos:   0
        line: "   "
      ,
        v: "-1"
        w: "-2"
        vpos: 180
        wpos: 180
        label: "祝！人狼議事10周年！"
        line: "   "
      ]
      clusters: []
      random: []
      size: [2,4,18]

  computed:
    user: ->
      @$store.state.user
    mypage: ->
      return null unless @user?._id
      "mypage"
    plan: ->
      Query.sow_village_plans.sort('write_at','desc').list
    prologue: ->
      Query.sow_villages.prologue.list
    progress: ->
      Query.sow_villages.progress.list

  mounted: ->
    @initialize()

  methods:
    focus: (@idx)->

    initialize: ->
      @$nextTick ->
        anime
          targets: @d_pair.icons
          delay:    1000
          duration: 2200
          easing: 'easeInOutBack'
          y:    0
        anime
          targets: @d_pair.icons[0]
          delay:    1000
          duration: 2800
          easing: 'easeInOutBack'
          x: -155
        anime
          targets: @d_pair.icons[1]
          delay:    1000
          duration: 2800
          easing: 'easeInOutBack'
          x:  155

      d_pair_idx = 0
      setInterval =>
        pair = pairs[d_pair_idx]
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
          ,
            v: v_chr.id
            w: w_chr.id
            label: "祝！人狼議事10周年！"
            line: "   "
          ]
        d_pair_idx = (d_pair_idx + 1) % pairs.length
      , 1000
</script>
<style lang="sass" scoped>
.card
  padding: 10px 0 10px 20px
</style>
