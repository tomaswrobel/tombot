import {
	ComponentType,
	ActionRowBuilder as Row,
	StringSelectMenuBuilder as Menu,
	EmbedBuilder,
	Message,
} from "discord.js";

import SlashCommand from "../src/slash-command.js";
import {categories, quiz} from "../src/trivia.js";

function collect(message: Message<boolean>) {
	return message.createMessageComponentCollector({
		componentType: ComponentType.StringSelect,
	});
}

export default new SlashCommand(
	{
		description: "Starts a quiz",
		cooldown: 20,
	},
	async function* () {
		const quest = await quiz([]);
		const options = [...quest.incorrectAnswers, quest.correctAnswer].sort(() => Math.random() - 0.5);

		const embed = new EmbedBuilder({
			title: quest.question.text,
			fields: [
				{
					name: "Category",
					value: quest.category[0].toUpperCase() + quest.category.slice(1).replace(/_/g, " "),
					inline: true,
				},
				{
					name: "Difficulty",
					value: ":star:".repeat(["easy", "medium", "hard"].indexOf(quest.difficulty) + 1),
					inline: true,
				},
				...options.map((answer, i) => ({
					name: `Option ${String.fromCharCode(65 + i)}.`,
					value: answer,
					inline: true,
				})),
			],
		});

		yield {
			embeds: [embed],
			components: [
				new Row<Menu>().addComponents(
					new Menu({
						customId: "quiz",
						placeholder: "Select an answer",
						minValues: 1,
						maxValues: 1,
						options: options.map(answer => ({label: answer, value: answer})),
					})
				),
			],
		};

		const collector = await this.fetchReply().then(collect);

		for await (const [interaction] of collector) {
			if (interaction.user.id !== this.user.id) {
				await interaction.reply({
					content: "This is not your quiz!",
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content:
						interaction.values[0] === quest.correctAnswer
							? `✅ **Correct!** You chose ${quest.correctAnswer}.`
							: `❌ **Wrong!**. You chose answer "${interaction.values[0]}" but the correct one was **${quest.correctAnswer}**.`,
				});
				break;
			}
		}

		collector.stop();
		this.editReply({components: []});
	}
);
