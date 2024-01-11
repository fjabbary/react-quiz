
const Options = ({ question, dispatch, answer }) => {

  const hasAnswered = answer !== null;


  return (
    <>
      <div className="options">
        {question.options.map((option, index) => <button disabled={hasAnswered} className={hasAnswered && index === question.correctOption ? 'btn btn-option correct answer' : (hasAnswered && index !== question.correctOption) ? 'btn btn-option wrong' : 'btn btn-option'} key={option} onClick={() => dispatch(({ type: 'newAnswer', payload: index }))}>{option}</button>)}
      </div>

      {hasAnswered && <button>Next</button>}
    </>
  )
}

export default Options