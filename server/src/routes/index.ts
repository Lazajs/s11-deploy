import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = __dirname;
const router = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}.ts`).then((moduleRouter) => {
      router.use(`/api/v1/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
