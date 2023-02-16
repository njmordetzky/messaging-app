// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, reference, set } from "firebase/database";
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
export const database = getDatabase(app);

function writeUserData(userId, name, email, imageUrl) {
  const database = getDatabase();
  const reference = reference(database, 'users/' + userId);

  set(reference, {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}

writeUserData("notnmordegtzky", "nathaniel", "notnmordet@gmail", "www.myimage.com");

const conversations = [
  {
    conversationId: 0,
    users: [0, 1],
    name: '',
    notificationSettings: {},
    lastMessageTimestamp: 1668564001669,
    lastMessage: {
      userId: 0,
      message: 'Hey (*_*)',
    },
  },

  {
    conversationId: 0,
    users: [0, 1],
    name: '',
    notificationSettings: {},
    lastMessageTimestamp: 1668564001669,
    lastMessage: {
      userId: 1,
      message: 'Hey there!',
    },
  },

  {
    conversationId: 0,
    users: [0, 1],
    name: '',
    notificationSettings: {},
    lastMessageTimestamp: 1668564001669,
    lastMessage: {
      userId: 0,
      message: 'You able to meet tonight?',
    },
  }

];

const name = 'nathaniel';

// 1
export { conversations, name };