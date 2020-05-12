"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    constructor() {
        this.id = null;
        this.firstName = null;
        this.lastName = null;
        this.userName = null;
        this.email = null;
        this.password = null;
        this.profilePicUrl = null;
        this.bio = null;
        this.isVerified;
    }
    setId(id) {
        this.id = id;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    setProfilePicUrl(profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }
    setBio(bio) {
        this.bio = bio;
    }
    setisVerified(isVerified) {
        this.isVerified = isVerified;
    }
    getId() {
        return this.id;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getUserName() {
        return this.userName;
    }
    getEmail() {
        return this.email;
    }
    getpassword() {
        return this.password;
    }
    getProfilePicUrl() {
        return this.profilePicUrl;
    }
    getBio() {
        return this.bio;
    }
    getIsVerified() {
        return this.isVerified;
    }
}
exports.UserModel = UserModel;
