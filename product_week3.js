import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const site = "https://vue3-course-api.hexschool.io/v2/";
const api_path = "james9527";

const app = createApp({
  data() {
    return {
      products: {},
      tempProduct: {
        imageUrl: "",
        imagesUrl: [],
      },
      modalProduct: null,
      modalDel: null,
      isNew: false,
    };
  },
  methods: {
    getProducts() {
      const api = `${site}api/${api_path}/admin/products`;
      axios.get(api).then((res) => {
        console.log(res);
        this.products = res.data.products;
      });
    },
    openModal(status, product) {
      if (status === "new") {
        this.tempProduct = { imagesUrl: [] };
        this.isNew = true;
        this.modalProduct.show();
      } else if (status === "edit") {
        this.tempProduct = { ...product };
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = [];
        }
        this.isNew = false;
        this.modalProduct.show();
      } else if ((status = "del")) {
        this.tempProduct = product;
        this.modalDel.show();
      }
    },
    updateProduct() {
      let api = `${site}api/${api_path}/admin/product`;
      let method = "post";

      // 更新
      if (!this.isNew) {
        api = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = "put";
      }

      axios[method](api, { data: this.tempProduct }).then((res) => {
        console.log(res);
        this.getProducts();
        this.modalProduct.hide();
        this.tempProduct = {};
      });
    },
    deleteProduct() {
      const api = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
      axios.delete(api).then((res) => {
        console.log(res);
        this.getProducts();
        this.modalDel.hide();
      });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    this.getProducts();
    this.modalProduct = new bootstrap.Modal(this.$refs.productModal);
    this.modalDel = new bootstrap.Modal(this.$refs.delProductModal);
  },
});

app.mount("#app");
