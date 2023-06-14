import React, { useState, useEffect } from "react";
import "./HorizontalStepper.scss";

const steps = [
  {
    label: "Pending",
    description: "Waiting for processing",
    icon: "bx bx-time-five",
  },
  { label: "Canceled", description: "Order canceled", icon: "bx bx-x-circle" },
  {
    label: "On Hold",
    description: "Order on hold",
    icon: "bx bx-pause-circle",
  },
  { label: "Shipped", description: "Order shipped", icon: "bx bx-package" },
  {
    label: "Delivered",
    description: "Order delivered",
    icon: "bx bx-check-circle",
  },
  { label: "Refunded", description: "Order refunded", icon: "bx bx-undo" },
];

const HorizontalStepper = ({ orderStatus }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const foundStepIndex = steps.findIndex(
      (step) => step.label.toLowerCase() === orderStatus
    );
    if (foundStepIndex !== -1) {
      setActiveStep(foundStepIndex);
    }
  }, [orderStatus]);

  return (
    <div className="horizontal-stepper">
      {steps.map((step, index) => (
        <div
          className={`step ${index === activeStep ? "active" : ""}`}
          key={index}
        >
          <div className="step-icon">
            <i className={step.icon}></i>
          </div>
          <div className="step-label">{step.label}</div>
          {index === activeStep && (
            <div className="step-description">{step.description}</div>
          )}
          {index !== steps.length - 1 && (
            <div className="connecting-line"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HorizontalStepper;
