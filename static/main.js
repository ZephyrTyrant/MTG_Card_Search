const searchName = document.getElementById('search-bar').elements['name']
searchName.addEventListener('input', async function(){
    let text = searchName.value
    let response = await fetch('https://api.scryfall.com/cards/autocomplete?q='+ text.replace(/\s+/g,'+')) //learn ths too
    if(!response.ok){
                throw new Error('Cannot Find') //learn later, u don't understand this
            }
    let options = await response.json()
    let dropdown = document.getElementById('dropdown')
    dropdown.innerHTML = ''
    for (let option of options.data){
        let check = option.split('//')
        if (check.length == 2){
            if (check[0].trim() === check[1].trim()) {
                continue
            }
        }
        let item = document.createElement('div')
        let link = document.createElement('a')
        link.href = '/search?name=' + option.replace(/\s+/g, '+')
        link.style.textDecoration = 'none'
        link.innerHTML = option
        item.appendChild(link)
        dropdown.append(item)
    }
})


const sets = document.querySelectorAll('.sets')
let original = document.getElementById('default')
for (let set of sets){
    set.addEventListener('change', function(event){
        if (event.target.checked) {
            original.style.display = 'none'
            let source = event.target.value
            let image = document.createElement('img')
            image.src = source
            image.id = 'img:'+ event.target.name 
            if (event.target.className === 'sets twoFaces') {
                image.className = 'cardImages double'
                image.dataset.back = event.target.dataset.back
                image.addEventListener('click', function(event){
                    event.target.dataset.temporary = event.target.src
                    event.target.src = event.target.dataset.back
                    event.target.dataset.back = event.target.dataset.temporary //HERE

                })
            }
            else {
                image.className = 'cardImages'
            }
            const images = document.getElementById('images')
            images.appendChild(image)
        }
        else {
            document.getElementById('img:'+event.target.name).remove()
            const allChecked = !!document.querySelector('input[type="checkbox"]:checked');
            if (!allChecked) {
                original.style.display = 'block'
            }
        }
    }
)}


const dropdowns = document.querySelectorAll('.dropdown')
for (let dropdown of dropdowns) {
    dropdown.querySelector('.dropdown-button').addEventListener('click', function(){
        let dropdownCurrent =  dropdown.querySelector('.dropdown-menu')
        if (dropdownCurrent.style.display == 'flex'){
            dropdownCurrent.style.display = 'none'
        }
        else {
            dropdownCurrent.style.display = 'flex'
        }
    })
}


const doubles = document.getElementsByClassName('double')
for (card of doubles) {
    card.addEventListener('click', function(event){
        event.target.dataset.temporary = event.target.src
        event.target.src = event.target.dataset.back
        event.target.dataset.back = event.target.dataset.temporary
    })
}