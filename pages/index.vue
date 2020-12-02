<template lang="pug">
div
  br
  fire-oauth(@focus="focus" handle="TSAY" id="private")
    p ログイン中にできること。
    p #[i.mdi.mdi-map-marker]：過去ログビュアーでタップしたとき、栞を挟んで記録します。

  c-report(@focus="focus" handle="footer" deco="center" id="head-private" v-if="user") ロビー
  c-talk.form(@focus="focus" handle="SSAY" id="link-to" face_id="t82" head="子ども食堂 サガタ").
    ほい、いらっしゃい！

    うちは食堂だからね。どこからきたどんなお客にも、#[a(href="https://twitter.com/hello_giji") 手作りの温かいご飯]を食べてってもらうのさ。

    炊き出しはおかわりも自由だよ。まあちょっと座って、一食おあがりよ。


  c-report(@focus="focus" handle="footer" deco="center" id="head-public") みんなの情報
  c-post.form(@focus="focus" handle="SSAY")
    nuxt-link(to="/rule-guide") 人狼議事のルール
    br
    .card 人狼議事を遊ぶとき、従うべきルールはこちら。

  c-post.form(@focus="focus" handle="VSSAY" id="character")
    | &nbsp;
    nuxt-link(to="/chr/list")
      | キャラクター一覧
    | &nbsp;
    nuxt-link(to="/chr/npc")
      | 最初の犠牲者一覧
    .card 人狼議事を遊ぶ参考にどうぞ。

  c-post(handle="GSAY" id="oldlog")
    | 進行中形式のままの過去ログ
    hr
    p.
      過去ログビューアとはまた違った読み味の、進行中のスタイルそのままの過去ログを、一部分ですが用意しました。
    | &nbsp;
    a(href="http://dais.kokage.cc/giji-log/cafe/sow.cgi?cmd=oldlog") cafe
    | &nbsp;
    a(href="http://dais.kokage.cc/giji-log/crazy/sow.cgi?cmd=oldlog") crazy
    | &nbsp;
    a(href="http://dais.kokage.cc/giji-log/morphe/sow.cgi?cmd=oldlog") morphe

  c-post.form(@focus="focus" handle="PSAY" id="summary-face")
    nuxt-link(to="/summary/faces") キャラクター活躍記録
    br
    .card どこかの村で活躍したことのあるキャラクターはこちら。

  c-post.form(@focus="focus" handle="PSAY" id="chr-sort")
    nuxt-link(to="/chr/sort") キャラクター並べ替えゲーム
    br
    .card 人狼議事キャラソートを作ってみました。長い！

  c-post.form(@focus="focus" handle="PSAY" id="waoon-record")
    a(href="https://waoon.net/record/") 人狼戦績まとめ
    br
    .card あのとき同村したあの人のことが知りたい、というときはこちら。

  c-report(@focus="focus" handle="footer" deco="center" id="head-appendix") おまけの情報
  c-post.form(@focus="focus" handle="SSAY" id="history")
    | 更新履歴
    hr
    | &nbsp;
    a(href="https://github.com/7korobi/giji-fire/commits/master") 総合トップ
    | &nbsp;
    a(href="https://github.com/7korobi/giji_assets/commits/chr-add") キャラ更新
    | &nbsp;
    a(href="https://github.com/7korobi/giji-sow-api/commits/master") 村ログAPI
    | &nbsp;
    a(href="https://github.com/7korobi/giji_rails/commits/master") 村ログ収集
    | &nbsp;
    a(href="https://github.com/7korobi/sow-giji/commits/cabala") 人狼
    | &nbsp;
    a(href="https://github.com/7korobi/sow-giji/commits/show-fix") 人狼(ciel)

  c-post.form(@focus="focus" handle="VGSAY" id="appendix")
    a(href="https://giji-db923.web.app/") テストサイト
    br
    .card つくりかけの人狼議事総合トップが置いてあります。

  c-post.form(@focus="focus" handle="VGSAY" id="creation")
    | &nbsp;
    nuxt-link.button(to="/demo/names" no-prefetch) 人名単語索引
    | &nbsp;
    a(href="https://naming-dic.com/about.html") ネーミング辞典
    | &nbsp;
    a(href="https://myth.maji.asia") 紳魔精妖名辞典
    | &nbsp;
    a(href="http://naming.nobody.jp/") 創作支援名前倉庫
    | &nbsp;
    a(href="https://ichiranya.com/") いちらん屋
    br
    .card 創作のお供にどうぞ。

  c-talk.form(@focus="focus" handle="GSAY" id="link-to" face_id="sf04" head="お散歩隊長 アシモフ").
    居眠りを思わせる安らいだ表情で、白鼠が小さく丸まり、#[a(href="https://twitter.com/jinrogiji") #[ruby 凍り付いている#[rt freeze]]]…。

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
{ Query } = require 'memory-orm'
{ share, poll, replaceState, on_appear } = require "vue-petit-store"

module.exports =
  directives:
    appear: on_appear 'applogo'

  mixins: [
    poll -> [["sow/plan"]]
    replaceState "idx"
    share "user"
  ]
  data: ->
    idx: ""

  computed:
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

</script>
<style lang="sass" scoped>
.card
  padding: 10px 0 10px 20px
</style>
