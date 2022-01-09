const senha = require('./info2');
const basesenha = require('./info1')
const puppeteer = require("puppeteer");
const sequelize = require('sequelize');
const Sequelize = new sequelize('chatamino', 'root', basesenha(), {
  host: 'localhost',
  dialect: 'mysql'
});
var mensagens = Sequelize.define('chats', {
  usuario: {
    type: sequelize.STRING
  },
  mensagem: {
    type: sequelize.STRING(2000)
  }
});
const main = (async () => {

  const browser = await puppeteer.launch({headless: false, args:['--no-sandbox', '--disable-setuid-sandbox'], });
  var page = await browser.newPage();
  //aqui para colocar o codigo da cotação9

  await page.goto('https://aminoapps.com/');
  await page.click(
    "body > header > div > div > nav > ul > li.nav-item.nav-user.less-margin > a"
  );
  await page.waitForTimeout(5000);
  await page.click("body > div.modal > div.content > div > div > div.login-signup-area > div.sub-area > div > button.auth-btn.signin-email");
  await page.waitForTimeout(1000);
  await page.type('[name="email"]', 'botparaamino@gmail.com');
  await page.type('[name="password"]', senha());
  await page.waitForTimeout(800);
  await page.click("body > div.modal > div.content > div.popup.login-dialog > div.content.state-login > div.input-area.hide.login-email > form.password > div.login-buttons > button.auth-btn.submit-btn");
  await page.waitForNavigation();
  await page.click('[class="confirm-close"]');
  await page.waitForSelector('[alt="Community Icon"]');
  await page.waitForTimeout(500);
  await page.click('[alt="Community Icon"]');
  await page.waitForTimeout(1000);
  const elementHandle = await page.$(
    'iframe[class="chat-window-iframe"]',
);
  await page.waitForTimeout(1000);
  
  let contador = 0
  while (contador == 0){
    var frame = await elementHandle.contentFrame();
    var optionsResult = await frame.$$eval('body > div > main > div.chat-detail-area > ul > li > div > div > div', (options) => options.map((option) => option.innerText));
    var mensage = await frame.$$eval('body > div > main > div.chat-detail-area > ul > li > div > p ', (options) => options.map((option) => option.innerText));
    let usuario = mensage[mensage.length - 1]
    let valores = await mensagens.findAll();
    if (valores[valores.length - 1].dataValues.mensagem != optionsResult[optionsResult.length - 2]){
      mensagens.create({
        usuario: usuario,
        mensagem: optionsResult[optionsResult.length - 2]
      })
    }else if(optionsResult[optionsResult.length - 2] == 'liz!'){
        await frame.type('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > textarea', 'liz é incrivel');
        await frame.waitForTimeout(500);
        await frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
    }else if(optionsResult[optionsResult.length - 2] == 'photo!'){
      let page2 = await browser.newPage();
      await page2.goto('https://static.wikia.nocookie.net/horimiya/images/e/e3/Izumi_Miyamura_Anime_Design_%28Current%29.png/revision/latest?cb=20210220144331');
      await page2.click('body > img');
      await page2.keyboard.down('Control');
      await page2.keyboard.press('KeyC');
      await page2.keyboard.up('Control');
      await page2.waitForTimeout(1000);
      await page2.close();
      frame.type('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg', '.');
      await frame.waitForTimeout(500);
      frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
      await frame.waitForTimeout(500);
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyV');
      await page.keyboard.up('Control');
      await frame.waitForTimeout();
      frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
    } else if(optionsResult[optionsResult.length - 2] == 'lester!'){
      let page2 = await browser.newPage();
      await page2.goto('https://pbs.twimg.com/profile_images/1291963153874595841/YDCmWwmC_400x400.jpg');
      await page2.click('body > img');
      await page2.keyboard.down('Control');
      await page2.keyboard.press('KeyC');
      await page2.keyboard.up('Control');
      await page2.waitForTimeout(1000);
      await page2.close();
      frame.type('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg', 'Lester 😎');
      await frame.waitForTimeout(500);
      frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
      await frame.waitForTimeout(500);
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyV');
      await page.keyboard.up('Control');
      await frame.waitForTimeout();
      await page.waitForTimeout(1200);
      frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
    }else if(optionsResult[optionsResult.length - 2].indexOf('$', 0) != -1 && optionsResult[optionsResult.length -2].indexOf('$', optionsResult[optionsResult.length - 2].length - 1) != -1){
      let valor = await optionsResult[optionsResult.length - 2]
      let page2 = await browser.newPage();
      await page2.goto('http://www.tlhiv.org/ltxpreview/');
      await page2.type('#SOURCECODE', `${valor}`);
      await page2.click('#PNG');
      await page2.waitForTimeout(500);
      await page2.click('#SRCBUTTONS > table > tbody > tr > td:nth-child(3) > input');
      await page2.click('#LTXOFF > option:nth-child(13)');
      await page2.waitForTimeout(500);
      await page2.click('#ADDONS > table > tbody > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)');
      await page2.waitForTimeout(500);
      await page2.click('#LTXOFF > option:nth-child(42)');
      await page2.waitForTimeout(1000);
      await page2.click('#ADDONS > table > tbody > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)');
      await page2.waitForTimeout(1000);
      await page2.click('#SRCBUTTONS > table > tbody > tr > td:nth-child(1) > input');
      await page2.waitForTimeout(3000);
      let elemento = await page2.$('#PREVIEWIFRAME');
      let frame2 = await elemento.contentFrame();
      let exist = await frame2.evaluate(() => {
        return window.document.querySelector('body > img')
      });
      if(exist != null){
        await frame2.click('body > img');
        await page2.keyboard.down('Control');
        await page2.keyboard.press('KeyC');
        await page2.keyboard.up('Control');
        await page2.waitForTimeout(1000);
        await page2.close();
        await page.waitForTimeout(1000);
        await frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > textarea');
        await frame.waitForTimeout(500);
        await frame.type('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg', 'imagem gerada');
        await frame.waitForTimeout(500);
        frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyV');
        await page.keyboard.up('Control');
        await frame.waitForTimeout(1000);
        await frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
      }else{
        await page2.close();
        await page.waitForTimeout(1000);
        await frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > textarea');
        await frame.waitForTimeout(1000);
        await frame.type('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg', 'Comando invalido');
        await frame.waitForTimeout(1000);
        await frame.click('body > div > main > div.chat-detail-area > div > div > div.main-input-wrapper > div > div.send-button.pull-right > span.svg-icon-container.send > svg');
      }
    } else{
      continue 
    }
  }
})();