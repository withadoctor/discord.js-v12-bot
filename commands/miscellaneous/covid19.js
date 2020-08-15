const cheerio = require("cheerio")
const request = require("request")

let url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=" //코로나바이러스감염증-19(COVID-19)
let aa = -1;
var covid_notice_channel;

module.exports = { 
    config: {
        name: "covid",
        aliases: ["co", "코로나", "cv"],
        description: "대한민국 코로나 상태",
        usage: "covid",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    core: async (bot) => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                const $ = cheerio.load(body)
                const livedate = $("h5.s_title_in3 span.t_date");
                const confirmedCase = $("li p.inner_value");
            
                let day_date = livedate[0].children[0].data;
                let day_all = confirmedCase[0].children[0].data;
                let day_oversea = confirmedCase[1].children[0].data;
                let day_region = confirmedCase[2].children[0].data;
            
                let info = "누적 확진자 현황 : \`\`" + day_date + "\`\`";
                let text1 = "신규 확진자 : \`\`" + day_all + "\`\`";
                let text2 = "해외유입 : \`\`" + day_oversea + "\`\`";
                let text3 = "국내발생 : \`\`" + day_region + "\`\`";


                let oversea = response.body.split('DP_data.oversea.push').slice(1,8).map(x => x.split('("')[1].split('")')[0]); // 해외 유입
                let region = response.body.split('DP_data.region.push').slice(1,8).map(x => x.split('("')[1].split('")')[0]); // 국내 발생
                let date = response.body.split('DP_data.date.push').slice(1,8).map(x => x.split('("')[1].split('")')[0]); // 날짜
                let covidList = `\`\`\`md\n`;
                covidList += `# 코로나 기록\n`;
                covidList += `[날짜][신규확진자] <해외유입 국내발생>\n`;
                covidList += date.map((x, i) => {
                    return `[2020.${x}][${parseInt(oversea[i])+parseInt(region[i])}] <${oversea[i]} ${region[i]}>`;
                    // return `[2020.${x}][${((parseInt(oversea[i])+parseInt(region[i]))+'').padStart(3, ' ')}] <${oversea[i].padStart(7, ' ')} ${region[i].padStart(8, ' ')}>`;
                    // return [x, region[i], date[i]]
                }).join('\n')
                covidList += `\`\`\``;
            
                resolve(`${info}\n\n${text1}\n${text2}\n${text3}\n\n${covidList}`);
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

        covid_notice_channel.send(await module.exports.core(bot));
    },
    run: async (bot, message, args) => {
        message.channel.send(await module.exports.core(bot))
    }
}