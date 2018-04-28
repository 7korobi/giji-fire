<template lang="md">

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

Hello [まーくだうん]!
[間接参照][ank]

---
ようこそ。ここにはこの[サイト]を楽しむためのルールや心構えを綴ってある。
暖炉のそばが開いているから、腰を下ろして熟読しよう。楽しいゲームは全員が対等で、全員が読んで理解しているルールがあって成り立つんだ。
    
ただし、やむを得ず、ルール違反をすることもあるだろうね。違反してしまった事実は覆らないけれど、ルールを破らざるをえなかった事情は、落ち着いて聞いてあげよう。
***


*em* **strong** ***strong em*** ****strong strong****
_em_ __strong__ ___strong em___ ____strong strong____
_em_ __strong__ *__em strong__* __**strong strong**__
~~DEL~~

> block-quote
> block-quote
> block-quote
>> block-quote
>> block-quote
>>> block-quote

- [ ] task 1
- [x] task 2

1. one
2. two
  1. three
  2. four
  * asterisk
  - minus
  + plus

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


[![IMAGE ALT TEXT HERE](https://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/c59.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

>  <dl>
>    <dt>Definition list</dt>
>    <dd>Is something people use sometimes.</dd>
>
>    <dt>Markdown in HTML</dt>
>    <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
>  </dl>

Markdown | Less | Pretty
--: | --: | --:
*Still* | `renders` | **nicely**
--- | -- | ...
1 | 2 | 3

[ank]: ank "ank"
[サイト]: / "ここ！"
[まーくだうん]: # "日本語のふきだし"

    indent 4 means 
    pre has code block

~~~ js
here is pre has code.
it shows white-space: pre
~~~

`code` ``code``
``` css
here is pre has code.
it shows white-space: pre
```
</template>
<script lang="coffee">

module.exports =
  layout: "markdown"

</script>
