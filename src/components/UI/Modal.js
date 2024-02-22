import { makeStyles, createStyles } from "@material-ui/core/styles";

const modal = makeStyles((theme) =>
    createStyles({
        MuiTableHeadroot: {
            backgroundColor: "#ffffff",
        },
        paper: {
            position: "absolute",
            width: 800,
            backgroundColor: "#202123",
            color: "white",
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        chart: {
            maxHeight: 150,
        },
        borderChart: {
            padding: 0,
        },
        scroll: {
            overflowY: "scroll",
        },
        titleSupply: {
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
            padding: "18px 20px 14px 20px",
            textAlign: "center",
        },
        supplyChart: {
            backgroundColor: "#1B1B1B",
        },
        supplyPercent: {
            letterSpacing: "0px",
            color: "#00A577",
            opacity: 1,
            fontSize: "28px",
            fontWeight: "500",
            textAlign: "center",
            // backgroundColor:'#1B1B1B',
            padding: "25px 0",
        },
        simpleModalChart: {
            // backgroundColor:'#1B1B1B',
            paddingBottom: "30px",
        },
        supplyCon: {
            paddingTop: "20px",
            paddingLeft: "22px",
            paddingRight: "22px",
            width: "100%",
            color: "green !important",
        },
        buttonWrap: {
            // width: 90px;
            // width: '100%',
            marginTop: "30px",
            textAlign: "center",
            // backgroundColor:'#00A793',
            // height: '55px',
            marginBottom: "23px",
            // paddingTop:'10px'
        },
        btnModal: {
            minWidth: 100,
            textTransform: "capitalize",
        },
        divSupply: {
            paddingTop: "40px",
            paddingBottom: "30px",
        },

        // &:hover {
        //     background-color: rgba(#8472FF, 0.85) !important;
        //     border-color: rgba(#8472FF, 0.85) !important;
        //     color: #FFFFFF !important;
        // }

        // &.disable-button {
        //     background-color: #00A577 !important;
        //     border-color: #00A577 !important;
        //     color: #f7f7f7 !important;
        // }

        inputWrap: {
            position: "relative",
        },
        antInput: {
            backgroundColor: "#161719 !important",
            border: "1px solid #000000",
            height: "40px",
        },
        maxTips: {
            position: "absolute",
            right: "15px",
            top: "17px",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: "14px",
        },
        input: {
            background: "#1B1B1B 0% 0% no-repeat padding-box",
            border: "1px solid #000000",
            opacity: 1,
            width: "412px",
            height: "54px",
            paddingLeft: "10px",
            color: "white",
            fontSize: "18px",
        },
        amount: {
            color: "white",
            paddingBottom: "10px",
        },
        rateInfo: {
            color: "white",
            fontSize: "14px",
            marginTop: "20px",
        },
        rateRow: {
            padding: "12px 0",
            borderBottom: "1px dashed #a7a7a7",
        },
        closeIcon: {
            paddingRight: "10px",
            cursor: "pointer",
        },
        textSupply: {
            paddingLeft: "40px",
        },

        walletBalance: {
            color: "#a7a7a7",
        },
    })
);
export default modal;
