/* =========================================================
   ARTÉ — ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const sidebar = document.getElementById("adminSidebar");
    const mobileMenu = document.getElementById("mobileMenu");

    const themeButton = document.getElementById("themeButton");

    const logoutBtn = document.getElementById("logoutBtn");

    const profileMenu = document.getElementById("profileMenu");

    const notificationButton =
        document.getElementById("notificationButton");

    const searchButton =
        document.getElementById("searchButton");

    const pageTitle =
        document.getElementById("pageTitle");

    const navLinks =
        document.querySelectorAll(".admin-nav-link");


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorCircle =
        document.querySelector(".cursor-circle");


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let circleX = mouseX;
    let circleY = mouseY;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }

    });


    function animateCursor() {

        circleX +=
            (mouseX - circleX) * 0.15;

        circleY +=
            (mouseY - circleY) * 0.15;


        if (cursorCircle) {

            cursorCircle.style.left =
                `${circleX}px`;

            cursorCircle.style.top =
                `${circleY}px`;

        }


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* =====================================================
       CURSOR HOVER EFFECT
    ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "button, a, select, .stat-card, .admin-nav-link, tbody tr"
        );


    interactiveElements.forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                if (!cursorCircle) return;

                cursorCircle.style.width =
                    "48px";

                cursorCircle.style.height =
                    "48px";

                cursorCircle.style.background =
                    "rgba(200,164,93,.05)";

                cursorCircle.style.borderColor =
                    "rgba(200,164,93,.8)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                if (!cursorCircle) return;

                cursorCircle.style.width =
                    "34px";

                cursorCircle.style.height =
                    "34px";

                cursorCircle.style.background =
                    "transparent";

                cursorCircle.style.borderColor =
                    "rgba(200,164,93,.55)";

            }
        );

    });


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

                const icon =
                    mobileMenu.querySelector("i");


                if (
                    sidebar.classList.contains("open")
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                window.innerWidth > 760 ||
                !sidebar ||
                !mobileMenu
            ) {
                return;
            }


            const clickedInsideSidebar =
                sidebar.contains(event.target);

            const clickedMenu =
                mobileMenu.contains(event.target);


            if (
                !clickedInsideSidebar &&
                !clickedMenu
            ) {

                sidebar.classList.remove(
                    "open"
                );

                const icon =
                    mobileMenu.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* =====================================================
       NAVIGATION
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href = link.getAttribute("href") || "";
                const isRealPage =
                    href &&
                    !href.startsWith("#") &&
                    href !== "" &&
                    !href.startsWith("javascript:");

                if (isRealPage) {
                    return;
                }

                event.preventDefault();

                navLinks.forEach((item) => {
                    item.classList.remove("active");
                });

                link.classList.add("active");

                const page = link.dataset.page;
                updatePageTitle(page);

                if (window.innerWidth <= 760 && sidebar) {
                    sidebar.classList.remove("open");
                    if (mobileMenu) {
                        const icon = mobileMenu.querySelector("i");
                        if (icon) {
                            icon.classList.remove("fa-xmark");
                            icon.classList.add("fa-bars");
                        }
                    }
                }

                createNavigationFeedback();
            }
        );

    });


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    function updatePageTitle(page) {

        if (!pageTitle) return;


        const titles = {

            dashboard: "Dashboard",

            orders: "Orders",

            menu: "Menu",

            users: "Users",

            reservations: "Reservations",

            analytics: "Analytics",

            settings: "Settings"

        };


        pageTitle.textContent =
            titles[page] || "Dashboard";

    }


    /* =====================================================
       NAVIGATION FEEDBACK
    ===================================================== */

    function createNavigationFeedback() {

        const page =
            document.querySelector(
                ".admin-page"
            );


        if (!page) return;


        page.style.animation = "none";

        void page.offsetWidth;

        page.style.animation =
            "pageIn .55s cubic-bezier(.2,.8,.2,1) both";

    }


    /* =====================================================
       THEME — dark / light
    ===================================================== */

    function updateThemeIcon() {
        if (!themeButton) return;
        const icon = themeButton.querySelector("i");
        if (!icon) return;

        const isLight = body.classList.contains("light-mode");
        icon.className = isLight
            ? "fa-solid fa-sun"
            : "fa-regular fa-moon";
    }

    function applyTheme(mode) {
        if (mode === "light") {
            body.classList.add("light-mode");
            document.documentElement.classList.add("light-mode");
        } else {
            body.classList.remove("light-mode");
            document.documentElement.classList.remove("light-mode");
        }
        localStorage.setItem("arte-admin-theme", mode);
        updateThemeIcon();
    }

    applyTheme(localStorage.getItem("arte-admin-theme") || "dark");

    if (themeButton) {
        themeButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const next = body.classList.contains("light-mode") ? "dark" : "light";
            applyTheme(next);
            createThemeFlash();
        });
    }


    /* =====================================================
       THEME FLASH
    ===================================================== */

    function createThemeFlash() {

        const flash =
            document.createElement("div");


        flash.style.position =
            "fixed";

        flash.style.inset =
            "0";

        flash.style.pointerEvents =
            "none";

        flash.style.zIndex =
            "9990";

        flash.style.background =
            "rgba(200,164,93,.08)";

        flash.style.opacity =
            "0";


        document.body.appendChild(
            flash
        );


        requestAnimationFrame(() => {

            flash.style.transition =
                "opacity .35s ease";

            flash.style.opacity =
                "1";


            setTimeout(() => {

                flash.style.opacity =
                    "0";


                setTimeout(() => {

                    flash.remove();

                }, 400);

            }, 80);

        });

    }


    /* =====================================================
       PROFILE MENU
    ===================================================== */

    if (profileMenu) {

        profileMenu.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                showToast(
                    "Admin profile menu"
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                showNotificationPanel();

            }
        );

    }


    function showNotificationPanel() {

        const existing =
            document.querySelector(
                ".notification-panel"
            );


        if (existing) {

            existing.remove();

            return;

        }


        const panel =
            document.createElement("div");


        panel.className =
            "notification-panel";


        panel.innerHTML = `

            <div class="notification-panel-header">

                <div>

                    <span>ARTÉ</span>

                    <strong>
                        Notifications
                    </strong>

                </div>

                <button
                    class="close-notifications"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

            <div class="notification-list" style="max-height:360px; overflow:auto;">
                <div class="notification-item" style="opacity:0.6;">
                    <div class="notification-content">
                        <p>Loading…</p>
                    </div>
                </div>
            </div>

        `;


        document.body.appendChild(
            panel
        );


        addNotificationStyles();


        const close =
            panel.querySelector(
                ".close-notifications"
            );


        close.addEventListener(
            "click",
            () => {

                panel.remove();

            }
        );


        requestAnimationFrame(() => {

            panel.classList.add(
                "show"
            );

        });

        fetch('/dashboard/api/notifications/', { credentials: 'same-origin' })
            .then(r => r.json())
            .then(data => {
                const list = panel.querySelector('.notification-list');
                if (!list) return;
                if (!data.ok || !data.items || !data.items.length) {
                    list.innerHTML = '<div class="notification-item"><div class="notification-content"><p>No new notifications. All clear!</p></div></div>';
                    return;
                }
                const fmt = (iso) => {
                    try {
                        const d = new Date(iso);
                        const diff = (Date.now() - d.getTime()) / 1000;
                        if (diff < 60) return 'Just now';
                        if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
                        if (diff < 86400) return Math.floor(diff / 3600) + ' hr ago';
                        return d.toLocaleDateString();
                    } catch (e) { return ''; }
                };
                list.innerHTML = data.items.map(item => `
                    <a href="${item.url || '#'}" class="notification-item" style="text-decoration:none; color:inherit; display:flex; gap:12px; padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.06);">
                        <div class="notification-symbol">
                            <i class="fa-solid ${item.icon || 'fa-bell'}"></i>
                        </div>
                        <div class="notification-content">
                            <strong>${item.title}</strong>
                            <p>${item.body}</p>
                            <small>${fmt(item.time)}</small>
                        </div>
                    </a>
                `).join('');
                const dot = document.querySelector('.notification-dot');
                if (dot && data.counts) {
                    if (data.counts.total > 0) {
                        dot.style.display = '';
                        dot.textContent = data.counts.total > 9 ? '9+' : data.counts.total;
                    } else {
                        dot.style.display = 'none';
                    }
                }
            })
            .catch(() => {
                const list = panel.querySelector('.notification-list');
                if (list) list.innerHTML = '<div class="notification-item"><div class="notification-content"><p>Could not load notifications.</p></div></div>';
            });

    }


    /* =====================================================
       NOTIFICATION STYLES
    ===================================================== */

    function addNotificationStyles() {

        if (
            document.getElementById(
                "notificationStyles"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "notificationStyles";


        style.textContent = `

            .notification-panel {

                position: fixed;

                top: 75px;

                right: 35px;

                width: 330px;

                z-index: 5000;

                padding: 18px;

                border:
                    1px solid
                    rgba(200,164,93,.22);

                border-radius: 14px;

                background:
                    rgba(17,17,17,.94);

                backdrop-filter:
                    blur(30px);

                box-shadow:
                    0 25px 80px
                    rgba(0,0,0,.35);

                opacity: 0;

                transform:
                    translateY(-10px)
                    scale(.97);

                transition:
                    opacity .3s ease,
                    transform .3s ease;

            }


            body.light-mode
            .notification-panel {

                background:
                    rgba(255,255,255,.95);

            }


            .notification-panel.show {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }


            .notification-panel-header {

                display: flex;

                align-items: center;

                justify-content:
                    space-between;

                padding-bottom: 15px;

                margin-bottom: 5px;

                border-bottom:
                    1px solid
                    rgba(255,255,255,.08);

            }


            .notification-panel-header div {

                display: flex;

                flex-direction: column;

                gap: 3px;

            }


            .notification-panel-header span {

                color:
                    #c8a45d;

                font-size: 7px;

                letter-spacing: 2px;

            }


            .notification-panel-header strong {

                font-family:
                    "Playfair Display",
                    serif;

                font-size: 17px;

                font-weight: 400;

            }


            .close-notifications {

                width: 30px;

                height: 30px;

                border-radius: 50%;

                background:
                    rgba(200,164,93,.08);

                color:
                    #aaa69d;

            }


            .notification-item {

                display: flex;

                gap: 11px;

                padding: 14px 3px;

                border-bottom:
                    1px solid
                    rgba(255,255,255,.06);

            }


            .notification-item:last-child {

                border-bottom: 0;

            }


            .notification-symbol {

                width: 31px;

                height: 31px;

                flex-shrink: 0;

                display: flex;

                align-items: center;

                justify-content: center;

                border-radius: 8px;

                background:
                    rgba(200,164,93,.10);

                color:
                    #c8a45d;

                font-size: 10px;

            }


            .notification-item strong {

                display: block;

                margin-bottom: 3px;

                font-size: 10px;

            }


            .notification-item p {

                margin: 0 0 4px;

                font-size: 9px;

                line-height: 1.5;

                color: #8d8982;

            }


            .notification-item small {

                font-size: 7px;

                color: #66635e;

            }


            @media(max-width:600px) {

                .notification-panel {

                    top: 65px;

                    right: 12px;

                    left: 12px;

                    width: auto;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                showSearchOverlay();

            }
        );

    }


    function showSearchOverlay() {

        if (
            document.querySelector(
                ".admin-search-overlay"
            )
        ) {
            return;
        }


        const overlay =
            document.createElement("div");


        overlay.className =
            "admin-search-overlay";


        overlay.innerHTML = `

            <div class="search-box">

                <button
                    class="search-close"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <span>
                    SEARCH ARTÉ
                </span>

                <input
                    type="text"
                    placeholder="Search orders, users, menu..."
                    autofocus
                >

                <p>
                    Press ESC to close
                </p>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        addSearchStyles();


        const input =
            overlay.querySelector(
                "input"
            );


        setTimeout(() => {

            input.focus();

        }, 100);


        const close =
            overlay.querySelector(
                ".search-close"
            );


        close.addEventListener(
            "click",
            () => {

                overlay.remove();

            }
        );


        overlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === overlay
                ) {

                    overlay.remove();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function escapeSearch(event) {

                if (
                    event.key === "Escape"
                ) {

                    overlay.remove();

                    document.removeEventListener(
                        "keydown",
                        escapeSearch
                    );

                }

            }
        );

    }


    /* =====================================================
       SEARCH STYLES
    ===================================================== */

    function addSearchStyles() {

        if (
            document.getElementById(
                "searchStyles"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "searchStyles";


        style.textContent = `

            .admin-search-overlay {

                position: fixed;

                inset: 0;

                z-index: 8000;

                display: flex;

                align-items: flex-start;

                justify-content: center;

                padding-top: 18vh;

                background:
                    rgba(0,0,0,.68);

                backdrop-filter:
                    blur(18px);

            }


            .search-box {

                position: relative;

                width:
                    min(620px, calc(100% - 35px));

                padding: 38px;

                border:
                    1px solid
                    rgba(200,164,93,.28);

                border-radius: 16px;

                background:
                    rgba(17,17,17,.94);

                box-shadow:
                    0 40px 100px
                    rgba(0,0,0,.5);

                animation:
                    searchIn .35s
                    ease both;

            }


            body.light-mode
            .search-box {

                background:
                    rgba(255,255,255,.96);

            }


            @keyframes searchIn {

                from {

                    opacity: 0;

                    transform:
                        translateY(20px)
                        scale(.97);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0)
                        scale(1);

                }

            }


            .search-box > span {

                display: block;

                margin-bottom: 14px;

                color:
                    #c8a45d;

                font-size: 8px;

                letter-spacing: 3px;

            }


            .search-box input {

                width: 100%;

                padding:
                    15px 0;

                border: 0;

                border-bottom:
                    1px solid
                    rgba(200,164,93,.35);

                outline: none;

                background:
                    transparent;

                color:
                    var(--text);

                font-family:
                    "Playfair Display",
                    serif;

                font-size: 24px;

            }


            .search-box input::placeholder {

                color:
                    var(--text-muted);

            }


            .search-box p {

                margin-top: 13px;

                font-size: 8px;

                color:
                    var(--text-muted);

            }


            .search-close {

                position: absolute;

                top: 18px;

                right: 18px;

                width: 31px;

                height: 31px;

                border-radius: 50%;

                background:
                    rgba(200,164,93,.08);

                color:
                    var(--text-soft);

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to sign out?"
                    );


                if (!confirmed) {
                    return;
                }


                showToast(
                    "Signing out..."
                );


                setTimeout(() => {

                    window.location.href = "/accounts/logout/";

                }, 700);

            }
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        const existing =
            document.querySelector(
                ".arte-toast"
            );


        if (existing) {
            existing.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "arte-toast";


        toast.innerHTML = `

            <span class="toast-line"></span>

            <span>
                ${message}
            </span>

        `;


        document.body.appendChild(
            toast
        );


        addToastStyles();


        requestAnimationFrame(() => {

            toast.classList.add(
                "show"
            );

        });


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );


            setTimeout(() => {

                toast.remove();

            }, 350);

        }, 2400);

    }


    /* =====================================================
       TOAST STYLES
    ===================================================== */

    function addToastStyles() {

        if (
            document.getElementById(
                "toastStyles"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "toastStyles";


        style.textContent = `

            .arte-toast {

                position: fixed;

                right: 25px;

                bottom: 25px;

                z-index: 9999;

                display: flex;

                align-items: center;

                gap: 10px;

                padding:
                    12px 17px;

                border:
                    1px solid
                    rgba(200,164,93,.25);

                border-radius: 8px;

                background:
                    rgba(18,18,18,.94);

                color:
                    #f4f1e9;

                font-size: 10px;

                box-shadow:
                    0 15px 45px
                    rgba(0,0,0,.3);

                backdrop-filter:
                    blur(20px);

                opacity: 0;

                transform:
                    translateY(15px);

                transition:
                    opacity .3s ease,
                    transform .3s ease;

            }


            body.light-mode
            .arte-toast {

                background:
                    rgba(255,255,255,.95);

                color:
                    #181714;

            }


            .arte-toast.show {

                opacity: 1;

                transform:
                    translateY(0);

            }


            .toast-line {

                width: 3px;

                height: 20px;

                border-radius: 5px;

                background:
                    #c8a45d;

                box-shadow:
                    0 0 10px
                    rgba(200,164,93,.7);

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       PERIOD SELECT
    ===================================================== */

    const periodSelect =
        document.querySelector(
            ".period-select"
        );


    if (periodSelect) {

        periodSelect.addEventListener(
            "change",
            () => {

                showToast(
                    `Showing ${periodSelect.value.toLowerCase()}`
                );

            }
        );

    }


    /* =====================================================
       STAT CARD NUMBER ANIMATION
    ===================================================== */

    const statValues =
        document.querySelectorAll(
            ".stat-value"
        );


    statValues.forEach((element) => {

        const original =
            element.textContent.trim();


        const number =
            parseInt(
                original.replace(
                    /[^0-9]/g,
                    ""
                )
            );


        if (
            Number.isNaN(number)
        ) {
            return;
        }


        const prefix =
            original.includes("₹")
                ? "₹"
                : "";


        let current = 0;

        const duration = 1000;

        const start =
            performance.now();


        function animateNumber(time) {

            const progress =
                Math.min(
                    (time - start) / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    number * eased
                );


            element.textContent =
                prefix +
                current.toLocaleString(
                    "en-IN"
                );


            if (progress < 1) {

                requestAnimationFrame(
                    animateNumber
                );

            } else {

                element.textContent =
                    original;

            }

        }


        requestAnimationFrame(
            animateNumber
        );

    });


    /* =====================================================
       TABLE ROW CLICK
    ===================================================== */

    const tableRows =
        document.querySelectorAll(
            "tbody tr"
        );


    tableRows.forEach((row) => {

        row.style.cursor =
            "pointer";


        row.addEventListener(
            "click",
            () => {

                const order =
                    row.querySelector(
                        "td strong"
                    );


                if (order) {

                    showToast(
                        `${order.textContent} selected`
                    );

                }

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                if (sidebar) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }

        }
    );


    /* =====================================================
       PARALLAX AMBIENT LIGHT
    ===================================================== */

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    .5) * 20;


            const y =
                (event.clientY /
                    window.innerHeight -
                    .5) * 20;


            const lights =
                document.querySelectorAll(
                    ".ambient-light"
                );


            lights.forEach(
                (light, index) => {

                    const multiplier =
                        index + 1;


                    light.style.marginLeft =
                        `${x * multiplier}px`;

                    light.style.marginTop =
                        `${y * multiplier}px`;

                }
            );

        }
    );


    /* =====================================================
       NOTIFICATION BADGE + CONSOLE
    ===================================================== */

    (function refreshNotifBadge() {
        fetch("/dashboard/api/notifications/", { credentials: "same-origin" })
            .then((r) => r.json())
            .then((data) => {
                const dot = document.querySelector(".notification-dot");
                if (!dot || !data.counts) return;
                if (data.counts.total > 0) {
                    dot.style.display = "";
                    dot.setAttribute("data-count", data.counts.total);
                } else {
                    dot.style.display = "none";
                }
            })
            .catch(() => {});
    })();

    console.log(
        "%c ARTÉ ADMIN ",
        "color:#c8a45d;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%c Dashboard initialized successfully.",
        "color:#aaa69d;font-size:11px;"
    );

});