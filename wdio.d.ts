declare module WebdriverIO {
    interface Element {
      waitForAnAttribute: (attribute: string, value: string) => Promise<void>;
    //   waitAndClick: () => void;
  
    }
    interface Browser {
        waitForAPageToLoad: () => Promise<void>;
      // waitAndClick: (el:WebdriverIO.Element) => void;
      // you can add commands here too
      // waitAndClick: () => void;
    }
  }