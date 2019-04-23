let utils = (function () {
    function getCss(ele, attr) {
        let val = null,
            reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(ele)[attr];
            reg = /^-?\d+(\.\d+)?(px|em|rem)?$/; //通过正则去掉获取的单位
            reg.test(val) ? val = parseFloat(val) : null;
        }
        return val;
    }

    function setCss(ele, attr, val) {
        if (!isNaN(val)) {
            if (!/^(opacity|zIndex)$/.test(attr)) {
                val += 'px';
            }
        }
        ele["style"][attr] = val;
    }

    function setGroupCss(ele, option) {
        for (let key in option) {
            setCss(ele, key, option[key]);
        }
    }

    function css(...arg) {
        arg.length === 3 ? setCss(...arg) : null;
        if (arg.length === 2) {
            if (toString.call(arg[1]) === "[object Object]") {
                setGroupCss(...arg)
            } else {
                return getCss(...arg);
            }
        }
    }

    function offset(curEle) {
        let l = curEle.offsetLeft,
            t = curEle.offsetTop,
            parent = curEle.offsetParent;
        while (parent) {
            l += parent.offsetLeft + parent.clientLeft;
            t += parent.offsetTop + parent.clientTop;
            parent = parent.offsetParent;
        }
        return {
            left: l,
            top: t
        };
    }

    function win(attr, val) {
        if (typeof val === "undefined") {
            return document.documentElement[attr] || document.body[attr]
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }


    return {
        css,
        offset,
        win
    }
})();