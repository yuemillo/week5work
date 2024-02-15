import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const apiUrl =  'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'jslong';

const app = createApp({
    data(){
        return{
            products: []
        }
    },
    methods: {
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then(res => {
                console.log(res);
                this.products = res.data.products;
            });
        }
    },
    mounted() {
        this.getProducts()
    }
  
});

app.mount('#app');





