const cheerio = require("cheerio")
const request = require("request")

// let url = "http://ncov.mohw.go.kr/" //코로나바이러스감염증-19(COVID-19)
let url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=" //코로나바이러스감염증-19(COVID-19)
module.exports = { 
    config: {
        name: "covid",
        aliases: ["co", "코로나"],
        description: "대한민국 코로나 상태",
        usage: "covid",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        // await request(url, function(error, response, body) { // "http://ncov.mohw.go.kr/"
        //     const $ = cheerio.load(body)
        //     const livedate = $(".livedate");
        //     const colArr = $("li span.before");

        //     let text1 = "환자 현황 " + livedate[0].children[0].data;
        //     let text2 = "신규 확진자" + colArr[0].children[0].data.slice(4);

        //     message.channel.send(`${text1}\n\n${text2}`)
        // })
        await request(url, function(error, response, body) {
            const $ = cheerio.load(body)
            const livedate = $("h5.s_title_in3 span.t_date");
            const confirmedCase = $("li p.inner_value");

            let info = "누적 확진자 현황 : \`\`" + livedate[0].children[0].data + "\`\`";
            let text1 = "신규 확진자 : \`\`" + confirmedCase[0].children[0].data + "\`\`";
            let text2 = "해외유입 : \`\`" + confirmedCase[1].children[0].data + "\`\`";
            let text3 = "국내발생 : \`\`" + confirmedCase[2].children[0].data + "\`\`";

            message.channel.send(`${info}\n\n${text1}\n${text2}\n${text3}`)
        })
    }
}