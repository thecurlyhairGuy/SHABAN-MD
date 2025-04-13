const fetch = require("node-fetch");
const { cmd } = require("../command");

cmd({
  pattern: "xvideossearch",
  alias: ["xvs", "xsearch"],
  desc: "Search for videos on XVideos using a query.",
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  if (!args[0]) {
    return reply("🔞 What do you want to search on XVideos?\n\n*Usage Example:*\n.xvideossearch <query>");
  }

  const query = args.join(" ");
  await store.react('⌛');

  try {
    reply(`🔍 Searching XVideos for: *${query}*`);
    
    const response = await fetch(`https://apis-keith.vercel.app/search/searchxvideos?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !data.status || !data.result || data.result.length === 0) {
      await store.react('❌');
      return reply("❌ No results found. Try a different keyword.");
    }

    // Limit to 5 random results for NSFW content
    const results = data.result.slice(0, 5).sort(() => Math.random() - 0.5);

    for (const video of results) {
      const caption = `🔞 *XVideos Search Result*:\n\n`
        + `*• Title:* ${video.title}\n`
        + `*• Duration:* ${video.duration}\n`
        + `*• Quality:* ${video.quality}\n`
        + `*• URL:* ${video.url}`;

      await conn.sendMessage(from, {
        image: { url: video.thumbnail },
        caption
      }, { quoted: m });
    }

    await store.react('✅');
  } catch (error) {
    console.error("Error in XVideosSearch command:", error);
    await store.react('❌');
    reply("❌ An error occurred while fetching data. Try again later.");
  }
});