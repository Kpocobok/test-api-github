import Form from '../../form';
import Button from '../../form/button';
import {EButtonType, EFormType} from '../../form/constants';
import {IRepository} from '../../../interfaces';

export interface IItem {
  data: IRepository;
  onShow?: (data: IRepository) => void;
  onEdit?: (data: IRepository) => void;
  onRemove?: (data: IRepository) => void;
}

const Item = (props: IItem) => {
  return (
    <div className="list__item">
      <div className="list__item-info">
        <div className="list__item-name">{props.data.name}</div>
        {props.data.description ? (
          <div className="list__item-description">{props.data.description}</div>
        ) : null}
        <div className="list__item-visibility spans">
          <span className="spans__title">Visibility: </span>
          <span className="spans__value color-green">
            {props.data.visibility}
          </span>
        </div>
      </div>
      <Form className="list__item-controll" type={EFormType.collumn}>
        {props.onShow ? (
          <Button
            type={EButtonType.primary}
            onClick={() => (props.onShow ? props.onShow(props.data) : null)}>
            show
          </Button>
        ) : null}
        {props.onEdit ? (
          <Button
            type={EButtonType.primary}
            onClick={() => (props.onEdit ? props.onEdit(props.data) : null)}>
            edit
          </Button>
        ) : null}
        {props.onRemove ? (
          <Button
            type={EButtonType.alert}
            onClick={() =>
              props.onRemove ? props.onRemove(props.data) : null
            }>
            remove
          </Button>
        ) : null}
      </Form>
    </div>
  );
};

export default Item;
