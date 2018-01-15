import { connect } from 'react-redux'
import { getType, getProps } from './reducers'
import TabListModal from '../tabListModal/tabListModal'

const mapStateToProps = (state, ownProps) => ({
  modalType: getType(state),
  modalProps: getProps(state)
})

const mapDispatchToProps = dispatch => ({

})

class Modal extends Component {
  static defaultProps = {
    modals: {
      TabListModal
    }
  }

  render() {
    if (!this.props.modalType) return null
    const SpecificModal = this.props.modals[this.props.modalType]
    return (<SpecificModal {...this.props.modalProps} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
