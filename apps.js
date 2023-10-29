 const phoneloads =  (searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    
    fetch(url)
    .then(res => res.json())
    .then (data => displayPhone(data.data, dataLimit))
 }
 const displayPhone = (phones, dataLimit) =>{
     const phoneContainer = document.getElementById('phone-container');
     phoneContainer.textContent = '';
    //  display 20 phone
    const  Showall = document.getElementById('show_all');
    if( dataLimit && phones.length > 20){
       phones = phones.slice(0, 20);   
      Showall.classList.remove('d-none')
    }
    else{
      Showall.classList.add('d-none')
    }
     
    //  display none 
    const noPhone = document.getElementById('no-found-message');
    if( phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }
    //  display  all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-4">
        <img  src="${phone.image}" class="card-img-top width-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name
          }</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="phoneLoadDetaile('${phone.slug  }')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
             
        </div>
      </div>
        `;

        phoneContainer.appendChild(phoneDiv);
    });  

    // stop spainner
    toggleSpainner (false);    
 }

  const proccessSearch = (dataLimit) =>{
    toggleSpainner (true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    phoneloads(searchText, dataLimit);
  }

 document.getElementById('search-btn').addEventListener('click', function(){
    //  start loader
    //   toggleSpainner (true);
    //  const searchField = document.getElementById('search-field');
    //  const searchText = searchField.value ;
    //  phoneloads(searchText);

    proccessSearch(10);
 })
//  serch input field  enter key handler
document.getElementById('search-field').addEventListener('keypress' , function(e){
  // console.log(e.key)
     if(e.key === 'Enter'){
      proccessSearch(10);
     }
})
//  /toggole
  const toggleSpainner = isLoading =>{
    const loaderSection = document.getElementById('loader');
   if(isLoading){
    loaderSection.classList.remove('d-none')
   }
   else{
    loaderSection.classList.add('d-none')
   }
  }
 document.getElementById('btn-show-all').addEventListener('click', function(){
  // toggleSpainner (true);
  // const searchField = document.getElementById('search-field');
  // const searchText = searchField.value ;
  // phoneloads(searchText);
  proccessSearch();
 })

 const phoneLoadDetaile = id =>{
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  // console.log(url);
  fetch(url)
  .then (res => res.json())
  .then(data =>displaydetailsLoad (data.data))
 }

 const displaydetailsLoad = phone =>{
   console.log(phone);
   const modalTitle = document.getElementById('phoneDetailModalLabel')
   modalTitle.innerText = phone.name;
   const imageBody = document.getElementById('image-modal')
   imageBody.innerHTML= `
   <h3>${phone.brand}</h3>
   <img src="${phone.image}">
   <p class="mt-2 "><span class="fw-bolder">Release Date:</span> ${phone.releaseDate ? phone.releaseDate :'no released date  found' }</p>
   <p>Storage:${phone.mainFeatures ? phone.mainFeatures.storage:'no storage information'  }</p>
   <p>Others: ${phone.others ? phone.others.Bluetooth : 'no bluethooth information'}</p>
   <p>Senson: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor' }</p>
   `

 }

  phoneloads('apple');