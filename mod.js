(function () {
    'use strict';

    if (top !== self) return;

    var _boostCanvas = null;
    var _boostCtx = null;
    var _boostCooldown = null;
    var _boostImage = null;
    var _boostLoaded = false;
    var _diveElement = null;

    function _waitForGame() {
        if (
            !window.ggMod ||
            !window.ggMod.sr ||
            !window.ggMod.E ||
            !window.ggMod.Q ||
            !window.ggMod.Am ||
            !window.ggMod.Hc ||
            !window.ggMod.Bi ||
            !window.ggMod.Ci ||
            !window.ggMod.Co ||
            !window.ggMod.Do
        ) {
            setTimeout(_waitForGame, 100);
            return;
        }

        _makeBoostButton();
    }

    function _aim() {
        var g = window.ggMod.sr;

        if (!g) return null;

        var world = g.R && (g.R.yo || (g.R.i && g.R.i.cq));
        var cont = g.R && g.R.i;

        if (!world || !cont) return null;

        var src = g.R.H && g.R.H.Eo
            ? g.R.H.Eo.body
            : null;

        if (!src) return null;

        return {
            game: g.R,
            world: world,
            cont: cont,
            body: src
        };
    }

    function _boost() {
        var a = _aim();

        if (!a || !a.body) return false;

        var E = window.ggMod.E;
        var Q = window.ggMod.Q;

        var body = a.body;
        var force = 5 * body.Xb;
        var angle = .35 * Math.PI;

        var impulse = E(
            Math.sin(angle) * force,
            -Math.cos(angle) * force
        );

        body.wq(impulse, Q(body));

        return true;
    }

    function _makeBoostButton() {
        if (_boostCanvas) return;

        var root = document.querySelector(".ui-root");

        if (!root) {
            setTimeout(_makeBoostButton, 100);
            return;
        }

        _diveElement = root.querySelector(".dive-button");

        if (!_diveElement) {
            setTimeout(_makeBoostButton, 100);
            return;
        }

        var Bi = window.ggMod.Bi;

        _boostCanvas = document.createElement("canvas");

        _boostCanvas.width = Bi[3];
        _boostCanvas.height = Bi[4];

        _boostCanvas.style.width =
            _boostCanvas.width / 2 + "px";

        _boostCanvas.style.height =
            _boostCanvas.height / 2 + "px";

        _boostCanvas.className =
            "dive-button gnome-button";

        _boostCanvas.id = "gg-boost-button";

        _boostCanvas.style.position = "absolute";
        _boostCanvas.style.bottom = "158px";
        _boostCanvas.style.right = "20px";
        _boostCanvas.style.zIndex = "999999";

        _boostCtx = _boostCanvas.getContext("2d");

        var Am = window.ggMod.Am;
        var Hc = window.ggMod.Hc;

        _boostCooldown = new Am(
            { uy: 0 },
            { uy: 1 },
            2200,
            Hc
        );

        _boostImage = new Image();

        _boostImage.onload = function () {
            _boostLoaded = true;
        };

        _boostImage.src =
            "logos/2018/gnomes/boost.png";

        function doBoost(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();

            if (
                !_boostCanvas.classList.contains("shown")
            ) {
                return;
            }

            if (null !== _boostCooldown.i) {
                return;
            }

            if (_boost()) {
                _boostCooldown.start();
                _boostCanvas.classList.add("disabled");
            }
        }

        _boostCanvas.addEventListener(
            "pointerdown",
            doBoost,
            true
        );

        root.appendChild(_boostCanvas);

        _boostCanvas.classList.remove("shown");
        _boostCanvas.classList.remove("disabled");

        _drawBoostButton();
    }

    function _syncVisibility() {
        if (!_boostCanvas || !_diveElement) {
            return;
        }

        if (_diveElement.classList.contains("shown")) {
            _boostCanvas.classList.add("shown");
        } else {
            _boostCanvas.classList.remove("shown");
        }

        if (
            !_diveElement.classList.contains("shown") &&
            null === _boostCooldown.i
        ) {
            _boostCanvas.classList.remove("disabled");
        }
    }

    function _drawBoostButton() {
        if (!_boostCanvas) return;

        _syncVisibility();

        if (_boostCooldown.wv()) {
            _boostCooldown.reset();
            _boostCanvas.classList.remove("disabled");
        }

        var progress = 1;

        if (null !== _boostCooldown.i) {
            progress = _boostCooldown.Co().uy;
        }

        var Do = window.ggMod.Do;
        var Ci = window.ggMod.Ci;
        var Co = window.ggMod.Co;

        _boostCtx.clearRect(
            0,
            0,
            _boostCanvas.width,
            _boostCanvas.height
        );

        _boostCtx.save();

        if (progress < 1) {
            _boostCtx.globalAlpha = .6;
        }

        if (_boostLoaded) {
            _boostCtx.drawImage(
                _boostImage,
                0,
                0,
                _boostCanvas.width,
                _boostCanvas.height
            );
        }

        _boostCtx.beginPath();

        _boostCtx.moveTo(
            Do[0],
            Do[1]
        );

        _boostCtx.arc(
            Do[0],
            Do[1],
            Do[0],
            -Math.PI / 2,
            progress * Math.PI * 2 - Math.PI / 2
        );

        _boostCtx.clip();

        Co.draw(
            Ci,
            _boostCtx,
            Do[0] - Ci[3] / 2,
            Do[1] - Ci[4] / 2
        );

        _boostCtx.restore();

        requestAnimationFrame(_drawBoostButton);
    }

    function _positionBoost() {
        if (!_boostCanvas) return;

        _boostCanvas.style.bottom = "158px";
        _boostCanvas.style.right = "20px";
    }

    window.addEventListener(
        "resize",
        _positionBoost
    );

    _waitForGame();
})();
