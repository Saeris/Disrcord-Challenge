//import debounce from 'lodash/debounce'
import "./textbox.scss"

export class Textbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.changed = this.props.cb
  }

  handleChange = value => {
    this.setState({ value }, () => {
      this.changed(this.props.id, value)
    })
  }

  render({ value }) {
    return (
      <textarea
        styleName="textbox"
        placeholder="Write something here..."
        value={value || ``}
        onChange={e => this.handleChange(e.target.value)}
      />
    )
  }
}
