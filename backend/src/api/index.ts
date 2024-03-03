import "./mutation";
import "./query";
import "./subscription";
import "./types";

import { builder } from "./builder";

export const schema = builder.toSchema();
