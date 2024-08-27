function get_data(name, lnk, sec) {
    let cont = document.createElement("a");
    cont.setAttribute("class", "lnk");
    cont.setAttribute("href", lnk);
    cont.setAttribute("target", "_blank");

    let link = document.createElement("div");
    link.appendChild(document.createTextNode(name));
    link.setAttribute("class", "first");
    link.setAttribute("display", "block");
    
    let sum_time = document.createElement("div"); 
    let t_min = Math.floor((sec / 60)) % 60;
    let t_hours = Math.floor(sec / 60 / 60);
    if (t_hours != 0) {
        sum_time.appendChild(document.createTextNode(`${t_hours}h ${t_min}m`));
    } else {
        sum_time.appendChild(document.createTextNode(`${t_min}m`));
    }
    sum_time.setAttribute("class", "second");
    
    cont.appendChild(link);
    cont.appendChild(sum_time);
    return cont;
}  

async function main() {
    const data = await chrome.storage.local.get();

    console.log(data);

    let table = document.createElement("div");
    table.setAttribute("class", "grid");
    for (const [key, value] of Object.entries(data.name)) {
        console.log(`${key}: ${value}`);
      
      

        // let row = document.createElement("div");
        // row.setAttribute("class", "row");
        // row.appendChild(get_data(data.name, data.name, data.name[i]);
    
        // table.appendChild(row);  
    }
    document.body.appendChild(table);
}

main();
