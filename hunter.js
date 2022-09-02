// fetching
const loadFech = async (Inputvalue, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${Inputvalue}`
    const fetching = await fetch(url)
    const data = await fetching.json();
    displayAll(data.data, limit)
}

// Display data in main section
const displayAll = (Phonedata, limit) => {
    console.log(Phonedata)

    const phonesContainer = document.getElementById('container');
    phonesContainer.innerHTML = ``                                       // blank container in second time.

    // Not found message container
    const notFound = document.getElementById('No-data-Found');

    // Show all button 
    const showall = document.getElementById('show-all');

    // Check if there is any data or Not, phone data in an array
    if (Phonedata.length == 0) {

        notFound.classList.remove('d-none')                              // Not found message.
        showall.classList.add('d-none');                                 // hide show all, as there is no data          
        togleLoader(false);                                              // Toggle spinner off
    }
    else {

        notFound.classList.add('d-none');                              // hide not found message

        // check data limit is greater than 10 or not + and if any limitaion given.
        if (limit && Phonedata.length > 10) {
            Phonedata = Phonedata.slice(0, limit);

            showall.classList.remove('d-none')                          // show --> show all button
        }
        else {
            showall.classList.add('d-none')                            // hide show all
        }

        Phonedata.forEach(element => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col">
                        <div class="card p-4">
                            <img src="${element.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${element.phone_name}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.</p>
                            </div>
                            <!-- Button trigger modal -->
                            
                            <button onClick="loadPhoneDetail('${element.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details</button>

                            
                        </div>
                    </div>`
            phonesContainer.appendChild(div);

            // Toggle spinner off
            togleLoader(false);                            // loading spinner off
        });
    }
}


// show all clicked
const showAllfunction = () => {
    processSearched()
}


// toogle spinner function
const togleLoader = (isLoading) => {
    const loader = document.getElementById('loader');                 // loder div
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}


// get input value + toggle spinner on + give amount of  data show.
const processSearched = (limit) => {

    // Toggle spinner function on value.
    togleLoader(true);
    const valueInput = document.getElementById('input-value');
    const Inputvalue = valueInput.value;
    loadFech(Inputvalue, limit)                                            // give input value, limitaion
}


document.getElementById("input-value").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        processSearched(10)
    }
});


// Click search
const getValue = () => {

}


////////////////////////  Phone detail loader section  ////////////////


const loadPhoneDetail = async id => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const fetching = await fetch(url)
    const data = await fetching.json();
    DisplayPhoneDetail(data.data)
}


const DisplayPhoneDetail = (data) => {
    const modalTitle = document.getElementById('staticBackdropLabel')
    modalTitle.innerText = data.name;
    const modalDiv = document.getElementById('modal-div')
    modalDiv.innerHTML = `<p>${data.releaseDate ? data.releaseDate : "No release Date found"}</p>
        <p> ${data.mainFeatures ? data.mainFeatures.storage : "No Information found"}</p> `
        ;
}
