  //ref찾기
  function findFirstRef(obj) {
        if(obj==undefined) return null
        
        if (obj.hasOwnProperty("$ref")) {
                return getRefName(obj["$ref"])
        } else {
                for (const key in obj) {
                        if (typeof obj[key] == 'object') {
                                const childKey = findFirstRef(obj[key]);
                                if (childKey) return childKey;
                        }
                }
        }
        return null;
}

function findAllRefs(obj){
        let refArray = [];

        for (const key in  obj){
                if(key=='$ref'){
                        refArray.push(getRefName(obj[key]))
                        continue;
                }else{        
                        if (typeof obj[key] == 'object'){
                                const childRef = findAllRefs(obj[key]);
                                if (childRef.length > 0) {
                                        refArray = [...refArray,...childRef];
                                }
                        }
                }
         }
        return refArray;
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

async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: data // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
}

export {
        findFirstRef,
        findAllRefs,
        getRefName,
        ce,
        cewt,
        createTitle,
        checkEmptyObj,
        postData
}