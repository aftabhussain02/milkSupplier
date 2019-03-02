import Axios from 'axios';
import _ from 'lodash';
import { getStorageParams } from '../constant/storage';
import { noteApi } from '../constant/apiUrls';
import { LIST_NOTES } from './type';

export const fetchNotesList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(noteApi, { headers })
      .then(({ data }) => {
        dispatch({
          type: LIST_NOTES,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );

export const deleteNote = id => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.delete(`${noteApi}/${id}`, { headers })
      .then(({ data }) => {
        dispatch({
          type: LIST_NOTES,
          payload: data.data,
        });
        return Promise.resolve(data);
      })
      .catch(e => Promise.reject())
  );
