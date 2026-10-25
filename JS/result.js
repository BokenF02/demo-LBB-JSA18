// ================================
// RESULT.JS — Hiển thị kết quả quiz
// ================================

// =================================
// 1. LẤY DỮ LIỆU TỪ localStorage
// =================================
// Quiz đã lưu điểm + số sai + thời gian trước khi chuyển trang

const score = Number(localStorage.getItem("quizScore")) || 0;       // Số câu đúng
const wrong = Number(localStorage.getItem("quizWrong")) || 0;       // Số câu sai
const totalTime = Number(localStorage.getItem("quizTime")) || 0;    // Tổng thời gian (giây)


// =================================
// 2. HIỂN THỊ DỮ LIỆU LÊN TRANG
// =================================

document.getElementById("correct").textContent = score;    // "Số câu đúng"
document.getElementById("wrong").textContent = wrong;       // "Số câu sai"
document.getElementById("score").textContent = score;       // Tổng điểm


// =================================
// 3. HÀM ĐỊNH DẠNG THỜI GIAN
// =================================
// 150 giây → "2 phút 30 giây", 45 giây → "45 giây"

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);         // Số phút
    const remainingSeconds = seconds % 60;            // Số giây còn lại

    if (minutes > 0) {
        return `${minutes} phút ${remainingSeconds} giây`;
    }
    return `${remainingSeconds} giây`;
}

document.getElementById("time").textContent = formatTime(totalTime);


// =================================
// 4. LẤY CÁC KHU VỰC HIỂN THỊ
// =================================

const resultMessage = document.getElementById("resultMessage");   // Dòng thông báo lớn
const resultNotice = document.getElementById("resultNotice");     // Khung thông báo
const noticeIcon = document.getElementById("noticeIcon");         // Icon (🏆 hoặc ❤️)
const noticeTitle = document.getElementById("noticeTitle");       // "Chúc mừng!" hoặc "Chưa đạt"
const noticeText = document.getElementById("noticeText");         // Mô tả chi tiết
const rewardSection = document.getElementById("rewardSection");   // Khu vực phần thưởng
const rewardList = document.getElementById("rewardList");         // Danh sách mã giảm giá


// =================================
// 5. KIỂM TRA ĐIỂM → HIỂN THỊ KẾT QUẢ
// =================================
// >= 7/10 → Đạt (hiện trophy + phần thưởng)
// < 7/10  → Chưa đạt (hiện trái tim +鼓励)

if (score >= 7) {
    // --- ĐẠT ---
    resultMessage.textContent = "Chúc mừng bạn đã hoàn thành thử thách!";
    noticeTitle.textContent = "Chúc mừng!";
    noticeText.textContent = "Bạn đã đạt mục tiêu và nhận được phần thưởng từ Khang Football.";
    noticeIcon.innerHTML = `<i class="fa-solid fa-trophy"></i>`;    // Trophy icon
    resultNotice.classList.remove("failed");
    rewardSection.style.display = "flex";    // Hiện khu vực thưởng
    createRewards();                          // Tạo mã giảm giá

} else {
    // --- CHƯA ĐẠT ---
    resultMessage.textContent = "Đừng buồn nhé, hãy thử lại lần nữa!";
    noticeTitle.textContent = "Bạn chưa đạt mục tiêu";
    noticeText.textContent = "Bạn đã rất cố gắng rồi! Hãy luyện tập thêm một chút và thử lại nhé.";
    noticeIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;    // Heart icon
    resultNotice.classList.add("failed");     // Thêm viền đỏ
    rewardSection.style.display = "none";     // Ẩn phần thưởng
}


// =================================
// 6. HÀM TẠO MÃ GIẢM GIÁ NGẪU NHIÊN
// =================================
// Random 5, 10, 15, 20, ..., 100 (bội số của 5)

function generateDiscount() {
    return (Math.floor(Math.random() * 20) + 1) * 5;
}


// =================================
// 7. TẠO PHẦN THƯỞNG (MÃ GIẢM GIÁ)
// =================================
// 7 điểm → 1 mã, 8 điểm → 2 mã, 9 điểm → 3 mã, 10 điểm → 4 mã

function createRewards() {
    rewardList.innerHTML = "";

    const rewardCount = score - 6;  // Số mã = điểm - 6
    const discounts = new Set();    // Dùng Set để tránh trùng mã

    // Sinh mã cho đến khi đủ số lượng
    while (discounts.size < rewardCount) {
        discounts.add(generateDiscount());
    }

    // Tạo HTML cho mỗi mã giảm giá
    discounts.forEach(function (discount) {
        const reward = document.createElement("div");
        reward.className = "reward-item";
        reward.innerHTML = `
            <i class="fa-solid fa-ticket"></i>
            <span>Mã giảm giá</span>
            <strong>${discount}%</strong>
        `;
        rewardList.appendChild(reward);
    });
}


// =================================
// 8. NÚT "VỀ TRANG CHỦ"
// =================================

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = "../index.html";
});


// =================================
// 9. NÚT "CHƠI LẠI" → xóa kết quả cũ, về trang luật chơi
// =================================

document.getElementById("retryBtn").addEventListener("click", function () {
    // Xóa kết quả cũ khỏi localStorage
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizWrong");
    localStorage.removeItem("quizTime");
    // Quay lại trang luật chơi
    window.location.href = "rule.html";
});
