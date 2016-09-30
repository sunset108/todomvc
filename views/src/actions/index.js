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
    })
    .then(data => data.json())
    .then(todo => {
      return dispatch({ type: types.ADD_TODO, id: todo.ID, text: todo.Title })
    })
  }
}
export const deleteTodo = id => {
  return (dispatch) => {
    fetch('/task/' + id, {
      method: 'DELETE',
      body: JSON.stringify({ ID: id })
    }).then(data => {
      if (data.ok) {
        return dispatch({ type: types.DELETE_TODO, id })
      }
    })
  }
}

export const editTodo = (id, text, completed) => {
  return (dispatch) => {
    fetch('/task/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        ID: id,
        Title: text,
        Done: completed
      })
    }).then(data => {
      if (data.ok) {
        return dispatch({ type: types.EDIT_TODO, id, text })
      }
    })
  }
}
export const completeTodo = (id, text, completed) => {
  return (dispatch) => {
    fetch('/task/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        ID: id,
        Title: text,
        Done: !completed
      })
    }).then(data => {
      if (data.ok) {
        return dispatch({ type: types.COMPLETE_TODO, id })
      }q
    })
  }
}
export const completeAll = (completed) => {
  return (dispatch) => {
    fetch('/task/', {
      method: 'PUT',
      body: JSON.stringify(completed)
    }).then(data => {
      if (data.ok) {
        return dispatch({ type: types.COMPLETE_ALL, completed })
      }
    })
  }
}
export const clearCompleted = () => {
  return (dispatch) => {
    fetch('/task/', {
      method: 'DELETE'
    }).then(data => {
      if (data.ok) {
        return dispatch({ type: types.CLEAR_COMPLETED })
      }
    })
  }
}
