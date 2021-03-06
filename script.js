(() => {
  //the regexp
  const regexp = /h:mm a|a[Kh]:mm/
  //define handlers visible in the page scope and export handler functions into them
  const webpackJsonpHandler = new window.Object();
  const pushHandler = new window.Object();
  const KQqjHandler = new window.Object();
  const ModuleHandler = new window.Object();
  const ExportsHandler = new window.Object();
  const FormatterHandler = new window.Object();

  exportFunction(
    (target, thisArg, args) => {
      args[1].pattern = args[1].pattern.replace(regexp, "HH:mm"); //change "11:00 PM" to "23:00" and "12:00 AM" to "00:00"
      return Reflect.apply(target, thisArg, args);
    },
    FormatterHandler,
    { defineAs: "apply" }
  );

  exportFunction(
    (target, propName, attributes) => {
      if (propName === "_dateToPartsFormatterFn") {
        attributes.wrappedJSObject.value = new window.Proxy(
          attributes.wrappedJSObject.value,
          FormatterHandler
        );
      }
      return Reflect.defineProperty(
        target.wrappedJSObject,
        propName,
        attributes.wrappedJSObject
      );
    },
    ExportsHandler,
    { defineAs: "defineProperty" }
  );

  exportFunction(
    (target, propName, attributes) => {
      if (propName === "exports") {
        attributes.wrappedJSObject.value = new window.Proxy(
          attributes.wrappedJSObject.value,
          ExportsHandler
        );
      }
      return Reflect.defineProperty(
        target.wrappedJSObject,
        propName,
        attributes.wrappedJSObject
      );
    },
    ModuleHandler,
    { defineAs: "defineProperty" }
  );

  exportFunction(
    (target, thisArg, args) => {
      args.wrappedJSObject[0] = new window.Proxy(
        args.wrappedJSObject[0],
        ModuleHandler
      );
      return Reflect.apply(
        target.wrappedJSObject,
        thisArg.wrappedJSObject,
        args.wrappedJSObject
      );
    },
    KQqjHandler,
    { defineAs: "apply" }
  );

  exportFunction(
    (target, thisArg, args) => {
      if (args.wrappedJSObject[0][1].KQqj) {
        args.wrappedJSObject[0][1].KQqj = new window.Proxy(
          args.wrappedJSObject[0][1].KQqj,
          KQqjHandler
        );
      }
      return Reflect.apply(
        target.wrappedJSObject,
        thisArg.wrappedJSObject,
        args.wrappedJSObject
      );
    },
    pushHandler,
    { defineAs: "apply" }
  );

  exportFunction(
    (target, propName, attributes) => {
      if (propName === "push") {
        attributes.wrappedJSObject.value = new window.Proxy(
          attributes.wrappedJSObject.value,
          pushHandler
        );
      }
      return Reflect.defineProperty(
        target.wrappedJSObject,
        propName,
        attributes.wrappedJSObject
      );
    },
    webpackJsonpHandler,
    { defineAs: "defineProperty" }
  );

  //proxy window.webpackJson;
  window.wrappedJSObject.webpackJsonp = new window.Proxy(
    new window.Array(),
    webpackJsonpHandler
  );
})();
