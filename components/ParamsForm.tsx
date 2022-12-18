import Slider from "./Slider";
import styled from "@emotion/styled";
import {useState} from "react";
import SwitchOrderBtn from "./SwitchOrderBtn";
import {useRouter} from "next/router";

const FormContainer = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 699px;
  height: 660px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(to right top, #101F32, #7F75F0);
  border-radius: 40px;
`

const Form = styled.form`
  box-sizing: border-box;

  width: 100%;
  height: 620px;
  margin: 20px;

  background: #FFFFFF;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  & > label {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 44px;

  }
`

const SubmitButton = styled.input`
  width: 260px;
  height: 60px;

  background: #38DF7A;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: none;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;

  color: #FFFFFF;
`

const ParamsForm = () => {
    const router = useRouter()

    const [objQuantity, setObjQuantity] = useState<number>(0)
    const [objValues, setObjValues] = useState<number>(0)
    const [orderType, setOrderType] = useState<boolean>(false)

    const onQuanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setObjQuantity(Number(value))
    }

    const onValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setObjValues(Number(value))
    }

    const onOrderTypeChange = () => {
        setOrderType(!orderType)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const url = `/game?quantity=${Number(objQuantity) + 2}&values=${objValues}&orderType=${orderType}`
        router.push(url)
    }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <label>Коло-во предметов</label>
                <Slider values={["2", "3", "4", "5"]} value={objQuantity} onChange={onQuanChange}/>
                <label>Значения</label>
                <Slider values={["А", "9", "19", "50", "99", "999"]} value={objValues} onChange={onValChange}/>
                <SwitchOrderBtn onChange={onOrderTypeChange}/>
                <SubmitButton type="submit" value="Играть"/>
            </Form>
        </FormContainer>
    )
}

export default ParamsForm