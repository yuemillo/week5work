Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
      VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
  }); //CDN引入全部規則
  
  // 讀取外部的資源
  VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

  // Activate the locale
  VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
  });

const apiUrl =  'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'jslong';

const userModal = {
    props: ['tempProduct', 'addToCart'],
    data() {
        return {
            productModal: null,
            qty: 1
        };
    },
    methods:{
        open(){
            this.productModal.show();
        },
        close(){
            this.productModal.hide();
        }   
    },
    watch:{
        tempProduct(){
            this.qty = 1;
        }
    },
    template: '#userProductModal',

    mounted(){
        this.productModal = new bootstrap.Modal(this.$refs.modal)
    },
  
};


Vue.createApp({
    data(){
        return{
            products: [],
            tempProduct: {},
            status:{
                addCartLoading:'',
                openModal:'',
                cartQtyLoading:''
            },
            carts:{},
            form:{
                user:{
                  email:'',
                  name: '',
                  tel: '',
                  address: ''
                },
                message: ''
                },
            isLoading: false
        }
    },
    methods: {
        onSubmit(){
            console.log(this);
        },

        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then(res => {
                console.log(res);
                this.products = res.data.products;
            });
        },
        openModal(product){
            this.tempProduct = product;
            this.$refs.userModal.open();
            // this.status.openModal = product;
        },
        addToCart(product_id, qty =1){
            const order = {
                  product_id,
                  qty
                };
                this.status.addCartLoading = product_id;
            axios.post(`${apiUrl}/api/${apiPath}/cart` , { data: order})
            .then(res => {
                console.log(res);
                alert('已加入購物車');
                this.status.addCartLoading = '';
                this.getCart();
                this.$refs.userModal.close()
            });
        },
        changeCartQty(item, qty =1){
            const order = {
                product_id: item.product_id,
                qty
            };
             this.status.cartQtyLoading = item.id;
          axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}` , { data: order})
          .then(res => {
              console.log(res);
              this.status.cartQtyLoading = '';
              this.getCart();
          });
        },

        removeCartItem(id){
            this.status.cartQtyLoading = id;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
          .then(res => {
              this.status.cartQtyLoading = '';
              alert('已刪除產品');
              this.getCart();
          });
        },
        removeAllCartItem(id){
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
          .then(res => {
              alert('已清空購物車');
              this.getCart();
          });
        },
        getCart(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then(res => {
                console.log(res);
                this.carts = res.data.data;
                console.log(this.carts)
            });
        },
        rest(){
            this.removeAllCartItem();
            this.form.user.email = '';
            this.form.user.name = '';
            this.form.user.name = '';
            this.form.user.tel = '';
            this.form.user.address = '';
            this.form.message = '';
        }
    },
    
   
    mounted() {
        this.getProducts();
        this.getCart();
        setTimeout(()=>{
            this.isLoading = true
          }, 1000);
    }
})

.component('VForm', VeeValidate.Form)
.component('VField', VeeValidate.Field)
.component('ErrorMessage', VeeValidate.ErrorMessage)
.component('loading',VueLoading.Component)
.component('userModal', userModal)
.mount('#app');





