import styled from "@emotion/styled"
import ParamsForm from "../components/ParamsForm";
import img from "../public/params-bg.png"


const Container = styled.div`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100vw;
  //height: 810px;
  height: 100vh;
  left: 0px;
  top: 0px;
  
  background: url(${img.src});
  background-size: cover;
  
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Home = () => {
    return (
        <Container>
            <ParamsForm/>
        </Container>
    )
}

export default Home