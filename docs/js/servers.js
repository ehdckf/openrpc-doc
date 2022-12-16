import { ce, cewt, createTitle } from "./utils.js";
import { h1, h2, h3, h4, h5, h6, div, span, ul, li } from './constant.js';
export default function createServers(servers) {
      
        const servers_div = ce(div);

        const servers_title = createTitle('Servers');

        
        const servers_ul = ce(ul);
        
        servers.forEach(server => {
                const server_li = cewt(li,server.url);
                servers_ul.push(server_li);
        });

        
        
        servers_div.push(servers_title);
        servers_div.push(servers_ul);

        return {
                serversHTML :servers_div,
                serverURL: servers[0].url
        }
        
}