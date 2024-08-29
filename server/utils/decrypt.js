const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // Choose the encryption algorithm
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Key used for encryption/decryption (must be 32 bytes for AES-256)
const iv = Buffer.from(process.env.IV, 'hex'); // Initialization vector (must be 16 bytes)

const decrypt = (encryptedText) => {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { decrypt };
