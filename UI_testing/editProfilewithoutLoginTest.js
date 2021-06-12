// ensuring that only when the faulty is logged in can edit their profile
const {Builder,By,Key,util}=require("selenium-webdriver");
async function example(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/faculties/60b898bb6fd3df60dcb107d7");

    await driver.findElement(By.name("addLink")).click();
    await driver.findElement(By.name("link")).sendKeys("https://www.linkedin.com/in/gayathri-v-016854196/",Key.RETURN);
    await driver.findElement(By.name("add")).click();
    
}
example();

