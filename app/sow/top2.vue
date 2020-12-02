<template lang="pug">
div
  c-report(handle="header")
    h2(class="center")
      a(name="welcome") 人狼議事へようこそ

  c-talk(handle="SSAY" deco="giji")

  c-post(handle="SSAY" deco="giji")
    ol(type="1")
      li
        a(href="./sow.cgi?cmd=about") 人狼議事とは？
      li
        a(href="./sow.cgi?cmd=howto") 遊び方
        |、
        a(href="http://dais.kokage.cc/guide/?(Knowledge)Operation") 操作方法
        |、
        a(href="http://giji.f5.si/rule-guide#nation") ルール
        |、
        a(href="http://giji.f5.si/rule-guide#player") 心構え
        | をよく読もう。なにをする遊び場かわかったら、すぐ下に村がある。
        br
        | 他の人狼クローンを遊んだ事のあるきみは、まず
        a(href="http://dais.kokage.cc/guide/?(What)Other") 他の人狼ゲームとの違い
        | を読もう。多くのことがここに書かれている。
      li
        | 人狼ゲームの基本的な知識、人狼議事独自システムの説明は、公式まとめサイトで知ろう。
        br
        a(href="http://dais.kokage.cc/guide/")
          img(src="http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/banner/guide.png")

  c-report(handle="header")
    h2(class="center")
      a(name="deploy") 村建て前

  c-post(handle="SSAY" deco="giji")
    dl
      dt
        a(href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD") 企画村予定表
        |（wiki：stinさん管理）
      dd これから始まる村の予定が並んでいる。ロールプレイヤー必見かも。

</template>
<script lang="coffee">
module.exports = {}
</script>
