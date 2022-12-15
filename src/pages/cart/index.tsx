import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import cartState, { Product } from '../../recoils/cart';

const Cart = () => {
  const cart = useRecoilValue(cartState);
  const setCart = useSetRecoilState(cartState);

  const handleDelete = (id: number) => {
    const products = cart.filter((item) => item.id !== id);
    setCart([...products]);
  };

  // const data = cart?.reduce((prev, cur) => new Map([...prev, [cur.id, { ...cur }]]), new Map());
  // console.log(data);

  return (
    <section>
      <Container>
        <h2>장바구니</h2>
        <div>
          {cart?.map((item: Product) => (
            <Item key={item.id}>
              <div>
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div>
                <div>
                  <p>{item.title}</p>
                  <input type="number" defaultValue={item.amount} />
                  <p>$ {item.price}</p>
                </div>
                <div>
                  <button onClick={() => handleDelete(item.id)}>del</button>
                </div>
              </div>
            </Item>
          ))}
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
  margin-bottom: 10px;
  > div:first-of-type {
    width: 120px;
    max-height: 120px;
    margin-right: 10px;
    > img {
      width: 100%;
    }
  }
  > div:last-of-type {
    width: calc(100% - 130px);
    display: flex;
    justify-content: space-between;
  }
  input {
    border: 1px solid #ddd;
    padding: 0 4px;
  }
`;
