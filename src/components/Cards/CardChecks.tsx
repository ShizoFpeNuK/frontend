import { Card } from "antd";
import { CardAuth, CardBodyAuth, CardTitleAuth } from "../../style/typescript/cardAuth";


export const CardChecks = () => {
  return (
    <Card
      className="auth_user_checks_cards_item"
      title="Заказ №1"
      style={{ textAlign: "left", ...CardAuth }}
      headStyle={CardTitleAuth}
      bodyStyle={CardBodyAuth}>
      <p className="auth_user_checks_cards_item_date"> Дата и время </p>
      <p className="auth_user_checks_cards_item_establishment"> Заведение </p>
      <p className="auth_user_checks_cards_item_specialist"> Специалист </p>
      <p className="auth_user_checks_cards_item_services"> Услуги </p>
      <p className="auth_user_checks_cards_item_cost"> Стоимость услуг </p>
    </Card>
  )
};