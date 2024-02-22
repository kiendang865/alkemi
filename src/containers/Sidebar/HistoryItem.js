// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarHistoryItem from "../../components/Sidebar/HistoryItem";
// Constants
import { HISTORY } from "../../constants/routes";
// Selectors
import { isHistorySelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isHistorySelected(state),
    onClick: () => props.history.push(HISTORY),
});

export default withRouter(connect(mapStateToProps)(SidebarHistoryItem));
