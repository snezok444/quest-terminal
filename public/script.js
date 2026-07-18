const BACKEND_URL = "https://quest-backend.onrender.com";

// Открытие и закрытие окон
document.querySelectorAll(".icon").forEach(icon => {
  icon.addEventListener("click", () => {
    const id = icon.dataset.open;
    if (id) document.getElementById(id).classList.remove("hidden");
  });
});

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.close;
    document.getElementById(id).classList.add("hidden");
  });
});

// Видео
function changeVideo(file) {
  const player = document.getElementById("video-player");
  player.src = /${file};
  player.play();
}

// Проверка ответа через бекэнд
const accessOutput = document.getElementById("access-output");

async function checkAnswer() {
  const answer = document.getElementById("access-input").value;

  try {
    const res = await fetch(BACKEND_URL + "/check-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer })
    });

    const data = await res.json();

    if (data.ok) {
      accessOutput.textContent = "Доступ разрешён. Код: " + data.code;
    } else {
      accessOutput.textContent = "Ошибка: " + data.error;
    }
  } catch (e) {
    accessOutput.textContent = "Ошибка связи с сервером.";
  }
}

document.getElementById("access-btn").onclick = checkAnswer;

// Уведомления от бекэнда
const alertBar = document.getElementById("alert-bar");
const alertText = document.getElementById("alert-text");

async function checkAlert() {
  try {
    const res = await fetch(BACKEND_URL + "/alert");
    const data = await res.json();

    if (data.message) {
      alertText.textContent = data.message;
      alertBar.classList.remove("hidden");
    } else {
      alertBar.classList.add("hidden");
    }
  } catch (e) {
    // можно ничего не делать, если сервер недоступен
  }
}

setInterval(checkAlert, 500);
