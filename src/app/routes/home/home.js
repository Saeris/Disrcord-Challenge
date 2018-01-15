import { Modal, Layout } from '../../containers'
import { connect } from 'react-redux'
import { openModal } from '../../containers/modal/actions'
import './home.scss'

const mapStateToProps = (state, ownProps) => ({
  tabs: state.tabList.tabs
})

const mapDispatchToProps = dispatch => ({
  openModal: modalProps => dispatch(openModal(`TabListModal`, modalProps))
})

class Home extends Component {
  tabCounter = () => {
    const { tabs } = this.props
    return (!!tabs && tabs.length > 0) ? <label className="tabCounter">Open Tabs: {tabs.length}</label> : null
  }
  render() {
    return (
      <Layout>
        <Modal />
        <button className="openBtn" onClick={() => this.props.openModal()} title="Open">Open</button>
        {this.tabCounter()}
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
