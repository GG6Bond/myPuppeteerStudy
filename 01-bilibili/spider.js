// 爬取数据，存入数据库

const puppeteer = require('puppeteer');
const ms = require('ms');
const Promise = require('bluebird');
const { delay } = require('bluebird');

const db = require('./dbconfig.js')



const str = 'INSERT INTO work (workName) VALUES (?)';

async function crawl() {
    const browser = await puppeteer.launch({
        headless: true, defaultViewport: {
            width: 1920, height: 1080
        },

        args: [
            // 设置窗口大小
            "--window-size=1820,1080",
            // 关闭通知
            "--disable-notification=true"],
        userDataDir: "./userData"
    });
    const page = await browser.newPage();
    await page.goto('https://www.bilibili.com/v/popular/rank/all');

    await page.waitForSelector('ul.rank-list li .info>a', { timeout: ms('10s') });

    const popularList = await page.$$('ul.rank-list li .info>a');
    console.log(popularList.length);

    await Promise.each(popularList, async (popularItem) => {
        let res = await popularItem.evaluate((e) => e.innerHTML, popularItem);
        console.log(res);
        // 向数据库中插入数据
        db.query(str, [res], (err, results) => {
            if (err) {
                return console.log(err.message);
            }
            if (results.affectedRows === 1) {
                console.log('插入数据成功');
            }
        })
    });

    await delay(ms('20s'));
    await browser.close();
}

crawl();

module.exports = crawl;

