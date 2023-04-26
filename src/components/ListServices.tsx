import { observer } from "mobx-react";
import { IService } from "../options/model/service.model";
import { useEffect, useState } from "react";
import { List, Button, Row, Col } from "antd";
import servicesStore from "../store/ServicesStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListServices = observer(() => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loaderPage = async () => {
    if (!orderDetailsStore.OrderDetailsSpecialist) {
      await servicesStore.getServicesList()
        .then(() => {
          setIsLoader(true);
        });
    }

  }

  const getListItems = () => {
    const ListItems = document.querySelectorAll(".enroll_list_services_item");
    Array.from(ListItems).forEach((el: any) => {
      if (orderDetailsStore.OrderDetailsServices.length) {
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
      } else { //Постоянный ререндер, если не выбрана хотя бы одна услуга
        const deleteButton = el.querySelector(".enroll_list_services_item_meta_button_delete");
        deleteButton.disabled = true;
      }
    });
  }


  const onClickAddService = (e: any, service: IService) => {
    const button = e.target.closest(".enroll_list_services_item_meta_button_add");
    button.disabled = true;
    button.nextElementSibling.disabled = false;
    
    orderDetailsStore.addOrderDetailsService(service);
  }

  const onClickDeleteService = (e: any, service: IService) => {
    const button = e.target.closest(".enroll_list_services_item_meta_button_delete");
    button.disabled = true;
    button.previousElementSibling.disabled = false;

    orderDetailsStore.deleteOrderDetailsService(service);
  }


  useEffect(() => {
    if (!servicesStore.ServicesList.length) {
      loaderPage();
    } else {
      getListItems();
    }
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
                    className="enroll_list_services_item_meta_button_add button--black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, service)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_services_item_meta_button_delete button--black"
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