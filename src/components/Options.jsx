const Options = ({ question }) => {
    return (
        <div className="options">
            <div className="options">
                {question.options.map((option, index) => <button className="btn btn-option" key={index}>{option}</button>)}
            </div>
        </div>
    );
}

export default Options;