const input = document.querySelector("#input");

input.addEventListener("input", async () => {
	const text = await readFile(event.target.files[0]);

	const lines = makeTextIntoLines(text);

	const newText = joinTextWithoutBadLines(lines);

	const blob = new Blob([newText], {
		type: "plain/text",
	});
	const fileUrl = URL.createObjectURL(blob);
	const downloadElement = document.createElement("a");
	downloadElement.href = fileUrl;
	downloadElement.download = "output.pgn";
	downloadElement.style.display = "none";
	document.body.appendChild(downloadElement);
	downloadElement.click();
	document.body.removeChild(downloadElement);
});

async function readFile(file) {
	return file.text();
}

function makeTextIntoLines(text) {
	const lines = [];
	let line = "";

	for (let i = 0; i < text.length; i++) {
		line += text[i];
		if (text[i] == "\n") {
			lines.push(line);
			line = "";
			continue;
		}
	}

	return lines;
}

function joinTextWithoutBadLines(lines) {
	let text = "";
	for (let i = 0; i < lines.length; i++) {
		if (
			!(
				lines[i].includes("BlackTitle") ||
				lines[i].includes("WhiteTitle")
			)
		) {
			text += lines[i];
		}
	}

	return text;
}
