import { Button } from "antd";


interface ButtonsStepProps {
  onClick: () => void,
  children: string,
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