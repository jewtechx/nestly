"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const models_1 = tslib_1.__importDefault(require("../models"));
const services_1 = tslib_1.__importDefault(require("../services"));
const log_1 = tslib_1.__importDefault(require("../utils/log"));
function start(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            // setting global context
            const appContext = {};
            // initialize models
            appContext.models = yield (0, models_1.default)(config.db);
            appContext.services = yield (0, services_1.default)(appContext);
            const app = (0, express_1.default)();
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use("/healthcheck", (req, res) => {
                res.status(200).send("All is green!!!");
            });
            app.listen(config.app.port, () => {
                log_1.default.info(`Server ready at http://localhost:${config.app.port}/graphql`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = start;
//# sourceMappingURL=index.js.map