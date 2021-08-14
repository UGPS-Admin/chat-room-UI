import { db } from "./firebase.js";
import { activeRoom } from "./ui.js";

const renderUL = document.querySelector(".message-render ul");
const addMessageForm = document.querySelector("form.message-form");
const channels = document.querySelector("section.channels ul");

let userName = localStorage.username ? localStorage.username : "somebody";

class Chatroom {
  constructor(room) {
    this.room = room;
    this.username = userName;
    this.collectionRef = db.collection("chat-details");
    this.unsubscribe;
  }

  // add new chats to the firestore
  addChat(message) {
    let present = new Date();

    let addDetails = {
      room: this.room,
      username: this.username,
      message,
      created_at: firebase.firestore.Timestamp.fromDate(present),
    };

    this.collectionRef
      .add(addDetails)
      .then(() => console.log("new message added"))
      .catch((err) => console.log(err));
  }

  // retieve old chats in realtime from database
  getChat(render) {
    this.unsubscribe = this.collectionRef
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type === "added") {
            render(change.doc.data());
          }
        });
      });
  }

  // update the chat room
  updateRoom(room) {
    this.room = room;
    console.log("changed to " + room + " room");
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // render the ui
  render(data) {
    let time = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    renderUL.innerHTML += `
      <li>
          <h2 class="username">${data.username}</h2>
          <h3 class="created_at">${time}</h3>
          <span class="shape"></span>
          <div class="message">${data.message}</div>
      </li> 
    `;
  }

  timeTravel() {
    renderUL.innerHTML = "";
  }
}

const user = new Chatroom("general");

// add new messages
addMessageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let message = addMessageForm.message.value.trim();
  user.addChat(message);
  addMessageForm.reset();
});

user.getChat((data) => user.render(data));

// update the chatroom when specific channel selected
channels.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    user.timeTravel();
    user.updateRoom(event.target.getAttribute("id"));
    user.getChat((data) => user.render(data));
  }
});

activeRoom();
