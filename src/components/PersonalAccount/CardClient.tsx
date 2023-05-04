import { IClient } from "../../options/model/client.model";
import { ReactNode } from "react";
import CardBase from "./CardBase";


interface ICardClientProps {
  title?: string,
  info: IClient,
  children?: ReactNode,
}


export const CardClient = (props: ICardClientProps) => {
  return (
    <CardBase
      title={props.title}
      info={props.info}
    >
      <div className="cardbase_inner_info">
        <h3 className="cardbase_inner_info_title"> Количество визитов </h3>
        <p className="cardbase_inner_info_amount_visits"> {props.info.amount_visits} </p>
      </div>
      <div className="cardbase_inner_info">
        <h3 className="cardbase_inner_info_title"> Бонусы </h3>
        <p className="cardbase_inner_info_bonus"> {props.info.bonus} </p>
      </div>
      <div className="cardbase_inner_info">
        <h3 className="cardbase_inner_info_title"> Статус </h3>
        <p className="cardbase_inner_info_estate"> {props.info.estate} </p>
      </div>
      {props.children}
    </CardBase>
  )
};


export default CardClient;