import { connect } from 'react-redux'
import { updateTab } from '../tabList/actions'
import { closeModal } from '../modal/actions'
import TabList from '../tabList/tabList'
import { Textbox } from '../../components'
import './tabListModal.scss'

const mapStateToProps = (state, ownProps) => ({
  tabs: state.tabList.tabs.sort((a, b) => a.id - b.id),
  currentTabID: state.tabList.currentTab
})

const mapDispatchToProps = dispatch => ({
  updateTab: (id, content) => dispatch(updateTab(id, content)),
  closeModal: () => dispatch(closeModal())
})

class TabListModal extends Component {

  handleClose = e => {
    e.stopPropagation()
    this.props.closeModal()
  }

  handleModalClick = e => e.stopPropagation()

  handleUpdateTab = (id, content) => {
    this.props.updateTab(id, content)
  }

  render() {
    const { tabs, currentTabID } = this.props
    const currentTab = tabs.find(tab => tab.id === currentTabID)
    return (
      <section className="tabListModal" onClick={this.handleClose}>
        <div className="modal" onClick={this.handleModalClick}>
          <TabList />
          <div className="content">
            {!!currentTabID ? <h2>Tab #{currentTabID} Content</h2> : null}
            {!!currentTabID ? <Textbox id={currentTabID} value={!!currentTab ? currentTab.content : `` } cb={this.handleUpdateTab}/> : null}
          </div>
          <button className="closeBtn" onClick={this.handleClose} title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12">
              <g fillRule="evenodd">
                <path
                  d="M0 0h12v12H0">
                </path>
                <path
                  fill="#dcddde"
                  d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6">
                </path>
              </g>
            </svg>
            <label>Close</label>
          </button>
        </div>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabListModal)
