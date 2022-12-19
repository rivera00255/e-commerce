import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl } from '..';
import PlaceholderImg from '../../assets/images/placeholder.png';
import { useRecoilState } from 'recoil';
import cartState, { Product } from '../../recoils/cart';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useRecoilState(cartState);

  const { data: productData } = useQuery(['product', id], () => {
    return axios.get(`${baseUrl}/products/${id}`);
  });
  const product: Product = useMemo(() => productData?.data, [productData]);
  //   console.log(product);

  const amountValidation = (amount: number) => {
    if (amount < 1) return 1;
    if (amount > 999) return 999;
    return amount;
  };

  const handleAddCart = () => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem) {
      if (confirm('장바구니에 있는 상품입니다. 추가할까요?')) {
        const cartItem = cart.reduce((acc, cur) => new Map([...acc, [cur.id, { ...cur }]]), new Map());
        cartItem.set(product.id, { ...product, amount: cartItem.get(product.id).amount + amount });
        setCart(Array.from(cartItem.values()));
      }
    } else {
      setCart((prev) => [
        ...prev,
        {
          ...product,
          amount: amount,
        },
      ]);
      if (confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?')) {
        navigate('/cart');
      }
    }
  };

  if (!productData) return null;
  return (
    <section>
      <Container>
        <h4>{product.category.name}</h4>
        <h3>{product.title}</h3>
        <Wrapper>
          <div>
            {product.images[0] !== '' ? (
              <img src={product.images[0]} alt={product.title} />
            ) : (
              <img src={PlaceholderImg} alt={product.title} />
            )}
          </div>
          <div>
            <label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(amountValidation(Number(e.target.value)));
                }}
              />
              <button onClick={handleAddCart}>장바구니</button>
              {/* <button>찜하기</button> */}
            </label>
            <p>$ {product.price * amount}</p>
            <p>{product.description}</p>
          </div>
        </Wrapper>
      </Container>
    </section>
  );
};

export default ProductDetail;

const Container = styled.div`
  width: 990px;
  margin: 0 auto;
  > h4 {
    margin-top: 40px;
    color: #888;
    font-size: 14px;
  }
  > h3 {
    font-weight: 600;
    margin: 8px 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 50%;
    > img {
      width: 90%;
    }
  }
  input[type='number'] {
    border: 1px solid #444;
    margin-right: 8px;
    padding-left: 4px;
  }
  button {
    padding: 4px 12px;
    border-radius: 5px;
    font-size: 15px;
    background: #eee;
    margin-right: 4px;
    &:hover {
      background: #e0e0e0;
    }
  }
`;
