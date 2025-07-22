const STORAGE_KEY = "quizData";
const quizData = JSON.parse(localStorage.getItem(STORAGE_KEY));
const quizTitle = document.getElementById("quizTitle");
const quizContainer = document.getElementById("quizContainer");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progress");

let currentIndex = 0;
let userAnswers = [];

if (!quizData) {
    quizContainer.innerHTML = "<p>No quiz found. Please create one first.</p>";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
} else {
    quizTitle.textContent = quizData.title;
    renderQuestion();
}

function renderQuestion() {
    const q = quizData.questions[currentIndex];
    quizContainer.innerHTML = `
        <h3>${q.text}</h3>
        ${q.options.map((opt, i) => `
            <div><input type="radio" name="answer" value="${i}"> ${opt}</div>
        `).join("")}
    `;
    updateProgress();
}

function updateProgress() {
    const percent = ((currentIndex + 1) / quizData.questions.length) * 100;
    progressBar.style.width = percent + "%";
}

function getSelected() {
    const sel = document.querySelector('input[name="answer"]:checked');
    return sel ? parseInt(sel.value) : null;
}

nextBtn.addEventListener("click", () => {
    const ans = getSelected();
    if (ans === null) return alert("Select an answer!");
    userAnswers[currentIndex] = ans;
    if (currentIndex < quizData.questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        handleSubmit();
    }
});

submitBtn.addEventListener("click", handleSubmit);

function handleSubmit() {
    const ans = getSelected();
    if (ans !== null) userAnswers[currentIndex] = ans;
    localStorage.setItem("quizUserAnswers", JSON.stringify(userAnswers));
    let score = 0;
    quizData.questions.forEach((q, i) => {
        if (userAnswers[i] === q.correctIndex) score++;
    });
    localStorage.setItem("quizScore", score);
    window.location.href = "result.html";
}