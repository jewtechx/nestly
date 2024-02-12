"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models"));
function start(config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appContext = {};
            appContext.models = yield (0, models_1.default)(config.db);
            const app = (0, express_1.default)();
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use("/healthcheck", (req, res) => {
                res.status(200).send("All is green!!!");
            });
            app.listen(config.app.port, () => {
                console.log(`🚀  Server ready at http://localhost:${config.app.port}/graphql`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = start;
