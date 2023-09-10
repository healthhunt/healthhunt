<script setup lang="ts">
const { $client } = useNuxtApp();

const ALLOWED_TAGS = ['therapist', 'psychologist', 'counselor', 'psychiatrist'];

const tags = ref<string[]>([]);
const search = ref('');

const { pending, data: doctors } = useLazyAsyncData(() => $client.doctor.list.query({
	search: search.value,
	tags: tags.value,
}), {
	server: false,
	watch: [tags, search]
});

</script>

<template>
	<div class="grid place-items-center gap-4">
		<div class="prose">
			<h1> Search for any doctor. </h1>
		</div>

		<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />



	</div>
</template>
