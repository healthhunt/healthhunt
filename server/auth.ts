import { createHmac } from 'node:crypto';


export function createPassword(password: string, salt: string) {
	const hasher = createHmac('sha512', salt);

	hasher.update(password);

	return hasher.digest('hex');
}

export function checkPassword(password: string, hashedPassword: string, salt: string) {
	return createPassword(password, salt) === hashedPassword;
}
