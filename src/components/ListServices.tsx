import { observer } from "mobx-react";
import { IService } from "../options/model/service.model";
import { useEffect, useState, useRef } from "react";
import { List, Button, Row, Col, Space } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import servicesStore from "../store/ServicesStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListServices = observer(() => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loaderPage = async () => {
    await servicesStore.getServicesList()
      .then(() => {
        const deleteButtons = document.querySelectorAll(".enroll_list_services_item_meta_button_delete");
        Array.from(deleteButtons).forEach((el: any) => el.disabled = true);
      })

    getListItems();
    setIsLoader(true);
  }

  const getListItems = () => {
    const ListItems = document.querySelectorAll(".enroll_list_services_item");
    Array.from(ListItems).forEach((el: any) => {
      orderDetailsStore.OrderDetailsServices.every((service: IService) => {
        if (el.getAttribute("data-id") == service.service_id) {
          const addButton = el.querySelector(".enroll_list_services_item_meta_button_add");
          addButton.disabled = true;
          addButton.nextElementSibling.disabled = false;
          return false;
        } else {
          const addButton = el.querySelector(".enroll_list_services_item_meta_button_add");
          addButton.disabled = false;
          addButton.nextElementSibling.disabled = true;
          return true;
        }
      })
    });
  }


  const onClickAddService = (e: any, service: IService) => {
    const button = e.target.closest(".enroll_list_services_item_meta_button_add");

    if (!button.disabled) {
      orderDetailsStore.setOrderDetailsService(service);
      button.disabled = true;
      button.nextElementSibling.disabled = false;
    }
  }

  const onClickDeleteService = (e: any, service: IService) => {
    const button = e.target.closest(".enroll_list_services_item_meta_button_delete");

    if (!button.disabled) {
      orderDetailsStore.deleteOrderDetailsService(service);
      console.log("service ", service)
      button.disabled = true; 
      button.previousElementSibling.disabled = false;
    }
  }


  useEffect(() => {
    loaderPage();
  }, [isLoader])


  return (
    <List
      header="Список услуг"
      itemLayout="horizontal"
      bordered={true}
    >
      {servicesStore.ServicesList.map((service: IService) =>
        <List.Item className="enroll_list_services_item" key={service.service_id} data-id={service.service_id}>
          <List.Item.Meta
            className="enroll_list_services_item_meta"
            title={service.name_service}
            description={
              <Row className="enroll_list_services_item_meta_row">
                <Col className="enroll_list_services_item_meta_info">
                  <p className="enroll_list_services_item_meta_info_cost"> {service.cost} </p>
                  <p className="enroll_list_services_item_meta_info_duration"> {service.duration} </p>
                </Col>
                <Col className="enroll_list_services_item_meta_buttons">
                  <Button
                    className="enroll_list_services_item_meta_button_add black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, service)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_services_item_meta_button_delete black"
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