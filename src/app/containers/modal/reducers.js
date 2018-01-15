import { Reducer } from '../../services'
import { actions } from './actions'

@Reducer
class ModalReducer {
  initialState = {
    modalType: null,
    modalProps: {}
  }

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
    case actions.OPEN_MODAL:
      return { modalType: action.modalType, modalProps: action.modalProps }
    case actions.CLOSE_MODAL:
      return this.initialState
    default:
      return state
    }
  }

  getType = state => state.modal.modalType

  getProps = state => state.modal.modalProps
}

export const { getType, getProps } = new ModalReducer
