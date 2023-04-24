import { ISpecialist } from "../options/model/specialist.model";
import { Avatar, Card, List } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { observer } from "mobx-react";
import { useEffect } from "react";
import specialistsStore from "../store/SpecialistsStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


interface ISpecialistCard {
  specialist: ISpecialist,
}


export const ListSpecialists = observer(() => { //{ specialist }: ISpecialistCard
  const onClick = (e: any) => {
    const specialistItem = e.target.closest(".enroll_list_specialists_item");
    if (specialistItem) {
      const specialistName = specialistItem.querySelector(".ant-list-item-meta-title");
      orderDetailsStore.setOrderDetailsSpecialist(specialistName.innerText);
    }
  }

  // useEffect(() => {
  //   specialistsStore.getSpecialistsList();
  // }, [, specialist])


  return (
    <Card title="Список специалистов" style={CardForm} bodyStyle={CardBodyForm}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="enroll_list_specialists_item" onClick={onClick}>
            <List.Item.Meta
              className="enroll_list_specialists_item_meta"
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={item.title}
              description="fefefefefe"
            />
          </List.Item>
        )}
      />
    </Card>
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