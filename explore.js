const lines = document.querySelectorAll(".typing1, .typing2");
const texts = [...lines].map(x => x.textContent);

lines.forEach(x => x.textContent = "");

async function type() {
    for (let i = 0; i < lines.length; i++) {
        for (let letter of texts[i]) {
            lines[i].textContent += letter;
            await new Promise(r => setTimeout(r, 30));
        }
        await new Promise(r => setTimeout(r, 1000));
    }
}

type();