export { logger, unknownEndpoint };

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "nothing at all" });
};

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(timestamp, req.method, decodeURI(req.url));
  console.log(req.body);

  next();
};
