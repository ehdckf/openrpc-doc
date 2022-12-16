import { ce, cewt, createTitle,getRefName,postData } from "./utils.js";
import { h1, h2, h3, h4, h5, h6, div, span, ul, li, a, button } from './constant.js';


export default class MethodsMaker{

        constructor(methods,server){
                this.methods = methods;
                this.server = server;
                this.methods_div = ce(div);
                this.init();
        }

        init(){
                const methods_title = createTitle("Methods");
        
                const methods_ul = ce(ul);
        
                this.methods.forEach(method => {
                        const method_li = this.createMethodItem(method)
                        methods_ul.push(method_li);
        
                });
                //result
                this.methods_div.push(methods_title);
                this.methods_div.push(methods_ul);
        }

        createMethodItem(method) {
                const method_li = ce(li);
        
                const method_head = ce(div);
                method_li.push(method_head);
        
                
                //======= Name, Summury
                const method_name = cewt(span, method.name);
                const method_summary = cewt(span, method.summary);
                method_head.push(method_name);
                method_head.push(method_summary);
        
                
                //======= Description
                const method_description = cewt(div, method.description);
                method_li.push(method_description);
                
                //======= Params
                const params_div = ce(div);
                method_li.push(params_div);
        
                const params_title = cewt(h4, "Params");
                params_div.push(params_title);
        
                const parmas_ul = ce(ul);
                params_div.push(parmas_ul);
        
                method.params.forEach(param => {
                        const param_li = this.createParam(param);
                        parmas_ul.push(param_li);
                })

                //======= Result



                //======= Test

                const test_div = this.createMethodTest(method);

                method_li.push(test_div);

                return method_li;
        }

         createParam(param) {
                const param_li = ce(li);
        
                const param_head = ce(div);
        
                const param_name = cewt(span, param.name);
                const param_required = param.required ? cewt(span, 'required') : cewt(span, 'option');
                param_required.style.padding = '0px 7px';
                param_required.style.color = param.required ? `red` : `#bbb`;
                const param_summary = cewt(span, param.summary);
                param_summary.style.padding = '0px 7px';
                param_head.push(param_name)
                param_head.push(param_required);
                param_head.push(param_summary);
                param_li.push(param_head);
        
                const param_description = cewt(div, param.description);
                param_li.push(param_description);
        
                const param_schema = ce(div);
                param_li.push(param_schema);
        
                const param_schema_head = cewt(div, 'schema');
                const param_schema_body = this.createParamSchema(param.schema);
                param_schema.push(param_schema_head);
                param_schema.push(param_schema_body);
        
        
                return param_li;
        }

         createParamSchema(schema){
                const params_schema_body = ce(div);
                if(schema.hasOwnProperty("$ref")){
                        const schema_a = cewt(a, getRefName(schema.$ref));
                        schema_a.href = schema.$ref;
                        params_schema_body.push(schema_a)
                }else if(schema.type=='array'){
        
                        if(schema.items.hasOwnProperty("$ref")){
                                const schema_a = cewt(a, `${getRefName(schema.items.$ref)}[]`);
                                schema_a.href = schema.items.$ref;
                                params_schema_body.push(schema_a);
                        } else {
                                const schema_span = cewt(span,schema.items.type);
                                params_schema_body.push(schema_span);
                        }
        
                }else if(schema.type=='object'){
                        
                }else{
                        const schema_span = cewt(span,schema.type);
                        params_schema_body.push(schema_span);
                }
                return params_schema_body;
        }
        

        createMethodTest(method){

                const test_div = ce(div);

                const test_title = cewt(h3,"Test");
                test_div.push(test_title);

                const test_monaco = ce(div);
                test_monaco.style="display:flex; flex-direction: row;  justify-content:space-around; overflow:hidden;"
                test_div.push(test_monaco);



                const test_input = cewt(div,"Input");
                
                test_input.id=`${method.name}_input`;
                const input = {
                        "id": 1,
                        "jsonrpc": "2.0",
                        "method": `${method.name}`,
                        "params": method.example ?? {}
                      }

                require(["vs/editor/editor.main"], function () {
                        let editor= monaco.editor.create(test_input, {
                                value: JSON.stringify(input,null,2),
                                language: 'json',
                                // readOnly:true,
                                // theme: 'vs-dark'
                        });
                        test_input.getValue = ()=> {
                                return editor.getValue()
                        }

                        test_input.clear = ()=> {
                                return editor.getModel().setValue(JSON.stringify(input,null,2));
                        }
                });

                test_input.style = "width: 500px;  height: 300px; border: 1px solid grey"

                test_monaco.push(test_input);

                const test_output = cewt(div,"Output");

                require(["vs/editor/editor.main"], function () {
                        let editor= monaco.editor.create(test_output, {
                                value: JSON.stringify({},null,2),
                                language: 'json',
                                readOnly:true,
                        });
                        
                        test_output.setValue = (data)=> {
                                return editor.getModel().setValue(JSON.stringify(data,null,2));
                        }

                        test_output.clear = ()=> {
                                return editor.getModel().setValue(JSON.stringify({},null,2));
                        }
                });

                test_output.style = "width: 500px;  height: 300px; border: 1px solid grey"

                test_monaco.push(test_output);

                const test_button_set = ce(div);
                
        
                const test_button = cewt(button,'Test');

                test_button.addEventListener('click', async () => {
                        const editor = test_input;
                        const data =  editor.getValue();

                        const result = await postData(this.server,data);

                        test_output.setValue(result)
                })

                test_button_set.push(test_button)

                const clear_button = cewt(button,"Clear");
                clear_button.addEventListener('click', () => {
                        test_input.clear();
                        test_output.clear();
                })

                test_button_set.push(clear_button)
                
                test_div.push(test_button_set);

                return test_div
        }


}













