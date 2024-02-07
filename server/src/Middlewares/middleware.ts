import jwt from "jsonwebtoken";

const unknownEndpoint = (_req, res: any) => {
  res.status(404).send({ error: "nothing at all" });
};

const logger = (
  req: { method: any; url: string; body: any },
  _res: any,
  next: () => void
) => {
  const timestamp = new Date().toISOString();
  console.log(timestamp, req.method, decodeURI(req.url));
  console.log(req.body);

  next();
};

const errorHandler = (err: any, _req, res: any, _next) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

const authenticate = (
  req: { get: (arg0: string) => any; user: string | jwt.JwtPayload },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: string): any; new (): any };
    };
  },
  next: () => void
) => {
  const auth = req.get("Authorization");
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).send("Invalid token");
  }
  const token = auth.substring(7);
  const secret: string = "test";
  try {
    console.log(token);
    const decodedToken = jwt.verify(token, secret);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid token");
  }
};

export { logger, unknownEndpoint, authenticate, errorHandler };
