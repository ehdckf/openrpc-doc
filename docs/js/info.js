import { ce, cewt, createTitle } from "./utils.js";
import { h1, h2, h3, h4, h5, h6, div, span, ul, li } from './constant.js';
export default function createInfo(info) {
      
        const info_div = ce(div);

        const info_title = createTitle(info.title);

        info_div.push(info_title);

        const info_description = cewt(div, info.description);
        info_div.push(info_description)

        return info_div;
}