import styled from "styled-components";
import car from "../../../components/CSS/image/car.jpg";
import {
  FontSize,
  GrayColor,
  MainColor,
} from "../../../components/CSS/Color/ColorNote";
import { ProjectObj } from "./IntroObj";
import { useSearchParams } from "react-router-dom";

const ProjectIntroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80vh;
  width: 90%;
  box-shadow: 10px 10px 20px 0px ${GrayColor.Gray300};
  padding: 40px;

  .introImgDiv {
    height: 100%;
    width: 48%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .introInfo {
    height: 100%;
    width: 48%;
    padding: 40px;

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: black;
      font-size: 38px;
      font-weight: bold;
      height: 10%;
      width: 100%;
    }

    .sub {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: ${FontSize.xxlarge};
      width: 100%;
      color: ${GrayColor.Gray100};
      margin-bottom: 10px;
    }

    img {
      height: 5%;
      width: 100%;
    }

    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: ${FontSize.xlarge};
      height: 5%;
      width: 100%;
      margin-bottom: 20px;

      button {
        background-color: white;
        font-weight: bold;
        font-size: ${FontSize.large};
        height: 100%;
        margin-right: 20px;
      }
      .outBtn {
        color: ${MainColor.Main300};
        border-bottom: 2px solid ${MainColor.Main300};
      }
      .gitBtn {
        color: black;
        border-bottom: 2px solid black;
      }
      .vlgBtn {
        color: #3fbe3f;
        border-bottom: 2px solid #3fbe3f;
      }
    }

    .contents {
      height: 70%;
      width: 100%;
      font-size: ${FontSize.xxlarge};
      color: ${GrayColor.Gray100};
    }
  }
`;

interface LinkFunction {
  (url: string): void;
}

/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- 함수 기능 : url의 새로운 탭을 여는 함수
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
const handleLink: LinkFunction = (url) => {
  window.open(url);
};

const ProjectIntro = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const name = searchParams.get("name") GPT물어보기
  const name = "KBCompany";
  console.log(name);
  return (
    <ProjectIntroWrapper>
      <div className="introImgDiv">
        <img src={ProjectObj[name].mainImage} alt="프로젝트 메인" />
      </div>
      <div className="introInfo">
        <div className="title">{ProjectObj[name].title}</div>
        <div className="sub">{ProjectObj[name].sub}</div>
        <img src={car} alt="심플아이콘" />
        <div className="link">
          <button
            className="outBtn"
            onClick={() => handleLink(ProjectObj[name].outURL)}
          >
            배포
          </button>
          <button
            className="gitBtn"
            onClick={() => handleLink(ProjectObj[name].gitURL)}
          >
            Github
          </button>
          <button
            className="vlgBtn"
            onClick={() => handleLink(ProjectObj[name].vlgURL)}
          >
            Velog
          </button>
        </div>
        <textarea readOnly className="contents">
          {ProjectObj[name].contents}
        </textarea>
      </div>
    </ProjectIntroWrapper>
  );
};

export default ProjectIntro;
