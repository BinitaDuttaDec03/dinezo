import path from "path";
import DataUriParser from "datauri/parser.js";

const getBuffer = (file: any) => {
  const parser = new DataUriParser();

  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export default getBuffer;
