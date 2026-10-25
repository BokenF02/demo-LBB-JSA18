/**
 * ============================================================
 *  CART.JS — Xử lý giỏ hàng: tính tiền, +/- số lượng, xóa,
 *  mã giảm giá, phí vận chuyển
 * ============================================================
 */

// Đổi số ra kiểu tiền Việt: 1100000 -> "1.100.000đ"
function formatVND(n) {
  return n.toLocaleString("vi-VN") + "đ";
}

// Lấy lại danh sách sản phẩm hiện có (mỗi lần gọi đều kiểm tra mới)
function getItems() {
  return document.querySelectorAll(".cart-item");
}

const shippingSelect = document.getElementById("shipping");
const giftBtn = document.getElementById("giftBtn");
const giftInput = document.getElementById("giftcode");
const giftMsg = document.getElementById("giftMsg");
const discountRow = document.getElementById("discountRow");
const discountEl = document.getElementById("discount");

let discount = 0; // số tiền được giảm

// Tính lại toàn bộ: Tạm tính + Phí ship - Giảm giá = Tổng cộng
function updateTotals() {
  let subtotal = 0;

  getItems().forEach(function (item) {
    const price = Number(item.dataset.price);
    const qty = Number(item.querySelector(".qty-input").value) || 1;
    subtotal += price * qty;
    item.querySelector(".item-subtotal").textContent = formatVND(price * qty);
  });

  const shipping = Number(shippingSelect.value);
  const total = subtotal - discount + shipping;

  document.getElementById("sumItems").textContent = getItems().length;
  document.getElementById("itemsCount").textContent = getItems().length;
  document.getElementById("subtotal").textContent = formatVND(subtotal);
  document.getElementById("grandTotal").textContent = formatVND(total);
}

// Nút + và − để tăng / giảm số lượng
document.querySelectorAll(".quantity").forEach(function (box) {
  const input = box.querySelector(".qty-input");

  box.querySelector(".minus").addEventListener("click", function () {
    const val = Number(input.value) || 1;
    input.value = Math.max(1, val - 1); // không cho giảm dưới 1
    updateTotals();
  });

  box.querySelector(".plus").addEventListener("click", function () {
    const val = Number(input.value) || 1;
    input.value = val + 1;
    updateTotals();
  });

  input.addEventListener("change", function () {
    input.value = Math.max(1, Number(input.value) || 1);
    updateTotals();
  });
});

// Nút × để xóa sản phẩm khỏi giỏ
document.querySelectorAll(".remove").forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.closest(".cart-item").remove();
    updateTotals();
  });
});

// Đổi phí ship -> tính lại tổng
shippingSelect.addEventListener("change", updateTotals);

// Nhập mã giảm giá: thử mã "KHANG10" để được giảm 10%
giftBtn.addEventListener("click", function () {
  const code = giftInput.value.trim().toUpperCase();

  if (code === "KHANG10") {
    let subtotal = 0;
    getItems().forEach(function (item) {
      subtotal +=
        Number(item.dataset.price) *
        (Number(item.querySelector(".qty-input").value) || 1);
    });

    discount = Math.round(subtotal * 0.1);
    discountEl.textContent = "-" + formatVND(discount);
    discountRow.style.display = "flex";
    giftMsg.textContent = "🎉 Chúc mừng! Bạn được giảm 10%.";
    giftMsg.style.color = "#5A827E";
  } else {
    discount = 0;
    discountRow.style.display = "none";
    giftMsg.textContent = "Mã không hợp lệ, thử KHANG10 nhé!";
    giftMsg.style.color = "#e74c3c";
  }

  updateTotals();
});

// Tính tổng lần đầu khi mở trang
updateTotals();
