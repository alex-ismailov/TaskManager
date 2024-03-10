import routes from '../routes';
import FetchHelper from 'utils/fetchHelper';

export default {
  index(params) {
    const path = routes.apiV1TasksPath({ format: 'json' });

    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = routes.apiV1TaskPath(id, { format: 'json' });

    return FetchHelper.get(path);
  },

  update(id, task = {}) {
    const path = routes.apiV1TaskPath(id);

    return FetchHelper.put(path, task);
  },

  create(params) {
    const path = routes.apiV1TasksPath();

    return FetchHelper.post(path, params);
  },

  destroy(id) {
    const path = routes.apiV1TaskPath(id);

    return FetchHelper.delete(path);
  },
};
