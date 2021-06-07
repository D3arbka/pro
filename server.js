const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://.glitch.me/`);
}, 280000);

const Discord = require('discord.js');  
const client = new Discord.Client();  
const moment = require('moment');
const zalgo = require('zalgolize');  
const math = require('math-expression-evaluator');   
const figlet = require('figlet');   
const fs = require('fs');  
const ms = require('ms');  
const prefix = '*' // البرفكس هنا










var config = {
  events: [
    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 1, delay: 5000},
    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 1, delay: 5000},
    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 3, delay: 5000},
    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 3, delay: 5000},
    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 1, delay: 5000},
    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 1, delay: 5000},
  ]
}
client.on("error", (e) => console.error(e));
client.on("raw", (packet)=> {
  let {t, d} = packet, type = t, {guild_id} = d = d || {};
  if (type === "READY") {
    client.startedTimestamp = new Date().getTime();
    client.captures = [];
  }
  let event = config.events.find(anEvent => anEvent.type === type);
  if (!event) return;
  let guild = client.guilds.get(guild_id);
  if (!guild) return;
  guild.fetchAuditLogs({limit : 1, type: event.logType})
    .then(eventAudit => {
      let eventLog = eventAudit.entries.first();
      if (!eventLog) return;
      let executor = eventLog.executor;
      guild.fetchAuditLogs({type: event.logType, user: executor})
        .then((userAudit, index) => {
          let uses = 0;
          userAudit.entries.map(entry => {
            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;
          });
          setTimeout(() => {
            client.captures[index] = index
          }, event.delay || 2000)
          if (uses >= event.limit) {
            client.emit("reachLimit", {
              user: userAudit.entries.first().executor,
              member: guild.members.get(executor.id),
              guild: guild,
              type: event.type,
            })
          }
        }).catch(console.error)
    }).catch(console.error)
});
client.on("reachLimit", (limit)=> {
  let log = limit.guild.channels.find( channel => channel.name === "security-log");
  log.send(limit.user.username+"\** يحآول شخص تهكير سيرفرك ** ");
  limit.guild.owner.send(limit.user.username+"\** يحآول شخص تهكير سيرفرك ! ** ")
  limit.member.roles.map(role => {
    limit.member.removeRole(role.id)
    .catch(log.send)
  });
});


client.on('guildMemberAdd',darbka => {
    try {
        if(darbka.user.bot) {
          darbka.ban({
            reason: `darbka anti bots V3 ${darbka.user.bot} ` 
          });
        }
    }catch(e){
       console.log(e)
    }
    });


 

  


client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Script By : osama,tech.#0184`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : osama,tech.#0184 ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`The Kings`,"http://twitch.tv/S-F")
client.user.setStatus("dnd")
});




client.login("ODUxNTAwMDg0OTY1NDA4ODA4.YL5LQA.wpGzbd0MfDxfulChRjNwG1YDtNU");