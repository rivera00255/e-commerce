import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl } from '..';
import ProductListItem from '../../components/product/ProductListItem';
import { Product } from '../../recoils/cart';

const ProductListByCategory = () => {
  const { categoryId } = useParams();
  // console.log(categoryId);

  const { data: productData } = useQuery(['categories', categoryId], () => {
    return axios.get(`${baseUrl}/categories/${categoryId}/products`);
  });

  const products = useMemo(() => productData?.data, [productData]);
  // console.log(products);

  return (
    <section>
      <Container>
        {products?.map((item: Product) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <ProductListItem item={item} />
          </Link>
        ))}
      </Container>
    </section>
  );
};

export default ProductListByCategory;

const Container = styled.div`
  width: 990px;
  margin: 0 auto;
  padding: 40px 16px;
  display: flex;
  flex-wrap: wrap;
`;
