import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../../actions/ui/ui";

const initialState = {
    open: true,
};

export default (state = initialState, { type }) => {
    switch (type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                open: true,
            };

        case CLOSE_SIDEBAR:
            return {
                ...state,
                open: false,
            };

        default:
            return state;
    }
};
