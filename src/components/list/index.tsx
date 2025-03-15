import Item from './item';
import {IRepository} from '../../interfaces';

export interface IList {
  list?: IRepository[];
  loading?: boolean;
  onShow?: (data: IRepository) => void;
  onEdit?: (data: IRepository) => void;
  onRemove?: (data: IRepository) => void;
}

const List = (props: IList) => {
  return props.list?.length ? (
    <div className="list">
      {props.loading ? <div className="list__loading"></div> : null}
      {props.list.map((item: IRepository) => {
        return (
          <Item
            key={item.uuid}
            data={item}
            onShow={props.onShow}
            onEdit={props.onEdit}
            onRemove={props.onRemove}
          />
        );
      })}
    </div>
  ) : (
    <div className="message">No repositories found</div>
  );
};

export default List;
