const { Text } = require("slate")
const escapeHtml = require('escape-html')

const SEARCH = /\[\[([0-9]{1,2}d[0-9]{1,6}|fortune|who|omikuji|role|gift|event|vil who|vil role|vil gift|vil event)\]\]|(([a-z]+):\/\/[^\s<]+[^<.,:;"')\]\s])|((?:\/\*)(?:[\s\S]*?)(?:\*\/|$))|(>>[\+\-\*\#\%\=\!\@]?(?:\d{1,2}:)?[\+\-\*\#\%\=\!\@]?\d{1,6})/g
const LEAF_TAGS = ['A', 'IMG', 'KBD', 'DEL']

function Deco(text: string, cb: (text: string, o: { KBD: string, A: string, DEL: string }, last: number, next: number ) => void ) {
  let offset = 0
  text.replace(SEARCH, (part: string, KBD: string, A: string, _protocol: string, DEL: string, anker: string, idx: number) => {
    let IMG = null
    if (A) {
      const ref = A.match(/\.(jpg|jpeg|png|gif|bmp)$/)
      IMG = ref && ref[1]
    }
    const o = { KBD, A, DEL };
    if (anker != null) {
      o.A = anker;
    }
    cb(text.slice(offset, +idx + 1 || 9e9), null, offset, idx);
    offset = idx + part.length;
    cb(text.slice(idx, +offset + 1 || 9e9), o, idx, offset);
    return part
  })
}

function Render(h: { (tag: any, o: any, children: any): string; (tag: any, o: any, children: any): string; (tag: any, o: any, children: any): string; (arg0: any, arg1: any, arg2: any): any; }, type: string, attrs: {}, children: any) {
  switch (type) {
    case null:
    case void 0:
      return children;
    case 'P':
      return <p {...attrs}>{children}</p>;
    case 'A':
      return <a {...attrs} href={`${children}`}>{children}</a>;
    case 'KBD':
      return <kbd {...attrs} title={`${children}`}>{children}</kbd>;
    default:
      return h(type.toLowerCase(), attrs, children);
  }
}

// throw new Error "#{type}#{children}"
function RenderText(type: any, children: string) {
  switch (type) {
    case 'P':
      return children + "\n"
    default:
      return children
  }
}

const TEXT = {
  parse: function (text: string) {
    return text.split("\n").map(function (text: any) {
      return { text }
    })
  },
  stringify: function (node: { text: any; children: any[]; type: any; }) {
    if (Text.isText(node)) { return node.text }
    const text = node.children.map((n: any) => TEXT.stringify(n)).join("");
    return RenderText(node.type, text);
  }
}

const HTML = {
  parse: function (html: string) {
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    return parsed.body;
  },
  stringify: function (node: { [x: string]: any; text: any; children: any[]; type: any; }) {
    if (Text.isText(node)) {
      const tags = (function () {
        var i: number, len: number, results: string[];
        results = [];
        for (i = 0, len = LEAF_TAGS.length; i < len; i++) {
          const key = LEAF_TAGS[i];
          if (node[key]) {
            results.push(key);
          }
        }
        return results;
      })();
      const children = [];
      Deco(node.text, function (text: any, o: { [x: string]: any; }, last: any, next: any) {
        var i: number, len: number, val: any;
        text = escapeHtml(text);
        for (const key in o) {
          val = o[key];
          text = Render(toTAG, key, {}, text);
        }
        for (i = 0, len = tags.length; i < len; i++) {
          const key = tags[i];
          text = Render(toTAG, key, {}, text);
        }
        return children.push(text);
      });
      return children.join("");
    }
    const text = node.children.map((n: any) => {
      return HTML.stringify(n);
    }).join("");
    return Render(toTAG, node.type, {}, text);
  }
}

function toTAG(tag: any, o: { class: any; attrs: any; }, children: any) {
  const attrs = [];
  if (o != null ? o.class : void 0) {
    attrs.push(` class="${o.class}"`);
  }
  if (o != null ? o.attrs : void 0) {
    const ref = o.attrs;
    for (const k in ref) {
      const v = ref[k];
      if (k && v) {
        attrs.push(` ${escapeHtml(k)}="${escapeHtml(v)}"`);
      }
    }
  }
  const attr_str = attrs.join("");
  if (children) {
    return `<${tag}${attr_str}>${children}</${tag}${attr_str}>`;
  } else {
    return `<${tag}${attr_str}/>`;
  }
}

module.exports = { Deco, Render, HTML, TEXT, LEAF_TAGS };
