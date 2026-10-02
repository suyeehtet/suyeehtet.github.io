const lines = document.querySelectorAll(".typing1, .typing2, .typing3");
const texts = [...lines].map(x => x.textContent);

lines.forEach(x => x.textContent = "");

async function type() {
    for (let i = 0; i < lines.length; i++) {
        for (let letter of texts[i]) {
            lines[i].textContent += letter;
            await new Promise(r => setTimeout(r, 100));
        }
        await new Promise(r => setTimeout(r, 1000));
    }
}

type();
const nameInput = document.querySelector(".guest-name");
const messageInput = document.querySelector(".guest-message");
const postButton = document.querySelector(".post");
const messages = document.querySelector(".messages");

postButton.addEventListener("click", function () {

    const name = nameInput.value;
    const message = messageInput.value;

    if (name === "" || message === "") {
        return;
    }

    const newMessage = document.createElement("p");

    newMessage.innerHTML = "<b>" + name + "</b><br>" + message;

    messages.prepend(newMessage);

    nameInput.value = "";
    messageInput.value = "";
});