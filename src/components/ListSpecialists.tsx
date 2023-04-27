import { observer } from "mobx-react";
import { ISpecialist } from "../options/model/specialist.model";
import { useEffect, useState } from "react";
import { Avatar, List, Row, Col, Button, Rate } from "antd";
import servicesStore from "../store/ServicesStoreClass";
import scheduleStore from "../store/ScheduleStoreClass";
import specialistsStore from "../store/SpecialistsStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListSpecialists = observer(() => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loaderPage = async () => {
    await specialistsStore.getSpecialistsList()
      .then(() => {
        setIsLoader(true);
      })
  }

  const getListItems = () => {
    const ListItems = document.querySelectorAll(".enroll_list_specialists_item");
    Array.from(ListItems).every((el: any) => {
      if (el.getAttribute("data-id") == orderDetailsStore.OrderDetailsSpecialist?.employee_id) {
        const addButton = el.querySelector(".enroll_list_specialists_item_meta_button_add");
        onlyOneDeleteButton();
        addButton.disabled = true;
        addButton.nextElementSibling.disabled = false;
        return false;
      } else {
        const deleteButton = el.querySelector(".enroll_list_specialists_item_meta_button_delete");
        deleteButton.disabled = true;
        return true;
      }
    });
  }

  const onlyOneDeleteButton = () => {
    const deleteButtons = document.querySelectorAll(".enroll_list_specialists_item_meta_button_delete");
    Array.from(deleteButtons).forEach((el: any) => el.disabled = true);
    const addButtons = document.querySelectorAll(".enroll_list_specialists_item_meta_button_add");
    Array.from(addButtons).forEach((el: any) => el.disabled = false);
  }

  const clearOrderDetails = () => {
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleBySpecialistList();
    orderDetailsStore.clearStore();
  }


  const onClickAddService = async (e: any, specialist: ISpecialist) => {
    const button = e.target.closest(".enroll_list_specialists_item_meta_button_add");

    if (!button.disabled) {
      onlyOneDeleteButton();
      button.disabled = true;
      button.nextElementSibling.disabled = false;

      clearOrderDetails();
      orderDetailsStore.setOrderDetailsSpecialist(specialist);
      // await servicesStore.getServicesListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist!.employee_id);
    }
  }

  const onClickDeleteService = (e: any) => {
    const button = e.target.closest(".enroll_list_specialists_item_meta_button_delete");

    if (!button.disabled) {
      button.disabled = true;
      button.previousElementSibling.disabled = false;
      clearOrderDetails();
    }

  }


  useEffect(() => {
    if (!specialistsStore.SpecialistsList.length) {
      loaderPage();
    } else {
      getListItems();
    }
  }, [isLoader])


  return (
    <List
      itemLayout="horizontal"
      header="Список специалистов"
      bordered={true}
    >
      {specialistsStore.SpecialistsList.map((specialist: ISpecialist) =>
        <List.Item className="enroll_list_specialists_item" key={specialist.employee_id} data-id={specialist.employee_id}>
          <List.Item.Meta
            className="enroll_list_specialists_item_meta"
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${specialist.employee_id}`} />}
            title={specialist.full_name}
            description={
              <Row className="enroll_list_specialists_item_meta_row">
                <Col className="enroll_list_specialists_item_meta_info">
                  <p className="enroll_list_specialists_item_meta_info_position"> {specialist.position} </p>
                  <Rate className="enroll_list_specialists_item_meta_info_raring" allowHalf disabled value={specialist.rating} />
                </Col>
                <Col className="enroll_list_specialists_item_meta_buttons">
                  <Button
                    className="enroll_list_specialists_item_meta_button_add button--black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, specialist)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_specialists_item_meta_button_delete button--black"
                    shape="circle"
                    onClick={(e) => onClickDeleteService(e)}>
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