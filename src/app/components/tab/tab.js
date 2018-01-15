import './tab.scss'

export const Tab = props => {
  const { id, selected, selectTab, removeTab } = props
  return (
    <li className={`${selected ? `active` : ``} tab`} onClick={e => selectTab(e, id)}>
      <label>Tab #{id}</label>
      <button className="deleteTab" onClick={e => removeTab(e, id)}>
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
      </button>
    </li>
  )
}
