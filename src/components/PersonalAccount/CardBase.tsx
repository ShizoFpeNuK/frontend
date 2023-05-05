import '../../style/css/cards/cardBase.css';
import { Card } from "antd";
import { IUser } from "../../options/model/user.model";
import { IClient } from "../../options/model/client.model";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";


interface ICardBaseProps {
  title?: string,
  info: IUser | IClient,
  children?: ReactNode,
}


const CardBase = (props: ICardBaseProps) => {
  return (
    <Card
      className="cardbase"
      title={props.title}
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <div className="cardbase_info">
        <div className="cardbase_info_inner" >
          <h3 className="cardbase_info_inner_title"> ФИО </h3>
          <p className="cardbase_info_inner_fullname"> {props.info.full_name} </p>
        </div>
        <div className="cardbase_info_inner">
          <h3 className="cardbase_info_inner_title"> Номер телефона </h3>
          <p className="cardbase_info_inner_telephone"> {props.info.telephone} </p>
        </div>
        <div className="cardbase_info_inner">
          <h3 className="cardbase_info_inner_title"> Почта </h3>
          {props.info.email
            ? <p className="cardbase_info_inner_email"> {props.info.email} </p>
            : <p className="cardbase_info_inner_email"> Отсутствует </p>
          }
        </div>
        {props.children}
      </div>
    </Card>
  )
}


export default CardBase;