import { findRef } from "./utils.js";


export function extractSchema(dirtySchemas){

        const schemaEntries = Object.entries(dirtySchemas);
        
        const schemaQueue = schemaEntries.map(v=>{
                                return { name:v[0], ...v[1] }
                        });
        
        // 완성된 schema가 들어갈 배열
        const schemaSet = {};
        
        while (schemaQueue.length > 0) {
                const targetSchema = schemaQueue.shift();
                const parentName = findRef(targetSchema);

                if(parentName){
                        if(!schemaSet.hasOwnProperty(parentName)) {
                                schemaQueue.push(targetSchema);
                                continue;
                        } else {
                                const parentSchema = schemaSet[parentName];

                                const newSchema = {...parentSchema};

                                newSchema.properties = {...newSchema.properties,...targetSchema.properties};
                                newSchema.name = targetSchema.name;

                                if(targetSchema.hasOwnProperty("required")){
                                        targetSchema["required"].forEach(ele => {
                                                targetSchema.properties[ele].required = true;
                                        });
                                }
                                schemaSet[newSchema.name] = newSchema;
                                continue;
                        }
                }

                // parent없는 schema
                else {
                        if(targetSchema.hasOwnProperty("required")){
                                targetSchema["required"].forEach(ele => {
                                        targetSchema.properties[ele].required = true;
                                });
                        }
                        delete targetSchema.required;
                        schemaSet[targetSchema.name] = targetSchema;
                        continue;
                }
        }
        return schemaSet
        // console.log(schemaSet)
        
}