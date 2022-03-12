import '../theme';
import '../../styles/templates/index.scss';
import getAllProducts from '../graphql/collection-starter-code';

const container = document.querySelector('.card-container')

const swatches = (product) => { 
    if(product.options[0]['name'] == 'Color'){
        product.options[0].values.map(name => {
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
            container.insertAdjacentHTML("beforeend",
                `
                    <a class="swatch ${colorClass}"></a>
                ` 
            )
        })
    }
}
getAllProducts('test-collection').then(data => {
    console.log(data)
    data.forEach(product => {
        swatches(product)
        container.insertAdjacentHTML("beforeend", 
            `
                <div>${product.title}</div>
            `
        ) 
    });
})