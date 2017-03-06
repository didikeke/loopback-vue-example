<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <a href="/logout">Logout</a>
    </div>
    <div>
      <router-link exact :to="{ name: 'Hello'}">Hello</router-link>
      <router-link exact :to="{ name: 'World'}">World</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration:none;
}

a:visited {
  color: #000;
}
a.router-link-active {
  color: red;
}

</style>
