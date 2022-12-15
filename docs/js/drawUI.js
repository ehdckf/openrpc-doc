import { extractSchema, drawSchema } from "./schemaMaker.js";

import { h1, h2, h3, h4, h5, h6, div, span, ul, li } from './constant.js';

import { findRef, getRefName, ce,cewt, checkEmptyObj,createTitle } from './utils.js'

import { postData } from './startTest.js'

export default async function drawUI() {
        const jsonRequest = await fetch('http://localhost:3000/docs/openrpc.json');
        const json = await jsonRequest.json();
        const mainServer = json.servers[0].url;
        const schemas = extractSchema(json.components.schemas);

        const main_div = document.querySelector('#main');

        main_div.push = (item) => {
                main_div.appendChild(item)
        }

        //===title
        const name_h1 = createTitle(json.info.title);
        main_div.push(name_h1);

        //===server
        const server_div = ce(div)
        main_div.push(server_div);

        //==========server head
        const servers_h1 = createTitle('Servers');
        server_div.push(servers_h1);

        //==========server ul
        const servers_ul = ce(ul);
        server_div.push(servers_ul);

        //===================server li 
        json.servers.forEach(s => {
                const { url } = s;
                const server_li = cewt(li, url);
                servers_ul.push(server_li);
        })



        //=== methods
        const methods_div = ce(div);
        main_div.push(methods_div)

        //components
        const components_div = ce(div);
        main_div.push(components_div);




        //===========methods head 
        const methods_h1 = createTitle('Methods');
        methods_div.push(methods_h1);


        //==========methods ul
        const methods_ul = ce(ul);
        methods_div.push(methods_ul);

        //===================server li 
        json.methods.sort().forEach(m => {
                const method_li = ce(li);
                methods_ul.push(method_li);

                const method_name = cewt(h2, m.name);
                method_li.push(method_name);

                const method_description = cewt(div, m.description);
                method_li.push(method_description);


                const params_div = ce(div);
                method_li.push(params_div);

                const params_head = cewt(h4, "Params");
                params_div.push(params_head);

                const params_ul = ce(ul);
                params_div.push(params_ul);

                m.params.forEach(p => {
                        const param_li = ce(li);
                        params_ul.push(param_li);

                        const param_head = ce(div);
                        param_li.push(param_head);

                        const param_name = cewt(span, p.name);
                        param_head.push(param_name);

                        const param_required = p.required ? cewt(span, 'required') : cewt(span, 'option');
                        param_required.style.padding = '0px 7px';
                        param_required.style.color = p.required ? `red` : `#bbb`;
                        param_head.push(param_required);

                        const description_contetnt = p.description ?? "";

                        const param_description = cewt(div, description_contetnt);
                        param_li.push(param_description);


                        const param_schema = ce(div);
                        param_li.push(param_schema);

                        const param_schema_head = cewt(div, 'schema');
                        param_schema.push(param_schema_head);

                        const param_schema_body = ce(div);


                        const ref = findRef(p.schema);

                        if (p.schema?.type == 'array') {
                                param_schema_body.innerText = ref == null ? p.schema.items.type + "[]" : ref + "[]";
                        } else {
                                param_schema_body.innerText = ref == null ? p.schema.type : ref;
                        }
                        param_schema.push(param_schema_body)


                })


                const result_div = ce(div);
                method_li.push(result_div);

                const result_head = cewt(h4, "Result");
                result_div.push(result_head);

                if(m.result.name){
                        const result_name = cewt(div, m.result.name);
                        result_div.push(result_name);
                }

                if(m.result.description){
                        const result_description = cewt(div, m.result.description);
                        result_div.push(result_description);
                }


                const result_schema = ce(div);
                result_div.push(result_schema);

                const result_schema_head = cewt(div, 'schema');
                result_schema.push(result_schema_head);

                const result_schema_body = ce(div);
                const ref = findRef(m.result?.schema);

                if (checkEmptyObj(m.result.schema)) {
                        result_schema_body.innerText = '{ }'
                } else {
                        if (m.result.schema?.type == 'array') {
                                result_schema_body.innerText = ref == null ? m.result.schema.items.type + "[]" : ref + '[]';
                        } else {
                                result_schema_body.innerText = ref == null ? m.result.schema.type : ref;
                        }
                }
                result_schema.push(result_schema_body)
        })

        drawSchema(main_div, schemas)
}