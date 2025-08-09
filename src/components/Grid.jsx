import { useState, useEffect } from 'react'
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid () {
        const [ savedWorkouts, setSavedWorkouts ] = useState(null)
        const [ selectedWorkout, setselectedWorkout ] = useState(null)
        const completedWorkout = Object.keys(savedWorkouts || {}).filter((val) => {
                const entry = savedWorkouts[val]
                return entry.isComplete
        })

        function handleSave( index, data ){
                const newObj = {
                        ...savedWorkouts,
                        [index] : {
                                ...data,
                                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
                        }
                }
                setSavedWorkouts(newObj)
                localStorage.setItem('brogram', JSON.stringify(newObj))
                setselectedWorkout(null)

        }

        function handleComplete( index, data ){
                const newObj = { ...data }
                newObj.isComplete = true
                handleSave (index, newObj)

        }

         useEffect(()=>{
                        if (!localStorage) {return}
                        let savedData = {}
                        if ( localStorage.getItem('brogram')){
                                savedData = JSON.parse(localStorage.getItem('brogram'))
                        }
                        setSavedWorkouts (savedData)
                },[])

        return(
                <div className='training-plan-grid'>
                        {Object.keys(training_plan).map((workout, workoutindex) =>{

                                const isLocked = workoutindex === 0 ?
                                false :
                                !completedWorkout.includes(`${workoutindex-1}`)
                                
                                const type = workoutindex % 3 === 0 ? 
                                'Push' : 
                                        workoutindex % 3 === 1 ? 
                                        'Pull'
                                         : "Legs"

                                const trainingPlan = training_plan[workoutindex]
                                
                                const dayNum = ((workoutindex/8) <= 1 ) ? '0' + (workoutindex + 1) : workoutindex + 1 
                                
                                const icon = workoutindex % 3 === 0  ? (<i className='fa-solid fa-dumbbell'></i> ):
                                (workoutindex % 3 === 1 ? (<i className='fa-solid fa-weight-hanging'></i>):
                                (<i className='fa-solid fa-bolt'></i>)
                                ) 

                                if ( workoutindex === selectedWorkout){
                                        return (
                                                <WorkoutCard key = {workoutindex} trainingPlan = {trainingPlan}
                                                type = {type}  workoutindex = {workoutindex} icon = {icon} dayNum = {dayNum} handleComplete ={handleComplete} handleSave = {handleSave} savedWeights = {savedWorkouts?.[workoutindex]?.weights}/>
                                                )}

                         return(
                                        <button onClick = {()=>{ if(isLocked) {return}
                                                setselectedWorkout(workoutindex)
                                        }}
                                        className = {'card plan-card' + ( isLocked ? 'inactive' : '')}
                                        key = {workoutindex}>
                                                <div className='plan-card-header'>
                                                        <p>Day{dayNum}</p>
                                                </div>

                                                {isLocked ? (<i className='fa-solid fa-lock'></i>) : 
                                                (icon)} 
                                        <div className='plan-card-header'>
                                               <h4><b>{type}</b></h4>
                                        </div>
                                        </button>
                                ) 
                        }
                        )
                        }
                </div>
                
        )
}