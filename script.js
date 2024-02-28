const loadPhones = async (searchPhone='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
    const data = await res.json()
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    const phonesContainer = document.getElementById('phones-container');

    // clean phone container before adding new card
    phonesContainer.textContent = '';

    // display and hide show all btn
    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 10 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }else {
        showAllBtn.classList.add('hidden');
    }

    // display only first 12 phones 
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl p-5`;
        phoneCard.innerHTML = `
        
        <figure class="px-3 py-10 bg-[#0D6EFD0D]">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center px-0 w-full">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
            <button onclick='handleShowDetails("${phone.slug}"); show_details_modal.showModal()' class="btn btn-primary mt-5">Show Details</button>
            </div>
        </div>
        `

        phonesContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);
}


//
const handleShowDetails = async (id) => {
    //load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const  phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)

    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <div class="flex justify-center items-center">
        <img class="my-10" src="${phone.image}">
    </div>
    <div class="*:my-2">
        <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">DisplaySize: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">GPS: </span>${phone?.others?.GPS}</p>
    </div>
    `
    // show the modal
    show_details_modal.showModal()
}

// handle search btn 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
    
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
    
}

const handleShowAll = () => {
    handleSearch(true)
}


loadPhones();