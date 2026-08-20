/* exported createPaymentCredential */
/* exported onCanMakePaymentClicked */
/* exported onShowClicked */
/* exported onCanMakePaymentWithoutLocalesClicked */
/* exported onShowWithoutLocalesClicked */
/* exported onCanMakePaymentWithEmptyLocalesClicked */
/* exported onShowWithEmptyLocalesClicked */

/**
 * Formats an error object to include its name and message.
 */
function formatError(err) {
  if (!err) {
    return 'Unknown error';
  }
  if (err.name && err.message) {
    return `${err.name}: ${err.message}`;
  }
  if (err.name) {
    return err.name;
  }
  if (err.message) {
    return err.message;
  }
  return String(err);
}

/**
 * Prints formatted error to the page log and console.
 */
function printError(err, prefix = '') {
  const formattedErrorMessage = formatError(err);
  const fullErrorMessage = prefix
      ? `${prefix} - ${formattedErrorMessage}`
      : formattedErrorMessage;
  console.error(err);
  error(fullErrorMessage);
}

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
 * Builds an SPC PaymentRequest object.
 */
function buildSPCPaymentRequest(windowLocalStorageIdentifier, explicitLocales) {
  const credentialIdBase64 = window.localStorage.getItem(windowLocalStorageIdentifier);
  const credentialIds = credentialIdBase64
      ? [base64ToArray(credentialIdBase64)]
      : [new Uint8Array(16)];
  const locales = explicitLocales !== undefined
      ? explicitLocales
      : parseLocales(document.getElementById('locales').value);

  let spcData = {
    credentialIds,
  };
  if (locales !== undefined) {
    spcData.locale = locales;
  }

  info('Building SPC PaymentRequest with locales: ' + JSON.stringify(locales));
  return createSPCPaymentRequest(spcData);
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
    printError(err, 'Enrollment failed');
  }
}

/**
 * Calls canMakePayment() for SPC with locales.
 */
async function onCanMakePaymentClicked(windowLocalStorageIdentifier, explicitLocales) {
  try {
    const request = buildSPCPaymentRequest(windowLocalStorageIdentifier, explicitLocales);
    const canMakePaymentResult = await request.canMakePayment();
    info(`canMakePayment result: ${canMakePaymentResult}`);
  } catch (err) {
    printError(err, 'canMakePayment error');
  }
}

/**
 * Calls show() for SPC with locales.
 */
async function onShowClicked(windowLocalStorageIdentifier, explicitLocales) {
  try {
    const request = buildSPCPaymentRequest(windowLocalStorageIdentifier, explicitLocales);
    const instrumentResponse = await request.show();
    await instrumentResponse.complete(/* result = */ 'success');
    console.log(instrumentResponse);
    info(
        windowLocalStorageIdentifier + ' payment response: ' +
        objectToString(instrumentResponse));
  } catch (err) {
    printError(err, 'show error');
  }
}

/**
 * Calls canMakePayment() for SPC without locales parameter.
 */
async function onCanMakePaymentWithoutLocalesClicked(windowLocalStorageIdentifier) {
  try {
    const credentialIdBase64 = window.localStorage.getItem(windowLocalStorageIdentifier);
    const credentialIds = credentialIdBase64
        ? [base64ToArray(credentialIdBase64)]
        : [new Uint8Array(16)];

    info('Building SPC PaymentRequest without locales parameter.');
    const request = createSPCPaymentRequest({credentialIds});
    const canMakePaymentResult = await request.canMakePayment();
    info(`canMakePayment result: ${canMakePaymentResult}`);
  } catch (err) {
    printError(err, 'canMakePayment error');
  }
}

/**
 * Calls show() for SPC without locales parameter.
 */
async function onShowWithoutLocalesClicked(windowLocalStorageIdentifier) {
  try {
    const credentialIdBase64 = window.localStorage.getItem(windowLocalStorageIdentifier);
    const credentialIds = credentialIdBase64
        ? [base64ToArray(credentialIdBase64)]
        : [new Uint8Array(16)];

    info('Building SPC PaymentRequest without locales parameter.');
    const request = createSPCPaymentRequest({credentialIds});
    const instrumentResponse = await request.show();
    await instrumentResponse.complete(/* result = */ 'success');
    console.log(instrumentResponse);
    info(
        windowLocalStorageIdentifier + ' payment response: ' +
        objectToString(instrumentResponse));
  } catch (err) {
    printError(err, 'show error');
  }
}

/**
 * Calls canMakePayment() for SPC with empty locales array.
 */
async function onCanMakePaymentWithEmptyLocalesClicked(windowLocalStorageIdentifier) {
  return onCanMakePaymentClicked(windowLocalStorageIdentifier, /* explicitLocales = */ []);
}

/**
 * Calls show() for SPC with empty locales array.
 */
async function onShowWithEmptyLocalesClicked(windowLocalStorageIdentifier) {
  return onShowClicked(windowLocalStorageIdentifier, /* explicitLocales = */ []);
}

if (window.PublicKeyCredential) {
  if (PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then((available) => {
          info(`isUserVerifyingPlatformAuthenticatorAvailable: ${available}`);
        })
        .catch((err) => {
          printError(err, 'isUserVerifyingPlatformAuthenticatorAvailable error');
        });
  } else {
    printError({name: 'NotDetected', message: 'PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable method not detected.'});
  }
} else {
  printError({name: 'NotDetected', message: 'PublicKeyCredential interface not detected.'});
}

if (window.PaymentRequest && PaymentRequest.securePaymentConfirmationAvailability) {
  PaymentRequest.securePaymentConfirmationAvailability()
      .then((available) => {
        info(`PaymentRequest.securePaymentConfirmationAvailability: ${available}`);
      })
      .catch((err) => {
        printError(err, 'PaymentRequest.securePaymentConfirmationAvailability error');
      });
} else {
  info('PaymentRequest.securePaymentConfirmationAvailability method not available.');
}
