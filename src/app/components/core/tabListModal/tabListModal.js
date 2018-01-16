import { connect } from "react-redux"
import { Textbox } from "@components/core"
import { updateTab } from "@components/core/tabList/actions"
import { closeModal } from "@components/structural/modal/actions"
import TabList from "../tabList/tabList"
import "./tabListModal.scss"

const mapStateToProps = ({ tabList }, ownProps) => ({
  tabs: tabList.tabs.sort((a, b) => a.id - b.id),
  currentTabID: tabList.currentTab
})

const mapDispatchToProps = dispatch => ({
  handleUpdate: (id, content) => {
    dispatch(updateTab(id, content))
  },
  handleClose: e => {
    e.stopPropagation()
    dispatch(closeModal())
  }
})

const TabListModal = ({ tabs, currentTabID, handleUpdate, handleClose }) => {
  const currentTab = tabs.find(tab => tab.id === currentTabID)
  return (
    <section styleName="tabListModal" onClick={handleClose}>
      <div styleName="modal" onClick={e => e.stopPropagation()}>
        <TabList />
        <div styleName="content">
          {currentTabID ? <h2>Tab #{currentTabID} Content</h2> : null}
          {currentTabID ? (
            <Textbox id={currentTabID} value={currentTab ? currentTab.content : ``} cb={handleUpdate} />
          ) : null}
        </div>
        <button styleName="closeBtn" onClick={handleClose} title="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12">
            <g fillRule="evenodd">
              <path d="M0 0h12v12H0" />
              <path
                fill="#dcddde"
                d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"
              />
            </g>
          </svg>
          <label>Close</label>
        </button>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TabListModal)
