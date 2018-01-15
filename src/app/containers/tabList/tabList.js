import { connect } from 'react-redux'
import { addTab, selectTab, removeTab } from './actions'
import { tabReducer } from './reducers'
import { store } from '../../services'
import { Tab } from '../../components'
import './tabList.scss'

store.addReducer(`tabList`, tabReducer)

const mapStateToProps = (state, ownProps) => ({
  tabs: state.tabList.tabs.sort((a, b) => a.id - b.id),
  currentTab: state.tabList.currentTab
})

const mapDispatchToProps = dispatch => ({
  addTab: () => dispatch(addTab()),
  selectTab: id => dispatch(selectTab(id)),
  removeTab: id => dispatch(removeTab(id))
})

class TabList extends Component {
  handleAddTab = e => {
    e.stopPropagation()
    this.props.addTab()
  }

  handleSelectTab = (e, id) => {
    e.stopPropagation()
    this.props.selectTab(id)
  }

  handleRemoveTab = (e, id) => {
    e.stopPropagation()
    this.props.removeTab(id)
  }

  createTabs = () => {
    const { tabs, currentTab } = this.props
    if (tabs.length === 0) return null
    return (
      <ul>
        {tabs.map(tab => <Tab
          key={tab.id}
          id={tab.id}
          selected={currentTab === tab.id}
          selectTab={this.handleSelectTab}
          removeTab={this.handleRemoveTab}
        />)}
      </ul>
    )
  }

  render() {
    return (
      <aside className="tabList">
        <h1>Tab List</h1>
        {this.createTabs()}
        <span className="separator" />
        <button className="newTabBtn" onClick={this.handleAddTab}>
          <label>New Tab</label>
        </button>
      </aside>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList)
