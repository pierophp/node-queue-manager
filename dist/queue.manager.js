"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const queue_manager_options_1 = require("./queue.manager.options");
const bull_job_1 = require("./jobs/bull.job");
const jobTypes = {
    BullJob: bull_job_1.BullJob,
};
class QueueManager {
    constructor(queueManagerOptions) {
        this.defaultOptions = {
            redis: {
                port: 6379,
            },
            type: 'Bull',
        };
        if (!queueManagerOptions) {
            queueManagerOptions = new queue_manager_options_1.QueueManagerOptions();
        }
        queueManagerOptions = this.mergeOptions(queueManagerOptions);
        this.options = queueManagerOptions;
        const jobName = `${queueManagerOptions.type}Job`;
        this.job = new jobTypes[jobName](queueManagerOptions);
    }
    mergeOptions(options) {
        return lodash_1.merge(new queue_manager_options_1.QueueManagerOptions(), this.defaultOptions, options);
    }
    publish(queue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.job.publish(queue);
        });
    }
    listen(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.job.listen(queue, callback);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.job.close();
        });
    }
}
exports.QueueManager = QueueManager;
//# sourceMappingURL=queue.manager.js.map