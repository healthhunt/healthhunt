<script setup lang="ts">
const { $client } = useNuxtApp();

const ALLOWED_TAGS = [
	'therapist',
	'counselor',
	'stress management',
	'anxiety',
	'psychiatrist',
	'mood disorders',
	'depression',
	'therapy',
	'psychologist',
	'family therapy',
	'relationship',
	'child therapy',
	'adolescent therapy',
	'child psychologist',
	'developmental disorders',
	'marriage counselor',
	'couples therapy',
	'medication management',
	'trauma therapy'
];

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
	<div class="grid place-items-center gap-8">
		<div class="prose">
			<h1>Find your perfect doctor</h1>
		</div>

		<div class="flex justify-center w-full gap-2">
			<input v-model="search" type="text" placeholder="Doctor name or description"
				class="input input-bordered w-full max-w-md" />

			<details class="dropdown">
				<summary class="btn btn-primary">Include tags</summary>
				<ul
					class="p-2 shadow menu grid grid-cols-1 dropdown-content z-[1] bg-base-300 rounded-box w-52 overflow-y-scroll h-96">
					<li v-for="tag of ALLOWED_TAGS">
						<label class="cursor-pointer label">
							<span class="label-text">{{ tag }}</span>
							<input type="checkbox" v-model="tags" :value="tag" class="checkbox checkbox-secondary" />
						</label>
					</li>
				</ul>
			</details>
		</div>

		<div v-if="pending">
			loading...
		</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
			<Doctor v-for="doctor of doctors" :doctor="doctor" />
		</div>
	</div>
</template>
