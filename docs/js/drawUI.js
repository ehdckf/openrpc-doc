import { extractSchema } from "./schemaMaker.js";

import {h1,h2,h3,h4,h5,h6,div,span,ul,li } from './constant.js';

import { findRef, getRefName, cewt} from './utils.js'

import { postData }from './startTest.js'

export default async function drawUI(){
        const jsonRequest = await fetch('http://localhost:3000/docs/openrpc.json');
        const json = await jsonRequest.json();
        const mainServer = json.servers[0].url;

        const main_div = document.querySelector('#main');

        //===title
        const name_h1 = cewt(h1, json.info.title);
        main_div.appendChild(name_h1);

        //===server
        const server_div = document.createElement(div)
        main_div.appendChild(server_div);

        //==========server head
        const servers_h1 = cewt(h1, 'Servers');
        server_div.appendChild(servers_h1);

        //==========server ul
        const servers_ul = document.createElement(ul);
        server_div.appendChild(servers_ul);

        //===================server li 
        json.servers.forEach(s => {
                const { url } = s;
                const server_li = cewt(li, url);
                servers_ul.appendChild(server_li);
        })






        // const data = {
        //         "jsonrpc": "2.0",
        //         "method": "someMethod",
        //         "id": 1234
        // }

        // const test = await postData(server,data);
        // console.log(test);






        //=== methods
        const methods_div = document.createElement(div);
        main_div.appendChild(methods_div)

        //components
        const components_div = document.createElement(div);
        main_div.appendChild(components_div);

        const schemas = extractSchema(json.components.schemas);
        console.log(schemas)

        


        //===========methods head 
        const methods_h1 = cewt(h1, 'Methods');
        methods_div.appendChild(methods_h1);


        //==========methods ul
        const methods_ul = document.createElement(ul);
        methods_div.appendChild(methods_ul);

        //===================server li 
        json.methods.sort().forEach(m => {
                const method_li = document.createElement(li);
                methods_ul.appendChild(method_li);

                const method_name = cewt(h2, m.name);
                method_li.appendChild(method_name);

                const method_description = cewt(div, m.description);
                method_li.appendChild(method_description);


                const params_div = document.createElement(div);
                method_li.appendChild(params_div);

                const params_head = cewt(h4, "Params");
                params_div.appendChild(params_head);

                const params_ul = document.createElement(ul);
                params_div.appendChild(params_ul);

                m.params.forEach(p => {
                        const param_li = document.createElement(li);
                        params_ul.appendChild(param_li);

                        const param_head = document.createElement(div);
                        param_li.appendChild(param_head);

                        const param_name = cewt(span, p.name);
                        param_head.appendChild(param_name);

                        const param_required = p.required ? cewt(span, 'required') : cewt(span, 'option');
                        param_required.style.padding = '0px 7px';
                        param_required.style.color = p.required ? `red` : `#bbb`;
                        param_head.appendChild(param_required);

                        const description_contetnt = p.description ?? "";

                        const param_description = cewt(div, description_contetnt);
                        param_li.appendChild(param_description);


                        const param_schema = document.createElement(div);
                        param_li.appendChild(param_schema);

                        const param_schema_head = cewt(div, 'schema');
                        param_schema.appendChild(param_schema_head);

                        const param_schema_body = document.createElement(div);


                        const ref = findRef(p.schema);

                        if (p.schema?.type == 'array') {
                                param_schema_body.innerText = ref == null ? p.schema.items.type + "[]" : ref + "[]";
                        } else {
                                param_schema_body.innerText = ref == null ? p.schema.type : ref;
                        }
                        param_schema.appendChild(param_schema_body)

                        //TODO:schema ref처리
                        //methods보다 components를 먼저 처리해야됨. 
                })


                const result_div = document.createElement(div);
                method_li.appendChild(result_div);

                const result_head = cewt(h4, "Result");
                result_div.appendChild(result_head);

                const result_name = cewt(div, m.result.name);
                result_div.appendChild(result_name);

                const result_description = cewt(div, m.result.description);
                result_div.appendChild(result_description);


                const result_schema = document.createElement(div);
                result_div.appendChild(result_schema);

                const result_schema_head = cewt(div, 'schema');
                result_schema.appendChild(result_schema_head);

                const result_schema_body = document.createElement(div);

                const ref = findRef(m.result.schema);

                if (m.result.schema?.type == 'array') {
                        result_schema_body.innerText = ref==null ? m.result.schema.items.type + "[]": ref+'[]';
                } else {
                        result_schema_body.innerText = ref == null? m.result.schema.type : ref;
                }
                result_schema.appendChild(result_schema_body)

                //TODO:schema ref처리
                //methods보다 components를 먼저 처리해야됨.
        })
}