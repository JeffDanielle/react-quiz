import Options from "./Options";
import { useQuiz } from "../Context/QuizContext";

const Question = () => {
    const { questions, index } = useQuiz();
    const question = questions.at(index);
    return (
        <div>
            <h4 className="text-4xl mb-6">{question.question}</h4>
            <Options question={question} />
        </div>
    );
}

export default Question;