"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationManager {
    constructor(isReadFromEnv = false) {
        if (isReadFromEnv) {
            require('dotenv').config();
        }
        let env = process.env.NODE_ENV || 'development';
        this.configurationDetails = Object.assign({}, require(`./env.${env}`).default, require('./env.common').default);
    }
    getConfigurationDetails() {
        return this.configurationDetails;
    }
}
exports.ConfigurationManager = ConfigurationManager;
