import { useEffect } from 'react';

const DeveloperMode = () => {
  useEffect(() => {
    let devToolsOpened = false;

    // Function to check if developer tools are open (undocked or docked)
    const checkDevTools = () => {
      const threshold = 160; // typical height of devtools window
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Check for height/width change when dev tools are undocked or docked
      if (width < 800 || height < threshold) {
        devToolsOpened = true;
      }

      // Checking for specific console behavior (detecting overrides)
      const devToolsDetected = /(?:chrome|firefox|edge) devtools/i.test(navigator.userAgent); 


      


      // If we detect dev tools, trigger the action
      if (devToolsOpened || devToolsDetected) {
        alert("Developer tools detected! For security reasons, this action is blocked.");
        throw new Error("Developer tools detected! Blocking access.");
      }
    };

    // Run check when component mounts
    checkDevTools();

    // Continuously check every 100ms if developer tools are open (either docked or undocked)
    const interval = setInterval(checkDevTools, 100);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);
};

export default DeveloperMode;
