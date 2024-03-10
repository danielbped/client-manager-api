import { Router } from 'express';

const router = Router({ mergeParams: true });

import { readdirSync } from 'fs';

const routesDirectory = require('path').resolve(`${__dirname}`);

readdirSync(routesDirectory).forEach((routeFile: any) => {
  try {
    if (!routeFile.endsWith('.ts')) {
      const func = Object.values(require(`${routesDirectory}/${routeFile}`))[0] as Function;
      func(router);
    }
  } catch (error) {
    console.log(`Encountered Error initializing routes from ${routeFile}`);
  }
});

export default router;