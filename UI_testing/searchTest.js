const {Builder,By,Key,util}=require("selenium-webdriver");
async function example(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/home");
    await driver.findElement(By.name("Search")).sendKeys("Gayathri",Key.RETURN);
    await driver.findElement(By.name("faculty")).click();

}
example();
