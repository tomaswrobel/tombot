const questions = new Map<string, Question[]>();

export const categories = <const>[
	"music",
	"sport_and_leisure",
	"film_and_tv",
	"arts_and_literature",
	"history",
	"society_and_culture",
	"science",
	"geography",
	"food_and_drink",
	"general_knowledge",
];

export interface Question {
	id: string;
	category: (typeof categories)[number];
	difficulty: "easy" | "medium" | "hard";
	question: {
		text: string;
	};
	incorrectAnswers: string[];
	correctAnswer: string;
}

export function quiz(categories: string[]) {
	if (categories.length != 1) {
		return fetch(`https://the-trivia-api.com/v2/questions/?categories=${categories}&limit=1`)
			.then<[Question]>(r => r.json())
			.then(f => f[0]);
	}

	const array = questions.get(categories[0]);

	if (array?.length) {
		return array.pop()!;
	}

	return fetch(`https://the-trivia-api.com/v2/questions/?categories=${categories}&limit=50`)
		.then<Question[]>(r => r.json())
		.then(([r, ...f]) => (questions.set(categories[0], f), r));
}