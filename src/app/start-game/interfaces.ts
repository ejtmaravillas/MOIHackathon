export interface Question {
    question: string;
    picture: number;
    difficulty: string;
    choices: string[];
    correctAnswer: number;
}

export interface Answer {
    color: string[];
    answer: number;
}