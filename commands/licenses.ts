import {EmbedBuilder} from "discord.js";
import packageJSON from "../package.json" with {type: "json"};
import SlashCommand from "../src/SlashCommand.js";

const api = `https://api.github.com/repos${new URL(packageJSON.repository.url).pathname}`;

export default new SlashCommand({description: "See open-source licenses"}, async function* () {
	yield "Loading...";

	const embed = new EmbedBuilder();

	for (const name in packageJSON.dependencies) {
		const {default: {description}} = await import(`${name}/package.json`, {with: {type: "json"}});

		embed.addFields({
			name,
			value: `${description}\n[View on npm](https://npmjs.com/package/${name})`,
		});
	}

	const {owner, description} = await fetch(api).then(res => res.json());

	yield {
		content: `**${this.client.user.username} would not be possible without the following open source projects:**\n\n`,
		embeds: [
			embed.addFields({
				name: "evobot",
				value: "The core of the music functions. \n[View on GitHub](https://github.com/eritislami/evobot)",
			}),
			new EmbedBuilder()
				.setTitle(`${this.client.user.username}'s source code`)
				.setAuthor({
					name: owner.login,
					iconURL: owner.avatar_url,
					url: packageJSON.repository.url,
				})
				.setDescription(description),
		],
	};
});
