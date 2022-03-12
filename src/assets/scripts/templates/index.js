import '../theme';
import '../../styles/templates/index.scss';
import getAllProducts from '../graphql/collection-starter-code';

const container = document.querySelector('.card-container')

getAllProducts('test-collection').then(data => {
    console.log(data)
    data.forEach(product => {
        container.insertAdjacentHTML("beforeend", 
        `
            <div>${product.title}</div>   
        `
        )  
    });  
})