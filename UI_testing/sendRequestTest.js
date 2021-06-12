const {Builder,By,Key,util}=require("selenium-webdriver");
async function sendRequest(){

    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/home");

    await driver.findElement(By.name("Search")).sendKeys("Gayathri",Key.RETURN);
    await driver.findElement(By.name("faculty")).click();
    let a1 = driver.actions();
    a1.pause(1000).perform();
    await driver.findElement(By.name("sendRequest")).click();
    
    await driver.findElement(By.name("student_roll_no")).sendKeys("CB.EN.U4CSE18307",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("student_token")).sendKeys("cse18307",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("messageForFaculty")).sendKeys("A student from CSE department seeking mentoring for a project idea in the field of Cyber Security",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("send")).click();

}
sendRequest();