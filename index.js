const validTypes = [
    'micro',
    'brewpub',
    'regional'

]


const state = {
    breweries: [],
    filterType: '',
    filterState: ''
}

function setBreweries(breweries) {
    state.breweries = breweries.filter(function(brewery) {
        return validTypes.includes(brewery.brewery_type)

    })
}


console.log('hello')

const inputEl = document.querySelector('#select-state')
const formEl = document.querySelector('#select-state-form')
const filterEl = document.querySelector('#filter-by-type')

filterEl.addEventListener('change', function() {
    state.filterType = filterEl.value
    fetchBreweries()
})

formEl.addEventListener('submit', function(e) {
    state.filterState = inputEl.value
    e.preventDefault()
    fetchBreweries()


})


function fetchBreweries() {
    if (state.filterState === '') {
        return
    }
    let url = 'https://api.openbrewerydb.org/breweries?by_state=' + state.filterState
    if (state.filterType !== '') {
        url += '&by_type=' + state.filterType
    }
    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(breweries) {
            state.breweries = breweries
            render()
        })
}

function render() {
    const breweriesListEl = document.querySelector('#breweries-list')
    breweriesListEl.innerHTML = ''
    for (const type of state.breweries) {
        console.log('type', type)
        const breweryEl = document.createElement('li')
        breweryEl.innerHTML = `
        <h2>${type.name}</h2>
        <div class="type">${type.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${type.street}</p>
          <p><strong>${type.city}, ${type.postal_code}</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${type.phone}</p>
        </section>
        <section class="link">
          <a href="${type.website_url}" target="_blank">Visit Website</a>
        </section>`

        breweriesListEl.append(breweryEl)
    }

}