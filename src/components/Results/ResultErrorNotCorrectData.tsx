import { Result } from "antd";


interface ResultNotCorrectDataProps {
  title: string,
}


const ResultErrorNotCorrectData = ({title}: ResultNotCorrectDataProps) => {
  return (
    <Result
      status="error"
      title={title}
      subTitle="Пожалуйста, проверьте, чтобы вы ввели корректные данные. 
      Также возможно, что это ошибка сервера."
    />
  )
}


export default ResultErrorNotCorrectData;