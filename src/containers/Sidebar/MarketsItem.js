// Libs
import { connect } from "react-redux";
import { withRouter } from "react-router";
// Component
import SidebarMarketsItem from "../../components/Sidebar/MarketsItem";
// Constants
import { MARKETS } from "../../constants/routes";
// Selectors
import { isMarketsSelected } from "../../redux/selectors/ui";

const mapStateToProps = (state, props) => ({
    selected: isMarketsSelected(state),
    onClick: () => props.history.push(MARKETS),
});

export default withRouter(connect(mapStateToProps)(SidebarMarketsItem));
