  //ref찾기
  function findRef(obj) {
        if(obj==undefined) return null
        
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

function checkEmptyObj(obj){
        return (obj==undefined || Object.keys(obj).length == 0) ? true : false;
}


//createElement 귀찮아서

function ce(tagName){
        const element = document.createElement(tagName);
        element.push = (item) => {
                element.appendChild(item);
        }
        return element;
}

function cewt(tagName, text) {
        const element = document.createElement(tagName);
        element.innerText = text ?? "";
        element.push = (item) => {
                element.appendChild(item);
        }
        return element;
}

function createTitle(text){
        const element = document.createElement('h1');
        element.innerText = text;
        return element;
}

export {
        findRef,
        getRefName,
        ce,
        cewt,
        createTitle,
        checkEmptyObj,
}