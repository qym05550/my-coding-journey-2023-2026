// إعداد Firebase
// NOTE: The real Firebase project keys were removed before publishing this archive publicly.
// This config used to contain a live apiKey/projectId/databaseURL — replace the placeholders
// below with your own Firebase project's values (Firebase Console > Project Settings),
// ideally injected via a build step / env variables rather than committed to source control.
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// عناصر الواجهة
const buttons = document.querySelectorAll('.emoji-btn');
const body = document.body;
const happyCountEl = document.getElementById('count-happy');
const sadCountEl = document.getElementById('count-sad');

// التصويت
function vote(choice) {
  const ref = db.ref("votes/" + choice);
  ref.transaction(current => (current || 0) + 1);
}

// عرض الأرقام مباشرة
db.ref("votes/happy").on("value", snapshot => {
  happyCountEl.textContent = snapshot.val() || 0;
});
db.ref("votes/sad").on("value", snapshot => {
  sadCountEl.textContent = snapshot.val() || 0;
});

// تأثيرات عند الضغط
function addRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

function flashBackground(kind) {
  const cls = kind === 'happy' ? 'flash-happy' : 'flash-neutral';
  body.classList.add(cls);
  setTimeout(() => body.classList.remove(cls), 700);
}

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const choice = btn.id === 'btn-yes' ? 'happy' : 'sad';
    vote(choice); // التصويت في Firebase

    // تأثيرات بصرية
    addRipple(e, btn);
    btn.classList.remove('animate');
    void btn.offsetWidth;
    btn.classList.add('animate');

    if (choice === 'sad') {
      flashBackground('neutral');
      btn.classList.add('wiggle');
      setTimeout(() => btn.classList.remove('wiggle'), 420);
    }

    const handleEnd = (ev) => {
      if (ev.animationName === 'pop') {
        btn.classList.remove('animate');
        btn.removeEventListener('animationend', handleEnd);
      }
    };
    btn.addEventListener('animationend', handleEnd);
  });
});
