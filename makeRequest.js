const axios = require('axios');
require('dotenv').config();

(async () => {
    try {
        
        let githubUrl = process.env.githubUrl;
        githubUrl = changeUrl(githubUrl)
        
        const response = await axios.post(githubUrl,{},{
            headers: {
                "Authorization": "token " + process.env.OAUTH
            }
        })
        console.log("Repository successfully created");
    }
    catch(err) {
        console.error(err);
    }

})();

function changeUrl(githubUrl) { 
    githubUrl = githubUrl.replace('github.com','api.github.com/repos');
    
    if(githubUrl[githubUrl.length-1] === '/') githubUrl += 'forks'
    else githubUrl += '/forks'

    return githubUrl;

}