var apiURL="https://openlibrary.org/works/OL45804W/editions.json";
let pageSize=6;
let currentPage=1;
let Book_details=[];


async function getData(){
    const response = await fetch(apiURL);        
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
            return await response.json();
            }
        }
        getData().then((data)=>{
            Book_details=data.entries;
            console.log(Book_details)
            }).catch((error)=>console.log("Error",error))

    
            async function renderTable(){
                await getData()
            
                var details="";
                //console.log(Book_details)
                Book_details.filter((row,index)=>{
                    let start=(currentPage-1)*pageSize;
                    let end=currentPage*pageSize;
            
                    if(index >= start && index < end) return true;
                }).forEach(Book_details => {
                    details += "<tr>"
                    details += `<td>${Book_details.publish_date}</td>`
                    details += `<td>${Book_details.title}</td>`
                    details += `<td>${Book_details.publishers[0]}</td>`
                    details += `<td>${Book_details.latest_revision}</td>`
                    "<tr>"
                })
                document.getElementById("listItems").innerHTML=details
            }
            renderTable();


            function previousPage(){
                if (currentPage > 1) 
                    --currentPage;
                    renderTable();
            }
            function nextPage(){
                if((currentPage*pageSize)<Book_details.length)
                currentPage++;
                renderTable();
            }
