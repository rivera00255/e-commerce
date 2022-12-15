import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl, Category } from '../pages';

const Header = () => {
  const navigate = useNavigate();

  const { data: categoryData } = useQuery(['category'], () => {
    return axios.get(`${baseUrl}/categories`);
  });
  const categories: Category[] = useMemo(() => categoryData?.data, [categoryData]);

  return (
    <MainHeader>
      <div>
        <h1 onClick={() => navigate('/')}>Platzi Store</h1>
        <div onClick={() => navigate('/cart')}>Cart</div>
      </div>
      <nav>
        <ul>
          {categories?.map((item: Category) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </nav>
    </MainHeader>
  );
};

export default Header;

const MainHeader = styled.header`
  width: 100%;
  > div {
    width: 990px;
    margin: 0 auto;
    padding: 20px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > h1 {
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
    }
    > div {
      font-size: 14px;
      color: #555;
      cursor: pointer;
    }
  }
  > nav {
    width: 990px;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    > ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      > li {
        padding: 4px 16px;
        cursor: pointer;
        border-bottom: 4px solid #f5f5f5;
        &:hover {
          border-bottom: 4px solid #dbdbdb;
        }
      }
    }
  }
`;
