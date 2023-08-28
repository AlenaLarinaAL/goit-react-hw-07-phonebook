import { useDispatch } from 'react-redux';
import { Label, Input } from './Filter.styled';
import { changeFilterValue } from 'store/filter/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        onChange={event => dispatch(changeFilterValue(event.target.value))}
      ></Input>
    </Label>
  );
};
