import styled from "@emotion/styled";
import {useCallback, useState} from "react";

const Switch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 36px;

  padding-bottom: 40px;
`

const Button = styled.input`
  height: 44.44px;
  padding: 0 20px;

  background: ${props => (props.primary ? "#FFD748" : "rgba(255, 215, 72, 0.56)")};
  color: ${props => (props.primary ? "#423F45" : "rgba(66, 63, 69, 0.56)")};

  border: none;

  border-radius: 20px;

  font-family: 'Calibri';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
`

type SwitchBtnPropsType = {
    onChange: () => void
}

const SwitchOrderBtn = (props: SwitchBtnPropsType) => {
    const {onChange} = props
    const [isAscending, setIsAscending] = useState<boolean>(true)

    const switchHandler = useCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        console.log(e.currentTarget.value)
        if (e.currentTarget.value === "По возрастанию" && !isAscending ||
            e.currentTarget.value === "По убыванию" && isAscending) {

            setIsAscending(!isAscending)
            onChange()

        }
    }, [isAscending])

    return (
        <Switch>
            <Button
                type="button"
                onClick={switchHandler}
                value="По возрастанию"
                primary={isAscending}
            />
            <Button
                type="button"
                onClick={switchHandler}
                value="По убыванию"
                primary={!isAscending}
            />
        </Switch>
    )
}

export default SwitchOrderBtn