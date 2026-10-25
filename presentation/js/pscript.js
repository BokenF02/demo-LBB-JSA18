/**
 * ============================================================
 *  PRESENTATION — Slide Navigation
 *  Xử lý chuyển slide: nút bấm, phím tắt, progress bar
 * ============================================================
 */

(function () {
    var current = 0;
    var slides  = document.querySelectorAll(".slide");
    var total   = slides.length;
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");
    var bar     = document.getElementById("progressBar");
    var counter = document.getElementById("slideCounter");

    function showSlide(index) {
        slides.forEach(function (s, i) {
            s.classList.remove("active", "exit-left");
            if (i < index) s.classList.add("exit-left");
        });
        slides[index].classList.add("active");

        // Bật/tắt nút prev/next ở slide đầu/cuối
        prevBtn.classList.toggle("disabled", index === 0);
        nextBtn.classList.toggle("disabled", index === total - 1);

        // Cập nhật progress bar
        bar.style.width = ((index + 1) / total * 100) + "%";

        // Cập nhật số slide (1/14, 2/14...)
        counter.textContent = (index + 1) + " / " + total;
    }

    window.changeSlide = function (dir) {
        var next = current + dir;
        if (next < 0 || next >= total) return;
        current = next;
        showSlide(current);
    };

    document.addEventListener("keydown", function (e) {
        // Phím mũi tên phải hoặc Space → slide tiếp
        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault();
            window.changeSlide(1);
        }
        // Phím mũi tên trái → slide trước
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            window.changeSlide(-1);
        }
    });

    // Hiển thị slide đầu tiên khi load trang
    showSlide(0);
})();
