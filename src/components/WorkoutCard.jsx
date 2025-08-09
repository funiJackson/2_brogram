import React, { useState } from "react"
import Modal from "./Modal"
import { exerciseDescriptions } from "../utils"

export default function WorkoutCard (props) {
        const { trainingPlan, workoutindex, type, dayNum, icon, savedWeights, handleComplete, handleSave} = props

        const { warmup, workout } = trainingPlan || {}

        const [ showExerciseDescription, setshowExerciseDescription ] = useState(null)

        const [ weights, setWeights ] = useState( savedWeights || {})
   
        function handleAddWeights ( title, weight){
                const newObj = {
                        ...weights,
                        [title] : weight
                }
                setWeights(newObj)
        }


        return(
                <div className="workout-container"> 
                { showExerciseDescription && 
                (<Modal showExerciseDescription = {showExerciseDescription} handleCloseModal = {()=>{
                        setshowExerciseDescription (null)
                }}/>)}
                        <div className="workout-card card">
                                <div className="plan-card header">
                                        <p>Day {dayNum}</p>
                                        {icon}
                                </div>
                                <div className="plan-card header">
                                        <h2><b>{type} Workout</b></h2>

                                </div>
                        </div>

                        <div className="workout-grid">
                                <div className="exercise-name">
                                        <h4>Warmup</h4>
                                </div>
                                <h6>Sets</h6>
                                <h6>Reps</h6>
                                <h6 className="weight-input">Max Weight</h6>
                                { warmup.map ((warmupExercise, warmupindex) => {
                                        return (
                                                <React.Fragment key={warmupindex}>
                                                        <div className="exercise-name">
                                                                <p>{warmupindex + 1}. {warmupExercise.name}</p>
                                                                <button onClick = {() => {
                                                                         setshowExerciseDescription({
                                                                                name: warmupExercise.name,
                                                                                description: exerciseDescriptions[warmupExercise.name]
                                                                        } )
                                                                } }className="help-icon">
                                                                        
                                                                        <i className="fa-regular fa-circle-question"/>
                                                                </button>
                                                        </div>
                                                        <p className="exercise-info">{warmupExercise.sets}</p>
                                                        <p className="exercise-info">{warmupExercise.reps}</p>
                                                        <input className="weight-input" placeholder="N/A" disabled />
                                                </React.Fragment>
                                        )
                                })}
                        </div>


                        <div className="workout-grid">
                                <div className="exercise-name">
                                        <h4>Workout</h4>
                                </div>
                                <h6>Sets</h6>
                                <h6>Reps</h6>
                                <h6 className="weight-input">Max Weight</h6>
                                { workout.map ((workoutExercise, windex) => {
                                        return (
                                                <React.Fragment key={windex}>
                                                        <div className="exercise-name">
                                                                <p>{windex + 1}. {workoutExercise.name}</p>
                                                                <button onClick = {() => {
                                                                         setshowExerciseDescription({
                                                                                name: workoutExercise.name,
                                                                                description: exerciseDescriptions[workoutExercise.name]
                                                                        } )
                                                                } } className="help-icon">
                                                                        <i className="fa-regular fa-circle-question"/>
                                                                </button>
                                                        </div>
                                                        <p className="exercise-info">{workoutExercise.sets}</p>
                                                        <p className="exercise-info">{workoutExercise.reps}</p>
                                                        <input  value = {weights[workoutExercise.name] || ''} 
                                                        onChange={(e)=>{
                                                                handleAddWeights(workoutExercise.name, e.target.value)
                                                        }} 
                                                                className="weight-input" placeholder="N/A" />
                                                </React.Fragment>
                                        )
                                })}
                        </div>

                        <div className="workout-buttons">
                                <button onClick={()=>{
                                        handleSave( workoutindex, {weights} )
                                }}>Save & Exit</button>
                                <button onClick={()=>{
                                        handleComplete ( workoutindex, {weights})
                                }}
                                disabled={Object.keys(weights).length !== workout.length}>Complete</button>
                        </div>

                </div>

        )
}