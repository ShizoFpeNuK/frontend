import { ISpecialist } from "../options/model/specialist.model";
import { Avatar, List, Row, Col, Button, Rate } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import specialistsStore from "../store/SpecialistsStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListSpecialists = observer(() => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loaderPage = async () => {
    await specialistsStore.getSpecialistsList()
      .then(() => {
        const deleteButtons = document.querySelectorAll(".enroll_list_specialists_item_meta_button_delete");
        Array.from(deleteButtons).forEach((el: any) => el.disabled = true);
      })

    getListItems();
    setIsLoader(true);
  }


  const getListItems = () => {
    const ListItems = document.querySelectorAll(".enroll_list_specialists_item");
    Array.from(ListItems).forEach((el: any) => {
      if (el.getAttribute("data-id") == orderDetailsStore.OrderDetailsSpecialist?.employee_id) {
        const addButton = el.querySelector(".enroll_list_specialists_item_meta_button_add");
        onlyOneDeleteButton();
        addButton.disabled = true;
        addButton.nextElementSibling.disabled = false;
      }
    });
  }


  const onlyOneDeleteButton = () => {
    const deleteButtons = document.querySelectorAll(".enroll_list_specialists_item_meta_button_delete");
    Array.from(deleteButtons).forEach((el: any) => el.disabled = true);
    const addButtons = document.querySelectorAll(".enroll_list_specialists_item_meta_button_add");
    Array.from(addButtons).forEach((el: any) => el.disabled = false);
  }


  const onClickAddService = (e: any, specialist: ISpecialist) => {
    const button = e.target.closest(".enroll_list_specialists_item_meta_button_add");

    if (!button.disabled) {
      orderDetailsStore.setOrderDetailsSpecialist(specialist);
      onlyOneDeleteButton();
      button.disabled = true;
      button.nextElementSibling.disabled = false;
    }
  }

  const onClickDeleteService = (e: any, specialist: ISpecialist) => {
    const button = e.target.closest(".enroll_list_specialists_item_meta_button_delete");

    if (!button.disabled) {
      orderDetailsStore.deleteOrderDetailsSpecialist();
      button.disabled = true;
      button.previousElementSibling.disabled = false;
    }
  }


  useEffect(() => {
    loaderPage();
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
                    className="enroll_list_specialists_item_meta_button_add black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, specialist)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_specialists_item_meta_button_delete black"
                    shape="circle"
                    onClick={(e) => onClickDeleteService(e, specialist)}>
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

  // return (
  //   <Card title="Список специалистов" style={CardForm} bodyStyle={CardBodyForm}>
  //     <List
  //       itemLayout="horizontal"
  //       // dataSource={data}
  //       dataSource={specialistsStore.SpecialistsList}
  //       renderItem={(specialist, index) => (
  //         <List.Item className="enroll_list_specialists_item" key={specialist.id} onClick={onClick}>
  //           <List.Item.Meta
  //             avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
  //             title={specialist.full_name}
  //             description={
  //               <div className="enroll_list_specialists_item_description">
  //                 <p> Опыт работы: {specialist.experience} </p>
  //                 <p> Рейтинг: {specialist.rating} </p>
  //               </div>
  //             }
  //           />
  //         </List.Item>
  //       )}
  //     />
  //   </Card>
  // )
});