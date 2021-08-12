import { db } from "./firebase.js";

const loginForm = document.querySelector("form.login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let collection = db.collection("login-users");
  let userFound = false;

  let user = loginForm.username.value.trim();
  localStorage.setItem('username', user)
  
  // get user if any saved previously
  collection.get().then((snapshot) => {
    for (let doc of snapshot.docs) {
      if (doc.data().name === user) {
        userFound = true;
        break;
      }
    }

    if (userFound) {
      console.log("user found");
      setTimeout(() => (location = "./chat-app.html"), 2000);
    } else {
      // if not found add new members and go to next page

      collection
        .add({ name: user })
        .then(() => {
          console.log("user added");
          setTimeout(() => (location = "./chat-app.html"), 2000);
        })
        .catch((err) => console.log(err));
    }
  });
});
