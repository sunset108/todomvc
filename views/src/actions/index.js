import * as types from '../constants/ActionTypes'

export const listAll = () => {
  return (dispatch) => {
    fetch('/task/')
    .then(data => data.json())
    .then(data => {
      const todos = data.Tasks.map(todo => (
        {
          id: todo.ID,
          text: todo.Title,
          completed: todo.Done
        }
      ))
      return dispatch({ type: types.LIST_ALL, todos })
    })
  }
}
export const addTodo = text => {
  return (dispatch) => {
    fetch('/task/', {
      method: 'POST',
      body: JSON.stringify({ Title: text })
    }).then(data => {
      if(data.ok) {
        return dispatch({ type: types.ADD_TODO, text })
      }
    })
  }
}
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
