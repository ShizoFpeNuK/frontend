import { observer } from "mobx-react";
import { IService } from "../options/model/service.model";
import { useEffect } from "react";
import { List, Button, Row, Col } from "antd";
import { ClockCircleOutlined, DeleteOutlined, DollarCircleOutlined } from "@ant-design/icons";
import servicesStore from "../store/ServicesStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListServices = observer(() => {
  const getListItems = () => {
    const listServices = document.querySelector(".enroll_list_services");
    const ListItems = listServices!.querySelectorAll(".enroll_list_services_item");
    Array.from(ListItems).forEach((el: any) => {
      if (orderDetailsStore.OrderDetailsServices.length) {
        orderDetailsStore.OrderDetailsServices.every((service: IService) => {
          if (el.getAttribute("data-id") == service.service_id) {
            const addButton = el.querySelector(".enroll_list_services_item_meta_button_add");
            addButton.style.display = "none";
            addButton.nextElementSibling.style.display = "inline-block";
            return false;
          }
          return true;
        })
      }
    });
  }


  const onClickClearChoice = () => {
    orderDetailsStore.deleteOrderDetailsServices();
    const listServices = document.querySelector(".enroll_list_services");
    const deleteButtons = listServices!.querySelectorAll(".enroll_list_services_item_meta_button_delete");
    Array.from(deleteButtons).forEach((el: any) => el.style.display = "none");
    const addButtons = listServices!.querySelectorAll(".enroll_list_services_item_meta_button_add");
    Array.from(addButtons).forEach((el: any) => el.style.display = "inline-block");
  }

  const onClickAddService = (e: any, service: IService) => {
    const button = e.target.closest(".enroll_list_services_item_meta_button_add");

    button.style.display = "none";
    button.nextElementSibling.style.display = "inline-block";
    orderDetailsStore.addOrderDetailsService(service);
  }

  const onClickDeleteService = (e: any, service: IService) => {
    const button = e.target.closest(".enroll_list_services_item_meta_button_delete");

    button.style.display = "none";
    button.previousElementSibling.style.display = "inline-block";
    orderDetailsStore.deleteOrderDetailsService(service);
  }


  useEffect(() => {
    getListItems();
  }, [])


  return (
    <List
      itemLayout="horizontal"
      header={
        <Row className="enroll_list_header">
          <Col span={2}></Col>
          <Col span={20}> Список услуг </Col>
          <Col span={2} className="enroll_list_header_buttons">
            <Button
              className="enroll_list_header_button"
              onClick={onClickClearChoice}
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      }
      bordered
      loading={Boolean(!servicesStore.ServicesList.length)}
    >
      {servicesStore.ServicesList.map((service: IService) =>
        <List.Item className="enroll_list_services_item" key={service.service_id} data-id={service.service_id}>
          <List.Item.Meta
            className="enroll_list_services_item_meta"
            title={service.name_service}
            description={
              <Row className="enroll_list_services_item_meta_row">
                <Col className="enroll_list_services_item_meta_info">
                  <p className="enroll_list_services_item_meta_info_duration"> <ClockCircleOutlined /> {service.duration} мин. </p>
                  <p className="enroll_list_services_item_meta_info_cost"> <DollarCircleOutlined /> {service.cost} руб. </p>
                </Col>
                <Col className="enroll_list_services_item_meta_buttons">
                  <Button
                    className="enroll_list_services_item_meta_button_add button_text--center button--black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, service)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_services_item_meta_button_delete button_text--center button--white"
                    shape="circle"
                    onClick={(e) => onClickDeleteService(e, service)}>
                    -
                  </Button>
                </Col>
              </Row>
            }
          />
        </List.Item>
      )}
    </List>
  )
});