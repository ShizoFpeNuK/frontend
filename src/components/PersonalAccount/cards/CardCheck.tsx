import '../../../style/css/cards/cardCheck.css';
import { ICheck } from "../../../options/model/check.model";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import { IServiceWithStartAndEndTime } from "../../../options/model/service.model";
import { Button, Card, Col, Form, InputNumber, Modal, Rate, Row, Space, Table } from "antd";
import CheckServices from "../../../services/check.service";


interface CardCheckProps {
  check: ICheck,
  bonus: number,
  clientId: number,
  setDeleteCheckFlag: (boolean: boolean) => void,
  setPaidCheckFlag: (boolean: boolean) => void,
}

interface IPaid {
  grade: number,
  paid_bonus: number,
}

interface DataType {
  key: number,
  name_service: string,
  duration: string,
  cost: number,
}

const columns: ColumnsType<DataType> = [
  {
    title: "Название услуги",
    dataIndex: "name_service",
    key: "name_service",
  },
  {
    title: "Длительность",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Стоимость",
    dataIndex: "cost",
    key: "cost",
  },
];


const CardCheck = (props: CardCheckProps) => {
  const [form] = useForm();
  let data: DataType[] = [];


  const showModalDetails = async () => {
    await CheckServices.getCheckDetails(props.check.check_id)
      .then((services: IServiceWithStartAndEndTime[]) => {
        data = [];
        services.forEach((service: IServiceWithStartAndEndTime) => {
          data.push({
            key: service.service_id,
            name_service: service.name_service,
            duration: `${service.start_order} —  ${service.end_order}`,
            cost: service.cost
          })
        })
        Modal.info({
          className: "modal_details",
          title: <h3>Чек №{props.check.check_id}</h3>,
          icon: null,
          centered: true,
          width: "700px",
          content: (
            <div className="modal_details_services">
              <Table
                pagination={false}
                columns={columns}
                dataSource={data}
              />
            </div>
          )
        });
      })
  };


  const onFinish = async (values: IPaid) => {
    await CheckServices.updateCheckGrade(values.grade, values.paid_bonus, props.check.check_id);
    props.setPaidCheckFlag(true);
  }

  const showModalPaid = () => {
    Modal.confirm({
      className: "modal_paid",
      title: <h3> Чек №{props.check.check_id} </h3>,
      icon: null,
      centered: true,
      okText: "Оплатить",
      cancelText: "Назад",
      content: (
        <Form
          layout="vertical"
          preserve={false}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Оценка"
            name="grade"
          >
            <Rate
              allowHalf
              allowClear
            />
          </Form.Item>
          <Row
            justify={'space-between'}
            wrap={false}
            align={'middle'}
          >
            <Col>
              <Form.Item
                style={{ fontWeight: 600 }}
                label="Потратить бонусы"
                name="paid_bonus"
              >
                <InputNumber
                  min={0}
                  max={props.bonus}
                  onPressEnter={(e) => e.preventDefault()}
                />
              </Form.Item>
            </Col>
            <Col>
              <p style={{ fontWeight: 400 }}> Имеется бонусов: {props.bonus} </p>
            </Col>
          </Row>
        </Form >
      ),
      async onOk() {
        form.submit();
      }
    });
  };


  const onClickDeleteButton = async () => {
    await CheckServices.deleteCheck(props.check.check_id);
    props.setDeleteCheckFlag(true);
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
          <h3 className="client_check_card_title"> Адресс заведения </h3>
          <p className="client_check_card_establishment"> {props.check.address_establishment} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_title"> Специалист </h3>
          <p className="client_check_card_fullname"> {props.check.full_name} </p>
          <p className="client_check_card_position"> {props.check.post} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_title"> Оплачено </h3>
          {props.check.paid
            ? <p className="client_check_card_paid"> Да </p>
            : <p className="client_check_card_paid"> Нет </p>
          }
        </div>
        <div className="client_check_card_inner">
          <h3 className="client_check_card_title"> Дата и время </h3>
          <p className="client_check_card_date"> {new Date(props.check.date_check).toLocaleDateString()} </p>
          <p className="client_check_card_time"> {props.check.start_time} — {props.check.end_time} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_title"> Стоимость услуг </h3>
          <p className="client_check_card_totalcost"> {props.check.total_cost} руб. </p>
        </div>
      </div>
      <Space
        className="client_check_card_details_buttons"
        direction="vertical"
        style={{ width: "100%" }}
      >
        <Button block onClick={showModalDetails}> Подробнее </Button>
        <Button block onClick={onClickDeleteButton}> Удалить </Button>
        {!props.check.paid &&
          <Button block onClick={showModalPaid}> Оплатить </Button>
        }
      </Space>
    </Card >
  )
};


export default CardCheck;