import styled from "@emotion/styled"

import cellImg from "../../public/cell.png"
import cellsBgImg from "../../public/cookies/cells-bg.png"
import arrowUp from "../../public/arrowUp.png"
import arrowDown from "../../public/arrowDown.png"
import cookie1 from "../../public/cookies/cookie1.png"
import cookie2 from "../../public/cookies/cookie2.png"
import cookie3 from "../../public/cookies/cookie3.png"
import cookie4 from "../../public/cookies/cookie4.png"
import {useEffect, useState} from "react";

const Field = styled.div`
  /*width: 100%;
  height: 100%;*/
  width: 980px;
  height: 810px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  z-index: 0;
  padding: 30px 45px;
`

const Figures = styled.div`
  height: 350px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 17px;

  margin-bottom: 20px;
`

const Figure = styled.div`
  height: 157px;
  min-width: 158px;
  width: auto;

  background: url(${props => props.background});

  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;

  font-family: 'Calibri';
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  line-height: 68px;
  letter-spacing: 2px;
  color: #FFFFFF;
  -webkit-text-stroke: 3px #242546;

  :nth-child(2n) {
    align-self: flex-start;
  }
`

const SortType = styled.div`
  width: 357.5px;
  height: 69px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.orderType === "true" ? "flex-end" : "flex-start"};
  align-self: ${props => props.orderType === "true" ? "flex-end" : "flex-start"};

  background: url(${props => props.orderType === "true" ? arrowDown.src : arrowUp.src});
  background-size: contain;

  font-family: 'Calibri';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;

  color: #FFFFFF;
`

const CellsContainer = styled.div`
  box-sizing: border-box;

  width: 886px;
  height: 222px;

  background: url(${cellsBgImg.src}), radial-gradient(238.96% 238.96% at 50% 54.28%, #FAF9F9 0%, #C09F9B 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const Cell = styled.div`
  width: 131px;
  height: 131px;

  background: url(${props => (props.background)});
  background-size: contain;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Calibri';
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  line-height: 68px;
  letter-spacing: 2px;
  color: #FFFFFF;
  -webkit-text-stroke: 3px #242546;
`

type Obj = {
    id: number,
    value: string;
    background: any;
    completed: boolean
}

type SimulatorFieldPropsType = {
    values: string[],
    orderType: string,
    setIsOver: () => void
}

const SimulatorField = (props: SimulatorFieldPropsType) => {

    const [values, setValues] = useState<Obj[]>([])
    const [cells, setCells] = useState<Obj[]>([])

    const [currentObj, setCurrentObj] = useState<Obj>()

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, obj: Obj) {
        console.log('drag', obj)
        setCurrentObj(obj)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {}

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, cell: Obj) {
        e.preventDefault()

        if (currentObj && cell.value === currentObj.value) {
            const newValues = [...values]
            const newCells = [...cells]

            const newObj = {...currentObj}
            newObj.completed = true

            newCells.splice(newCells.indexOf(cell), 1, newObj)
            newValues.splice(newValues.indexOf(currentObj), 1, newObj)

            setValues(newValues)
            setCells(newCells)

            if (props.orderType === "false" && newCells[newCells.length - 1].completed ||
                props.orderType === "true" && newCells[0].completed) {
                props.setIsOver()
            }
        }

    }

    const setBackground = () => {
        const num = Math.round(Math.random() * 4)

        console.log(num)

        let background

        switch (num) {
            case 0:
                background = cookie1.src;
                break;
            case 1:
                background = cookie2.src;
                break;
            case 2:
                background = cookie3.src;
                break;
            case 3:
                background = cookie4.src;
                break;
            case 4:
                background = cookie4.src;
                break;
        }
        return background
    }

    const fillValues = (vals: string[]) => {
        const newValues = []

        for (let i = 0; i < vals.length; i++) {
            newValues.push(
                {
                    id: i,
                    value: vals[i],
                    background: setBackground(),
                    completed: false
                }
            )
        }

        const newCells = [...newValues]

        newCells.sort((a, b) => {
            if (a.value > b.value) {
                return 1
            }
            if (a.value < b.value) {
                return -1
            }
            return 0
        })

        if (props.orderType === "false") {
            newCells[0].completed = true

            newValues.splice(newValues.indexOf(newCells[0]), 1)
        } else {
            newCells[newCells.length - 1].completed = true

            newValues.splice(newValues.indexOf(newCells[newCells.length - 1]), 1)
        }

        console.log(newCells)


        setCells(newCells)
        setValues(newValues)
    }

    useEffect(() => {
        if (props.values) fillValues(props.values)
    }, [props.values])

    return (
        <Field>
            <Figures>
                {values.map(value =>
                    <Figure
                        onDragStart={(e) => dragStartHandler(e, value)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, value)}
                        draggable={true}
                        background={value.completed ? "none" : value.background}
                    >
                        {value.completed ? "" : value.value}
                    </Figure>
                )}
            </Figures>
            <SortType orderType={props.orderType}>
                {props.orderType === "true" ?
                    "По убыванию" : "По возрастанию"
                }
            </SortType>
            <CellsContainer>
                {
                    cells.map(cell =>
                        <Cell
                            background={cell.completed ? cell.background : cellImg.src}
                            //onDragStart={(e) => dragStartHandler(e, cell)}
                            onDragLeave={(e) => dragEndHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropHandler(e, cell)}
                            draggable={true}
                        >
                            {cell.completed ? cell.value : ""}
                        </Cell>
                    )
                }
            </CellsContainer>
        </Field>
    )
}

export default SimulatorField