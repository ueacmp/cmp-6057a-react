const devServerUtils = require('react-dev-utils/WebpackDevServerUtils');

const codespaceName = process.env.CODESPACE_NAME;
const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

if (codespaceName && forwardingDomain) {
  const prepareUrls = devServerUtils.prepareUrls;
  devServerUtils.prepareUrls = (protocol, host, port, pathname) => {
    const urls = prepareUrls(protocol, host, port, pathname);

    // Change the printed link only; retain CRA's server and browser settings.
    urls.localUrlForTerminal = `https://${codespaceName}-${port}.${forwardingDomain}${pathname || '/'}`;
    urls.lanUrlForTerminal = undefined;
    return urls;
  };
}

require('react-scripts/scripts/start');
