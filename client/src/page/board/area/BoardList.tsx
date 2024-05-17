/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- 게시판 리스트 컴포넌트
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  FontSize,
  GrayColor,
  MainColor,
  WhiteColor,
} from "../../../components/CSS/Color/ColorNote";
import {
  centerColumn,
  centerRow,
} from "../../../components/CSS/Global/GlobalDisplay";
import { GlobalButton } from "../../../components/CSS/Global/GlobalItem";
import WriteModal from "../../../components/Molecule/Modal/WriteModal";
import PagiNation from "../../../components/Molecule/PagiNation/PagiNation";
import SearchBar from "../../../components/Molecule/SearchBar/SearchBar";

const BoardListBlock = styled.div<{ toggle: boolean }>`
  height: 100%;
  width: ${(props) => (props.toggle ? "50%" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: width 0.8s ease;
  position: relative;
  z-index: 1;
  background-color: rgba(198, 226, 255, 0.3);

  .boardTitleLine {
    ${centerRow}
    width: 80%;
    height: 60px;
    background-color: ${MainColor.Main100};
    color: ${WhiteColor.White100};
    font-size: ${FontSize.large};
    font-weight: bold;

    .common {
      ${centerColumn}
      width: 15%;
    }

    .title {
      ${centerColumn}
      width: 55%;
    }
  }

  .boardWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${WhiteColor.White100};
    width: 80%;
    height: 550px;

    .boardContents {
      ${centerRow}
      width: 100%;
      height: 33px;
      border-bottom: 2px solid ${GrayColor.Gray000};
      cursor: pointer;
      font-size: ${FontSize.medium};
      color: ${GrayColor.Gray100};

      &:hover {
        background-color: ${GrayColor.Gray000};
      }

      .common {
        ${centerColumn}
        width: 15%;
      }

      .title {
        display: block;
        flex-direction: column;
        justify-content: center;
        padding-left: 30px;
        width: 55%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .author {
        ${centerColumn}
        width: 15%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .writeDiv {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    width: 80%;
  }

  .pagiNationDiv {
    width: 30%;
    height: 60px;
    background-color: orange;
  }
`;

const DatePcikerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 80%;
  height: 40px;
  margin-bottom: 2px;
  font-weight: bold;

  .datePickerDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    height: 100%;
    color: ${WhiteColor.White100};
    font-size: ${FontSize.medium};
  }

  .pickerArea {
    ${centerColumn}
    height: 100%;
    width: 30%;
  }

  .searchArea {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    width: 30%;

    .searchButton {
      text-align: center;
      width: 80%;
      height: 30px;
      background-color: ${WhiteColor.White100};
      border: 2px solid ${MainColor.Main200};
      color: ${GrayColor.Gray100};
      border-radius: 5px;
      font-weight: bold;

      &:hover {
        background-color: ${MainColor.Main200};
      }
    }
  }
`;

const EmptyWrapper = styled.div`
  ${centerColumn}
  width: 80%;
  height: 500px;
  color: ${MainColor.Main200};
  font-size: 30px;
  border-bottom: 3px solid ${MainColor.Main100};
`;

interface ListProps {
  toggle: boolean;
  handleToggle: () => void;
  handleModal: () => void;
}

interface PageDataProps {
  title: string;
  startDT: string;
  endDT: string;
  pageNum: number;
}

const myList = {
  listInfo: [
    {
      id: 1,
      title: "hi",
      author: "경배",
      day: "흠 뭐로 하지",
    },
    {
      id: 2,
      title: "hello",
      author: "경배",
      day: "흠 뭐로 하지",
    },
    {
      id: 3,
      title: "world",
      author: "경배",
      day: "흠 뭐로 하지",
    },
  ],
  pageInfo: {
    page: 1,
    totalPage: 10,
  },
};

const BoardList: React.FC<ListProps> = ({
  toggle,
  handleToggle,
  handleModal,
}) => {
  // 페이지에 보여줄 게시글 state
  const [boardList, setBoardList] = useState<object[]>([{}, {}]);
  // 총 페이지 수 state
  const [totalPage, setTotalPage] = useState<number>(10);
  // url의 페이지를 가져오는 state
  const [searchParams, setSearchParams] = useSearchParams();
  // searchBar의 입력한 값 state
  const [searchValue, setSearchValue] = useState<string>("");
  // 시작 날짜 state
  const [startDate, setStartDate] = useState("");
  // 끝 날짜 state
  const [endDate, setEndDate] = useState("");

  // 현재 page 쪽 정보
  const searchPage = searchParams.get("page");
  const page = Number(searchPage);
  const navigate = useNavigate();
  console.log(page);

  // 현재 페이지의 정보
  const pageData: PageDataProps = {
    title: searchValue,
    startDT: startDate,
    endDT: endDate,
    pageNum: page,
  };

  return (
    <BoardListBlock toggle={toggle}>
      <DatePcikerWrapper>
        <div className="datePickerDiv">
          <div className="pickerArea">
            {/* <MyPicker setMyDate={setStartDate} type={"S"} /> */}
          </div>
          ~
          <div className="pickerArea">
            {/* <MyPicker setMyDate={setEndDate} type={"E"} /> */}
          </div>
          <div className="searchArea">
            <button className="searchButton">검색</button>
          </div>
        </div>
      </DatePcikerWrapper>
      <div className="boardTitleLine">
        <div className="common">글번호</div>
        <div className="title">제목</div>
        <div className="common">작성자</div>
        <div className="common">날짜</div>
      </div>
      {totalPage === 0 ? (
        <EmptyWrapper>검색된 결과는 존재하지 않습니다.</EmptyWrapper>
      ) : (
        <div className="boardWrapper">
          {myList.listInfo.map((it, idx) => (
            <div className="boardContents" key={it.id} onClick={handleToggle}>
              <div className="common">{it.id}</div>
              <div className="title">{it.title}</div>
              <div className="author">{it.author}</div>
              <div className="common">{it.day}</div>
            </div>
          ))}
        </div>
      )}
      <div className="writeDiv">
        <GlobalButton width="120px" height="30px" onClick={handleModal}>
          글 쓰기
        </GlobalButton>
      </div>
      <div className="pagiNationDiv">
        {totalPage === 0 ? (
          ""
        ) : (
          // <div></div>
          <PagiNation totalPage={totalPage} page={page} />
        )}
      </div>
      {/* <SearchBar
    setBoardList={setBoardList}
    setTotalPage={setTotalPage}
    page={page}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    pageData={pageData}
   /> */}
    </BoardListBlock>
  );
};

export default BoardList;
