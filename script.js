import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import {
  get,
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCELZUB4BzaezA4rZiYMERuQ6DF40ULL_A",
  authDomain: "ledwoki.firebaseapp.com",
  databaseURL: "https://ledwoki-default-rtdb.firebaseio.com",
  projectId: "ledwoki",
  storageBucket: "ledwoki.firebasestorage.app",
  messagingSenderId: "272504469517",
  appId: "1:272504469517:web:f2091f23bf7c564cbdbd44",
  measurementId: "G-S8GBZ6SDZ1",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const sensor = ref(database, "sensor/status");
const paragrafo = document.querySelector("[sensor]");

function verificarStatus(snapshot) {
  try {
    if (snapshot.exists) {
      const estadoDoSensor = snapshot.val();
      switch (estadoDoSensor) {
        case "Seguro":
          paragrafo.textContent = `${estadoDoSensor} 👍`;
          paragrafo.style.backgroundColor = "lightgreen";
          paragrafo.style.color = "white";
          break;
        case "Alerta":
          paragrafo.textContent = `${estadoDoSensor} ☣️`;
          paragrafo.style.backgroundColor = "orange";
          paragrafo.style.color = "white";

          break;
        case "Perigo":
          paragrafo.textContent = `Perigo ☠️`; 
          paragrafo.style.color = "#e74c3c";
          paragrafo.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
          break;
      }
    }
  } catch (e) {
    alert("Erro ao acessar dados do firebase", e);
  }
}

onValue(sensor, (snapshot) => {
  verificarStatus(snapshot);
});
