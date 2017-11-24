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
const Bull = require("bull");
const job_abstract_1 = require("./job.abstract");
const job_response_1 = require("./job.response");
const redis_not_configured_error_1 = require("../errors/redis.not.configured.error");
const instances = {};
class BullJob extends job_abstract_1.JobAbstract {
    constructor(options) {
        super(options);
        this.closed = false;
    }
    getInstance(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (!this.options.redis) {
            throw new redis_not_configured_error_1.RedisNotConfiguredError();
        }
        const bullQueue = new Bull(name, {
            redis: {
                port: this.options.redis.port,
                host: this.options.redis.host,
            },
        });
        instances[name] = bullQueue;
        return bullQueue;
    }
    publish(queue) {
        return __awaiter(this, void 0, void 0, function* () {
            const bullQueue = this.getInstance(queue.getName());
            const bullJobReponse = yield bullQueue.add(queue.getData());
            return new job_response_1.JobResponse({ id: bullJobReponse.id });
        });
    }
    listen(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const bullQueue = this.getInstance(queue.getName());
            return new Promise((done) => {
                bullQueue.process(queue.getConcurrency(), (job, jobDone) => __awaiter(this, void 0, void 0, function* () {
                    yield queue.run(job.data);
                    if (callback) {
                        callback(new job_response_1.JobResponse({ id: job.id }));
                    }
                    jobDone();
                }));
                const interval = setInterval(() => {
                    if (this.closed) {
                        done();
                        clearInterval(interval);
                    }
                }, 1000);
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const instance of Object.keys(instances)) {
                yield instances[instance].close();
            }
            this.closed = true;
        });
    }
}
exports.BullJob = BullJob;
//# sourceMappingURL=bull.job.js.map