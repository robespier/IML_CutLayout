import { CSInterface } from "CSInterface";

const cs = new CSInterface();

const command: CEPCommand = {
  handler: "foo",
  data: {
    bar: 42,
  },
};

const responseHandler = (result) => {
  try {
    JSON.parse(result);
  } catch (err) {
    console.error(result, err);
  }
};

cs.evalScript(`marshal(${JSON.stringify(command)})`, responseHandler);
