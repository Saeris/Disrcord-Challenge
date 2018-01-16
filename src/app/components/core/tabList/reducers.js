import { actions } from "./actions"

const initialState = {
  tabs: [],
  currentTab: null
}

// TODO: A Tab's ID needs to be an auto-incrementing value
// that has to continue iocrementing across sessions
let newTabID = 1

const addTab = state => {
  const tabs = [...state.tabs, { id: newTabID, content: `` }]
  const currentTab = newTabID++
  return { tabs, currentTab }
}

const selectTab = (state, id) => ({ ...state, currentTab: id })

const updateTab = (state, id, content) => {
  let tabToUpdate = state.tabs.find(tab => tab.id === id)
  tabToUpdate.content = content
  const otherTabs = state.tabs.filter(tab => tab.id !== tabToUpdate.id)
  return { ...state, tabs: [...otherTabs, tabToUpdate] }
}

const removeTab = (state, id) => {
  const tabs = state.tabs.filter(tab => tab.id !== id)
  return { ...state, tabs }
}

export const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TAB:
      return addTab(state)
    case actions.SELECT_TAB:
      return selectTab(state, action.id)
    case actions.UPDATE_TAB:
      return updateTab(state, action.id, action.content)
    case actions.REMOVE_TAB:
      return removeTab(state, action.id)
    default:
      return state
  }
}
