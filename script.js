let availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let shownNumbers = [];

function generateNumber() {
  if (availableNumbers.length === 0) {
    showConfettiPopup("All Digits Over!");
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const number = availableNumbers.splice(randomIndex, 1)[0];
  
  document.getElementById("numberDisplay").innerText = number;
  shownNumbers.push(number);
  document.getElementById("shownNumbers").innerText = shownNumbers.join(", ");
}

function openCheckPopup() {
  document.getElementById("checkPopup").style.display = "flex";
}

function closeCheckPopup() {
  document.getElementById("checkPopup").style.display = "none";
  document.getElementById("checkInput").value = "";
  document.getElementById("checkResult").innerText = "";
}

function checkNumbers() {
  const input = document.getElementById("checkInput").value;
  const inputNumbers = input.split(",").map(num => parseInt(num.trim(), 10));
  
  const allNumbersExist = inputNumbers.every(num => shownNumbers.includes(num));
  
  if (allNumbersExist) {
    showConfettiPopup("All numbers were called!");
  } else {
    document.getElementById("checkResult").innerText = "Some numbers were not called yet.";
    document.getElementById("checkResult").style.color = "red";
  }
}

function showConfettiPopup(message) {
  document.getElementById("confettiMessage").innerText = message;
  document.getElementById("confettiPopup").style.display = "flex";
  launchConfetti();
}

function closeConfettiPopup() {
  document.getElementById("confettiPopup").style.display = "none";
}

function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
