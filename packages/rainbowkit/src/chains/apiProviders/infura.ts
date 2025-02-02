import { providers } from 'ethers';
import { ApiProvider } from './ApiProvider';

export const defaultInfuraId = '84842078b09946638c03157f83405213';

export const infura = (
  infuraId: string = defaultInfuraId
): ApiProvider<providers.InfuraProvider, providers.InfuraWebSocketProvider> => {
  return function (chain) {
    if (!chain.rpcUrls.infura) {
      return null;
    }

    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.infura}/${infuraId}`,
        },
      },
      provider: () => new providers.InfuraProvider(chain.id, infuraId),
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, infuraId),
    };
  };
};
