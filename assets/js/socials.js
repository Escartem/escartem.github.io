// script for bottom section

// setting up bottom links
links = [
	{
		"id": "github",
		"url": "https://github.com/Escartem"
	},
	{
		"id": "youtube",
		"url": "https://youtube.com/@Escartem"
	},
	{
		"id": "discord",
		"url": "https://discord.gg/fzRdtVh"
	}
]

wrapper = document.getElementById("links-wrapper");

for (const [key, value] of Object.entries(links)) {
	containerDiv = document.createElement("div");
	containerDiv.classList.add("icon-placeholder");
	containerDiv.onclick = function() {window.open(value["url"], "_blank")};

	icon = document.createElement("i");
	icon.classList = `bottom-icon fa-brands fa-${value["id"]}`;

	containerDiv.appendChild(icon);
	wrapper.appendChild(containerDiv);
}

// random splash text at bottom
splashes = ["microwave-proof", "why tho", "hi :)", "random splash text", "I like trains", "me go brrr", "*angry sounds*", "who reads this", "lost in thoughts", "always late", "oops, wrong button", "chaos reigns", "how.", "hey there :D", "unexpected text", "zoom zoom", "*frustrated noises*", "lost in translation", "cats are awesome", "beep bop", "*screaming internally*", "seriously though", "surprise attack !", "uwu", "ekusupuroshon >:D", "mina gambate ne", "aaaaaaa", "am I bulletproof ?", "why not though", "how intriguing", "*screaming internally* but in a cute way", "turtle", "ow.", "I ate bread yesterday", "how is this entertaining", "stop refreshing", "chaos is just organised messiness", "squish that cat", "beckeh", "lumine supremacy", "late as usual"];

document.getElementById("footer-text").innerHTML = `${splashes[Math.floor(Math.random()*splashes.length)]} | Escartem 2023`;
