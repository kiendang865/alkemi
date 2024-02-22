import { connect } from "react-redux";

import { closeSidebar, openSidebar } from "../../redux/actions/ui/ui";

import SidebarHeader from "../../components/Sidebar/Header";

const mapStateToProps = (state, ownProps) => ({
    open: state.ui.sidebar.open,
});

const mapDispatchToProps = {
    onClose: closeSidebar,
    onOpen: openSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
