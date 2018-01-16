import { connect } from "react-redux"
import { Tab } from "@components/core"
import { addTab, selectTab, removeTab } from "./actions"
import { tabReducer } from "./reducers"
import { store } from "@services"
import "./tabList.scss"

store.addReducer(`tabList`, tabReducer)

const mapStateToProps = (state, ownProps) => ({
  tabs: state.tabList.tabs.sort((a, b) => a.id - b.id),
  currentTab: state.tabList.currentTab
})

const mapDispatchToProps = dispatch => ({
  handleAddTab: e => {
    e.stopPropagation()
    dispatch(addTab())
  },
  handleSelectTab: (e, id) => {
    e.stopPropagation()
    dispatch(selectTab(id))
  },
  handleRemoveTab: (e, id) => {
    e.stopPropagation()
    dispatch(removeTab(id))
  }
})

const TabList = ({ tabs, currentTab, handleSelectTab, handleRemoveTab, handleAddTab }) => (
  <aside styleName="tabList">
    <h1>Tab List</h1>
    {tabs?.length > 0 && (
      <ul>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            selected={currentTab === tab.id}
            selectTab={handleSelectTab}
            removeTab={handleRemoveTab}
          />
        ))}
      </ul>
    )}
    <span styleName="separator" />
    <button styleName="newTabBtn" onClick={handleAddTab}>
      <label>New Tab</label>
    </button>
  </aside>
)

export default connect(mapStateToProps, mapDispatchToProps)(TabList)
