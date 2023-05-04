import { Button } from "antd";
import { ReactNode } from "react";


interface ButtonsStepProps {
  onClick: () => void,
  children: ReactNode,
}


const ButtonStep = (props: ButtonsStepProps) => {
  return (
    <Button
      className="button_next_step"
      type="primary"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  )
}


export default ButtonStep;