const puppeteer = require('puppeteer');
const ms = require('ms');

const Promise = require('bluebird');
const { delay } = require('bluebird');


const str = 'INSERT INTO work (workName) VALUES (?)';



(async () => {
    const browser = await puppeteer.launch({
        headless: false, defaultViewport: {
            width: 1920, height: 1080
        },

        args: [
            "--window-size=1820,1080",
            "--disable-notification=true",
            "--proxy-server=123.45.67.89:8888"],
        userDataDir: "./userData",
        
    });
    const page = await browser.newPage();
    for (let i = 1; i <= 10; i++) {
        const url = 'https://www.zhipin.com/web/geek/job?query=%E5%A4%A7%E5%89%8D%E7%AB%AF&city=100010000' + '&page=' + i;
        await page.goto(url);

        await page.waitForSelector('ul.job-list-box li .job-name', { timeout: ms('10s') });

        const jobList = await page.$$('ul.job-list-box li .job-name');
        console.log(jobList.length);


        await Promise.each(jobList, async (jobItem) => {
            let job = await jobItem.evaluate((e) => e.innerHTML, jobItem);
            console.log(job);
        });
    }
    // await page.goto('https://www.zhipin.com/web/geek/job?query=%E5%A4%A7%E5%89%8D%E7%AB%AF&city=100010000');

    // await page.waitForSelector('ul.job-list-box li .job-name', { timeout: ms('10s') });

    // const jobList = await page.$$('ul.job-list-box li .job-name');
    // console.log(jobList.length);


    // await Promise.each(jobList, async (jobItem) => {
    //     let job = await jobItem.evaluate((e) => e.innerHTML, jobItem);
    //     console.log(job);
    // });

    await delay(ms('8h'));

    await browser.close();
})();
