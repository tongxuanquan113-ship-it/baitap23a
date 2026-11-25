
// Khai báo các biến lấy phần tử HTML
const startBtn = document.getElementById("startBtn");
const colorBtn = document.getElementById("colorBtn");
const playerBtn = document.getElementById("playerBtn");
const target = document.getElementById("target");

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

const gameArea = document.getElementById("gameArea");
const timeSelect = document.getElementById("timeSelect");

// Khai báo mã sinh viên
const studentID = "NHAP_MA_SINH_VIEN_CUA_BAN";

// Khai báo biến trò chơi
let score = 0;
let timeLeft = 0;
let countdown;
let isPlaying = false;

// Hàm hiển thị mã sinh viên
playerBtn.addEventListener("click", function () {
    message.textContent = "Mã sinh viên: " + studentID;
});

// Hàm đổi màu nền ngẫu nhiên
colorBtn.addEventListener("click", function () {
    const colors = [
        "#ffebee",
        "#e8f5e9",
        "#e3f2fd",
        "#fff3e0",
        "#f3e5f5",
        "#fff9c4"
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);

    document.body.style.backgroundColor = colors[randomIndex];
});

// Hàm di chuyển mục tiêu đến vị trí ngẫu nhiên
function moveTarget() {
    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const randomX = Math.random() * maxX + target.offsetWidth / 2;
    const randomY = Math.random() * maxY + target.offsetHeight / 2;

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

// Hàm bắt đầu trò chơi
startBtn.addEventListener("click", function () {

    if (isPlaying) {
        return;
    }

    // Lấy thời gian người chơi lựa chọn
    timeLeft = Number(timeSelect.value);

    // Đặt lại điểm số
    score = 0;
    scoreDisplay.textContent = score;

    // Hiển thị thời gian
    timerDisplay.textContent = timeLeft;

    // Thông báo bắt đầu
    message.textContent = "Trò chơi bắt đầu! Hãy click vào mục tiêu.";

    // Đánh dấu trò chơi đang chạy
    isPlaying = true;

    // Khóa nút bắt đầu và chọn thời gian
    startBtn.disabled = true;
    timeSelect.disabled = true;

    // Hiển thị mục tiêu
    target.style.display = "block";

    // Đưa mục tiêu đến vị trí ngẫu nhiên
    moveTarget();

    // Bắt đầu đồng hồ đếm ngược
    countdown = setInterval(function () {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        // Kiểm tra khi hết thời gian
        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);
});

// Xử lý khi người chơi click vào mục tiêu
target.addEventListener("click", function () {

    if (!isPlaying) {
        return;
    }

    // Tăng điểm lên 1
    score++;

    // Cập nhật điểm trên màn hình
    scoreDisplay.textContent = score;

    // Di chuyển mục tiêu đến vị trí mới
    moveTarget();
});

// Hàm kết thúc trò chơi
function endGame() {

    // Dừng đồng hồ
    clearInterval(countdown);

    // Đánh dấu trò chơi đã kết thúc
    isPlaying = false;

    // Ẩn mục tiêu
    target.style.display = "none";

    // Khóa các nút chức năng
    startBtn.disabled = true;
    timeSelect.disabled = true;
    colorBtn.disabled = true;
    playerBtn.disabled = true;
    target.disabled = true;

    // Hiển thị kết quả
    message.textContent = "Hết giờ! Tổng số điểm của bạn là: " + score;
}
