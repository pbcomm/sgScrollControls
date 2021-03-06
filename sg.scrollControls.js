/*!
 * @file sg.scrollControls.js
 * @version 1.0.0
 * @author Paul.Bronshteyn
 * @comment Built by a geek loaded on caffeine ...
 */
;(function(win, doc) {
    var
        controls = [],
        eventTimer,

        winHeight = function() {
            return win.innerHeight || doc.documentElement.clientHeight;
        },

        scrollHeight = function() {
            return Math.max(
                doc.body.scrollHeight, doc.documentElement.scrollHeight,
                doc.body.offsetHeight, doc.documentElement.offsetHeight,
                doc.body.clientHeight, doc.documentElement.clientHeight
            );
        },

        winScroll = function() {
            return doc.body.scrollTop || doc.documentElement.scrollTop;
        },

        hasScroll = function() {
            return winHeight() < scrollHeight();
        },

        onScrollEnd = function() {
            var ds = controls.dataset;
            ds.hasPt = ds.hasPu = winScroll() > 0;
            ds.hasPb = winScroll() <= 0;
            ds.hasPd = winScroll() + winHeight() !== scrollHeight() && winScroll() + winHeight() < scrollHeight();
        },

        onScroll = function() {
            clearTimeout(eventTimer);
            eventTimer = setTimeout(onScrollEnd, 300);
        },

        onResizeEnd = function() {
            controls.dataset.isActive = hasScroll() > 0;
            onScrollEnd();
        },

        onResize = function() {
            clearTimeout(eventTimer);
            eventTimer = setTimeout(onResizeEnd, 300);
        },

        onClick = function(e) {
            var
                btns = {
                    pb: scrollHeight(),
                    pd: winScroll() + winHeight(),
                    pt: 0,
                    pu: winScroll() - winHeight()
                };

            win.scrollTo(0, btns[e.target.value] || -1);
        },

        addEvent = function(elm, event, func) {
            if (elm.addEventListener) {
                elm.addEventListener(event, func, false);
            } else if (elm.attachEvent)  {
                elm.attachEvent(elm, func);
            }
        },

        init = function() {
            controls.dataset.isActive = hasScroll() > 0;
            addEvent(win, 'scroll', onScroll);
            addEvent(win, 'resize', onResize);
            addEvent(controls, 'click', onClick);
            onScrollEnd();
        };

    win.onload = function() {
        controls = doc.querySelectorAll('aside[data-sgsc="true"]')[0] || null;
        controls && init();
    };
}(window, document));