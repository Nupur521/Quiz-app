import "../styles.css"

const ProgressBar=({points, index})=>{
    return (
        <div>
            <progress className="progressBar" max={15} value={index+1} style={{width: '50%'}}/>
            <div className="question-points">
            <div>Questions: {index+1}/15</div>
            <div>Points: {points}</div>
            </div>

        </div>
    )
}

export default ProgressBar