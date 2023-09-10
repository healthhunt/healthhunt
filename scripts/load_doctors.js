import fs from 'node:fs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const doctors = JSON.parse(fs.readFileSync('./data/doctors/data.json', 'utf8'));

	for (const doctor of doctors) {
		doctor.descriptionLower = doctor.description.toLowerCase();
		doctor.nameLower = doctor.name.toLowerCase();

		const id = doctor.id;

		delete doctor.id;

		await prisma.doctor.upsert({
			where: {
				id,
			},
			create: doctor,
			update: doctor,
		});
	}
}

main();
