//import debounce from 'lodash/debounce'
import './textbox.scss'

export class Textbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    // TODO: Text input should be debounced, but React inputs are hard x_x
    this.changed = this.props.cb
  }

  handleChange = val => {
    this.setState({ value: val }, () => {
      this.changed(this.props.id, val)
    })
  }

  render() {
    return (
      <textarea
        className="textbox"
        placeholder="Write something here..."
        value={this.props.value || ``}
        onChange={e => this.handleChange(e.target.value)}
      ></textarea>
    )
  }
}
