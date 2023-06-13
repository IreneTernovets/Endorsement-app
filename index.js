import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-1eb65-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementInDB = ref(database, "Endorsemnts");

const messageFieldEl = document.getElementById("message-input");
const publishBtn = document.getElementById("publish-btn");
const endorsementParagraphs = document.getElementById("endorsements");

publishBtn.addEventListener("click", function () {
  let inputValue = messageFieldEl.value;
  push(endorsementInDB, inputValue);
  endorsementParagraphs.innerHTML += `<p>${inputValue}</p>`;
  messageFieldEl.value = "";
});
