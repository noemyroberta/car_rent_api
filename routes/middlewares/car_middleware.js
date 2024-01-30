const routeMiddleware = (req, _, next) => {
    const carUuid = req.headers['uuid'];

    if (carUuid) {
        req.routeType = 'getCarByUuid';
    } else {
        req.routeType = 'getAll';
    }

    next();
};

modules.export = routeMiddleware;