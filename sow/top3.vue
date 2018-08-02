<template lang="pug">
div
  c-report(handle="TITLE")
    h3(class="center") 終了済み
  c-post(handle="SSAY" deco="giji")
    a(href="./sow.cgi?cmd=oldlog") 終了した村

  c-report(handle="header")
    h2(class="center") 村の建て方
  c-post(handle="SSAY" deco="giji")
    | まず
    a(href="./sow.cgi?cmd=rule#make") 村建て人の心構え
    |、
    a(href="http://crazy-crazy.sakura.ne.jp/giji/?(Knowledge)Manual") 村建てマニュアル
    | を読んでから村を建てよう。
    br
    | ◆参考：
    a(href="./sow.cgi?cmd=rolematrix") 役職配分一覧
    |｜
    a(href="") 編成実績
    |｜
    a(href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD") 企画村予定表
    |（wiki：stinさん管理）
    br
    a(href="sow.cgi?cmd=trsdiff") 基本設定
    | を選んで「村の作成」を押すと、新しくゲームを作成できる。

  c-post(handle="SSAY" deco="giji")
    dt
      | 便利な
      a(href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD") 企画村予定表
      | はもう見た？建てた村に人が集まりそうかどうか、予想できるかもしれないよ。
    dd
      input(type="checkbox" v-model="can_make")
      | 見たよ！今から、村を立てるよ！

  c-post(handle="SSAY" deco="giji")
    form(action="./sow.cgi" method="get" id="make_vil_form" @submit="can_make")
      input(type="hidden" name="cmd" value="makevilform")
      select(name="trsid" v-model="sow_locale_id")
        option(v-for="o in sow_locales" :value="o.sow_locale_id") {{ o.label }}
      input(type="submit" value="村の作成")
      span あと{{ can_make_vils }}村が建てられます。


  c-report(handle="header")
    h2(class="center") キャラクター画像一覧

  .fullframe
    .portrates
      portrate(v-for="npc in chr_npcs" :face_id="npc.face_id" :key="npc.face_id")
        p
          a(:href="chrlist_url(npc.csid)") {{ npc.label.split(" ").join("\n") }}

  c-report(handle="header")
    h2(class="center") ゲーム内での文章

  c-post(handle="SSAY" deco="giji")
    | ゲーム内で現れる文章の一覧を見ることができます。参考にどうぞ。
    form(action="./sow.cgi" method="get")
      input(type="hidden" name="cmd" value="trslist")
      select(name="trsid" v-model="sow_locale_id")
        option(v-for="o in sow_locales" :value="o.sow_locale_id") {{ o.label }}
      input(type="submit" value="文章を見る")

  c-report(handle="header")
    h2(class="center") 謝辞

  c-post(handle="SSAY" deco="giji")
    | このCGIを作成するに辺り、以下のサイトを参考にさせて頂きました。ありがとうございます。
    ul
      li 人狼審問 - Neighbour Wolves - (終了)
      li The Village of Headless Knight (一時休止中)
      li おとぎの国の人狼（欧州 #[a(href="http://euros.sakura.ne.jp/wolf/") おしまい]）
      li 人狼の悪夢 (閉鎖)
      li #[a(href="http://homepage2.nifty.com/ninjinia/") 人狼BBS]
      li #[a(href="http://wolfbbs.jp/") 人狼BBS まとめサイト]
      li #[a(href="http://mshe.skr.jp/") 人狼BBQ 四国]
      li #[a(href="http://shadow.s63.xrea.com/jinro2/index.cgi") 汝は人狼なりや？Shadow Gallery Ver 2.0]
      li #[a(href="http://melon-cirrus.sakura.ne.jp/sow/") 人狼物語 瓜科国]
      li #[a(href="http://www3.marimo.or.jp/~fgmaster/cabala/sow.cgi") 人狼物語 ぐたるてぃめっと]
      li #[a(href="http://o8o8.o0o0.jp/wolf/sow.cgi") 人狼物語暗黒編]
      li #[a(href="http://tkingdom.dtdns.net/m_jinro/index.html") メビウス人狼]
      li #[a(href="http://straws.sakura.ne.jp/madb01/") MAD PEOPLE]
      li #[a(href="http://members.at.infoseek.co.jp/Paranoia_O/") PARANOIA O]
</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
module.exports =
  data: ->
    can_make: false
    sow_locale_id: "regend"
  methods:
    chrlist_url: (csid)->
      "./sow.cgi?cmd=chrlist&csid=#{csid}"
  computed:
    can_make_vils: ->
      window.sow.can_make_vils
    sow_locales: ->
      Query.locales
      .where (o)=> o.sow_locale_id
      .list
    chr_npcs: ->
      Query.chr_npcs
      .list
</script>
