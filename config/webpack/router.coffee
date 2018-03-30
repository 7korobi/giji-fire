
###
const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition は popState ナビゲーションでのみ利用できます
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // 子パスが見つからないとき
    if (to.matched.length < 2) {
      // ページのトップへスクロールする
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // 子パスのひとつが scrollToTop オプションが true にセットされているとき
      position = { x: 0, y: 0 }
    }
    // アンカーがあるときは、セレクタを返すことでアンカーまでスクロールする
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}

###

module.exports =
  extendRoutes: (routes, resolve)->
    # routes.push
    #   name: 'custom'
    #   path: '*'
    #   component: resolve(__dirname, 'pages/404.vue')
  scrollBehavior: (to, from, savedPosition)->
    position = false

    # if no children detected
    switch
      when to.matched.length < 2
        # scroll to the top of the page
        position = { x: 0, y: 0 }
      when to.matched.some((r)=> r.components.default.options.scrollToTop)
        # if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }

    if savedPosition
      position = savedPosition

    new Promise (ok)=>
      # wait for the out transition to complete (if necessary)
      window.$nuxt.$once 'triggerScroll', =>
        # coords will be used if no selector is provided,
        # or if the selector didn't match any element.
        if to.hash && document.querySelector to.hash
          # scroll to anchor by returning the selector
          position =
            selector: to.hash
        ok position
