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


// เพิ่มฟังก์ชันสร้างหิมะตกหลังจากโหลดหน้าเสร็จ
function createSnowflakes() {
  const snowContainer = document.getElementById('snow-container');
  const snowflakeSVG = `<svg fill="#ffffff" width="20px" height="20px" viewBox="-1.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.188 17.029-2.17-1.259 2.047-1.183c.44-.258-.486-1.851-.923-1.593l-2.973 1.714-4.673-2.699 4.673-2.699 2.973 1.711c.44.258 1.366-1.349.923-1.593l-2.048-1.183 2.17-1.259c.44-.258-.486-1.851-.923-1.593l-2.17 1.259v-2.367c0-.516-1.851-.516-1.851 0v3.444l-4.673 2.699v-5.397l2.973-1.714c.44-.258-.486-1.851-.923-1.593l-2.036 1.167v-2.503c0-.516-1.851-.516-1.851 0v2.503l-2.048-1.184c-.44-.258-1.366 1.349-.923 1.593l2.973 1.714v5.386l-4.673-2.699v-3.415c0-.516-1.851-.516-1.851 0v2.366l-2.174-1.259c-.44-.258-1.366 1.349-.923 1.593l2.17 1.259-2.048 1.183c-.44.258.486 1.851.923 1.593l2.973-1.714 4.673 2.716-4.673 2.699-2.973-1.714c-.44-.258-1.366 1.349-.923 1.593l2.048 1.183-2.17 1.262c-.44.258.486 1.851.923 1.593l2.17-1.259v2.367c0 .516 1.851.516 1.851 0v-3.447l4.673-2.699v5.386l-2.971 1.716c-.44.258.486 1.851.923 1.593l2.048-1.183v2.502c0 .516 1.851.516 1.851 0v-2.503l2.048 1.183c.44.258 1.366-1.349.923-1.593l-2.973-1.714v-5.37l4.673 2.699v3.444c0 .516 1.851.516 1.851 0v-2.365l2.17 1.259c.444.227 1.354-1.366.914-1.623z"/></svg>`;

  for (let i = 0; i < 50; i++) { // สร้าง 50 หิมะ
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = snowflakeSVG;
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDelay = Math.random() * 10 + 's';
    snowContainer.appendChild(snowflake);
  }
}

// เรียกฟังก์ชันหลังจากโหลดหน้าเสร็จ
window.addEventListener('load', () => {
  setTimeout(createSnowflakes, 1000); // หน่วงเวลา 1 วินาทีหลังโหลด
});



initializeDigits();
updateDisplay();
updateDateTime();
setInterval(() => {
  updateDisplay();
  updateDateTime();
}, 1000); // อัปเดตทุก 1 วินาที
