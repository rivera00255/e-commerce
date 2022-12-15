import styled from 'styled-components';
import { Product } from '../../pages';
import PlaceholderImg from '../../assets/images/placeholder.png';

const ProductListItem = ({ item }: { item: Product }) => {
  return (
    <Item>
      {item.images[0] !== '' ? <img src={item.images[0]} alt="preview" /> : <img src={PlaceholderImg} alt="preview" />}
      <div>
        <p>
          <strong>{item.title}</strong>
        </p>
        <p>$ {item.price}</p>
      </div>
    </Item>
  );
};

export default ProductListItem;

const Item = styled.div`
  width: 210px;
  margin: 16px 14px;
  color: #444;
  > div {
    text-align: center;
    > p {
      font-size: 14px;
    }
  }
`;
