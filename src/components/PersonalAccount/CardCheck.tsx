import '../../style/css/cards/cardCheck.css';
import { useState } from "react";
import { IService } from "../../options/model/service.model";
import { ICheck, ICheckDetails } from "../../options/model/check.model";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import { Button, Card, Col, Modal, Row } from "antd";
import CheckServices from "../../services/check.service";


interface CardCheckProps {
  check: ICheck,
}


const CardCheck = ({ check }: CardCheckProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checkDetails, setCheckDetails] = useState<ICheckDetails | null>()

  const showModal = async () => {
    const details: ICheckDetails = await CheckServices.getCheckDetails(check.check_id);
    setCheckDetails(details);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <Card
      className="client_check_card"
      title={"Чек №" + check.check_id}
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <div className="client_check_card_info">
        <div className="client_check_card_inner">
          <h3 className="client_check_card_inner_title"> Адресс заведения </h3>
          <p className="client_check_card_inner_establishment"> {check.address_establishment} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_inner_title"> Специалист </h3>
          <p className="client_check_card_inner_fullname"> {check.full_name} </p>
          <p className="client_check_card_inner_position"> {check.post} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_inner_title"> Оплачено </h3>
          {check.paid
            ? <p className="client_check_card_inner_paid"> Да </p>
            : <p className="client_check_card_inner_paid"> Нет </p>
          }
        </div>
        <div className="client_check_card_inner">
          <h3 className="client_check_card_inner_title"> Дата и время </h3>
          <p className="client_check_card_inner_date"> {new Date(check.date_check).toLocaleDateString()} </p>
          <p className="client_check_card_inner_time"> {check.start_time} — {check.end_time} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_inner_title"> Стоимость услуг </h3>
          <p className="client_check_card_inner_totalcost"> {check.total_cost} руб. </p>
        </div>
      </div>
      <div className="client_check_card_details_button" style={{ textAlign: "center" }}>
        <Button onClick={showModal}> Подробнее </Button>
      </div>

      <Modal
        className="client_check_card_details"
        title={"Чек №" + check.check_id}
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {checkDetails?.services.map((service: IService) =>
          <Row
            justify={'space-between'}
            wrap={false}
            className="client_check_card_details_inner"
            key={service.service_id}
          >
            <Col className="client_check_card_details_service_info">
              <p className="client_check_card_details_service_info_name"> {service.name_service} </p>
            </Col>
            <Col className="client_check_card_details_service_info">
              <p className="client_check_card_details_service_info_cost"> {service.cost} руб. </p>
            </Col>
          </Row>
        )}
      </Modal>
    </Card >
  )
};


export default CardCheck;