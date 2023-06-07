import "dotenv/config";
import {Config} from "../interfaces/Config";

try {
	var config: Config = require("../config.json");
} catch (error) {
	var config: Config = {
		TOKEN: process.env.TOKEN || "",
		PREFIX: process.env.PREFIX || "!",
		MAX_PLAYLIST_SIZE: parseInt(process.env.MAX_PLAYLIST_SIZE!) || 10,
		PRUNING: process.env.PRUNING === "true" ? true : false,
		STAY_TIME: parseInt(process.env.STAY_TIME!) || 30,
		DEFAULT_VOLUME: parseInt(process.env.DEFAULT_VOLUME!) || 100,
		LOCALE: process.env.LOCALE || "en",
		UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY || "",
		UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY || "",
	};
}

export {config};
