import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const site = "https://vue3-course-api.hexschool.io/v2/";

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = `${site}admin/signin`;
      axios
        .post(api, this.user)
        .then((res) => {
          console.log(res);
          const { token, expired } = res.data;
          document.cookie = `hexschoolToken=${token}; expires=${new Date(
            expired
          )}`;
          window.location = "product_week3.html";
        })
        .catch((err) => {
          console.assert(err);
        });
    },
  },
  mounted() {},
});

app.mount("#app");
