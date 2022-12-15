import styled from 'styled-components';
import axios from 'axios';
import ProductListItem from '../components/product/ProductListItem';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../recoils/cart';

export const baseUrl = `${import.meta.env.VITE_API_URL}`;

const Main = () => {
  const { data: productData } = useQuery(['product'], () => {
    return axios.get(`${baseUrl}/products`);
  });
  const products: Product[] = useMemo(() => productData?.data, [productData]);
  // console.log(products);

  return (
    <Section>
      <Container>
        {products?.map((item: Product) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <ProductListItem item={item} />
          </Link>
        ))}
      </Container>
    </Section>
  );
};

export default Main;

const Section = styled.section`
  width: 100%;
`;

const Container = styled.div`
  width: 990px;
  margin: 0 auto;
  padding: 40px 16px;
  display: flex;
  flex-wrap: wrap;
`;
