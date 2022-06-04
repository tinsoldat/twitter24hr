(() => {
  function TrapDateToPartsFormatterFn(formatter) {
    return new Proxy(formatter, {
      apply(target, thisArg, args) {
        args[1].pattern = args[1].pattern.replace("h:mm a", "HH:mm"); //change "11:00 PM" to "23:00" and "12:00 AM" to "00:00"
        return Reflect.apply(target, thisArg, args);
      },
    });
  }

  function TrapKQqjExports(exports) {
    return new Proxy(exports, {
      defineProperty(target, propName, attributes) {
        if (propName === "_dateToPartsFormatterFn") {
          console.log(propName, attributes);
          attributes.value = TrapDateToPartsFormatterFn(attributes.value);
        }
        return Reflect.defineProperty(target, propName, attributes);
      },
    });
  }

  function TrapKQqjModule(module) {
    return new Proxy(module, {
      defineProperty(target, propName, attributes) {
        if (propName === "exports") {
          console.log("trapped module exports");
          attributes.value = TrapKQqjExports(attributes.value);
        }
        return Reflect.defineProperty(target, propName, attributes);
      },
    });
  }

  function TrapKQqj(KQqj) {
    return new Proxy(KQqj, {
      apply(target, thisArg, args) {
        console.log("trapped module");
        args[0] = TrapKQqjModule(args[0]);
        return Reflect.apply(target, thisArg, args);
      },
    });
  }

  function TrapPush(push) {
    return new Proxy(push, {
      apply(target, thisArg, args) {
        if (args[0][0][0] === 2) {
          console.log("trapped KQqj");
          args[0][1].KQqj = TrapKQqj(args[0][1].KQqj);
        }
        return Reflect.apply(target, thisArg, args);
      },
    });
  }

  function TrapWebpackJsonp(target = []) {
    return new Proxy(target, {
      defineProperty(target, propName, attributes) {
        if (propName === "push") {
          console.log("trapped push");
          attributes.value = TrapPush(attributes.value);
        }
        return Reflect.defineProperty(target, propName, attributes);
      },
    });
  }

  window.webpackJsonp = TrapWebpackJsonp([]);
})();
