const TARGET = 7000000;
const API_URL = 'https://script.google.com/macros/s/AKfycbyBvG1-PHwgkC75RSS4iUKqqUaqo8YsV2tBNtB43sae6c-ex8gxHzA2DSVRwaPG7kxt/exec'; // ใส่ลิ้งค์ API ที่ได้

async function fetchCurrentPassengers() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const data = await res.json();
    return Number(data.current) || 0;
  } catch (e) {
    return 0;
  }
}

async function updateDisplay() {
  const current = await fetchCurrentPassengers();
  const digits = current.toString().padStart(7, '0').split('');

  // Update digits without animation
  digits.forEach((digit, index) => {
    const digitElement = document.getElementById(`digit-${index + 1}`);
    const spanElement = digitElement.querySelector('span');
    spanElement.textContent = digit;
  });
}

// Initialize digits to 0 with animation
function initializeDigits() {
  for (let i = 1; i <= 7; i++) {
    const digitElement = document.getElementById(`digit-${i}`);
    digitElement.innerHTML = '<span>0</span>';
    const spanElement = digitElement.querySelector('span');
    spanElement.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s';
    spanElement.style.transform = 'scale(1.5)';
    spanElement.style.opacity = '0';

    setTimeout(() => {
      spanElement.style.transform = 'scale(1)';
      spanElement.style.opacity = '1';
    }, 500); // Animation duration matches CSS
  }
}

function updateDateTime() {
  const now = new Date();
  const formattedDateTime = now.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  document.querySelector('.footer').textContent = `${formattedDateTime}`;
}

initializeDigits();
updateDisplay();
updateDateTime();
setInterval(() => {
  updateDisplay();
  updateDateTime();
}, 1000); // อัปเดตทุก 1 วินาที
