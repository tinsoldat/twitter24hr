;(() => {
  //the regexp
  const regexp = /h:mm a|a[Kh]:mm/
  //define handlers visible in the page scope and export handler functions into them
  const webpackJsonpHandler = new window.Object()
  const pushHandler = new window.Object()
  const i18nHandler = new window.Object()
  const ModuleHandler = new window.Object()
  const FormatterHandler = new window.Object()

  exportFunction(
    (target, thisArg, args) => {
      //change "11:00 PM" to "23:00" and "12:00 AM" to "00:00"
      args[1].pattern = args[1].pattern.replace(regexp, 'HH:mm')
      return Reflect.apply(target, thisArg, args)
    },
    FormatterHandler,
    { defineAs: 'apply' }
  )

  exportFunction(
    (target, propName, attributes) => {
      console.log('ModuleHandler', target, propName, attributes)
      if (propName === 'exports') {
        attributes.wrappedJSObject.value._dateToPartsFormatterFn =
          new window.Proxy(
            attributes.wrappedJSObject.value._dateToPartsFormatterFn,
            FormatterHandler
          )
      }
      return Reflect.defineProperty(
        target.wrappedJSObject,
        propName,
        attributes.wrappedJSObject
      )
    },
    ModuleHandler,
    { defineAs: 'defineProperty' }
  )

  exportFunction(
    (target, thisArg, args) => {
      args.wrappedJSObject[0] = new window.Proxy(
        args.wrappedJSObject[0],
        ModuleHandler
      )
      return Reflect.apply(
        target.wrappedJSObject,
        thisArg.wrappedJSObject,
        args.wrappedJSObject
      )
    },
    i18nHandler,
    { defineAs: 'apply' }
  )

  exportFunction(
    (target, thisArg, args) => {
      const moduleName = args.wrappedJSObject[0][0][0] as string
      if (moduleName === 'vendor') {
        // TODO find a way to determine the module hash
        args.wrappedJSObject[0][1][658610] = new window.Proxy(
          args.wrappedJSObject[0][1][658610],
          i18nHandler
        )
      }
      return Reflect.apply(
        target.wrappedJSObject,
        thisArg.wrappedJSObject,
        args.wrappedJSObject
      )
    },
    pushHandler,
    { defineAs: 'apply' }
  )

  exportFunction(
    (target, propName, attributes) => {
      if (propName === 'push') {
        attributes.wrappedJSObject.value = new window.Proxy(
          attributes.wrappedJSObject.value,
          pushHandler
        )
      }
      return Reflect.defineProperty(
        target.wrappedJSObject,
        propName,
        attributes.wrappedJSObject
      )
    },
    webpackJsonpHandler,
    { defineAs: 'defineProperty' }
  )

  //proxy window.webpackJson;
  window.wrappedJSObject.webpackChunk_twitter_responsive_web = new window.Proxy(
    new window.Array(),
    webpackJsonpHandler
  )
})()
