import '../theme';
import '../../styles/templates/index.scss';
import getAllProducts from '../graphql/collection-starter-code';

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
    let closestImage = e.target.closest('.card').querySelector('.card__image img')
    let closestPrice = e.target.closest('.card').querySelector('.price')
    console.log(e.target)
    e.target.classList.add('active')
    closestImage.src = e.target.dataset.image
    closestPrice.innerHTML = `$${e.target.dataset.price}`
}
addCustomEventListener('.swatch','click', swatchClickHandler);

getAllProducts('test-collection').then(data => {
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
        
        console.log(productObj)
        container.insertAdjacentHTML("afterbegin", 
            `
                <div class="card">
                    <div class="card__image"><img src=${productObj.images[0]}/></div>
                    <div class="card__title">${product.title}</div>
                    <div class="card__price">${productObj['compareAtPrices'][0] !== null ? `<span class="price-compare">$${productObj['compareAtPrices'][0]}</span>` : '' }<span class="price">$${productObj['prices'][0]}</span></div>
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
                            return `<a class='swatch ${colorClass}' data-image='${productObj.images[index]}' data-price='${productObj['prices'][index]}' data-compareprice='${productObj['compareAtPrices'][index]}'  ></a>`
                        }).join(" ")
                    :
                    ''
                }
                </div>
            `
        ) 
    });
})