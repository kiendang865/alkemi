// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarBorrowItem from "../../components/Sidebar/BorrowItem";
// Constants
import { BORROW } from "../../constants/routes";
// Selectors
import { isBorrowSelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isBorrowSelected(state),
    onClick: () => props.history.push(BORROW),
});

export default withRouter(connect(mapStateToProps)(SidebarBorrowItem));
