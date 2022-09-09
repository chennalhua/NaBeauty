import CryptoJS from "crypto-js"; //AES 加密工具
/*函式 工具庫*/

/*--數字相關--*/
//@數字逗號轉換
export function toCurrency(num) {
    if (num === undefined || num === null) {
        return
    } else {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
}

//@百分比計算
export function toPercent(num, num2) {
    /* Math.round() 四捨五入 / Math.ceil() 無條件進位 / Math.floor() 無條件捨去 */
    return Math.round((Number(Math.round(num)) / Number(Math.round(num2)) * 10000) / 100)
}

/*--文字相關--*/
//@隱藏文字中間(姓名)
export function hideCenterName(str) {
    let newStr;
    if (str.length === 2) {
        newStr = str.substr(0, 1) + 'O'
    } else if (str.length > 2) {
        let char = '';
        for (let i = 0, len = str.length - 2; i < len; i++) {
            char += '*'
        }
        newStr = str.substr(0, 1) + char + str.substr(-1, 1)
        //取名字首位 + 中間名隱藏 + 取名字最後位子
    }
    return newStr
}

//@隱藏中間身份 ID 號
export function hideCenterID(value) {
    if (value == null || value == '' || value == undefined) {
        return
    } else {
        return value.replace(/^(.{3})(?:\d+)(.{3})$/, "$1****$2")
    }
}

//@判斷字串是否有指定文字
export function IsHaveStr(str, ifStr) {
    //str:字串 , ifStr:指定文字
    if (str.indexOf(ifStr) !== -1) {
        return true
    } else {
        return false
    }
}

//@過濾特殊文字
export function filterSpecialStr(str) {
    var pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g;
    return str.replace(pattern, "");
}

/*--日期--*/
//@增加日期天數
export function addDaysToDate(date, addDay) {
    //date:日期 , addDay:增加的天數
    var res = new Date(date);
    res.setDate(res.getDate() + addDay);
    return res;
}

/*--資料轉換--*/
//@更改 Object Key
export function changeObjectKey(obj, new_key, old_key) {
    Object.keys(obj).forEach(key => {
        if (key === old_key) {
            obj[new_key] = obj[key];
            delete obj[key];
        } else {
            obj[`_${key}`] = obj[key];
            delete obj[key];

            obj[`${key}`] = obj[`_${key}`];
            delete obj[`_${key}`];
        }
    });
}


/*--加解密工具--*/
//AES 加密
export function AES_Encrypt(data, key, iv) {
    //編碼 KEY
    key = CryptoJS.enc.Utf8.parse(key);
    //編碼 IV
    iv = CryptoJS.enc.Utf8.parse(iv);
    //編碼 DATA
    data = CryptoJS.enc.Utf8.parse(data);
    // 加密模式為 CBC 編碼方式為 Pkcs7
    let encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

//AES 解密
export function AES_Decrypt(data, key, iv) {

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    const base64 = CryptoJS.enc.Base64.parse(data);
    const base64Str = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(base64Str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}