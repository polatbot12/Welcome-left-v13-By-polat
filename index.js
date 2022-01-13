const Discord = require("discord.js");
const client = new Discord.Client();
const invites = {};
const wait = require("util").promisify(setTimeout);
const moment = require("moment");
const fs = require("fs");
var prefix = "E!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("");
  console.log("");
  console.log(
    "╔[═════════════════════════════════════════════════════════════════]╗"
  );
  console.log(`[Start] ${new Date()}`);
  console.log(
    "╚[═════════════════════════════════════════════════════════════════]╝"
  );
  console.log("");
  console.log("╔[════════════════════════════════════]╗");
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log("");
  console.log("information:");
  console.log("");
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log("╚[════════════════════════════════════]╝");
  console.log("");
  console.log("╔[════════════]╗");
  console.log(" Bot Is Online");
  console.log("╚[════════════]╝");
  console.log("");
  console.log("");
});


client.on("guildMemberAdd", member => {
  let welcomer = member.guild.channels.find(
    channel => channel.name === "welcome"
  );
  if (!welcomer) return;
  if (welcomer) {
    welcomer.send(` > Welcome <@${member.user.id}> To ${member.guild.name}`);
  }
});

client.on("guildMemberAdd", member => {
  let welcomer = member.guild.channels.find(
    channel => channel.name === "welcome" /// POLAT BOT
  );
  if (!welcomer) return;
  if (welcomer) {
    moment.locale("en-ly");
    var h = member.user;
    let norelden = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(h.avatarURL)
      .setAuthor(h.username, h.avatarURL)
      .setTitle("🔹WELCOME🔹")
      .setDescription("🔸بەخێریبێی بۆ سێرڤەرەکەم بەهیوای کاتێکی خۆش🔸")
      .addField(" تۆ کەسی ژمارە :-", member.guild.memberCount + "ی")
      .addField(
        ":🔻کاتی دانانی ئەکاونتی دیسکۆرد🔻",
        `${moment(member.user.createdAt).format(
          "D/M/YYYY h:mm a"
        )} **\n** \`${moment(member.user.createdAt).fromNow()}\``,
        true
      )
      .addField(
        ": 🔻کاتی هاتنە ناوەوەی سێرڤەر🔻",
        `${moment(member.joinedAt).format("D/M/YYYY h:mm a")} \n\`\`${moment(
          member.joinedAt
        )
          .startOf(" ")
          .fromNow()}\`\``,
        true
      )
      .setImage("")//lera rasmek dane ba Dli xhot
      .setFooter(`${h.tag}`, ""); //////rasme sar server lera dane

    welcomer.send({ embed: norelden });
  }
});

client.on("guildMemberRemove", member => {
  let channel = member.guild.channels.find(
    "name",
    "left"//nawe channelaka lera dane
  );
  let memberavatar = member.user.avatarURL;
  if (!channel) return;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField("ناوی مێمبەر:", `${member}`)
    .addField("لێفتی کرد لە سێرڤەر")
    .addField("رۆشت لە سیرڤەر")
    .addField("ژمارەی مێمبەری سێرڤەر", `${member.guild.memberCount}` + " کەس")
    .setImage("")//wenay left lera dane  POLAT|BOT
    .setFooter(`==== **${member.guild.name}====`, "")
    .setTimestamp();

  channel.sendEmbed(embed);
});

client.on("message", zaid => {
  if (client.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#00000")
      .addField(
        "**____خێرای بۆتەکە____**: ",
        ` ${Date.now() - client.createdTimestamp}` + "__ __ ",
        true
      )
      .addField("**__سێرڤەرەکان__** : ", `→ ${client.guilds.size}`, true)
      .addField("**__چەناڵەکەن__** : ", `→ ${client.channels.size} `, true)
      .addField("**__میمبەرەکان__** : ", `→ ${client.users.size} `, true)
      .addField("**__ناوی بۆتەکە__** : ", `→ ${client.user.tag} `, true)
      .addField("**دروست کەری بۆتەکە** : ", `→ nawe xot lera dane `)

      .setImage("")//rmek ba fle xot
      .setFooter(client.author.username, zaid.author.avatarURL);
    client.channel.send(bot);
  }
});


client.on("message", async message => {
  if (message.content === prefix + "unbansall") {
    var user = message.mentions.users.first();
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("❌|**`ADMINISTRATOR`ببورە تۆ ناتوانی `**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    const guild = message.guild;

    message.guild.fetchBans().then(ba => {
      ba.forEach(ns => {
        message.guild.unban(ns);
        const embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`**:white_check_mark: هەموو باندەكان لادرا**`)
          .setFooter(
            "داواكرا لە لایەن" + message.author.username,
            message.author.avatarURL
          );
        message.channel.sendEmbed(embed);
        guild.owner.send(`Server : ${guild.name}
  **هەموو باندەكان لادرا لەلایەن** : <@${message.author.id}>`);
      });
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "muvall")) {
    if (!message.member.hasPermission("MOVE_MEMBERS"))
      return message.channel.send("x You Dont Have Perms MOVE_MEMBERS");
    if (!message.guild.member(client.user).hasPermission("MOVE_MEMBERS"))
      return message.reply("x I Dont Have Perms MOVE_MEMBERS");
    if (message.member.voiceChannel == null)
      return message.channel.send("تۆ پێویستە لە ڤۆیسێكا بیت");
    var author = message.member.voiceChannelID;
    var m = message.guild.members.filter(m => m.voiceChannel);
    message.guild.members
      .filter(m => m.voiceChannel)
      .forEach(m => {
        m.setVoiceChannel(author);
      });
    message.channel.send("white_check_mark: Success Moved All To Your Channel");
  }
});

client.on("message", async message => {
  if (message.content.toLowerCase() === prefix + "profile") {
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.stopTyping();
    }, Math.random() * (1 - 3) + 1 * 1000).then(
      message.channel.send({
        files: [
          {
            name: "prfoilebycutie.png",
            attachment: `https://api.probot.io/profile/${message.author.id}?bg=default.png`
          }
        ]
      })
    );
  }
});

client.on("ready", () => {
  client.user.setActivity("E!help ", { type: "Playing" });
  client.user.setStatus("idle");
});
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
    message.channel.send(` ***Help Comand***
          
          
┏◣ Name > welcome ◢┓

┏◣ Name > left ◢┓

┏◣ E!lock ◢┓

┏◣ E!unlock ◢┓

┏◣ E!user◢┓
 
┏◣ E!unbansall ◢┓

┏◣ E!muvall  ◢┓

┏◣ E!profile  ◢┓
                               
 ┏◣ E!invitebot ◢┓
                                      
 ┏◣ E!support ◢┓ `);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "invbot")) {
    let invite = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(message.author.avatarURL)
      .setTitle(
        "**__کلیک لێرە بکە بۆ ئەوەی بۆت ئەکە ئینڤاتی سێرڤەری خۆت بکەی💖__**"
      )
      .setURL(``);//linke botaka lera dane
    message.channel.sendEmbed(invite);
  }
});
client.on("message", message => {
  if (message.content === prefix + "support") {
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("RANDOM")
      .addField(" سەپۆرتی سیرڤەر بەکەن", " linke server ");

    message.channel.sendEmbed(embed);
  }
});
client.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.reply(" This command only for servers");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" تۆناتوانی ئەم کارە بکەی");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply(":white_check_mark::lock: بە سەرکەوتوی داخرا ");
      });
  }
  //FIRE BOT
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.reply(" This command only for servers");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("تۆناتوانی ئەم کارە بکەی");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply(":white_check_mark::unlock: بە سەرکەوتوی کرایەوە ");
      });
  }
});

client.login("");
