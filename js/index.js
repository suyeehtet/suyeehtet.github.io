const SUPABASE_URL = "https://qqilpkmmutnnfgkhzsgp.supabase.co";
const SUPABASE_KEY = "sb_publishable_g9IL3fsGb409-z7ry71Z3w_UKGumG8u";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
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

postButton.addEventListener("click", async function () {

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || message === "") {
        alert("please enter your name and a message!");
        return;
    }

    postButton.disabled = true;
    postButton.textContent = "posting...";

    const { data, error } = await supabaseClient.functions.invoke(
        "post-note",
        {
            body: {
                name: name,
                message: message
            }
        }
    );

    postButton.disabled = false;
    postButton.textContent = "post";

    if (error) {
        console.log(error);
        alert("your note could not be posted.");
        return;
    }

    if (data?.error) {
        alert(data.error);
        return;
    }

    nameInput.value = "";
    messageInput.value = "";

    await loadMessages();
});
async function loadMessages() {
    const { data, error } = await supabaseClient
        .from("notes corner")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    messages.innerHTML = "";

data.forEach(note => {
    const newMessage = document.createElement("p");

    const name = document.createElement("b");
    name.textContent = note.name;

    newMessage.appendChild(name);
    newMessage.appendChild(document.createElement("br"));
    newMessage.appendChild(document.createTextNode(note.message));

    messages.appendChild(newMessage);
});
}

loadMessages();