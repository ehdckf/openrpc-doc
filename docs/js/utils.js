  //ref찾기
  function findRef(obj) {
        if (obj.hasOwnProperty("$ref")) {
                return getRefName(obj["$ref"])
        } else {
                for (const key in obj) {
                        if (typeof obj[key] == 'object') {
                                const childKey = findRef(obj[key]);
                                if (childKey) return childKey;
                        }
                }
        }
        return null;
}

function getRefName(str) {
        return str.split('/').pop();
}


//createElement 귀찮아서
function cewt(tagName, text) {
        const element = document.createElement(tagName);
        element.innerText = text;
        return element;
}

export {
        findRef,
        getRefName,
        cewt
}