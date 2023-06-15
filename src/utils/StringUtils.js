class StringUtils {
    static isNumber(val) {
        return /^\d+$/.test(val);
    }
    static isEmpty(val) {
        return val === '';
    }
}

export default StringUtils;
