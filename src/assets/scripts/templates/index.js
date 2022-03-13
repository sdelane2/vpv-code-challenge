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
    let closestImage = e.target.closest('.card').querySelector('.image-class')
    closestImage.src = e.target.dataset.image
}
addCustomEventListener('.swatch','click', swatchClickHandler);

getAllProducts('test-collection').then(data => {
    data.forEach(product => {
        let productObj = {
            title : product.title,
            colorOptions: product.options[0].values, 
            images : product.variants.map(variant => variant.image.src),
        }
        productObj.images = [...new Set(productObj.images)]
        container.insertAdjacentHTML("afterbegin", 
            `
                <div class= "card">
                    <img class="image-class" src=${productObj.images[0]}/>
                    <div class="card__title">${product.title}</div>
                    <div class="swatch-container">
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
                            return `<a class='swatch ${colorClass}' data-image='${productObj.images[index]}'  ></a>`
                        }).join(" ")
                    :
                    ''
                }
                </div>
            `
        ) 
    });
})