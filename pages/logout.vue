<script setup lang="ts">
const { signOut } = useAuth();

onMounted(() => {
	signOut({ redirect: true });
});
</script>

<template></template>
