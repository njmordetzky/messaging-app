// Firebase Setup
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd1uKxtKWjlIiPe7bjL82WdjeG1SNDtE0",
  authDomain: "messaging-app-3c10b.firebaseapp.com",
  databaseURL: "https://messaging-app-3c10b-default-rtdb.firebaseio.com",
  projectId: "messaging-app-3c10b",
  storageBucket: "messaging-app-3c10b.appspot.com",
  messagingSenderId: "193798919751",
  appId: "1:193798919751:web:edb6af458d8e50a1764362",
  measurementId: "G-PJ5NVT8CSZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, set, get, update, remove, ref, child, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const database = getDatabase();

// Messaging App
var enterParticipants = document.querySelector("#enterParticipants");

var newChatNotification = document.querySelector("#newChatNotification");
var chatParticipants = document.querySelector("#chatParticipants");
var chatsLastMessage = document.querySelector("#chatsLastMessage");
var chatLastMessageTimestamp = document.querySelector("#chatLastMessageTimestamp");

var addNewChatButton = document.querySelector("#addNewChatButton");
var updateChatButton = document.querySelector("#updateChatButton");
var chatDeleteButton = document.querySelectorAll(".chatDelete");

function addNewChat() {
  var arrayOfContacts = enterParticipants.value.split(", ");
  push(ref(database, "ChatConversations/"), {
    users: arrayOfContacts,
    chatName: "",
    notificationSettings: "",
    lastMessageTimestamp: "",
    lastMessage: {
      userId: "The user that sent the last message",
      message: "preview of this last message..."
    }
  })
    .then((snap) => {
      const chatCoversationKey = snap.key;
      displayNewChatConfirmation(chatCoversationKey);
    })
    .catch((error) => {
      alert(error);
    });
};

function displayNewChatConfirmation(chatCoversationKeyParam) {
  const databaseReference = ref(database);
  const chatCoversationKey = chatCoversationKeyParam;

  get(child(databaseReference, "ChatConversations/" + chatCoversationKey))
    .then((snapshot) => {
      if (snapshot.exists()) {
        var newChatText = "You've created a new chat with: "
        var newChatUsersArray = [];
        snapshot.child("users").val().forEach((user) => {
          newChatUsersArray.push(user);
        });
        newChatText += newChatUsersArray.join(', ') + " and yourself!";
        newChatNotification.innerHTML = newChatText;
        displayAllChats();
      } else {
        alert("error");
      }
    });
};

function displayAllChats() {
  const databaseReference = ref(database);
  listOfChats.innerHTML = "";
  get(child(databaseReference, "ChatConversations/"))
    .then((snapshot) => {
      console.log(snapshot);
      if (snapshot.exists()) {
        snapshot.forEach((changingChatKey) => {
          var chatUsersArray = [];
          changingChatKey.child("users").val().forEach((user) => {
            chatUsersArray.push(user);
          });
          // Chat Container
          var chatContainer = document.createElement('div');
          chatContainer.className = "chatContainer";
          chatContainer.setAttribute('chat-key', changingChatKey.key);
          var listOfChatUsers = chatUsersArray.join(', ');
          chatContainer.setAttribute('users', listOfChatUsers);
          listOfChats.appendChild(chatContainer);
          // Delete Button
          var chatDeleteButton = document.createElement('button');
          chatDeleteButton.className = "chatDelete";
          chatDeleteButton.innerHTML = "Delete";
          chatContainer.appendChild(chatDeleteButton);
          chatDeleteButton.addEventListener("click", () => { chatDelete(changingChatKey.key) });
          // Update Button
          var chatUpdateButton = document.createElement('button');
          chatUpdateButton.className = "chatUpdate";
          chatUpdateButton.innerHTML = "Update";
          chatContainer.appendChild(chatUpdateButton);
          chatUpdateButton.addEventListener("click", () => { chatUpdate(changingChatKey.key) });
          // List of Users in Chat
          var chatUsers = document.createElement('h3');
          chatUsers.className = "chatUsers";
          chatContainer.appendChild(chatUsers);
          chatUsers.innerHTML = listOfChatUsers;
          // Go To Individual Chat
          var individualChatIcon = document.createElement('a');
          individualChatIcon.className = "individualChatLink";
          individualChatIcon.innerHTML = "&#9992;";
          chatContainer.appendChild(individualChatIcon);
          individualChatIcon.addEventListener("click", () => { displayIndividualChat(changingChatKey.key, listOfChatUsers) });
          // Last Interaction
          // Message, Username, Time
          // <p class="chatUsers">"Hey man, watcha doin?" -Spiderman &gt;</p>
        });

      } else {
        alert("error");
      }
    });
};

function chatDelete(chatKey) {
  var chatKey = chatKey;
  remove(ref(database, "ChatConversations/" + chatKey))
    .then(() => {
      displayAllChats();
    })
    .catch((error) => {
      alert(error);
    });
};

function chatUpdate(chatKey) {
  var chatKey = chatKey;
  const chatUserNames = document.getElementsByClassName("chatUsers");
  const chatContainer = document.getElementsByClassName("chatContainer");
  for (let i = 0; i < chatContainer.length; i++) {
    if (chatContainer[i].getAttribute("chat-key") == chatKey) {
      // Pop-up Container
      var updatePopupContainer = document.createElement('div');
      updatePopupContainer.className = "updatePopupContainer";
      chatUserNames[i].after(updatePopupContainer);
      // Pop-up Heading
      var updatePopupHeading = document.createElement('h3');
      updatePopupHeading.innerHTML = "Add a comma separated list of the updated people you'd like to include in your chat";
      updatePopupContainer.appendChild(updatePopupHeading);
      // Pop-up Input
      var updatePopupInput = document.createElement('input');
      updatePopupInput.setAttribute("id", "updatePopupInput");
      updatePopupContainer.appendChild(updatePopupInput);
      // Pop-up Button
      var updatePopupButton = document.createElement('button');
      updatePopupButton.innerHTML = "Update";
      updatePopupContainer.appendChild(updatePopupButton);
      updatePopupButton.addEventListener("click", () => { chatUpdatePopup(chatKey) });
    }
    function chatUpdatePopup(chatKey) {
      var arrayOfContacts = updatePopupInput.value.split(", ");
      update(ref(database, "ChatConversations/" + chatKey), {
        users: arrayOfContacts
      })
        .then(() => {
          displayAllChats();
        })
        .catch((error) => {
          alert(error);
        });
    };
  };
};

function displayIndividualChat(chatKey, listOfChatUsers) {
  var chatKey = chatKey;
  var listOfChatUsers = listOfChatUsers;
  individualMain.style.display = "inline-block";
  // Chat Heading
  individualChatHeading.innerHTML = "";
  var individualChatH1 = document.createElement('h1');
  individualChatH1.innerHTML = "This chat includes: " + listOfChatUsers + " and yourself!";
  individualChatHeading.appendChild(individualChatH1);
  // Chat Content
};

addNewChatButton.addEventListener("click", addNewChat);
individualMain.style.display = "none";
displayAllChats();