import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid () {
        const isLocked = true
        const selectedWorkout = 0

        return(
                <div className='training_plan'>
                        {Object.keys(training_plan).map((workout, workoutindex) =>{
                                
                                const type = workoutindex % 3 === 0 ? 
                                'Push' : 
                                        workoutindex % 3 === 1 ? 
                                        'Pull'
                                         : "Legs"

                                const trainingPlan = training_plan[workoutindex]
                                if ( workoutindex === selectedWorkout){
                                        return (
                                                <WorkoutCard key = {workoutindex}/>
                                                )}

                         return(
                                        <button className = {'card plan-card' + ( isLocked ? 'inactive' : '')}
                                        key = {workoutindex}>
                                                <div className='plan-card-header'>
                                                        <p>Day{((workoutindex/8) <= 1 ) ? '0' + (workoutindex + 1) : workoutindex + 1}</p>

                                                </div>
                                                {isLocked ? (<i className='fa-solid fa-lock'></i>) : 
                                                ( workoutindex % 3 === 0  ? (<i className='fa-solid fa-dumbbell'></i> ):
                                                (workoutindex % 3 === 1 ? (<i className='fa-solid fa-weight-hanging'></i>):
                                                (<i className='fa-solid fa-bolt'></i>)
                                                ) )} 
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