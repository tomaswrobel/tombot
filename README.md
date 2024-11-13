# Tombot - personal Discord bot

## Requirements

1. Discord Bot Token
2. Enable 'Message Content Intent' in Discord Developer Portal
3. Node.js v18 or higher
4. [Unsplash](https://unsplash.com) API Access key

## 🚀 Getting Started

First, clone the repo. Then, provide these environment variables:

1. `DISCORD_TOKEN` - being the Discord Bot Token
2. `UNSPLASH_ACCESS_KEY` - being the Unsplash access key (not the secret one)

Then build with TypeScript.

## 📝 Features & Commands

- ❓ Quiz
	
`/quiz [custom?]` - Start a quiz. If `custom` is provided, you can specify the categories.

- Wallpaper

`/wallpaper [query]` - Get a random wallpaper from Unsplash. If `query` is provided, it will search for that.

- Delete

`/delete [amount]` - Delete the last `amount` messages.

- Czech Laws

`/law` - Get a random Czech law.

## Custom command

Creating custom command is as fast as creating a file.

Under the `commands` folder, create a TypeScript file with the same name as your command.

```ts
import SlashCommand from "../src/SlashCommand.js";

export default new SlashCommand(
	{
		description: "Your description",
	},
	// User is automatically typed
	async function* (user) {
		// When yoy yield, the reply is sent / edited
		yield `Hello world, @${user.tag}!`;

		// If you really need the Interaction API, you use this:
		yield `Hello world, @${this.user.tag}!`;
	},
	// You can specify as many options as you wish
	{
		type: "User",
		name: "user",
		required: true,
	}
);
```