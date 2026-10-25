// ================================
// QUIZ.JS — Game hỏi đáp bóng đá
// ================================

// =================================
// 1. DANH SÁCH CÂU HỎI (mảng object)
// =================================
// Mỗi câu có: question, answers (4 đáp án), correct (index đáp án đúng)

const questions = [

    {
        question: 'Cầu thủ nào được mệnh danh là "Vua bóng đá"?',
        answers: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Neymar Jr"],
        correct: 2
    },

    {
        question: "Đội tuyển nào vô địch World Cup 2022?",
        answers: ["Pháp", "Argentina", "Brazil", "Đức"],
        correct: 1
    },

    {
        question: "Cầu thủ nào có biệt danh CR7?",
        answers: ["Cristiano Ronaldo", "Lionel Messi", "Kylian Mbappé", "Neymar Jr"],
        correct: 0
    },

    {
        question: "World Cup được tổ chức bao nhiêu năm một lần?",
        answers: ["2 năm", "3 năm", "4 năm", "5 năm"],
        correct: 2
    },

    {
        question: "Đội bóng nào có biệt danh là Quỷ đỏ?",
        answers: ["Liverpool", "Manchester United", "Arsenal", "Chelsea"],
        correct: 1
    },

    {
        question: "Lionel Messi đến từ quốc gia nào?",
        answers: ["Brazil", "Tây Ban Nha", "Argentina", "Bồ Đào Nha"],
        correct: 2
    },

    {
        question: "Neymar Jr là cầu thủ người nước nào?",
        answers: ["Brazil", "Argentina", "Pháp", "Tây Ban Nha"],
        correct: 0
    },

    {
        question: "Một trận bóng đá thông thường có bao nhiêu phút?",
        answers: ["60 phút", "70 phút", "80 phút", "90 phút"],
        correct: 3
    },

    {
        question: "Cầu thủ nào nổi tiếng với biệt danh 'El Pulga'?",
        answers: ["Messi", "Ronaldo", "Mbappé", "Haaland"],
        correct: 0
    },

    {
        question: "Đội tuyển Brazil nổi tiếng với màu áo nào?",
        answers: ["Đỏ", "Vàng", "Xanh lá", "Trắng"],
        correct: 1
    }

];


// =================================
// 2. XÁO TRỘN THỨ TỰ CÂU HỎI
// =================================
// sort(() => Math.random() - 0.5) = shuffle ngẫu nhiên

questions.sort(() => Math.random() - 0.5);


// =================================
// 3. LẤY CÁC PHẦN TỬ HTML
// =================================

const questionElement = document.getElementById("question");       // Vùng hiển thị câu hỏi
const answerList = document.getElementById("answerList");           // Vùng chứa 4 nút đáp án
const timeElement = document.getElementById("time");               // Số giây còn lại
const timeProgress = document.getElementById("timeProgress");     // Thanh tiến trình thời gian
const questionNumber = document.getElementById("questionNumber"); // "3 / 10 Câu hỏi"
const nextBtn = document.getElementById("nextBtn");                // Nút "Tiếp theo"
const retryBtn = document.getElementById("retryBtn");              // Nút "Chơi lại"


// =================================
// 4. BIẾN TRẠNG THÁI
// =================================

let currentQuestion = 0;  // Đang ở câu thứ mấy (0-9)
let timeLeft = 30;         // Giây còn lại cho mỗi câu
let timer = null;          // ID của setInterval (dùng clearInterval để dừng)
let answered = false;      // Đã trả lời câu này chưa (chống click 2 lần)
let score = 0;             // Số câu đúng
let wrong = 0;             // Số câu sai
let totalTime = 0;         // Tổng thời gian đã dùng


// =================================
// 5. HÀM XÁO TRỘN ĐÁP ÁN
// =================================
// Đảo thứ tự 4 đáp án để đáp án đúng không luôn ở vị trí cũ

function shuffleAnswers(question) {
    const correctAnswer = question.answers[question.correct];       // Lưu đáp án đúng
    question.answers.sort(() => Math.random() - 0.5);              // Shuffle
    question.correct = question.answers.indexOf(correctAnswer);    // Tìm lại vị trí mới
}


// =================================
// 6. HIỂN THỊ CÂU HỎI
// =================================
// Tạo 1 câu hỏi + 4 nút đáp án mới

function showQuestion() {

    clearInterval(timer);              // Dừng timer cũ (nếu có)
    timeLeft = 30;                     // Reset 30 giây
    answered = false;                  // Chưa ai trả lời

    nextBtn.style.display = "none";    // Ẩn nút "Tiếp theo"
    retryBtn.style.display = "none";   // Ẩn nút "Chơi lại"

    timeElement.textContent = timeLeft;                    // Hiện "30"
    timeProgress.style.width = "100%";                     // Thanh đầy 100%
    timeProgress.style.backgroundColor = "#2eaf5d";        // Màu xanh lá

    const current = questions[currentQuestion];  // Lấy câu hiện tại
    shuffleAnswers(current);                       // Shuffle đáp án

    // Hiện tiêu đề: "3. Câu hỏi..."
    questionElement.textContent = `${currentQuestion + 1}. ${current.question}`;

    // Hiện số: "3 / 10 Câu hỏi"
    questionNumber.textContent = `${currentQuestion + 1} / ${questions.length} Câu hỏi`;

    answerList.innerHTML = ""; // Xóa đáp án cũ

    // Tạo 4 nút đáp án mới
    current.answers.forEach(function (answer, index) {
        const button = document.createElement("button");
        button.classList.add("answer");

        const text = document.createElement("span");
        text.textContent = answer;

        const icon = document.createElement("span");
        icon.classList.add("answer-icon");

        button.appendChild(text);
        button.appendChild(icon);

        // Click đáp án → gọi selectAnswer(index)
        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        answerList.appendChild(button);
    });

    startTimer(); // Bắt đầu đếm ngược 30 giây
}


// =================================
// 7. TIMER ĐẾM NGƯỢC
// =================================
// Mỗi 1 giây giảm timeLeft, đổi màu thanh, hết giờ → timeOut()

function startTimer() {
    timer = setInterval(function () {

        timeLeft--;
        timeElement.textContent = timeLeft;

        // Tính phần trăm thanh thời gian (30s = 100%)
        const percentage = (timeLeft / 30) * 100;
        timeProgress.style.width = percentage + "%";

        // Đổi màu: xanh > 60%, vàng > 30%, đỏ < 30%
        if (percentage > 60) {
            timeProgress.style.backgroundColor = "#2eaf5d";
        } else if (percentage > 30) {
            timeProgress.style.backgroundColor = "#e6b800";
        } else {
            timeProgress.style.backgroundColor = "#e74c3c";
        }

        // Hết giờ → dừng timer, gọi timeOut()
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }

    }, 1000); // 1000ms = 1 giây
}


// =================================
// 8. CHỌN ĐÁP ÁN
// =================================
// Hiển thị đúng/sai, cộng điểm, hiện nút "Tiếp theo"

function selectAnswer(selectedIndex) {
    if (answered) return; // Đã trả lời rồi → bỏ qua (chống click 2 lần)

    answered = true;
    clearInterval(timer);              // Dừng đếm giờ
    totalTime += (30 - timeLeft);      // Cộng thời gian đã dùng

    const correctIndex = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll(".answer");

    // Vòng qua 4 nút: đánh dấu đúng (✓) hoặc sai (✕)
    buttons.forEach(function (button, index) {
        button.disabled = true; // Khóa nút, không cho bấm lại
        const icon = button.querySelector(".answer-icon");

        if (index === correctIndex) {
            button.classList.add("correct");   // Màu xanh lá
            icon.textContent = "✓";           // Dấu check
        } else {
            button.classList.add("wrong");     // Màu đỏ
            icon.textContent = "✕";           // Dấu X
        }
    });

    // Cộng điểm
    if (selectedIndex === correctIndex) {
        score++;
    } else {
        wrong++;
    }

    // Hiện nút "Tiếp theo"
    nextBtn.style.display = "block";
    retryBtn.style.display = "none";
}


// =================================
// 9. HẾT THỜI GIAN
// =================================
// Tương tự selectAnswer nhưng không cộng điểm, chỉ hiển thị đáp án đúng

function timeOut() {
    if (answered) return; // Đã trả lời rồi → bỏ qua

    answered = true;
    totalTime += 30; // Hết giờ = dùng full 30 giây

    const correctIndex = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll(".answer");

    // Hiển thị đáp án đúng (màu xanh)
    buttons.forEach(function (button, index) {
        button.disabled = true;
        const icon = button.querySelector(".answer-icon");
        if (index === correctIndex) {
            button.classList.add("correct");
            icon.textContent = "✓";
        } else {
            button.classList.add("wrong");
            icon.textContent = "✕";
        }
    });

    wrong++; // Hết giờ = sai

    // Hiện nút "Tiếp theo"
    nextBtn.style.display = "block";
    retryBtn.style.display = "none";
}


// =================================
// 10. CHUYỂN CÂU TIẾP THEO
// =================================
// Nếu còn câu → showQuestion()
// Nếu hết câu → lưu kết quả vào localStorage, chuyển trang result.html

function nextQuestion() {
    currentQuestion++; // Tăng câu kế tiếp

    if (currentQuestion < questions.length) {
        showQuestion(); // Còn câu → hiển thị câu tiếp
    } else {
        // Hết câu → lưu điểm vào localStorage
        localStorage.setItem("quizScore", score);
        localStorage.setItem("quizWrong", wrong);
        localStorage.setItem("quizTime", totalTime);

        // Chuyển sang trang kết quả
        window.location.href = "result.html";
    }
}


// =================================
// 11. NÚT CHƠI LẠI
// =================================
// Reset tất cả về 0, xáo trộn lại, bắt đầu từ câu 1

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    totalTime = 0;
    questions.sort(() => Math.random() - 0.5); // Shuffle lại
    showQuestion();
}


// =================================
// 12. GẮN EVENT LISTENER
// =================================

// Nút "Tiếp theo" → chuyển câu tiếp
nextBtn.addEventListener("click", function () {
    nextQuestion();
});

// Nút "Làm lại" → reset quiz
retryBtn.addEventListener("click", function () {
    retryQuiz();
});


// =================================
// 13. KHỞI TẠO — Hiển thị câu hỏi đầu tiên
// =================================

showQuestion();
