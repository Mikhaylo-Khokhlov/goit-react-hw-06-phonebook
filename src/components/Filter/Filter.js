import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filter/filter-actions';
import { getFilter } from '../../redux/filter/filter-selector';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = e => {
    const { value } = e.target;
    dispatch(changeFilter(value));
  };
  return (
    <>
      <div>
        <label className={s.label} htmlFor="filter">
          Find contacts by name
        </label>
      </div>
      <input
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={onChange}
        className={s.input}
      />
    </>
  );
}
