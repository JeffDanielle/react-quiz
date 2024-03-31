import Options from "./Options";

const Question = ({ question }) => {
    console.log(question)
    return (
        <div>
            <h4 className="text-4xl mb-6">{question.question}</h4>
            <Options question={question} />
        </div>
    );
}

export default Question;