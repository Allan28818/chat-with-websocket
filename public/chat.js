const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// emit => emitir alguma informação
// on => escutar alguma informação

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`;

socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => {
      createMessage(message);
    });
  }
);

document
  .getElementById("message_input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;

      const data = {
        room,
        message,
        username,
      };

      socket.emit("message", data);

      event.target.value = "";
    }
  });

socket.on("message", (data) => {
  createMessage(data);
});

function createMessage(data) {
  const messageDiv = document.getElementById("messages");
  const date = new Date(data.createdAt);
  const formatedDate = `${date.getDate()}/${
    date.getMonth() + 1
  } - ${date.getHours()}:${date.getMinutes()}`;

  messageDiv.innerHTML += `
  <div class="new_messages">
    <label for="form-label">
      <strong>${data.username}</strong> <span>${data.text} - ${formatedDate}</span>
    </label>
  </div>
  `;
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html";
});
