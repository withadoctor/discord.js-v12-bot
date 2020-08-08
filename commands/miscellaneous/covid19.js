const cheerio = require("cheerio")
const request = require("request")

let url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=" //코로나바이러스감염증-19(COVID-19)
let aa = -1;
var covid_notice_channel;

module.exports = { 
    config: {
        name: "covid",
        aliases: ["co", "코로나"],
        description: "대한민국 코로나 상태",
        usage: "covid",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    core: async () => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                const $ = cheerio.load(body)
                const livedate = $("h5.s_title_in3 span.t_date");
                const confirmedCase = $("li p.inner_value");
            
                let info = "누적 확진자 현황 : \`\`" + livedate[0].children[0].data + "\`\`";
                let text1 = "신규 확진자 : \`\`" + confirmedCase[0].children[0].data + "\`\`";
                let text2 = "해외유입 : \`\`" + confirmedCase[1].children[0].data + "\`\`";
                let text3 = "국내발생 : \`\`" + confirmedCase[2].children[0].data + "\`\`";
            
                resolve(`${info}\n\n${text1}\n${text2}\n${text3}`);
            })
        });
    },
    crun: async (bot) => {
        if(aa == -1) {
            bot.guilds.cache.forEach(x => {
                if(x.name == '__youtube_test') { // 나긋해_유튜브_채널
                    x.channels.cache.forEach(y => {
                        if(y.name == '테스트') {
                            aa = y.id;
                        }
                    })
                }
            });
            covid_notice_channel = bot.channels.cache.find(x => x.id == aa);
        }

        covid_notice_channel.send(await module.exports.core());
    },
    run: async (bot, message, args) => {
        message.channel.send(await module.exports.core())
    }
}