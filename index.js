import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  clearInputField();
});

onValue(endorsementInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    endorsementParagraphs.innerHTML = "";
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appendNewItem(currentItem);
    }
  } else {
    endorsementParagraphs.innerHTML = "Start sharing your love...";
  }
});

function clearInputField() {
  messageFieldEl.value = "";
}

function appendNewItem(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("p");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let endorsementExactLocationInDB = ref(database, `Endorsemnts/${itemID}`);
    remove(endorsementExactLocationInDB);
  });
  endorsementParagraphs.append(newEl);
}
