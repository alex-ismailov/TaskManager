import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import { propOr } from 'ramda';

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './useStyles';

import TaskForm from 'forms/TaskForm';

import Task from 'components/Task';
import TasksRepository from 'repositories/TasksRepository';
import ColumnHeader from 'components/ColumnHeader';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';

const MODES = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'In Dev' },
  { key: 'in_qa', value: 'In QA' },
  { key: 'in_code_review', value: 'in CR' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const initialBoard = {
  columns: STATES.map((column) => ({
    id: column.key,
    title: column.value,
    cards: [],
    meta: {},
  })),
};

const TaskBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState({});
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  const styles = useStyles();

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: data.items, meta: data.meta },
      }));
    });
  };

  const loadColumnMore = (state, page, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: [...prevState[state].cards, ...data.items], meta: data.meta },
      }));
    });
  };

  const generateBoard = () => {
    const newBoard = {
      columns: STATES.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr([], 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    };

    setBoard(newBoard);
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const handleAddPopupOpen = () => setMode(MODES.ADD);

  const handleEditPopupOpen = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleModalClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(task.state);
      handleModalClose();
    });
  };

  const handleTaskDestroy = (task) => {
    const { id, state } = task;

    return TasksRepository.destroy(id).then(() => {
      loadColumnInitial(state);
      handleModalClose();
    });
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);

    if (!transition) {
      return null;
    }

    const params = { task: { stateEvent: transition.event } };

    return TasksRepository.update(task.id, params)
      .then(() => {
        loadColumnInitial(source.fromColumnId);
        loadColumnInitial(destination.toColumnId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(`Move failed! ${error.message}`);
      });
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);

    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumnInitial(task.state);
      setMode(MODES.NONE);
    });
  };

  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  return (
    <Container>
      <Fab className={styles.addButton} color="primary" aria-label="add" onClick={handleAddPopupOpen}>
        <AddIcon />
      </Fab>
      <KanbanBoard
        disableColumnDrag
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
        renderCard={(card) => <Task task={card} onClick={handleEditPopupOpen} />}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>
      {mode === MODES.ADD && <AddPopup onCardCreate={handleTaskCreate} onClose={handleModalClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onCardLoad={loadTask}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleModalClose}
          cardId={openedTaskId}
        />
      )}
    </Container>
  );
};

export default TaskBoard;
