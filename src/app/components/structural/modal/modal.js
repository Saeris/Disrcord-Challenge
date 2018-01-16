import { connect } from "react-redux"
import { TabListModal } from "@components/core"
import { getType, getProps } from "./reducers"

const mapStateToProps = (state, ownProps) => ({
  modalType: getType(state),
  modalProps: getProps(state)
})

const mapDispatchToProps = dispatch => ({})

const Modal = ({ modals, modalType, modalProps }) => {
  if (!modalType) return null
  const SpecificModal = modals[modalType]
  return <SpecificModal {...modalProps} />
}

Modal.defaultProps = {
  modals: {
    TabListModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
