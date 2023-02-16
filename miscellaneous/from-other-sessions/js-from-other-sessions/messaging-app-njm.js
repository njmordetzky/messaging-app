// 1
import { conversations, name } from './mock-data/conversation-data.js';

// 2
class MessagingApp {
  // 3
  constructor() {

  }

  // 4
  showConversations() {
    // 5
    for (const conversation of conversations) {
      // 6
      const { lastMessage } = conversation;
      // 7
      const conversationDiv = document.createElement('div');
      // 8
      conversationDiv.classList.add('conversation');
      // 9
      conversationDiv.innerHTML = lastMessage.message;
      // 10
      document.body.appendChild(conversationDiv);
    }

    // render the collection using a view

  }
}

// 11
const messagingApp = new MessagingApp();
// 12
messagingApp.showConversations();