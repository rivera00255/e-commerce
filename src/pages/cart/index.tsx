import styled from 'styled-components';

const Cart = () => {
  return (
    <section>
      <Container>
        <h2>장바구니</h2>
        <div>
          <Item>
            <div></div>
            <div>
              <div>
                <p>name</p>
                <input type="number" />
                <p>price</p>
              </div>
              <div>
                <button>del</button>
              </div>
            </div>
          </Item>
        </div>
        <div>
          <div>
            <p>주문 금액</p>
            <p>배송비</p>
            <p>전체 금액</p>
          </div>
          <button>주문하기</button>
        </div>
      </Container>
    </section>
  );
};

export default Cart;

const Container = styled.div`
  width: 990px;
  margin: 0 auto;
  padding: 20px 0;
  > h2 {
    text-align: center;
    margin: 20px 0;
    font-weight: 700;
  }
  > div {
    width: 480px;
    margin: 0 auto;
  }
  > div:last-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    > div {
      width: 100%;
      background: #f5f5f5;
      padding: 16px;
      color: #444;
      > p {
        margin: 8px 0;
        font-size: 14px;
      }
    }
  }
  button {
    padding: 4px 16px;
    background: #ebebeb;
    border-radius: 5px;
    margin-top: 16px;
    font-size: 15px;
  }
`;

const Item = styled.div`
  display: flex;
  > div:first-of-type {
    width: 120px;
    height: 120px;
    background: #eee;
    margin-right: 10px;
  }
  > div:last-of-type {
    width: calc(100% - 130px);
    display: flex;
    justify-content: space-between;
  }
  input {
    border: 1px solid #ddd;
  }
`;
