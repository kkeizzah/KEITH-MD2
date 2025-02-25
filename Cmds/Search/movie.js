const axios = require("axios");
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); //

module.exports = async (context) => {
    const { client, m, text } = context;

    // Check if text is provided
    if (!text) {
        return sendReply(client, m, "Provide a movie name or TV show"); // Use sendReply for text replies
    }

    try {
        // Fetch movie data from OMDB API
        const fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);

        // Check if the movie data is valid
        if (!fids.data || !fids.data.Title) {
            return sendReply(client, m, "I cannot find that movie."); // Use sendReply for error messages
        }

        // Construct the movie information message
        let imdbt = "";
        imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB MOVIE SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
        imdbt += "🎬Title      : " + fids.data.Title + "\n";
        imdbt += "📅Year       : " + fids.data.Year + "\n";
        imdbt += "⭐Rated      : " + fids.data.Rated + "\n";
        imdbt += "📆Released   : " + fids.data.Released + "\n";
        imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n";
        imdbt += "🌀Genre      : " + fids.data.Genre + "\n";
        imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n";
        imdbt += "✍Writer     : " + fids.data.Writer + "\n";
        imdbt += "👨Actors     : " + fids.data.Actors + "\n";
        imdbt += "📃Plot       : " + fids.data.Plot + "\n";
        imdbt += "🌐Language   : " + fids.data.Language + "\n";
        imdbt += "🌍Country    : " + fids.data.Country + "\n";
        imdbt += "🎖️Awards     : " + fids.data.Awards + "\n";
        imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n";
        imdbt += "🏙️Production : " + fids.data.Production + "\n";
        imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n";
        imdbt += "❎imdbVotes  : " + fids.data.imdbVotes + "";

        // Send the movie poster and information
        await sendMediaMessage(client, m, {
            image: { url: fids.data.Poster },
            caption: imdbt
        });

    } catch (e) {
        console.error("Error occurred:", e);
        await sendReply(client, m, "I cannot find that movie\n\n" + e); // Use sendReply for error messages
    }
};
