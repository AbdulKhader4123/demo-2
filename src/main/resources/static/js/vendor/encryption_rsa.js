function encryptData(cardNumber, expiry, pin, modulus, exponent) {

	cardNumber = cardNumber.replace(/\s/g, '');
	var strClearPINBlock = getClearPINblock(cardNumber, pin);
	var encryptedPinBlock = rsa_encrypt(strClearPINBlock, modulus, exponent);

	//convert expiry date to format yymm
	var expiry = expiry.substr(2, 2) + expiry.substr(0, 2);
	var cardData = ";" + cardNumber + "=" + expiry + "?";
	var encryptedCardDataBlock = rsa_encrypt(cardData, modulus, exponent);

	var encryptedData = {
		cardNumber: encryptedCardDataBlock,
		pinNumber: encryptedPinBlock
	}
	console.log("encrypted card data " + encryptedCardDataBlock);
	console.log("encrypted pin data " + encryptedPinBlock);
	return encryptedData;
}

function toDecVal(hexDigit) {
	var strHexDigits = "0123456789ABCDEF";
	return strHexDigits.indexOf(hexDigit);
}

function toHexDigit(decVal) {
	var strHexDigits = "0123456789ABCDEF";
	return strHexDigits.charAt(decVal);
}

function rsa_encrypt(plaintext, modulus, exponent) {
	// var pubkey_Modulus = `D8A572FC120B018A0BE3C33732BC51F470D39A0C1D8282EB8AA62CDF63101ECCFF7720DD6B7B06AD25B6E4BC2F1AFEB48F993C25A45578503AF4EEA888BDAF24889E0BBC0E342601E9019899DD855C7FC920B0E11D51F401C605A4BF0928712F32D63479057748DB1E6FC125F4DEE023A69575A3C57BC972D32C9A293A58B88F6AB1127513A9EAE61FD42EE2C17AA09B2347EEB223511796236E6209636DEE29B14AA315370BDE0F0FC5E5BEEE89C140ECF2BA657DB6A3550B470FFA7BC2DE0442FE6596602972A311D37065977ED7AADF48E239ED376266E12F7735EA9CC5D74118171FAB18697BD65428638394B5D12345D4B7FBB69596D4F60648C6E11837`;
	// var pubkey_Exponent = "10001";
	var pubkey_Modulus = modulus;
	var pubkey_Exponent = exponent;
	var rsa = new RSAKey();
	rsa.setPublic(linebrk(pubkey_Modulus, 2048), pubkey_Exponent);
	return hex2b64(rsa.encrypt(plaintext));
}

function getClearPINblock(cardnumber, pin) {
	// Format used is: ISO 95641 - format 0

	var _cardnumber = cardnumber.trim();
	var lenCardNumber = _cardnumber.length;
	var _pin = pin.trim();
	var lenPIN = _pin.length;

	var padding = new Array(17).join('F');
	var hexStr1, hexStr2, decVal1, decVal2;
	var strResult = "";

	try {
		// Set hexStr1
		hexStr1 = "0" + toHexDigit(lenPIN) + _pin;
		hexStr1 += padding.substr(hexStr1.length);

		// Set hexStr2
		hexStr2 = "0000" + _cardnumber.substr(lenCardNumber - 13, 12);

		// XOR hexStr1 and hexStr2
		for (i = 0; i < 16; i++) {
			decVal1 = toDecVal(hexStr1.charAt(i));
			decVal2 = toDecVal(hexStr2.charAt(i));
			strResult += toHexDigit(decVal1 ^ decVal2);
		}
	}
	catch (e) {
		alert("Error occured");
		strResult = e.toString();
	}

	return strResult;
}
