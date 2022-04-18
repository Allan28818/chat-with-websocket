import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(4000, () => console.log("Server is running :)"));
