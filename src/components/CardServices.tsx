import { Card } from "antd";
import { CardBody, CardTitle } from "../style/typescript/card";


export const CardServices = () => {
  return (
    <Card title="Услуга №1" headStyle={CardTitle} bodyStyle={CardBody}>
      <p> Описание </p>
      <p> Время выполнения </p>
      <p> Цена </p>
    </Card>
  )
}