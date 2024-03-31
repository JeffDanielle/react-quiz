const StartScreen = ({ numQuestion }) => {
    return (
        <div className="start">
            <h2 className="text-6xl mb-6">Welcome to The React Quiz!</h2>
            <h3 className="text-3xl mb-6">{numQuestion} questions to test your React mastery</h3>
            <button className="btn btn-ui">Let's Start</button>
        </div>
    );
}

export default StartScreen;