import Database from "../src/database.js";
import SlashCommand from "../src/slash-command.js";

export default new SlashCommand(
	{
		description: "Get the points of a user",
	},
	async function* (user) {
		yield "Getting points...";

		const database = new Database(this.guild!.id);
		const {id, username} = user ?? this.user;
		await database.createTable();

		yield `**${username}** has **${await database.get(id)}** points!`;
	},
	{
		type: "User",
		name: "user",
		description: "The user to get the points of. Defaults to you.",
	}
);
