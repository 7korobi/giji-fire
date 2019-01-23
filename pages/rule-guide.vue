<template lang="pug">
div
  c-post(handle="footer")
    nuxt-link(to="#nation") 国のルール
    nuxt-link(to="#village") 村のルール
    nuxt-link(to="#player") プレーヤー
    nuxt-link(to="#maker") 村建て
  br
  c-post(handle="footer")
    bread-crumb
  br
  c-report(handle="footer") 準備はいいかな？
  c-talk(handle="MSAY" deco="sow" face_id="c96" head="学者 レオナルド", :write_at="1370662886001")
    p.
      ようこそ。ここにはこのサイトを楽しむためのルールや心構えを綴ってある。
      暖炉のそばが開いているから、腰を下ろして熟読しよう。楽しいゲームは全員が対等で、全員が読んで理解しているルールがあって成り立つんだ。

      ただし、やむを得ず、ルール違反をすることもあるだろうね。違反してしまった事実は覆らないけれど、ルールを破らざるをえなかった事情は、落ち着いて聞いてあげよう。
      #[a(chk="confirm" href="http://www.nihonjiten.com/data/763.html") 罪を憎んで、人を憎まず]。
      これは話し合いをするゲームなんだ。

      #[strong(title="法案や、企業の自主規制に従う必要はない。逆らう必要もない。\nそれよりもきみのそばの十数人のためを思おう。") このサイトは日本国の法律に従っている。]
      特にここで、六法全書を引き写して退屈な思いをするつもりはないけれど、不正アクセス禁止法、個人情報保護法は関わりが深いはずだ。

  c-report(handle="MAKER") ルール
  c-report(handle="footer" id="nation") {{ nation.head }}
  c-report(v-for="o, idx in nation.list" deco="giji" handle="VSSAY", :head="o.head", :log="o.log", :key="'nation-' + idx")

  c-report(handle="footer" id="village") {{ village.head }}
  c-report(v-for="o, idx in village.list" deco="giji" handle="SSAY", :head="o.head", :log="o.log", :key="'village-' + idx")

  c-report(handle="MAKER") ルール違反があったら？
  c-report(handle="footer") はじめに
  c-talk(handle="MSAY" deco="sow" face_id="c96" head="学者 レオナルド", :write_at="1370662886002")
    p.
      もし、ルールに違反してしまったとしたら？とても残念なことだけれど、まだ絶望しなくていい。

      きみには全員に釈明する、貴重な機会が残されているんだ。遊びに集まった皆が笑い合って解散するために、勇気を奮ってエピローグに顔を出してごらん。

      真剣な話し合いが必要なときは、協力してそのための時間をなんとか捻り出してほしい。
      家に帰るまでが遠足なのと同じで、エピローグが済むまでがその村なんだ。
  c-talk(handle="MSAY" deco="sow" face_id="c96" head="学者 レオナルド", :write_at="1370662886003")
    p.
      エピローグでは全員が一同に介し、墓下と地上にわかれることなく、勝つための嘘もなく、より率直な話ができる。
      この特性から、人狼議事ではエピローグでの話し合いを推奨しているよ。
      古い時代にサムライは、どのような事情にも沈黙して咎を一身に引き受けることを美徳としていたそうだ。
      起こったことを水に流すにはそれもいいだろうけれど、残念ながらみんなの気持ちはこのことに残ってしまうので、あまりよくない。

      解散するときに心残りなく、さっぱりとお別れができるよう、エピローグを活用してほしい。もやもやと蟠りが残るのは、だめだね。

  c-report(handle="footer") 突然死
  c-talk(handle="GSAY" deco="head" face_id="t07" head="勧善懲悪委 アカリ", :write_at="1437461000000")
    p.
      突然死は悪！そうですよね先生！

      みんな一生懸命がんばっているのに、そんなことで汚されるの、悔しいです！

  c-talk(handle="MSAY" deco="sow" face_id="c96" head="学者 レオナルド", :write_at="1437461000000")
    p.
      正解、国のルールだね。
      ただ、人狼議事では、１日間発言しない場合には２つの措置をとっている。

      ひとつ、突然死とする措置。
      ふたつ、ゲーム不参加扱いとする措置。

      これらの罰則を超えて重大なことなのか、冷静に考えて行動しよう。また、事故的な、やむを得ない事情があるかもしれないよ。もし事情があれば、考慮して考えてみよう。
      僕らはここに遊びに来ているんだ。最後には笑い合って解散できることを目指そうね。

  c-report(handle="footer") どうすればいいの？
  c-talk(handle="MSAY" deco="sow" face_id="c96" head="学者 レオナルド", :write_at="1437461000000")
    p.
      ここでは、ルール違反についてとるべき対応を話そう。

      さきの項目でアカリくんが嘆いていたように、真剣なゲームをしていれば、ルール違反を許したくないという強い情動もあるものなんだ。
      いっぽう、粗相があったらコップ一杯の日本酒を一気飲みして、ちょっといいところを見せればよい、という考え方もあるものだよ。

      こうした考え方が村の中でずれていると、いざ何かがあったときに困ったり、不満が溜まったりしてしまう。
      開始前に、あなたの村ではどう対応する、という方針を明らかにしておくと、志向の合わない人と衝突してしまうことも減るはずだよ。
      どう対応するとよいのかを宿題にします、みなさんの良心にしたがって考えてみよう。
  c-talk(handle="GSAY" deco="sow" face_id="g02" head="白鶴拳 志偉", :write_at="1437461000000")
    p.
      うちの道場じゃ、気の抜けた奴は師範代が叩き出してるぜ！リアルがヤバそうだったり、難しくてわかんないなら控えとけよってことよ。

      よーし、俺の建てる村は違反なんて許さん。アカリや†ルシフェル†みたいに、きちんと参加できるやつら誘ってガンガンいくのだあ！
  c-talk(handle="GSAY" deco="sow" face_id="t01" head="友愛組合 チアキ", :write_at="1437461000000")
    p.
      道場みたいな処だと窮屈だな。僕は自分で、別の村を建てるよ。僕の村は忙しい人もフォローするし、ルール違反（突然死とか）があっても、厳しく責め立てたくはないんだ。

      …村に書いちゃうの勇気いるなあ。違反してもOKみたいに聞かれてしまいそうだ。ゴクリ。
      #[strong せっかく集まった仲間を責めたくないだけなんだけれど…どう伝えよう…]
  c-talk(handle="GSAY" deco="sow" face_id="c24" head="長老 ナタリア", :write_at="1437461000000")
    p.
      あたしは難しいことを考えるのが苦手でねえ。あんまり上手に勝とうとできていなくても、厳しくしてほしくないねえ。

      そうだわ、ヌマタロウさんをお誘いして、そういう村を建ててみようかしらねえ。お茶受けは拳骨煎餅かしらねえ。

  c-report(handle="MAKER") 心構え
  c-post(handle="VSSAY") 心構えを守って、楽しく、強く遊ぼう。

  c-report(handle="footer" id="player") 遊びにきたかたへ
  c-report(v-for="o, idx in player.list" deco="giji" handle="MSAY", :head="o.head", :log="o.log", :key="'player-' + idx")

  c-report(handle="footer" id="maker") {{ maker.head }}
  c-talk(handle="WSAY" deco="sow" face_id="t10" head="営利政府 トレイル", :write_at="1437461000000")
    p.
      村建てフォームには、村のルールが既に記入してあります。
      賛同できる内容はそのまま残して、不足なら筆を加え、余分と判断する事項は削除して村を建ててください。

      村を建てるとき気をつけると良いことを心構えに纏めました。
      ぜひご覧ください。
  c-report(v-for="o, idx in maker.list" deco="giji" handle="VSSAY", :head="o.head", :log="o.log", :key="'maker-' + idx")
  c-post(handle="footer")
    bread-crumb

</template>

<script lang="coffee">
module.exports =
  data: ->
    require "../yaml/rule.yml"
  beforeRouteUpdate: ({ hash }, oldRoute, next)->
    next()
    @$store.commit "menu/focus",
      query: hash
      mode: 'top'

  head: ->
    titleTemplate: "%sのルール"

</script>
