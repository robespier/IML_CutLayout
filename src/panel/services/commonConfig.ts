/**
 * Wraps common config in Angular DI model
 */
import { app } from "../index";
import { config } from "../../config";

app.value("CommonConfig", config);
