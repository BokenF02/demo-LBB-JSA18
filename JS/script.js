// ================================
// SCRIPT.JS — Filter, Dark Mode, Heart Button
// ================================

// =================================
// 1. PRODUCT FILTER — Mở/đóng panel
// =================================
// Filter load bằng fetch() (async) trong components.js
// → components.js gọi initFilter() SAU KHI load filter xong

function initFilter() {
    var filterBtn = document.getElementById("filterBtn");       // Nút ☰
    var filterPanel = document.getElementById("filterPanel");   // Panel chính
    var submenuPanel = document.getElementById("submenuPanel"); // Panel con
    var submenuTitle = document.getElementById("submenuTitle"); // Tiêu đề panel con
    var submenuOptions = document.getElementById("submenuOptions"); // Vùng checkbox

    if (!filterBtn || !filterPanel) return; // Trang không có filter → bỏ qua

    // Click nút ☰ → toggle hiện/ẩn panel chính
    filterBtn.addEventListener("click", function () {
        filterPanel.classList.toggle("active");
    });

    // Hàm tạo panel 2 với tiêu đề + danh sách checkbox
    function showSubmenu(title, options) {
        // Nếu panel đang mở + click lại đúng mục → đóng lại
        if (submenuPanel.classList.contains("active") && submenuTitle.textContent === title) {
            submenuPanel.classList.remove("active");
            return;
        }

        submenuTitle.textContent = title;          // Đổi tiêu đề
        submenuOptions.innerHTML = "";             // Xóa checkbox cũ

        // Tạo checkbox mới cho từng tùy chọn
        options.forEach(function (option) {
            submenuOptions.innerHTML += `
                <label class="filter-option">
                    <input type="checkbox">
                    <span>${option}</span>
                </label>
            `;
        });

        submenuPanel.classList.add("active");       // Hiện panel 2 (CSS animation)
    }

    // Gắn event cho 6 mục filter
    var filterItems = [
        { id: "brandBtn",   title: "Thương hiệu", options: ["Nike", "Adidas", "Puma", "Mizuno"] },
        { id: "priceBtn",   title: "Giá",         options: ["Dưới 1 triệu", "1 - 2 triệu", "2 - 3 triệu", "Trên 3 triệu"] },
        { id: "sizeBtn",    title: "Size",         options: ["Size 39", "Size 40", "Size 41", "Size 42"] },
        { id: "fieldBtn",   title: "Loại sân",    options: ["Sân tự nhiên", "Sân nhân tạo", "Sân trong nhà", "Futsal"] },
        { id: "positionBtn", title: "Vị trí",     options: ["Tiền đạo", "Tiền vệ", "Hậu vệ", "Thủ môn"] },
        { id: "styleBtn",   title: "Phong cách",  options: ["Tốc độ", "Kiểm soát", "Sức mạnh", "Kỹ thuật"] }
    ];

    filterItems.forEach(function (item) {
        var btn = document.getElementById(item.id);
        if (btn) {
            btn.addEventListener("click", function () {
                showSubmenu(item.title, item.options);
            });
        }
    });
}

// Gọi ngay cho trang có filter inline (nếu có)
initFilter();


// =================================
// 4. DARK MODE
// =================================
// Lưu ý: navbar load bằng fetch() (async), nên nút dark mode chưa có khi script.js chạy
// → components.js gọi initDarkMode() SAU KHI navbar load xong

// Áp dụng dark mode ngay khi load trang (tránh nhấp nháy trắng→đen)
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// Hàm này được components.js gọi lại sau khi navbar load xong
function initDarkMode() {
    var darkModeBtn = document.getElementById("darkModeBtn");
    if (!darkModeBtn) return;

    updateDarkModeButton(darkModeBtn);    // Cập nhật icon ngay

    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");              // Bật/tắt dark mode

        var isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light"); // Lưu lựa chọn

        updateDarkModeButton(darkModeBtn);                        // Đổi icon
    });
}

// Đổi icon: dark → ☀️ Light, light → 🌙 Dark
function updateDarkModeButton(btn) {
    if (!btn) return;
    var isDark = document.body.classList.contains("dark-mode");
    btn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i><span>Light</span>'
        : '<i class="fa-solid fa-moon"></i><span>Dark</span>';
}

// Gọi ngay cho trang có navbar inline (cart.html, lg-su.html)
initDarkMode();


// =================================
// 5. NÚT TIM YÊU THÍCH (HEART)
// =================================
// Click → toggle class "liked" (CSS: đỏ + nền hồng)
//         toggle icon Font Awesome: fa-regular (rỗng) ↔ fa-solid (đặc)

const heartButtons = document.querySelectorAll(".kf-product-heart");

heartButtons.forEach(function (heartBtn) {
    heartBtn.addEventListener("click", function () {
        heartBtn.classList.toggle("liked");                       // Bật/tắt class liked

        const icon = heartBtn.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-regular");                  // Tim rỗng
            icon.classList.toggle("fa-solid");                    // Tim đặc
        }
    });
});
