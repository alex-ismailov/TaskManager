import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import useStyles from './useStyles';

const ColumnHeader = (props) => {
  const { column, onLoadMore } = props;

  const styles = useStyles();

  const {
    id,
    title,
    cards,
    meta: { totalCount, currentPage },
  } = column;

  const count = cards.length;
  const isButtonVisible = count !== totalCount;

  const handleLoadMore = () => onLoadMore(id, currentPage + 1);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({count}/{totalCount || '…'})
      </div>
      <div className={styles.actions}>
        {isButtonVisible && (
          <IconButton aria-label="Load more" onClick={handleLoadMore}>
            <SystemUpdateAltIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

ColumnHeader.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape({})),
    meta: PropTypes.shape({
      count: PropTypes.number,
      totalCount: PropTypes.number,
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
      perPage: PropTypes.number,
    }),
  }).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ColumnHeader;
