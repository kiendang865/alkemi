export const compare_supply = (val1, val2) => {
    return val2.totalSupplyUSD - val1.totalSupplyUSD;
};

export const compare_borrow = (val1, val2) => {
    return val2.totalBorrowUSD - val1.totalBorrowUSD;
};

export const format_str_to_kmb = (str_num) => {
    var t_num = Number(str_num);
    var out_a, out_b, t_index;

    if (t_num >= 1e9) {
        out_a = Math.floor(t_num / 1e9);
        if (((t_num % 1e9) / 1e9).toString().indexOf(".") > 0) {
            t_index = ((t_num % 1e9) / 1e9).toString().indexOf(".") + 1;
            out_b = ((t_num % 1e9) / 1e9).toString().substr(t_index, 2);
        } else {
            out_b = "00";
        }
        return out_a + "." + out_b + "G";
    }
    if (t_num >= 1e6) {
        out_a = Math.floor(t_num / 1e6);
        if (((t_num % 1e6) / 1e6).toString().indexOf(".") > 0) {
            t_index = ((t_num % 1e6) / 1e6).toString().indexOf(".") + 1;
            out_b = ((t_num % 1e6) / 1e6).toString().substr(t_index, 2);
        } else {
            out_b = "00";
        }
        return out_a + "." + out_b + "M";
    }
    if (t_num >= 1e3) {
        out_a = Math.floor(t_num / 1e3);
        if (((t_num % 1e3) / 1e3).toString().indexOf(".") > 0) {
            t_index = ((t_num % 1e3) / 1e3).toString().indexOf(".") + 1;
            out_b = ((t_num % 1e3) / 1e3).toString().substr(t_index, 2);
        } else {
            out_b = "00";
        }
        return out_a + "." + out_b + "K";
    }

    if (str_num.indexOf(".") > 0) {
        var aaa = str_num.split(".")[0];
        var bbb = str_num.split(".")[1];
        return (str_num = aaa + "." + bbb.substr(0, 2));
    }

    return str_num;
};

export const format_str_to_percent = (str_num) => {
    // console.log(str_num)
    var index_num = str_num.indexOf(".") + 2;
    var cpmp_str = str_num.replace(/\./, "");
    var res_str =
        cpmp_str.slice(0, index_num) + "." + cpmp_str.substr(index_num, 2);
    // console.log(Number(res_str))

    if (Number(res_str) === 0) {
        return "<0.01%";
    } else {
        return Number(res_str) + "%";
    }
};

export const format_str_to_K = (str_num) => {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;

    if (str_num.indexOf(".") > 0) {
        str_num = str_num.slice(0, str_num.indexOf(".") + 3);
    }

    if (str_num.indexOf(".") > 0) {
        var part_a = str_num.split(".")[0];
        var part_b = str_num.split(".")[1];

        part_a = (part_a + "").replace(reg, "$&,");

        return part_a + "." + part_b;
    } else {
        str_num = (str_num + "").replace(reg, "$&,");
        return str_num;
    }
};
