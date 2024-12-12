import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 0.5rem;

  background: ${({ theme }) => theme.colors.red};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;

  transition: background 0.3s;

  &:hover {
    background: ${darken(0.1, '#AA2424')};
  }

  span:first-child {
    margin-right: 0.25rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  svg {
    fill: ${({ theme }) => theme.colors.white};
    width: 2rem;
    height: 2rem;
  }

  span:last-child {
    margin-left: 0.75rem;
    font-weight: 500;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.yellow};
  }

  @media (max-width: 720px) {
    top: 0.5rem;
    bottom: initial;

    span:first-child {
      display: none;
    }
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.gray900};
  width: 90%;
  max-width: 500px;
  max-height: 98vh;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background:${({ theme }) => theme.colors.red};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 50%;
    color:${({ theme }) => theme.colors.white};
    font-size: 1.5rem;
    cursor: pointer;
  }

  .header-modal{
    display: flex;
    justify-content: space-around;

    h2 {
      margin-bottom: 1rem;
      text-align: center;
    }
    img{
      border-radius: 1rem;
    }
  }

 .container-additionals{
   max-height: 200px;
   overflow-y: auto;

   .additionals-list {

     .additional-item {
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin-bottom: 0.75rem;


     }
   }
 }
 .add-to-cart-container {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
  }
 .add-to-cart {
         background: ${({ theme }) => theme.colors.red};
         color: ${({ theme }) => theme.colors.white};
         padding: 0.5rem 1rem;
         border: none;
         border-radius: 4px;
         margin-top: 0.5rem;
         cursor: pointer;

         &:hover {
           background: ${darken(0.1, '#AA2424')};
         }
       }

  .total {
    margin-top: 1rem;
    text-align: center;

    strong {
      font-size: 1.25rem;
    }
  }
`;
