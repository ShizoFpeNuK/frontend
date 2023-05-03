import { Card } from "antd";
import { IUser } from "../../options/model/user.model";
import { IClient } from "../../options/model/client.model";
import { ReactNode } from "react";
import { CardAuth, CardBodyAuth, CardTitleAuth } from "../../style/typescript/cardAuth";


interface ICardBaseProps {
  title?: string,
  info: IUser | IClient,
  children?: ReactNode,
}


export const CardBase = (props: ICardBaseProps) => {
  return (
    <Card title={props.title} style={CardAuth} headStyle={CardTitleAuth} bodyStyle={CardBodyAuth}>
      <div className="cardbase_inner_info">
        <h3 className="cardbase_inner_info_title"> ФИО </h3>
        <p className="cardbase_inner_info_fullname"> {props.info.full_name} </p>
      </div>
      <div className="cardbase_inner_info">
        <h3 className="cardbase_inner_info_title"> Номер телефона </h3>
        <p className="cardbase_inner_info_telephone"> {props.info.telephone} </p>
      </div>
      <div className="cardbase_inner_info">
        <h3 className="cardbase_inner_info_title"> Почта </h3>
        <p className="cardbase_inner_info_email"> {props.info.email} </p>
      </div>
      {props.children}
    </Card>
  )
}