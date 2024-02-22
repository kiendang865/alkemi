// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarLiquidateItem from "../../components/Sidebar/LiquidateItem";
// Constants
import { LIQUIDATE } from "../../constants/routes";
// Selectors
import { isLiquidateSelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isLiquidateSelected(state),
    onClick: () => props.history.push(LIQUIDATE),
});

export default withRouter(connect(mapStateToProps)(SidebarLiquidateItem));
