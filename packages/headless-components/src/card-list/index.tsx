import React, { useCallback } from 'react';
import styles from './index.module.less';
import useCssReactiveRule from './useCssReactiveRule';

interface Id {
  id: string;
}

interface ICardListProps<T extends Id = any> {
  gap?: number;
  count?: number;
  loading?: boolean
  reactive?: boolean;
  data: T[];
  empty?: any
  containerStyle?: any

  cursorPointer?: boolean;
  onClick?: (item: T) => void;

  renderItem (item: T, index?: number): React.ReactNode;
}

function CardList<T extends Id> (props: ICardListProps) {
  const { gap = 16, count = 4, reactive = false, data, renderItem, onClick, cursorPointer, empty, loading = false, containerStyle } = props;
  const style = useCssReactiveRule(count, gap, reactive);

  const onCardClick = useCallback((item: { id: string }) => () => onClick ? onClick(item) : null, []);
  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return (
    <div className={styles['card-wrapper']}>
      <div className={styles['card-list']} style={{ ...style.containerStyle, ...containerStyle }}>
        {data.map((item: { id: string, a: string }, index: number) => {
          const dom = renderItem(item, index);
          return (
            <div key={item.id || index} className={styles['card-list-item']}
                 style={cursorPointer ? { ...style.itemStyle, cursor: 'pointer' } : { ...style.itemStyle }}
                 children={dom}
                 onClick={onCardClick(item)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardList;
