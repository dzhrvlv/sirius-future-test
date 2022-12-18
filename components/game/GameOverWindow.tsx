import styled from "@emotion/styled"
import {useRouter} from "next/router";

const Container = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  background: rgba(32, 21, 54, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  z-index: 9999;
`

const PopupBack = styled.div`
  box-sizing: border-box;

  //position: absolute;
  width: 661px;
  //height: 520px;
  /*left: 167px;
  top: 149px;*/

  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #67DF89, #8D67DF00) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border-radius: 40px;
`

const Popup = styled.div`
  box-sizing: border-box;

  //width: 100%;
  height: 480px;
  margin: 20px;
  padding: 23px 74px;

  background: #FFFFFF;
  border-radius: 20px;
  border: 20px solid linear-gradient(to bottom, #67DF89, #8D67DF00);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const HeadText = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 473px;
  height: 130px;
`

const Head = styled.div`
  position: absolute;
  font-style: normal;
  font-weight: 400;
  font-size: 128px;
  line-height: 130px;

  background: linear-gradient(180deg, #FFF9D8 8.65%, #FFE44F 69.58%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const HeadBack = styled.div`
  position: absolute;
  font-style: normal;
  font-weight: 400;
  font-size: 128px;
  line-height: 130px;

  color: #1E813A;

  filter: blur(5px);
`

const Text = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 51px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #5F40A1;
`

const Button = styled.button`
  background: #2BD600;
  padding: 9px 67px;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: none;

  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 51px;

  display: flex;
  align-items: center;

  color: #FFFFFF;
`

const GameOverWindow = () => {
    const router = useRouter()

    const clickHandler = () => {
        router.push("/")
    }

    return (
        <Container>
            <PopupBack>
                <Popup>
                    <HeadText>
                        <HeadBack>Победа!</HeadBack>
                        <Head>Победа!</Head>
                    </HeadText>
                    <Text>Молодец! Ты успешно справился с заданием!</Text>
                    <Button onClick={clickHandler}>Заново</Button>
                </Popup>
            </PopupBack>
        </Container>
    )
}

export default GameOverWindow