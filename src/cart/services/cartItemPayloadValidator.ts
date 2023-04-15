import * as yup from 'yup';

const createProductSchema = yup.object({
	product_id: yup.string().uuid().required(),
	count: yup.number().integer().positive().required()
});

export async function validatePayload(reqBody: Record<string, any>): Promise<string[]> {
	try {
		await createProductSchema.validate(reqBody, {abortEarly: false});

		return [];
	} catch (err) {
		return err.errors;
	}
}