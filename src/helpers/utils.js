const delay = restArgs(function(func, wait, args) {
    return setTimeout(function() {
        return func.apply(null, args);
    }, wait);
});


function restArgs(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
        const length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length);
        let index = 0;
        for (; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        const args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    };
}

export function isTimestamp(value) {
    let val = value;

    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(val)) {
      val = Number(val);
    }

    switch (typeof val) {
      case "string":
        return !isNaN(new Date(Date.parse(val)).getTime());
      case "number":
        // Verify the number is most likely a timestamp in
        // seconds/milliseconds (i.e. has 8 or more digits).
        return String(val).length >= 8;
    }

    return false;
}
