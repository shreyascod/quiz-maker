const quizData = JSON.parse(localStorage.getItem("quizData"));
const userAnswers = JSON.parse(localStorage.getItem("quizUserAnswers")) || [];
const score = parseInt(localStorage.getItem("quizScore") || "0");
const resultDiv = document.getElementById("result");

if (!quizData) {
    resultDiv.innerHTML = "<p>No results available.</p>";
} else {
    let html = `<h2>${quizData.title}</h2><p>You scored ${score} out of ${quizData.questions.length}</p><hr><ol>`;
    quizData.questions.forEach((q, i) => {
        const userAns = userAnswers[i] != null ? q.options[userAnswers[i]] : "(no answer)";
        const correctAns = q.options[q.correctIndex];
        html += `<li><strong>${q.text}</strong><br>Your answer: ${userAns}<br>Correct: ${correctAns}</li>`;
    });
    html += "</ol>";
    resultDiv.innerHTML = html;
}