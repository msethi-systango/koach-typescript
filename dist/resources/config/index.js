"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigurationManager_1 = require("./ConfigurationManager");
const configurationManager = new ConfigurationManager_1.ConfigurationManager(true);
let configurationDetails = configurationManager.getConfigurationDetails();
exports.default = configurationDetails;
