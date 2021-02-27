const puppeteer = require('puppeteer');
let ncep = '60050070'

const consultacep = async (cep) => {
	const browser = await puppeteer.launch({
			headless:false
	});
	const page = await browser.newPage();

	await page.goto('https://buscacepinter.correios.com.br/app/endereco/index.php');
	await page.waitFor('input[id="endereco"]');
	await page.type('input[id="endereco"]',cep, {delay: 185})
	await page.keyboard.press('Enter');
	await page.waitForSelector('#navegacao-resultado')
	await page.screenshot({path:'consultacep-'+cep+'.png'});
	const elementLogadouro = await page.$('#resultado-DNEC > tbody > tr > td:nth-child(1)');
	const elementBairro = await page.$('#resultado-DNEC > tbody > tr > td:nth-child(2)');
	const elementCidade = await page.$('#resultado-DNEC > tbody > tr > td:nth-child(3)');
	const logadouro = await page.evaluate(element => element.innerText, elementLogadouro);
	const Bairro = await page.evaluate(element => element.innerText, elementBairro);
	const Cidade = await page.evaluate(element => element.innerText, elementCidade);


	console.log("Resultado da Busca:" + logadouro, Bairro, Cidade);
	await browser.close()
}

consultacep(ncep);