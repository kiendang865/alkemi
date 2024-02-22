import { connect } from "react-redux";
import { push } from "connected-react-router";

import AppBarTitle from "components/AppBar/Title";
import { DASHBOARD } from "constants/routes";

const mapDispatchToProps = {
    onClick: () => push(DASHBOARD),
};

export default connect(undefined, mapDispatchToProps)(AppBarTitle);
