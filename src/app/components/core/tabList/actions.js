export const actions = {
  ADD_TAB: `ADD_TAB`,
  SELECT_TAB: `SELECT_TAB`,
  UPDATE_TAB: `UPDATE_TAB`,
  REMOVE_TAB: `REMOVE_TAB`
}

export const addTab = () => ({ type: actions.ADD_TAB })

export const selectTab = id => ({ type: actions.SELECT_TAB, id })

export const updateTab = (id, content) => ({ type: actions.UPDATE_TAB, id, content })

export const removeTab = id => ({ type: actions.REMOVE_TAB, id })
