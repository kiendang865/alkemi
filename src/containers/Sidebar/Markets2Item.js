// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarMarketsItem2 from "../../components/Sidebar/MarketsItem";
// Constants
import { MARKETS_STAGE } from "../../constants/routes";
// Selectors
import { isMarketsSelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isMarketsSelected(state),
    onClick: () => props.history.push(MARKETS_STAGE),
});

export default withRouter(connect(mapStateToProps)(SidebarMarketsItem2));
