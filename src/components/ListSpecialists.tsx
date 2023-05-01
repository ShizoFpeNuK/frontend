import { observer } from "mobx-react";
import { ISpecialist } from "../options/model/specialist.model";
import { DeleteOutlined } from "@ant-design/icons";
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
    const listSpecialist = document.querySelector(".enroll_list_specialists");
    const ListItems = listSpecialist!.querySelectorAll(".enroll_list_specialists_item");
    Array.from(ListItems).every((el: any) => {
      if (el.getAttribute("data-id") == orderDetailsStore.OrderDetailsSpecialist?.employee_id) {
        const addButton = el.querySelector(".enroll_list_specialists_item_meta_button_add");
        clearChoice()
        addButton.style.display = "none";
        addButton.nextElementSibling.style.display = "inline-block";
        return false;
      }
      return true;
    });
  }


  const clearChoice = () => {
    const listSpecialist = document.querySelector(".enroll_list_specialists");
    const deleteButtons = listSpecialist!.querySelectorAll(".enroll_list_specialists_item_meta_button_delete");
    Array.from(deleteButtons).forEach((el: any) => el.style.display = "none");
    const addButtons = listSpecialist!.querySelectorAll(".enroll_list_specialists_item_meta_button_add");
    Array.from(addButtons).forEach((el: any) => el.style.display = "inline-block");
  }

  const clearOrderDetails = () => {
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleBySpecialistList();
    orderDetailsStore.clearStore();
  }


  const onClickAddService = async (e: any, specialist: ISpecialist) => {
    const button = e.target.closest(".enroll_list_specialists_item_meta_button_add");

    clearChoice();
    button.style.display = "none";
    button.nextElementSibling.style.display = "inline-block";
    clearOrderDetails();
    orderDetailsStore.setOrderDetailsSpecialist(specialist);
  }

  const onClickDeleteService = (e: any) => {
    const button = e.target.closest(".enroll_list_specialists_item_meta_button_delete");

    button.style.display = "none";
    button.previousElementSibling.style.display = "inline-block";
    clearOrderDetails();
  }

  const onClickClearChoice = () => {
    orderDetailsStore.deleteOrderDetailsSpecialist();
    clearChoice();
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
      header={
        <Row className="enroll_list_header">
          <Col span={2}></Col>
          <Col span={20}> Список специалистов </Col>
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
      loading={Boolean(!specialistsStore.SpecialistsList.length)}
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
                    className="enroll_list_specialists_item_meta_button_add button_text--center button--black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, specialist)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_specialists_item_meta_button_delete button_text--center button--white"
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