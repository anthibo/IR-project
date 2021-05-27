"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
exports.default = (random, p = 0.5) => {
    validation_1.numberValidator(p).greaterThan(0).lessThan(1);
    const invLogP = 1.0 / Math.log(1.0 - p);
    return () => {
        return (1 + Math.log(random.next()) * invLogP) | 0;
    };
};
//# sourceMappingURL=geometric.js.map