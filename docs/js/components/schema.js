import { ce, cewt, findAllRefs } from "../utils.js";
import { h1, h2, h3, h4, h5, h6, div, span, ul, li } from '../constant.js';

export default class SchemaMaker {

        constructor(schemas) {
                this.schemaSet = {};
                this.schemaHTML = ce(li);
                this.schemas = schemas;
                this.createSchemaSet();
                this.createSchemaHTML();
        }


        createSchemaSet() {

                const schemaEntries = Object.entries(this.schemas);
                const schemaQueue = schemaEntries.map(v => {
                        return { name: v[0], ...v[1] }
                });
                

                while (schemaQueue.length > 0) {
                        const schema = schemaQueue.shift();
                        const schemaRefs = findAllRefs(schema);

                        if(schemaRefs.length>0){
                                if(this.isExistRef(schemaRefs)){
                                        this.schemaSet[schema.name] = schema;
                                
                                }else{
                                        schemaQueue.push(schema);
                                }
                        }else{        
                                
                                this.schemaSet[schema.name] =  schema;
                        }
                }

        }

        isExistRef(refs) {
                for (let i = 0; i < refs.length; i++) {
                        const ref = refs[i];
                        if (!this.schemaSet.hasOwnProperty(ref)) {
                                return false;
                        }
                }
                return true;
        }

        createSchemaHTML() {
                const schemas_title = cewt(h3, "Schema");
                this.schemaHTML.push(schemas_title);

                const schemas_ul = ce(ul)
                this.schemaHTML.push(schemas_ul);

        }

}