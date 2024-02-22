import { connect } from "react-redux";

import { closeSidebar, openSidebar } from "redux/actions/ui/ui";

import Sidebar from "components/Sidebar/Sidebar";

const mapStateToProps = (state, ownProps) => ({
    open: state.ui.sidebar.open,
});

const mapDispatchToProps = {
    onOpen: openSidebar,
    onClose: closeSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
