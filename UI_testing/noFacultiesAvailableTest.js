const {Builder,By,Key,util}=require("selenium-webdriver");
async function facultyAvailable(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("admin@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Admin@123",Key.RETURN);
    await driver.findElement(By.name("login")).click();

    let a1 = driver.actions();
    a1.pause(1000).perform();

    await driver.findElement(By.name("search")).sendKeys("faculty2",Key.RETURN);
    var aboutFrame = driver.findElement(By.id("showContent"));
    var str = aboutFrame.findElements(By.tagName("h4"))[0];
    expect(str).toBe("There are no faculties available");
}
facultyAvailable();

