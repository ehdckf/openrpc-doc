import createInfo from "./info.js";
import createServers from "./servers.js";
import MethodsMaker from "./methods.js";
import createComponents from './components/index.js'

export default async function createDocs() {
        const jsonRequest = await fetch('http://localhost:3000/doc-json');
        const openrpc = await jsonRequest.json();
        console.log(openrpc)
        window.editor = {};
        const { info, servers, methods, components } = openrpc;

        const main_div = document.querySelector('#main');
        main_div.push = (item) => {
                main_div.appendChild(item)
        }

        


        const info_div = createInfo(info);
        const {serversHTML, serverURL} = createServers(servers); 
        const servers_div = serversHTML;
        const methods_div = new MethodsMaker(methods, serverURL).methods_div;
        const components_div = createComponents(components);

        main_div.push(info_div);
        main_div.push(servers_div);
        main_div.push(methods_div);
        main_div.push(components_div);
}

createDocs();