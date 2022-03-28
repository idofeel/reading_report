<template>
  <div class="login_page">
    <h4 class="title">读者绑定</h4>
    <div class="login_form">
      <div class="login_form_item">
        <!-- <span>读者账号</span> -->
        <input v-model="formData.borId" placeholder="请输入读者账号" />
      </div>
      <div class="login_form_item">
        <!-- <span>读者密码</span> -->
        <input
          type="password"
          v-model="formData.borPassword"
          placeholder="请输入读者密码"
        />
      </div>
    </div>
    <div class="login_btn">
      <button class="button" @click="onLogin">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    const paramsStr = window.location.search.substring(1);
    const queryList = paramsStr.split("&");
    const query = {};
    //
    queryList.forEach((i) => {
      const [key, value] = i.split("=");
      query[key] = value;
    });

    this.formData.openId = query.openId;
    console.log(this.formData);
  },
  data() {
    return {
      formData: {
        openId: "",
        borId: "",
        borPassword: "",
      },
    };
  },
  methods: {
    queryParams(data, isPrefix) {
      isPrefix = isPrefix ? isPrefix : false;
      let prefix = isPrefix ? "?" : "";
      let _result = [];
      for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
          continue;
        }
        if (value.constructor === Array) {
          value.forEach((_value) => {
            _result.push(
              encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
            );
          });
        } else {
          _result.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }

      return _result.length ? prefix + _result.join("&") : "";
    },
    async onLogin() {
      if (!this.formData.borId) {
        return this.$toast.top("请输入读者账号");
      } else if (!this.formData.borPassword) {
        return this.$toast.top("请输入读者密码");
      } else {
        this.$loading("loading...");
      }
      try {
        const search = this.queryParams(this.formData);
        // http://weixin.jingshicorp.com/wechat/historyjob!bangding.action
        const res = await fetch(
          "/wechat/historyjob!bangding.action?" + search,
          {
            method: "GET", //
            mode: "cors",
          }
        );
        if (res.status == 200) {
          const data = await res.json();
          if (data) {
            this.$emit("success", {
              borId: this.formData.borId,
            });
          } else {
            this.$toast.center("绑定失败");
          }
        }
      } catch (error) {
        //   error
      } finally {
        this.$loading.close();
      }
    },
  },
};
</script>

<style scoped>
/* input {
	width: 100%;
	border: 1px solid #ccc;
	padding: 7px 0px;
	border-radius: 3px;
	padding-left: 5px;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	-webkit-transition: border-color ease-in-out 0.15s,
		-webkit-box-shadow ease-in-out 0.15s;
	-o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
	transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
	font-size: 14px;
}
input:focus {
	border-color: #66afe9;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
		0 0 8px rgba(102, 175, 233, 0.6);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
		0 0 8px rgba(102, 175, 233, 0.6);
} */

button {
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: all 0.1s;
  font-size: 10px;
  outline: none;
  border-color: #3880ff;
  color: #3880ff;
}

.login_page {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  /* background: #ffffff; */
}

.login_page input {
  box-sizing: border-box;
  margin-bottom: 4px;
  width: 100%;
  font-size: 12px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid #dddedf;
  padding: 4px 8px;
  font-family: inherit;
  transition: all 0.5s;
  outline: none;
}

.title {
  margin: 0;
  padding: 20px;
  font-size: 20px;
}
.login_form {
  margin: 14px 0;
  font-size: 14px;
}
.login_form_item {
  margin-bottom: 24px;
}
.login_form_item span {
  margin-right: 8px;
}

.login_btn .button {
  border-radius: 40px;
  width: 100%;
}
</style>
