import '../theme';
import '../../styles/templates/index.scss';
import getAllProducts from '../graphql/collection-starter-code';

getAllProducts('test-collection').then(data => {
    console.log(data)
})

