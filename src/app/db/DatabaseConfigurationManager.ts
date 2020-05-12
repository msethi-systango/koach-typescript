import mongoose from "mongoose";
export class DatabaseConfigurationManager {
    modelDirPath: string;
    constructor(modelDirPath: string){
        this.modelDirPath = modelDirPath
    }
    loadDatabaseModels(): {} {
        mongoose.connect(this.modelDirPath)
        console.log('Connected')
        return
    }
}