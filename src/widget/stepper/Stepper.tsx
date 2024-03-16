import "./Stepper.css";
import { TStep } from "./stepper.type";

type TStepProps = {
    title :string,
    caption: string,
    step: number,
    activeStep: number
}

const Step = ({title,caption,step,activeStep}:TStepProps) => {
    const completedStepWrapperClass = step < activeStep ? "completed_circle_wrapper" :"";
    const completedStepCircleClass = step < activeStep ? "completed_circle" :"";
    const activeStepCircleClass = step === activeStep ? "active_circle" :"";

    return (
        <div className="step">
            <div className={`circle_wrapper ${completedStepWrapperClass}`}>
                <div  className={`circle ${completedStepCircleClass} ${activeStepCircleClass}`}>{step}</div>
            </div>
            <div>
                <div className="title">{title}</div>
                <div className="caption">
                    <p>{caption}</p>
                </div>
            </div>
        </div>
    )
}


type TStepperProps = {
    steps : TStep[],
    activeStep: number
}
const Stepper = ({steps,activeStep}:TStepperProps) => {
    return (
        <div className="stepper_container">
            {
                steps.map((step,idx)=><Step 
                    title={step.title} 
                    caption={step.caption} 
                    step={idx + 1} 
                    activeStep={activeStep}
                    key={idx} 
                />)
            }
        </div>
    );
};

export default Stepper;