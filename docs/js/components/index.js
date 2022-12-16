import { ce, cewt, createTitle } from "../utils.js";
import { h1, h2, h3, h4, h5, h6, div, span, ul, li } from '../constant.js';
import SchemaMaker from './schema.js'

export default function createComponents(components) {
        const {contentDescriptors, schemas, examples,links,errors,examplePairingObjects,tags} = components;



        const components_div = ce(div);

        const components_title = createTitle("Components");
        components_div.push(components_title);

        const components_ul = ce(ul);
        components_div.push(components_ul);

        const {schemaSet, schemaHTML} = new SchemaMaker(schemas);
        const components_schema_li = schemaHTML;
        const components_examples_li = ce(li);
        const components_errors_li = ce(li);
        const components_tags_li = ce(li);
        
        components_ul.push(components_schema_li)
        components_ul.push(components_examples_li)
        components_ul.push(components_errors_li)
        components_ul.push(components_tags_li)
        

        
        

        return components_div;
}

