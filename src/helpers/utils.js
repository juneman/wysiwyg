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


export function debounce(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
        } else {
        timeout = delay(later, wait, this, args);
        }

        return result;
    });

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};