// ================================
// COMPONENTS.JS — Tự load Navbar, Filter, Footer
// ================================
// Mỗi trang HTML có placeholder rỗng:
//   <div id="site-navbar"></div>
//   <div id="site-filter"></div>
//   <div id="site-footer"></div>
// File này dùng fetch() để tải nội dung từ components/ vào placeholder.

(function () {

    // =================================
    // 1. TÍNH PREFIX (đường dẫn tương đối)
    // =================================
    // Trang root: prefix = ""
    // Trang con (news/): prefix = "../"

    var path = window.location.pathname;                            // VD: "/news/home.html"
    var depth = (path.match(/\//g) || []).length - 1;              // Đếm số "/"
    var prefix = "";

    if (depth > 1) {
        prefix = "../".repeat(depth - 1);                          // depth=1 → "../"
    }


    // =================================
    // 2. LOAD NAVBAR
    // =================================

    var navbarEl = document.getElementById("site-navbar");          // Tìm placeholder

    if (navbarEl) {                                                // Nếu trang có placeholder
        fetch(prefix + "components/navbar.html")                   // Tải file navbar
            .then(function (res) { return res.text(); })           // Response → chuỗi HTML
            .then(function (html) {
                navbarEl.innerHTML = html;                          // Chèn HTML vào placeholder
                highlightActivePage();                              // Đánh dấu trang đang active
                if (typeof initDarkMode === "function") {
                    initDarkMode();                                 // Gọi dark mode (từ script.js)
                }
            })
            .catch(function (err) {
                console.error("Không load được navbar:", err);     // Báo lỗi nếu fetch fail
            });
    }


    // =================================
    // 3. LOAD FILTER
    // =================================
    // Sau khi filter load xong → gọi initFilter() từ script.js
    // vì filter load async nên event listeners cần gắn lại

    var filterEl = document.getElementById("site-filter");

    if (filterEl) {
        fetch(prefix + "components/filter.html")
            .then(function (res) { return res.text(); })
            .then(function (html) {
                filterEl.innerHTML = html;                          // Chèn filter vào placeholder
                if (typeof initFilter === "function") {
                    initFilter();                                   // Gọi filter (từ script.js)
                }
            })
            .catch(function (err) {
                console.error("Không load được filter:", err);
            });
    }


    // =================================
    // 4. LOAD FOOTER
    // =================================

    var footerEl = document.getElementById("site-footer");

    if (footerEl) {
        fetch(prefix + "components/footer.html")
            .then(function (res) { return res.text(); })
            .then(function (html) {
                footerEl.innerHTML = html;                          // Chèn footer vào placeholder
            })
            .catch(function (err) {
                console.error("Không load được footer:", err);
            });
    }


    // =================================
    // 5. ĐÁNH DẤU TRANG ACTIVE
    // =================================
    // Đọc URL hiện tại → so sánh với data-page trên mỗi link navbar
    // Nếu trùng → thêm class "active" (CSS sẽ highlight)

    function highlightActivePage() {

        var page = path.split("/").pop() || "index.html";          // Lấy tên file từ URL

        if (!page || page === "/") {
            page = "index.html";                                   // Mặc định = trang chủ
        }

        var links = document.querySelectorAll("#site-navbar [data-page]"); // Tất cả link có data-page

        links.forEach(function (link) {
            var linkPage = link.getAttribute("data-page") + ".html";      // VD: "nike" → "nike.html"

            if (linkPage === page) {
                link.classList.add("active");                      // Thêm class active
            }
        });

    }

})();
