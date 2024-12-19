import styled from 'styled-components';

export const Container = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;
export const ProductWrapper = styled.ul`
 display: flex;
 flex-wrap: wrap;
 gap: 20px;
`
export const ProductContainer = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 10px;
  min-width: 300px;
  max-width: 30%;

  @media (max-width: 768px) {
  max-width: 100%;
  padding: 10px;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
  }

  ul {
    margin-top: 10px;
    padding-left: 20px;
    list-style: disc;

    li {
      font-size: 14px;
      margin: 2px 0;
    }
  }
`;
