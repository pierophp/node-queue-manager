"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JobResponse {
    constructor(data) {
        Object.keys(data).forEach((key) => {
            this[key] = data[key];
        });
    }
}
exports.JobResponse = JobResponse;
//# sourceMappingURL=job.response.js.map