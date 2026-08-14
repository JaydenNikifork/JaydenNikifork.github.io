/* exported createPaymentCredential */
/* exported onBuyClicked */
/* exported onBuyWithoutLocalesClicked */
/* exported onBuyWithEmptyLocalesClicked */

/**
 * Parses a string input into an array of locale language tags.
 * Supports formats such as "[en-US, en-CA, fr-CA]", "['en-US', 'en-CA']",
 * '["en-US", "en-CA"]', "en-US, en-CA", or "[]".
 */
function parseLocales(rawInput) {
  if (rawInput === undefined || rawInput === null) {
    return [];
  }
  let trimmedInput = rawInput.trim();
  if (!trimmedInput) {
    return [];
  }
  if (trimmedInput.startsWith('[') && trimmedInput.endsWith(']')) {
    trimmedInput = trimmedInput.substring(1, trimmedInput.length - 1).trim();
  }
  if (!trimmedInput) {
    return [];
  }
  return trimmedInput
      .split(',')
      .map(tag => tag.trim().replace(/^['"]|['"]$/g, '').trim())
      .filter(tag => tag.length > 0);
}

/**
 * Creates a payment credential.
 */
async function createPaymentCredential(windowLocalStorageIdentifier) {
  try {
    const publicKeyCredential = await createCredential(/* setPaymentExtension = */ true);
    console.log(publicKeyCredential);
    window.localStorage.setItem(
        windowLocalStorageIdentifier,
        arrayBufferToBase64(publicKeyCredential.rawId));
    info(
        windowLocalStorageIdentifier + ' enrolled: ' +
        objectToString(publicKeyCredential));
  } catch (err) {
    error(err);
  }
}

/**
 * Launches payment request for SPC with locales.
 */
async function onBuyClicked(windowLocalStorageIdentifier, explicitLocales) {
  try {
    const credentialIdBase64 = window.localStorage.getItem(windowLocalStorageIdentifier);
    const credentialIds = credentialIdBase64 ? [base64ToArray(credentialIdBase64)] : [new Uint8Array(16)];
    const locales = explicitLocales !== undefined
        ? explicitLocales
        : parseLocales(document.getElementById('locales').value);

    let spcData = {
      credentialIds,
    };
    if (locales !== undefined) {
      spcData.locales = locales;
    }

    info('Triggering SPC with locales: ' + JSON.stringify(locales));
    const request = await createSPCPaymentRequest(spcData);

    try {
      const canMakePayment = await request.canMakePayment();
      info(`canMakePayment result: ${canMakePayment}`);
    } catch (err) {
      error(`Error from canMakePayment: ${err.message}`);
    }

    const instrumentResponse = await request.show();
    await instrumentResponse.complete(/* result = */ 'success');
    console.log(instrumentResponse);
    info(
        windowLocalStorageIdentifier + ' payment response: ' +
        objectToString(instrumentResponse));
  } catch (err) {
    error(err);
  }
}

/**
 * Launches payment request for SPC without locales parameter.
 */
async function onBuyWithoutLocalesClicked(windowLocalStorageIdentifier) {
  try {
    const credentialIdBase64 = window.localStorage.getItem(windowLocalStorageIdentifier);
    const credentialIds = credentialIdBase64 ? [base64ToArray(credentialIdBase64)] : [new Uint8Array(16)];

    info('Triggering SPC without locales parameter.');
    const request = await createSPCPaymentRequest({
      credentialIds,
    });

    try {
      const canMakePayment = await request.canMakePayment();
      info(`canMakePayment result: ${canMakePayment}`);
    } catch (err) {
      error(`Error from canMakePayment: ${err.message}`);
    }

    const instrumentResponse = await request.show();
    await instrumentResponse.complete(/* result = */ 'success');
    console.log(instrumentResponse);
    info(
        windowLocalStorageIdentifier + ' payment response: ' +
        objectToString(instrumentResponse));
  } catch (err) {
    error(err);
  }
}

/**
 * Launches payment request for SPC with empty locales array.
 */
async function onBuyWithEmptyLocalesClicked(windowLocalStorageIdentifier) {
  return onBuyClicked(windowLocalStorageIdentifier, /* explicitLocales = */ []);
}

if (window.PublicKeyCredential) {
  if (PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then((available) => {
          info(`isUserVerifyingPlatformAuthenticatorAvailable: ${available}`);
        })
        .catch((err) => {
          error(`Error when calling isUserVerifyingPlatformAuthenticatorAvailable: ${err.message}`);
        });
  } else {
    error('PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable method not detected.');
  }
} else {
  error('PublicKeyCredential interface not detected.');
}

if (window.PaymentRequest && PaymentRequest.securePaymentConfirmationAvailability) {
  PaymentRequest.securePaymentConfirmationAvailability()
      .then((available) => {
        info(`PaymentRequest.securePaymentConfirmationAvailability: ${available}`);
      })
      .catch((err) => {
        error(`Error when calling PaymentRequest.securePaymentConfirmationAvailability: ${err.message}`);
      });
} else {
  info('PaymentRequest.securePaymentConfirmationAvailability method not available.');
}
