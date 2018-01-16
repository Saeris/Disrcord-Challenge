import { PropTypes } from "prop-types"
import "./layout.scss"

export const Layout = ({ children }) => <main styleName="layout">{children}</main>

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
