const formEl = document.querySelector('#select-state-form')
const inputEl = document.querySelector('#select-state')
const ulEl = document.querySelector('#breweries-list')
const filterEl = document.querySelector('#filter-by-type')
const stateSearch = document.querySelector('#select-state')

const state = {
    breweries: [],
    //type: []

}


let url = 'https://api.openbrewerydb.org/breweries?by_state='


formEl.addEventListener('submit', function(e) {
    e.preventDefault()
    const searchValue = inputEl.value
        //console.log('searchValue', searchValue)
    fetch(url + searchValue)
        .then(function(response) {
            //console.log('in the response', response)
            return response.json()
        })
        .then(function(breweries) {
            state.breweries = breweries
            console.log('breweries', state.breweries)
            render()


        })
})


function render() {
    clear()
    renderBreweries()
    changeFilter()
}

function clear() {
    inputEl.innerHTML = ''
    inputEl.value = ''
}

function renderBreweries() {
    for (const type of state.breweries) {
        const li = document.createElement('li')
        li.innerHTML = `
    <h2>${type.name}</h2>
    <div class="type">${type.brewery_type}</div>
    <section class="address">
      <h3>Address:</h3>
      <p>${type.street}</p>
      <p><strong>${type.city},${type.postal_code}</strong></p>
    </section>
    <section class="phone">
      <h3>Phone:</h3>
      <p>${type.phone}</p>
    </section>
    <section class="link">
      <a href=${type.website_url} target="_blank">Visit Website</a>
    </section>`
        ulEl.append(li)
    }
}

function changeFilter() {
    const url2 = 'https://api.openbrewerydb.org/breweries?by_type='
    filterEl.addEventListener('change', function(e) {
        e.preventDefault()
        const filterType = filterEl.value
        console.log('checkingfilter', filterType)
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateSearch.value}&by_type=${filterType}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(type) {
                state.breweries = type
                console.log('filter', type)
                render()
            })
    })
}
changeFilter()