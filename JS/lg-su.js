// ==========================
// LOGIN / REGISTER (lg-su.html)
// Chuyển đổi giữa 2 form: Đăng nhập ↔ Đăng ký
// ==========================

// Container bao quanh cả 2 form login + register
const container = document.getElementById("container");

// Nút chuyển sang form Đăng ký
const registerBtn = document.getElementById("register");

// Nút chuyển sang form Đăng nhập
const loginBtn = document.getElementById("login");

// Bấm "Đăng ký" → slide panel sang phải hiển thị form register
// CSS: .container.active { transform: translateX(8%); }
registerBtn.addEventListener("click", function () {
    container.classList.add("active");
});

// Bấm "Đăng nhập" → slide panel về trái hiển thị form login
loginBtn.addEventListener("click", function () {
    container.classList.remove("active");
});
