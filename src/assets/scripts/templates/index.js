import '../theme';
import '../../styles/templates/index.scss';
import getAllProducts from '../graphql/collection-starter-code';

const resultsNum = document.querySelector('.collection-results')
const container = document.querySelector('.card-container')

function addCustomEventListener(selector, event, handler) {
    let rootElement = document.querySelector('body');
    rootElement.addEventListener(event, function (evt) {
            var targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(evt);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}
function swatchClickHandler(e){
    let closestPrice
    let comparePrice 
    if(e.target.closest('.card').querySelector('.price') !== null){
        closestPrice = e.target.closest('.card').querySelector('.price')
        closestPrice.innerHTML = `$${e.target.dataset.price}`
    } else {
        closestPrice = e.target.closest('.card').querySelector('.sale-price')
        comparePrice = e.target.closest('.card').querySelector('.price-compare')
        comparePrice.innerHTML = `$${e.target.dataset.compareprice}`
        closestPrice.innerHTML = `$${e.target.dataset.price}`
    }
    let swatchContainer = Array.from(e.target.closest('.card__swatches').children)
    swatchContainer.find(swatch => {
        if(swatch.classList.contains('active')){
            swatch.classList.remove('active')
        }
    })
    e.target.classList.add('active')
    let closestImage = e.target.closest('.card').querySelector('.card__image img')
    closestImage.src = e.target.dataset.image
}

addCustomEventListener('.swatch','click', swatchClickHandler);

getAllProducts('test-collection').then(data => {
    resultsNum.innerHTML = `${data.length} results`
    data.forEach(product => {
        let productObj = {
            title : product.title,
            colorOptions: product.options[0].values,
            variants : product.variants.map(variant => variant), 
            images : [...new Set(product.variants.map(variant => variant.image.src))],
        }
        let priceArray = []
        let compareAtArray = []
        productObj.variants.map(variant => {
            productObj.images.map((image, index) => {
                if(variant.image.src === image){
                    priceArray[index] = variant.price
                    compareAtArray[index] = variant.compareAtPrice
                }
            })
        })
        productObj['prices'] = priceArray
        productObj['compareAtPrices'] = compareAtArray
        container.insertAdjacentHTML("beforeend", 
            `
                <div class="card">
                    <div class="card__image"><img src=${productObj.images[0]}/></div>
                    <div class="card__title">${product.title}</div>
                    <div class="card__price">${productObj['compareAtPrices'][0] !== null ? `<span class="price-compare">$${productObj['compareAtPrices'][0]}</span><span class="sale-price">$${productObj['prices'][0]}</span>` : `<span class="price">$${productObj['prices'][0]}</span>`}</div>
                    <div class="card__swatches">
                    ${product.options[0]['name'] == 'Color' ?
                        product.options[0].values.map((name, index) => {
                            let colorClass 
                            if(name === 'Blue') colorClass = "blue"
                            else if(name === 'Red') colorClass = "red"
                            else if(name === 'Gold') colorClass = "gold"
                            else if(name === 'Brown') colorClass = "brown"
                            else if(name === 'Medium Grey') colorClass = "mediumgray"
                            else if(name === 'Navy Blue') colorClass = 'navy'
                            else if(name === 'Navy') colorClass = "navy"
                            else if(name === 'Yellow') colorClass = "yellow"
                            else if(name === 'Dark Wash') colorClass = "darkwash"
                            else if(name === 'Light Wash') colorClass = "lightwash"
                            return `<a class='swatch ${colorClass} ${index === 0 ? 'active' : ''}' data-image='${productObj.images[index]}' data-price='${productObj['prices'][index]}' data-compareprice='${productObj['compareAtPrices'][index]}'  ></a>`
                        }).join(" ")
                    :
                    ''
                }
                </div>
            `
        ) 
    });
})