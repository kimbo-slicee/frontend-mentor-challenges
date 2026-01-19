const summaryList=document.querySelector('.summary__list');
const summary=({category,score,icon})=>` 
 <li class="summary__item summary__item--reaction">
          <article class="summary__row">
            <div class="summary__type">
              <img src="${icon}" alt="Reaction icon" class="summary__icon">
              <span class="summary__name">${category}</span>
            </div>
            <span class="summary__score"><strong>${score}</strong> / 100</span>
          </article>
</li>`

const fetchData=async()=>{
    try{
        const response=await fetch('data.json');
        const data=await response.json();
        data.forEach(item=>{
        summaryList.innerHTML+=summary(item);
        });
    }catch(error){
        console.error('Error fetching data:',error);
    }
}

fetchData()