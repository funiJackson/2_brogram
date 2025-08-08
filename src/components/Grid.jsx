import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid () {
        const isLocked = true
        const selectedWorkout = 4

        return(
                <div className='training_plan'>
                        {Object.keys(training_plan).map((workout, workoutindex) =>{
                                
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
                                                type = {type}  workoutindex = {workoutindex} icon = {icon} dayNum = {dayNum}/>
                                                )}

                         return(
                                        <button className = {'card plan-card' + ( isLocked ? 'inactive' : '')}
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