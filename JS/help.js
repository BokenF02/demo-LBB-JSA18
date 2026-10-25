/* =====================================================
   HELP JS (TÌM KIẾM + LỌC + FAQ)
===================================================== */

(function () {

    var searchInput = document.getElementById("helpSearch");
    var catCards = document.querySelectorAll(".help-cat-card");
    var faqItems = document.querySelectorAll(".help-faq-item[data-cat]");
    var faqEmpty = document.getElementById("faqEmpty");

    // Lọc FAQ theo từ khóa + danh mục đang chọn
    function applyFilter() {

        var q = (searchInput.value || "").toLowerCase().trim();
        var activeCat = null;

        catCards.forEach(function (card) {
            if (card.classList.contains("active")) {
                activeCat = card.dataset.cat;
            }
        });

        var visible = 0;

        faqItems.forEach(function (item) {

            var matchCat = !activeCat || item.dataset.cat === activeCat;
            var matchQ = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
            var show = matchCat && matchQ;

            item.style.display = show ? "" : "none";

            if (show) visible++;
        });

        faqEmpty.style.display = visible ? "none" : "block";
    }

    // Click thẻ danh mục → lọc + cuộn tới FAQ
    catCards.forEach(function (card) {

        card.addEventListener("click", function () {

            catCards.forEach(function (c) {
                c.classList.toggle("active", c === card);
            });

            applyFilter();

            document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Gõ tìm kiếm → lọc FAQ
    if (searchInput) {
        searchInput.addEventListener("input", applyFilter);
    }

    // FAQ accordion
    document.querySelectorAll(".help-faq-question").forEach(function (btn) {

        btn.addEventListener("click", function () {

            var item = btn.closest(".help-faq-item");
            var answer = item.querySelector(".help-faq-answer");
            var isOpen = item.classList.contains("open");

            // Đóng các mục khác
            document.querySelectorAll(".help-faq-item.open").forEach(function (o) {
                if (o !== item) {
                    o.classList.remove("open");
                    o.querySelector(".help-faq-answer").style.maxHeight = null;
                }
            });

            // Mở / đóng mục hiện tại
            item.classList.toggle("open", !isOpen);
            answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
        });
    });

})();
