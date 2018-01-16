import { connect } from "react-redux"
import { Modal, Layout } from "@components/structural"
import { openModal } from "@components/structural/modal/actions"
import "./home.scss"

const mapStateToProps = ({ tabList }, ownProps) => ({
  tabs: tabList.tabs
})

const mapDispatchToProps = dispatch => ({
  openTabList: modalProps => dispatch(openModal(`TabListModal`, modalProps))
})

const tabCounter = tabs => tabs?.length > 0 && <label styleName="tabCounter">Open Tabs: {tabs.length}</label>

const Home = ({ tabs, openTabList }) => (
  <Layout>
    <Modal />
    <button styleName="openBtn" onClick={openTabList} title="Open">
      Open
    </button>
    {tabCounter(tabs)}
  </Layout>
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
