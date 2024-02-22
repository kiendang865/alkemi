import { connect } from "react-redux";
import { push } from "connected-react-router";

import NoWhereDashboardButton from "components/NoWhere/DashboardButton";
import { DASHBOARD } from "constants/routes";

const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(push(DASHBOARD)),
});

export default connect(undefined, mapDispatchToProps)(NoWhereDashboardButton);
