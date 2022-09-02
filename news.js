const fatchingfunction = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const fetching = await fetch(url)
    const data = await fetching.json();
    DisplayNewsCatagory(data.data.news_category)
}


const DisplayNewsCatagory = (newsName) => {

    const newsUl = document.getElementById('news-ul');

    newsName.forEach(element => {

        const p = document.createElement('p');
        p.classList.add('news-list-class')

        p.innerHTML = `
            <style>
                a{
                    padding: 10px;
                }
                a:hover {
                    background-color: yellow;
                }
            </style>
            
        <a onclick="loadNewsDetails('${element.category_id}')" class="allNews" style="text-decoration: none;color:black;" >${element.category_name}</a>`;
        newsUl.appendChild(p)
        // console.log(element.category_name)
    });
}


const loadNewsDetails = async (category_id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const fetching = await fetch(url)
    const data = await fetching.json();
    DisplayloadNewsDetails(data.data)

}


const DisplayloadNewsDetails = (data) => {
    console.log(data)
    const container = document.getElementById('container')
    container.innerHTML = ``
    data.forEach(element => {


        const div = document.createElement('div');
        div.classList.add('col');
        // img src="${element.thumbnail_url}"
        div.innerHTML = `
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-3">
                <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div class="d-flex justify-content">
                        <div class="d-flex">
                            <div>
                                <img src="${element.author.img}"  class="rounded-circle " width="50" height="50" alt="..."> 
                            </div>
                            <div>
                                <p class="card-text ms-3">  <small class="text-muted">${element.author.name} </small></p>
                                <p class="card-text ms-3">  <small class="text-muted">${element.author.published_date} </small></p>
                            </div>
                        </div>
                        <div>
                            <p class="card-text ms-5">  <small class="text-muted">${element.total_view} </small></p>
                        </div>   
                    </div>
                    
                  </div>
                </div>
            </div>
            </div>
        
        
        `



        container.appendChild(div);
    });
}


fatchingfunction();