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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendgrid_1 = __importDefault(require("sendgrid"));
const helper = __importStar(require("sendgrid/lib/helpers/mail/mail"));
class SendMail {
    constructor() { }
    sendMail(from, to, esubject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailer = sendgrid_1.default('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');
            const email = new helper.Mail();
            const fromEmail = new helper.Email(from);
            email.setFrom(fromEmail);
            email.setSubject(esubject);
            const content = new helper.Content('text/html', html);
            email.addContent(content);
            const personalization = new helper.Personalization();
            const toEmail = new helper.Email(to);
            personalization.addTo(toEmail);
            email.addPersonalization(personalization);
            const request = mailer.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: email.toJSON()
            });
            try {
                yield new Promise(function (resolve, reject) {
                    mailer.API(request, (error, response) => {
                        if (error) {
                            console.log('Error', error);
                            reject();
                        }
                        else {
                            console.log(response.statusCode);
                            console.log(response.body);
                            console.log(response.headers);
                            resolve();
                        }
                    });
                });
                return 1;
            }
            catch (e) {
                return 0;
            }
        });
    }
}
exports.SendMail = SendMail;
