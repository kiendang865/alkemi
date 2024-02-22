// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarLendItem from "../../components/Sidebar/LendItem";
// Constants
import { LEND } from "../../constants/routes";
// Selectors
import { isLendSelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isLendSelected(state),
    onClick: () => props.history.push(LEND),
});

export default withRouter(connect(mapStateToProps)(SidebarLendItem));
