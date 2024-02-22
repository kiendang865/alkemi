// Declare action type as a constant
export const OPEN_SIDEBAR = "OPEN_SIDEBAR";

// Declare action creator
export const openSidebar = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: OPEN_SIDEBAR,
});

// Declare action type as a constant
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";

// Declare action creator
export const closeSidebar = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: CLOSE_SIDEBAR,
});
