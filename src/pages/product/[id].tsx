import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl, Product } from '..';
import PlaceholderImg from '../../assets/images/placeholder.png';

const ProductDetail = () => {
  const { id } = useParams();

  const { data: productData } = useQuery(['product', id], () => {
    return axios.get(`${baseUrl}/products/${id}`);
  });
  const product: Product = useMemo(() => productData?.data, [productData]);
  //   console.log(product);

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
              <input type="number" defaultValue={1} />
              <button>장바구니</button>
              {/* <button>찜하기</button> */}
            </label>
            <p>$ {product.price}</p>
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
    padding: 0 4px;
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
