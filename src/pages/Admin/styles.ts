//import { darken } from 'polished'

import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
`
export const ContainerProdct = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
`
export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  p {
    font-size: 16px;
  }
`;
