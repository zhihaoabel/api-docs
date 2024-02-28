export let secret = '6f270e90a85d458e8310157ad4605ac0';

/**
 * 给请求体字段排序
 * @param obj 请求体
 * @returns {{}} 排序后的请求体
 */
export const sortFields = (obj) => {
    let result = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
        result[key] = obj[key];
    }
    return result;
};

/**
 * 拼接请求体中的字符串
 * @param obj 请求体对象
 * @param filter 不参与签名字段
 * @returns {string} 拼接后的结果
 */
function concatObjectValues(obj, filter = []) {
    let result = '';
    for (let key in obj) {
        // skip this key and move to the next iteration
        if (filter.includes(key)) {
            continue;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // If the value is an object, concatenate its stringified values
            result += JSON.stringify(obj[key]);
        } else if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== null) {
            // If the value is not an object, directly concatenate it
            result += obj[key];
        }
    }
    return result;
}

/**
 * 生成签名
 *
 * @param {string} message - The message to be hashed.
 * @param {string} [confusion] - An optional string used for additional confusion. If not provided,
 * Abel's private key will be used as the default value.
 * @returns {Promise<string>} The hashed message as a hexadecimal string.
 */
const hash = async (message, confusion) => {

    const byte2Hex = (bytes) => {
        let hexString = '';

        for (const value of bytes) {
            let hexValue = (value & 0xFF).toString(16);

            if (hexValue.length === 1) {
                hexValue = '0' + hexValue;
            }

            hexString += hexValue;
        }

        return hexString;
    };

    let encryptedMessage = null;
    const algorithm = 'SHA-256';

    // Default value is Abel's private key
    confusion = typeof confusion === 'string' && confusion.trim() !== ''
        ? confusion
        : secret;

    try {
        // Convert the message and confusion to ArrayBuffer
        const encoder = new TextEncoder();
        const messageBuffer = encoder.encode(message + confusion);

        // Hash the concatenated buffer
        const hashBuffer = await crypto.subtle.digest(algorithm, messageBuffer);

        // Convert the hash to a hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        encryptedMessage = byte2Hex(hashArray);

    } catch (error) {
        console.error(`Error while hashing message: ${error.message}`);
    }

    return encryptedMessage;
};

export const requestGen = async (requestBody, filter = []) => {
    let sortedRequest = sortFields(requestBody);
    const concatenatedFields = concatObjectValues(sortedRequest, filter=['sign']);

    sortedRequest['sign'] = await hash(concatenatedFields);


    return sortedRequest;
}