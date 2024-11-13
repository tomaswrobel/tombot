import {AttachmentBuilder} from "discord.js";
import SlashCommand from "../src/slash-command.js";

function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default new SlashCommand(
	{
		description: "Získat PDF náhodých předpisů",
	},
	async function* () {
		yield SlashCommand.DEFER;

		const year = randomInt(1945, 2021);
		const law = randomInt(1, 30);

		const response = await fetch(`https://www.e-sbirka.cz/sbr-externi/castky/sb/${year}/${law}`);
		const {
			overeneZneniOdkazPdf: {dokumentId},
			datumCasVyhlaseni,
		} = await response.json();
		const date = new Date(datumCasVyhlaseni).toLocaleDateString("cs-CZ", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		const file = await fetch(`https://www.e-sbirka.cz/sbr-externi/stahni/overena-zneni/${dokumentId}/`);

		yield {
			content: `Částka ${law}/${year} Sb. ze dne ${date}`,
			files: [
				new AttachmentBuilder(Buffer.from(await file.arrayBuffer()), {
					name: `castka-${law}-${year}.pdf`,
					description: "PDF soubor s náhodným předpisem",
				}),
			],
		};
	}
);
