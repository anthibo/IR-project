"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
exports.default = (random, p = 0.5) => {
    validation_1.numberValidator(p).greaterThanOrEqual(0).lessThan(1);
    return () => {
        return (random.next() + p) | 0;
    };
};
//# sourceMappingURL=bernoulli.js.map