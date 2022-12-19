import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import cartState, { Product } from '../../recoils/cart';

const Cart = () => {
  const cart = useRecoilValue(cartState);
  const setCart = useSetRecoilState(cartState);
  // console.log(cart);

  // const [orderlist, setOrderlist] = useState(new Map());
  const [checklist, setChecklist] = useState([...cart]);
  // console.log(checklist);

  const amountValidation = (amount: number) => {
    if (amount < 1) return 1;
    if (amount > 999) return 999;
    return amount;
  };

  const handleTotalPrice = () => {
    let price = 0;
    checklist.map((item: Product) => (price += item.price * item.amount));
    return price;
  };

  const handleDelete = (id: number) => {
    const products = cart.filter((item) => item.id !== id);
    setCart([...products]);
  };

  useEffect(() => {
    setChecklist([...cart]);
  }, [cart]);

  return (
    <section>
      <Container>
        <h2>장바구니</h2>
        <div>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setChecklist([...cart]);
              } else {
                setChecklist([]);
              }
            }}
            checked={cart.length === checklist.length ? true : false}
          />
          {cart?.map((item: Product) => (
            <Item key={item.id}>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setChecklist((prev) => [...prev, item]);
                  } else {
                    setChecklist((prev) => prev.filter((product) => product.id !== item.id));
                  }
                }}
                checked={checklist.includes(item) ? true : false}
              />
              <div>
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div>
                <div>
                  <p>{item.title}</p>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const products = cart.reduce((acc, cur) => new Map([...acc, [cur.id, { ...cur }]]), new Map());
                      products.set(item.id, { ...item, amount: amountValidation(Number(e.target.value)) });
                      setCart(Array.from(products.values()));
                    }}
                  />
                  <p>$ {item.price * item.amount}</p>
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
            {/* <p>주문 금액</p>
            <p>배송비</p> */}
            <p>
              총 주문 금액 <strong>$ {handleTotalPrice()}</strong>
            </p>
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
  position: relative;
  input[type='checkbox'] {
    position: absolute;
    top: 10px;
    left: 10px;
  }
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
