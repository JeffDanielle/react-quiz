import Options from "./Options";

const Question = ({ question, dispatch, answer }) => {
    console.log(question)
    return (
        <div>
            <h4 className="text-4xl mb-6">{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;