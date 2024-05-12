import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { aroundRow } from "../../../../components/CSS/Global/GlobalDisplay";
import {
  CancelButton,
  GlobalButton,
} from "../../../../components/CSS/Global/GlobalItem";
import Palette from "./Palette";

const CanvasWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 40px;

  .contents {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: orange;
    width: 100%;
    height: 100%;

    canvas {
      border: 1px solid black;
      background-color: white;
      margin-bottom: 20px;
      margin-left: 15%;
      margin-right: 5%;
    }
  }

  .buttonDiv {
    ${aroundRow}
    width: 70%;
    height: 80px;
  }
`;

const Canvas = () => {
  // 캔버스 ref
  const canvasRef = useRef(null);
  // 드로잉 컨텍스트 참조 ref
  const contextRef = useRef(null);

  const [canvasTag, setCanvasTag] = useState([]);
  // 드로잉 컨텍스트
  const [ctx, setCtx] = useState();
  // 드로잉 진행중인지 확인
  const [isDrawing, setIsDrawing] = useState(false);
  // 선 색깔
  const [lineColor, setLineColor] = useState("black");

  const myRef = useRef("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    // 2D 그래픽을 그리기 위한 객체
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.6;
    canvas.height = window.innerHeight * 0.6;

    context.lineCap = "round"; // 끝을 둥글게
    context.strokeStyle = lineColor; // 선 색깔
    context.lineWidth = 5; // 선 굵기

    contextRef.current = context; // 그림을 그리는 기준
    setCtx(contextRef.current);

    setCanvasTag(canvas);
  }, []);

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 그림그리기 시작하는 시점
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const startDrawing = ({ nativeEvent }) => {
    // 마우스 이벤트 발생한 위치
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 그림그리기 끝나는 시점
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 현재 그리기 동작이 진행 중인 확인하는 함수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // canvas.getContext('2d')의 값이 있을 때
    if (ctx) {
      // 그리는 중 이라면
      if (!isDrawing) {
        // 그릴 때 ref를 다시 가져와서 canvas와 관련된 설정을 다시 해준다 - 리렌더링이 안되며 적용이 된다
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.strokeStyle = lineColor; // 선 색깔 설정

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const handleTest = (color) => {
    myRef.current = color;
    console.log(myRef.current);
  };

  return (
    <CanvasWrapper>
      <div className="contents">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        ></canvas>
        <Palette setLineColor={setLineColor} />
      </div>
      <div className="buttonDiv">
        <GlobalButton width="20%" height="70%">
          저장
        </GlobalButton>
        <CancelButton
          width="20%"
          height="70%"
          onClick={() => handleTest("pink")}
        >
          초기화
        </CancelButton>
      </div>
    </CanvasWrapper>
  );
};

export default Canvas;
