import { findRef, ce, cewt, createTitle} from "./utils.js";
import { h1, h2, h3, h4, h5, h6, div, span, ul, li } from './constant.js';

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

export function drawSchema(root,schemas){

        const schema_div = ce(div);
        root.push(schema_div)

        //Title
        const schema_head = createTitle('Schemas');
        schema_div.push(schema_head);

        //UL
        const schema_ul = ce(ul);
        schema_div.push(schema_ul);

        for(const key in schemas){
                const schema = schemas[key];
                
                const schema_li = ce(li);
                schema_ul.push(schema_li);

                const schema_name = cewt(span,schema.name);
                schema_li.push(schema_name);
                console.log(schema)
                //single, array, obj 로 나눔.
                
                switch(schema.type){
                        case "object":

                                break;
                        case "array":
                                
                                break;
                        default:
                                
                }

                
        }
        

}