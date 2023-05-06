import '../../style/css/cards/cardCheck.css';
import { useState } from "react";
import { IService } from "../../options/model/service.model";
import { ICheck, ICheckDetails } from "../../options/model/check.model";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import { Button, Card, Col, Modal, Row, Space } from "antd";
import CheckServices from "../../services/check.service";
import checkStore from '../../store/CheckStoreClass';


interface CardCheckProps {
  check: ICheck,
  clientId: number,
  getChecks: (checks: ICheck[]) => void,
}


const CardCheck = (props: CardCheckProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checkDetails, setCheckDetails] = useState<ICheckDetails | null>()


  const showModal = async () => {
    const details: ICheckDetails = await CheckServices.getCheckDetails(props.check.check_id);
    setCheckDetails(details);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onClickDeleteButton = async () => { //??
    await CheckServices.deleteCheck(props.clientId, props.check.check_id);
    // checkStore.checks = await CheckServices.getChecks(clientId);
    const checks = await CheckServices.getChecks(props.clientId);
    props.getChecks(checks);
  }


  return (
    <Card
      className="client_check_card"
      title={"Чек №" + props.check.check_id}
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <div className="client_check_card_info">
        <div className="client_check_card_inner">
          <h3 className="client_check_card_inner_title"> Адресс заведения </h3>
          <p className="client_check_card_inner_establishment"> {props.check.address_establishment} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_inner_title"> Специалист </h3>
          <p className="client_check_card_inner_fullname"> {props.check.full_name} </p>
          <p className="client_check_card_inner_position"> {props.check.post} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_inner_title"> Оплачено </h3>
          {props.check.paid
            ? <p className="client_check_card_inner_paid"> Да </p>
            : <p className="client_check_card_inner_paid"> Нет </p>
          }
        </div>
        <div className="client_check_card_inner">
          <h3 className="client_check_card_inner_title"> Дата и время </h3>
          <p className="client_check_card_inner_date"> {new Date(props.check.date_check).toLocaleDateString()} </p>
          <p className="client_check_card_inner_time"> {props.check.start_time} — {props.check.end_time} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_inner_title"> Стоимость услуг </h3>
          <p className="client_check_card_inner_totalcost"> {props.check.total_cost} руб. </p>
        </div>
      </div>
      <Space
        className="client_check_card_details_buttons"
        direction="vertical"
        style={{ width: "100%" }}
      >
        <Button block onClick={showModal}> Подробнее </Button>
        <Button block onClick={onClickDeleteButton}> Удалить </Button>
      </Space>

      <Modal
        className="client_check_card_details"
        title={"Чек №" + props.check.check_id}
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