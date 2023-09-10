<template>
  <div>
    <div v-if="$route.path === '/'">
      <div class="absolute top-0 w-full">
        <Navbar />
      </div>
      <NuxtPage />
    </div>
    <div v-else>
      <Navbar />
      <div class="p-8">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
