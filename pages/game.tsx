import styled from "@emotion/styled"
import bgCookie1 from "../public/cookies/background/bgCookie1.svg";
import bgCookie2 from "../public/cookies/background/bgCookie2.svg";
import SimulatorField from "../components/game/SimulatorField";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import GameOverWindow from "../components/game/GameOverWindow";

const Container = styled.div`
  box-sizing: border-box;
  padding: 30px 45px;
  margin: 0;
  width: 100vw;
  height: 100vh;
  position: relative;
  /*width: 980px;
  height: 810px;*/

  background-color: #DEC6AA ;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BgCookie1 = styled.div`
  position: absolute;
  width: 422px;
  height: 536px;
  top: 0;
  left: 0;

  background: url(${bgCookie1.src});
`
const BgCookie2 = styled.div`
  position: absolute;
  width: 219px;
  height: 321px;
  top: 0;
  right: 0;

  background: url(${bgCookie2.src});
`


const Game = () => {

    const router = useRouter()

    const [values, setValues] = useState<string[]>([])

    const [isOver, setIsOver] = useState(false)


    function generateRandomLetter() {
        const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }


    function generateValues(quantity: string, valuesType: string) {
        let min = 0
        let max = 32
        let type = 1

        switch (valuesType) {
            case "0": {
                type = 0
                break;
            }
            case "1": {
                min = 1
                max = 9
                break;
            }
            case "2": {
                min = 10
                max = 19
                break;
            }
            case "3": {
                min = 20
                max = 50
                break;
            }
            case "4": {
                min = 51
                max = 99
                break;
            }
            case "5": {
                min = 100
                max = 999
                break;
            }
        }

        const objValues = new Set()

        while (objValues.size <= Number(quantity)) {
            const cand =
                type == 0
                    ? generateRandomLetter()
                    : (Math.round(Math.random() * (max - min)) + min).toString()
            objValues.add(cand)
        }
        return [...objValues]
    }

    const overHandler = () => {
        setIsOver(true)
    }

    useEffect(() => {
        if (router.query.values && router.query.quantity)
            setValues(generateValues(router.query.quantity as string, router.query.values as string))
    }, [router.query])

    // useEffect(() => {
    //     console.log(values)
    //
    // }, [values])
    //
    // useEffect(() => {
    //     console.log(isOver)
    // }, [isOver])

    return (
        <Container>
            <BgCookie1/>
            <BgCookie2/>
            {values.length &&
                <SimulatorField
                    values={values}
                    orderType={router.query.orderType}
                    setIsOver={overHandler}
                />
            }
            {isOver && <GameOverWindow/>}
        </Container>
    )
}

export default Game