// global.d.ts
interface Window {
    AeroPay: {
      init: (config: { env: string }) => void;
      button: (config: {
        forceIframe?: boolean;
        location: string;
        type: string;
        uuid?: string;
        onSuccess: (uuid: string) => void;
        onError: (event: any) => void;
        onEvent?: (event: any) => void;
      }) => {
        render: (containerId: string) => void;
        launch: (amount: string) => void;
      };
    };
  }
  