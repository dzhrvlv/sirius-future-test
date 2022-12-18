import styled from "@emotion/styled"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin-top: -30px;
`

const ValuesList = styled.datalist`
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5em;

  padding: 0;
  margin: 0;

  & > option {
    font-family: 'Calibri';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;

    color: #4F4B61;
  }
`

const CustomSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 21px;
  background: grey;
  border-radius: 10px;
  background-image: linear-gradient(#FFD748, #FFD748);
  background-repeat: no-repeat;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 23px;
    width: 23px;
    border-radius: 12px;
    background: #104987;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #04AA6D;
    cursor: pointer;
  }
`

type SliderPropsType = {
    values: string[],
    value: number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Slider = (props: SliderPropsType) => {
    const {values, value, onChange} = props

    return (
        <Container>
            <ValuesList id="tickMarks">
                {values.map((value: string, index: number) =>
                    <option value={index} label={value} key={index}/>
                )}
            </ValuesList>
            <CustomSlider
                type="range"
                list="tickMarks"
                min={0}
                max={values.length - 1}
                value={value}
                onChange={onChange}
            />
        </Container>
    )
}

export default Slider