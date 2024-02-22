// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarDashboardItem from "../../components/Sidebar/DashboardItem";
// Constants
import { DASHBOARD } from "../../constants/routes";
// Selectors
import { isDashboardSelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isDashboardSelected(state),
    onClick: () => props.history.push(DASHBOARD),
});

export default withRouter(connect(mapStateToProps)(SidebarDashboardItem));
