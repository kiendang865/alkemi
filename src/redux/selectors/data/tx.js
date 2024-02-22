// Stats Selectors
export const getTxList = (state) => state.data.tx.txList;
export const getTxPending = (state) => state.data.tx.pending;
export const getTxError = (state) => state.data.tx.error;
