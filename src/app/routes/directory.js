import { Switch, Route } from "react-router"

export const Directory = ({ paths }) => (
  <Switch>
    {paths.map(({ path, exact, component }) => <Route path={path} exact={exact} component={component} />)}
  </Switch>
)
