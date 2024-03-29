/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- 컴포넌트를 감싸는 css
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

import styled from "styled-components";

export const GlobalWrapper = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => props.height};
`;

export const AsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: pink;
`;
