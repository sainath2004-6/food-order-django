/* =========================================================
   ARTÉ — LUXURY FOOD EXPERIENCE
   COMPLETE INTERACTION ENGINE
   LIGHT / DARK MODE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. THEME SYSTEM
    ===================================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-icon");

    const savedTheme = localStorage.getItem("arteTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();

    function updateThemeIcon() {

        if (!themeIcon) return;

        if (document.body.classList.contains("dark-mode")) {
            themeIcon.textContent = "☀";
        } else {
            themeIcon.textContent = "☾";
        }
    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "arteTheme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    /* =====================================================
       2. PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {
                loader.classList.add("loaded");
            }, 600);

        });

    }


    /* =====================================================
       3. CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorCircle =
        document.querySelector(".cursor-circle");

    if (
        cursorDot &&
        cursorCircle &&
        window.innerWidth > 768
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let circleX = 0;
        let circleY = 0;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });

        function animateCursor() {

            circleX +=
                (mouseX - circleX) * 0.12;

            circleY +=
                (mouseY - circleY) * 0.12;

            cursorCircle.style.left =
                `${circleX}px`;

            cursorCircle.style.top =
                `${circleY}px`;

            requestAnimationFrame(
                animateCursor
            );
        }

        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, select, textarea, .dish-card, .food-card"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursorCircle.classList.add("active");
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursorCircle.classList.remove("active");
                }
            );

        });

    }


    /* =====================================================
       4. NAVBAR
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    if (navbar) {

        function updateNavbar() {

            if (window.scrollY > 60) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }

        window.addEventListener(
            "scroll",
            updateNavbar
        );

        updateNavbar();

    }


    /* =====================================================
       5. MOBILE MENU
    ===================================================== */

    const menuButton =
        document.querySelector(".menu-btn");

    const mobileNavigation =
        document.querySelector(
            ".mobile-navigation"
        );

    const mobileClose =
        document.querySelector(".mobile-close");


    function openMobileMenu() {

        if (!mobileNavigation) return;

        mobileNavigation.classList.add(
            "open"
        );

        document.body.classList.add(
            "no-scroll"
        );

        if (menuButton) {
            menuButton.classList.add(
                "active"
            );
        }

    }


    function closeMobileMenu() {

        if (!mobileNavigation) return;

        mobileNavigation.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "no-scroll"
        );

        if (menuButton) {
            menuButton.classList.remove(
                "active"
            );
        }

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMobileMenu
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    document.querySelectorAll(
        ".mobile-navigation a"
    ).forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       6. ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Escape") {

                closeMobileMenu();
                closeSearch();
                closeCart();
                closeStory();

            }

        }
    );


    /* =====================================================
       7. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                const targetID =
                    this.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetID
                    );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       8. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .reveal,
            .signature-intro,
            .dish-card,
            .food-card,
            .experience-item,
            .story-image,
            .story-content,
            .reservation-image,
            .reservation-content,
            .testimonial,
            .newsletter,
            .section-title
            `
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    });


    /* =====================================================
       9. STAGGER CARDS
    ===================================================== */

    document.querySelectorAll(
        ".dish-card, .food-card"
    ).forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    });


    /* =====================================================
       10. DISH SLIDER
    ===================================================== */

    const slider =
        document.querySelector(
            ".dish-slider"
        );

    const sliderButtons =
        document.querySelectorAll(
            ".slider-controls button"
        );


    if (
        slider &&
        sliderButtons.length
    ) {

        sliderButtons.forEach(
            (button, index) => {

                button.addEventListener(
                    "click",
                    () => {

                        const card =
                            slider.querySelector(
                                ".dish-card"
                            );

                        if (!card) return;

                        const cardWidth =
                            card.offsetWidth + 25;


                        if (index === 0) {

                            slider.scrollBy({
                                left: -cardWidth,
                                behavior: "smooth"
                            });

                        } else {

                            slider.scrollBy({
                                left: cardWidth,
                                behavior: "smooth"
                            });

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       11. DRAG SLIDER
    ===================================================== */

    if (slider) {

        let isDragging = false;

        let startX = 0;

        let scrollStart = 0;


        slider.addEventListener(
            "mousedown",
            (e) => {

                isDragging = true;

                slider.classList.add(
                    "dragging"
                );

                startX =
                    e.pageX -
                    slider.offsetLeft;

                scrollStart =
                    slider.scrollLeft;

            }
        );


        slider.addEventListener(
            "mouseleave",
            () => {

                isDragging = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mouseup",
            () => {

                isDragging = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mousemove",
            (e) => {

                if (!isDragging) return;

                e.preventDefault();

                const x =
                    e.pageX -
                    slider.offsetLeft;

                const walk =
                    (x - startX) * 1.5;

                slider.scrollLeft =
                    scrollStart - walk;

            }
        );

    }


    /* =====================================================
       12. SEARCH
    ===================================================== */

    const searchButton =
        document.querySelector(
            ".search-btn"
        );

    const searchPanel =
        document.querySelector(
            ".search-panel"
        );

    const searchClose =
        document.querySelector(
            ".search-close"
        );

    const searchInput =
        document.querySelector(
            ".search-input-wrapper input"
        );


    function openSearch() {

        if (!searchPanel) return;

        searchPanel.classList.add(
            "open"
        );

        document.body.classList.add(
            "no-scroll"
        );

        setTimeout(() => {

            if (searchInput) {
                searchInput.focus();
            }

        }, 300);

    }


    function closeSearch() {

        if (!searchPanel) return;

        searchPanel.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            openSearch
        );

    }


    if (searchClose) {

        searchClose.addEventListener(
            "click",
            closeSearch
        );

    }


    /* =====================================================
       13. SEARCH FOOD (API + live filter)
    ===================================================== */

    if (searchInput) {
        let searchTimer = null;
        const resultsEl = document.getElementById('searchResults');

        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim();

            // Also filter visible dish cards on the page
            const cards = document.querySelectorAll('.dish-card, .food-card');
            const qLower = q.toLowerCase();
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = (!qLower || text.includes(qLower)) ? '' : 'none';
            });

            clearTimeout(searchTimer);
            if (!resultsEl) return;
            if (!q) {
                resultsEl.innerHTML = '<p class="search-hint" style="opacity:0.5; font-size:14px; text-align:center;">Type to search dishes…</p>';
                return;
            }
            resultsEl.innerHTML = '<p class="search-hint" style="opacity:0.5; font-size:14px; text-align:center;">Searching…</p>';
            searchTimer = setTimeout(() => {
                fetch('/api/menu-search/?q=' + encodeURIComponent(q))
                    .then(r => r.json())
                    .then(data => {
                        if (!data.ok || !data.items.length) {
                            resultsEl.innerHTML = '<p class="search-hint" style="opacity:0.6; text-align:center;">No dishes match "' + q.replace(/</g,'') + '"</p>';
                            return;
                        }
                        resultsEl.innerHTML = data.items.map(item => {
                            const img = item.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=70';
                            return '<div class="search-result-item" style="display:flex; gap:14px; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.08); cursor:pointer;" data-id="' + item.id + '" data-name="' + (item.name||'').replace(/"/g,'&quot;') + '" data-price="' + item.price + '">' +
                                '<img src="' + img + '" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:10px;background:#222;">' +
                                '<div style="flex:1;min-width:0;">' +
                                '<strong style="display:block;font-size:15px;">' + item.name + '</strong>' +
                                '<span style="font-size:12px;opacity:0.55;">' + (item.category || '') + '</span>' +
                                '<p style="font-size:13px;opacity:0.7;margin:4px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (item.description || '') + '</p>' +
                                '</div>' +
                                '<div style="text-align:right;">' +
                                '<strong style="color:#c9a227;">₹' + item.price + '</strong><br>' +
                                '<button type="button" class="search-add-btn" style="margin-top:6px;border:none;background:#c9a227;color:#0a0a0a;font-weight:600;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:12px;">+ Add</button>' +
                                '</div></div>';
                        }).join('');
                        resultsEl.querySelectorAll('.search-add-btn').forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                const row = btn.closest('.search-result-item');
                                if (!row) return;
                                // trigger same as dish-add if cart system exists
                                const id = row.dataset.id;
                                const name = row.dataset.name;
                                const price = parseFloat(row.dataset.price) || 0;
                                const addBtn = document.querySelector('.dish-add[data-id="' + id + '"]');
                                if (addBtn) {
                                    addBtn.click();
                                } else if (typeof window.addToArteCart === 'function') {
                                    window.addToArteCart({ id, name, price, quantity: 1 });
                                } else {
                                    // fallback local cart
                                    try {
                                        let cart = JSON.parse(localStorage.getItem('arteCart') || '[]');
                                        const existing = cart.find(i => String(i.id) === String(id));
                                        if (existing) existing.quantity += 1;
                                        else cart.push({ id, name, price, quantity: 1 });
                                        localStorage.setItem('arteCart', JSON.stringify(cart));
                                        alert('Added ' + name + ' to cart');
                                    } catch (err) {}
                                }
                                btn.textContent = '✓';
                                setTimeout(() => { btn.textContent = '+ Add'; }, 800);
                            });
                        });
                    })
                    .catch(() => {
                        resultsEl.innerHTML = '<p class="search-hint" style="opacity:0.6; text-align:center;">Search failed. Try again.</p>';
                    });
            }, 250);
        });
    }


    /* =====================================================
       14. CART
    ===================================================== */

    let cart =
        JSON.parse(
            localStorage.getItem(
                "arteCart"
            )
        ) || [];


    const cartButton =
        document.querySelector(
            ".cart-btn"
        );

    const cartSidebar =
        document.querySelector(
            ".cart-sidebar"
        );

    const cartOverlay =
        document.querySelector(
            ".cart-overlay"
        );

    const cartItems =
        document.querySelector(
            ".cart-items"
        );

    const cartTotal =
        document.querySelector(
            ".cart-total strong"
        );

    const cartCount =
        document.querySelector(
            ".cart-btn b"
        );


    const cartClose =
        document.querySelector(
            ".cart-close"
        ) ||
        document.querySelector(
            ".cart-header button"
        );


    function openCart() {

        if (!cartSidebar) return;

        cartSidebar.classList.add(
            "open"
        );

        if (cartOverlay) {

            cartOverlay.classList.add(
                "open"
            );

        }

        document.body.classList.add(
            "no-scroll"
        );

        renderCart();

    }


    function closeCart() {

        if (!cartSidebar) return;

        cartSidebar.classList.remove(
            "open"
        );

        if (cartOverlay) {

            cartOverlay.classList.remove(
                "open"
            );

        }

        document.body.classList.remove(
            "no-scroll"
        );

    }


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    if (cartClose) {

        cartClose.addEventListener(
            "click",
            closeCart
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCart
        );

    }


    /* =====================================================
       15. ADD TO CART
    ===================================================== */

    const addButtons =
        document.querySelectorAll(
            `
            .dish-add,
            .add-cart,
            .add-to-cart,
            [data-add-cart]
            `
        );


    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            (e) => {

                e.preventDefault();

                const card =
                    button.closest(
                        `
                        .dish-card,
                        .food-card,
                        .product-card
                        `
                    );


                if (!card) return;


                const nameElement =
                    card.querySelector(
                        "h3"
                    );


                const priceElement =
                    card.querySelector(
                        `
                        .dish-info > strong,
                        .price,
                        .dish-price
                        `
                    );


                const name =
                    nameElement
                        ? nameElement.textContent.trim()
                        : "ARTÉ Dish";


                const priceText =
                    priceElement
                        ? priceElement.textContent
                        : "0";


                const price =
                    parseFloat(
                        priceText.replace(
                            /[^0-9.]/g,
                            ""
                        )
                    ) || 0;


                const existing =
                    cart.find(
                        item =>
                            item.name === name
                    );


                if (existing) {

                    existing.quantity++;

                } else {

                    const id = button.dataset.id || card.dataset.id || null;
                    cart.push({
                        id,
                        name,
                        price,
                        quantity: 1
                    });

                }


                saveCart();

                renderCart();


                /* Button feedback */

                const original =
                    button.innerHTML;


                button.innerHTML =
                    "✓ ADDED";


                button.classList.add(
                    "added"
                );


                setTimeout(() => {

                    button.innerHTML =
                        original;

                    button.classList.remove(
                        "added"
                    );

                }, 1000);


                /* Cart animation */

                if (cartButton) {

                    cartButton.classList.add(
                        "cart-bounce"
                    );


                    setTimeout(() => {

                        cartButton.classList.remove(
                            "cart-bounce"
                        );

                    }, 500);

                }

            }
        );

    });


    /* =====================================================
       16. SAVE CART
    ===================================================== */

    function saveCart() {

        localStorage.setItem(
            "arteCart",
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       17. RENDER CART
    ===================================================== */

    function renderCart() {

        if (!cartItems) return;


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">◇</div>
                    <h3>Your table is waiting.</h3>
                    <p>Add something beautiful to your order.</p>
                </div>
            `;

        } else {

            cartItems.innerHTML = "";


            cart.forEach(
                (item, index) => {

                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "cart-item";


                    element.innerHTML = `

                        <div class="cart-item-info">

                            <h3>
                                ${escapeHTML(item.name)}
                            </h3>

                            <p>
                                ₹${item.price.toFixed(2)}
                            </p>

                        </div>

                        <div class="cart-item-controls">

                            <button
                                class="quantity-minus"
                                data-index="${index}"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                class="quantity-plus"
                                data-index="${index}"
                            >
                                +
                            </button>

                            <button
                                class="remove-item"
                                data-index="${index}"
                                aria-label="Remove item"
                            >
                                ×
                            </button>

                        </div>

                    `;


                    cartItems.appendChild(
                        element
                    );

                }
            );

        }


        const quantity =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );


        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        if (cartCount) {

            cartCount.textContent =
                quantity;

        }


        if (cartTotal) {

            cartTotal.textContent =
                `₹${total.toFixed(2)}`;

        }


        attachCartControls();

    }


    /* =====================================================
       18. CART CONTROLS
    ===================================================== */

    function attachCartControls() {

        document.querySelectorAll(
            ".quantity-minus"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (!cart[index]) return;


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    saveCart();

                    renderCart();

                }
            );

        });


        document.querySelectorAll(
            ".quantity-plus"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (!cart[index]) return;


                    cart[index].quantity++;


                    saveCart();

                    renderCart();

                }
            );

        });


        document.querySelectorAll(
            ".remove-item"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(
                        index,
                        1
                    );


                    saveCart();

                    renderCart();

                }
            );

        });

    }


    renderCart();


    /* =====================================================
       19. STORY MODAL
    ===================================================== */

    const storyButton =
        document.querySelector(
            ".story-button"
        );

    const storyModal =
        document.querySelector(
            ".story-modal"
        );

    const storyClose =
        document.querySelector(
            ".story-close"
        ) ||
        document.querySelector(
            ".story-modal > button"
        );


    function openStory() {

        if (!storyModal) return;

        storyModal.classList.add(
            "open"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeStory() {

        if (!storyModal) return;

        storyModal.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    if (storyButton) {

        storyButton.addEventListener(
            "click",
            openStory
        );

    }


    if (storyClose) {

        storyClose.addEventListener(
            "click",
            closeStory
        );

    }


    if (storyModal) {

        storyModal.addEventListener(
            "click",
            (e) => {

                if (
                    e.target === storyModal
                ) {

                    closeStory();

                }

            }
        );

    }


    /* =====================================================
       20. HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero"
        );

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );


    if (
        hero &&
        heroBackground &&
        window.innerWidth > 900
    ) {

        hero.addEventListener(
            "mousemove",
            (e) => {

                const x =
                    (
                        e.clientX /
                        window.innerWidth -
                        0.5
                    ) * 2;


                const y =
                    (
                        e.clientY /
                        window.innerHeight -
                        0.5
                    ) * 2;


                heroBackground.style.transform =
                    `
                    scale(1.05)
                    translate(
                        ${x * 6}px,
                        ${y * 6}px
                    )
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroBackground.style.transform =
                    "scale(1.05)";

            }
        );

    }


    /* =====================================================
       21. MAGNETIC BUTTONS
    ===================================================== */

    if (window.innerWidth > 900) {

        document.querySelectorAll(
            ".btn, .magnetic"
        ).forEach(button => {

            button.addEventListener(
                "mousemove",
                (e) => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        e.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        e.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       22. DISH CARD 3D EFFECT
    ===================================================== */

    if (window.innerWidth > 1000) {

        document.querySelectorAll(
            ".dish-card"
        ).forEach(card => {

            card.addEventListener(
                "mousemove",
                (e) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        e.clientX -
                        rect.left;


                    const y =
                        e.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (
                            (y - centerY) /
                            centerY
                        ) * -2;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 2;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-6px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       23. NUMBER COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const element =
                                entry.target;


                            const target =
                                parseInt(
                                    element.dataset.counter
                                );


                            if (
                                Number.isNaN(
                                    target
                                )
                            ) {
                                return;
                            }


                            let current = 0;

                            const duration =
                                1500;

                            const start =
                                performance.now();


                            function animate(
                                time
                            ) {

                                const progress =
                                    Math.min(
                                        (
                                            time -
                                            start
                                        ) /
                                        duration,
                                        1
                                    );


                                current =
                                    Math.floor(
                                        progress *
                                        target
                                    );


                                element.textContent =
                                    current;


                                if (
                                    progress < 1
                                ) {

                                    requestAnimationFrame(
                                        animate
                                    );

                                } else {

                                    element.textContent =
                                        target;

                                }

                            }


                            requestAnimationFrame(
                                animate
                            );


                            counterObserver.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.7
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }


    /* =====================================================
       24. NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input"
                    );


                if (!input) return;


                const email =
                    input.value.trim();


                if (!email) {

                    input.focus();

                    return;

                }


                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                const button =
                    newsletterForm.querySelector(
                        "button"
                    );


                if (button) {

                    button.textContent =
                        "✓";

                }


                input.value = "";


                setTimeout(() => {

                    if (button) {

                        button.textContent =
                            "→";

                    }

                }, 2000);

            }
        );

    }


    /* =====================================================
       25. RESERVATION FORM
    ===================================================== */

    const reservationForm =
        document.querySelector(
            ".reservation-form"
        );


    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();


                const button =
                    reservationForm.querySelector(
                        ".btn"
                    );


                if (!button) return;


                const original =
                    button.innerHTML;


                button.innerHTML =
                    "RESERVATION REQUESTED ✓";


                setTimeout(() => {

                    button.innerHTML =
                        original;

                }, 2500);

            }
        );

    }


    /* =====================================================
       26. IMAGE LOAD
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        if (image.complete) {

            image.classList.add(
                "loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                }
            );

        }

    });


    /* =====================================================
       27. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navLinks.length
    ) {

        function updateActiveNav() {

            let current = "";


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.id;

                }

            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }


        window.addEventListener(
            "scroll",
            updateActiveNav
        );

        updateActiveNav();

    }


    /* =====================================================
       28. PREVENT IMAGE DRAG
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        image.addEventListener(
            "dragstart",
            e => {
                e.preventDefault();
            }
        );

    });


    /* =====================================================
       29. MOBILE RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       30. UTILITY — ESCAPE HTML
    ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent = text;

        return div.innerHTML;

    }


        /* =====================================================
       CHECKOUT → Django API (inside DOMContentLoaded so cart is in scope)
    ===================================================== */

    function getCsrfToken() {
        const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
        if (match) return decodeURIComponent(match[1]);
        const el = document.querySelector('[name=csrfmiddlewaretoken]');
        if (el && el.value) return el.value;
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute('content') : '';
    }

    async function placeOrderCheckout() {
        if (!cart || cart.length === 0) {
            alert('Your cart is empty. Add dishes from the menu first.');
            return;
        }
        const isLoggedIn = document.body.dataset.loggedIn === '1';
        if (!isLoggedIn) {
            alert('Please sign in to place an order.');
            window.location.href = '/accounts/login/?next=/';
            return;
        }
        let customer_name = 'Guest';
        let customer_email = '';
        let customer_phone = '';
        let delivery_address = '';
        let payment_method = 'cod';
        const nameInput = document.getElementById('guestOrderName');
        const emailInput = document.getElementById('guestOrderEmail');
        const phoneInput = document.getElementById('guestOrderPhone');
        const addressInput = document.getElementById('guestOrderAddress');
        const payInput = document.getElementById('guestOrderPayment');
        if (nameInput && nameInput.value.trim()) customer_name = nameInput.value.trim();
        if (emailInput && emailInput.value.trim()) customer_email = emailInput.value.trim();
        if (phoneInput) customer_phone = phoneInput.value.trim();
        if (addressInput) delivery_address = addressInput.value.trim();
        if (payInput) payment_method = payInput.value || 'cod';
        if (!customer_phone) {
            alert('Please enter your phone number.');
            if (phoneInput) phoneInput.focus();
            return;
        }
        if (!delivery_address) {
            alert('Please enter your delivery address.');
            if (addressInput) addressInput.focus();
            return;
        }
        const btn = document.querySelector('.cart-checkout, [data-checkout]');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Placing order…';
        }
        try {
            const res = await fetch('/api/order/', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        id: item.id || null,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                    customer_name: customer_name,
                    customer_email: customer_email,
                    customer_phone: customer_phone,
                    delivery_address: delivery_address,
                    payment_method: payment_method,
                }),
            });
            let data = {};
            try { data = await res.json(); } catch (e) {
                alert('Server error (' + res.status + '). Is runserver running?');
                return;
            }
            if (res.status === 401 || data.login_required) {
                alert(data.error || 'Please sign in to place an order.');
                window.location.href = data.login_url || '/accounts/login/?next=/';
                return;
            }
            if (res.ok && data.ok) {
                cart = [];
                saveCart();
                renderCart();
                const payLabel = {cod:'Cash on Delivery',upi:'UPI',card:'Card',wallet:'Wallet'}[data.payment_method] || data.payment_method;
                alert('Order placed! #' + data.order_id + ' — ₹' + data.total + '\nPayment: ' + payLabel + ' (' + data.payment_status + ')\nAddress: ' + (data.delivery_address || ''));
                if (typeof closeCart === 'function') closeCart();
            } else {
                alert(data.error || ('Could not place order (HTTP ' + res.status + ')'));
            }
        } catch (err) {
            console.error(err);
            alert('Network error placing order. Open Console (F12) for details.');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Place Order';
            }
        }
    }

    const checkoutBtn = document.querySelector('.cart-checkout, .checkout-btn, [data-checkout]');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            placeOrderCheckout();
        });
    }

    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("js-ready");
    console.log("ARTÉ — Luxury Food Experience ready.");

});
