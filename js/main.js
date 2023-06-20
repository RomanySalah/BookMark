let addBtn = document.getElementById('addBtn');
let siteNameInput = document.getElementById('siteNameInput');
let siteUrlInput = document.getElementById('siteUrlInput');
let bookMarkList = document.getElementById('bookMark-List');
let nameError = document.getElementById('nameError');
let urlError = document.getElementById('urlError');
let siteContainer = [];

if (localStorage.getItem('Sites') != null) {
    siteContainer = JSON.parse(localStorage.getItem('Sites'));
    displayData(siteContainer);
}

addBtn.addEventListener('click', addSite)

function addSite() {
    let site = {
        siteName: siteNameInput.value,
        url: siteUrlInput.value
    }

    checkNameIsExist();
    if(siteNameInput.value=='' || siteUrlInput.value=='' || checkNameIsExist()!=0)
    {
        if (siteNameInput.value == '' )
        {
            getAlertName('Name is required');
        }
        if (siteUrlInput.value == '' )
        {
            getAlertUrl();
        }
        if (checkNameIsExist()!=0)
        {
            getAlertName('Name is Exist');
        }
    }
    else {
        checkAlertNameExist();
        checkAlertUrlExist();
        siteContainer.push(site);
        displayData(siteContainer);
        localStorage.setItem('Sites', JSON.stringify(siteContainer));
        clearForm();
    }
}

function displayData(array) {
    let container = ``;
    for (let i = 0; i < array.length; i++) {
        container += ` <div class="bookmark-item d-flex py-5 ps-3 ">
        <div class="item-header w-40">
            <h2>${array[i].siteName}</h2>
        </div>
        <div class="item-btn  w-60">
            <a href="${array[i].url}"  target="_blank"  class="btn btn-primary" id="visitBtn">Visit</a>
            <!-- <a class="btn btn-warning text-white" id="updateBtn">Update</a> -->
            <a class="btn btn-danger" onclick='deleteItem(${i})' id="deleteBtn">Delete</a>
        </div>
     </div>`
    }
    bookMarkList.innerHTML = container;
}
function clearForm() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}
function deleteItem(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem('Sites', JSON.stringify(siteContainer));
    displayData(siteContainer);
}
function getAlertName(str)
{
    nameError.innerHTML = str;
    nameError.classList.replace('d-none', 'd-block');
}
function getAlertUrl()
{
    urlError.innerHTML = 'Url is required';
    urlError.classList.replace('d-none', 'd-block');
}
function checkAlertNameExist()
{
    if(nameError.classList.contains('d-block'))
    {
        nameError.classList.replace('d-block','d-none')
    }
}
function checkAlertUrlExist()
{
    if(urlError.classList.contains('d-block'))
    {
        urlError.classList.replace('d-block','d-none')
    }
}
function checkNameIsExist()
{
    let res=siteContainer.filter(ele=> ele.siteName == siteNameInput.value)
    return res.length;
}