const wiki = require('wikipedia');
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); //

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        
        if (!text) {
            return sendReply(client, m, `Provide the term to search,\nE.g What is JavaScript!`); 
        }

        
        const con = await wiki.summary(text);
        const texa = `Title:- ${con.title}
                  
Desc:- ${con.description}

Summary:- ${con.extract}

URL:- ${con.content_urls.mobile.page}
        `;

        
        await sendReply(client, m, texa); 

    } catch (err) {
        console.log(err);
        return sendReply(client, m, `Got 404. I did not find anything!`); 
    }
};
