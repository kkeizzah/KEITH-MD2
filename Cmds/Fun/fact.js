const API_URL = 'https://nekos.life/api/v2/fact';
const { getContextInfo, sendReply } = require(__dirname + "/../../lib/context"); //
module.exports = async (context) => {
    const { client, m } = context;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const { fact } = await response.json();
        const factMessage = `
┏━━━ *KEITH-FACT* ━━━◆                     
┃
┃   *◇* ${fact} 
┃
┃   *◇* Regards *KEITH MD*
┃      
 ╭───────────────◆
 │ *_Powered by keithkeizzah._*
 ╰───────────────◆
        `;

        // Send the fact message with contextInfo
        await sendReply(client, m, factMessage);
    } catch (error) {
        console.error('Error fetching data:', error);
        await sendReply(client, m, 'An error occurred while fetching the fact.'); // Use sendReply for error messages
    }
};
