const {Builder,By,Key,util}=require("selenium-webdriver");
async function removeFaculty(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("admin@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Admin@123",Key.RETURN);
    await driver.findElement(By.name("login")).click();

    await driver.findElement(By.name("search")).sendKeys("faculty1",Key.RETURN);
    await driver.findElement(By.name("delete")).click();

}
removeFaculty();