import { supabase } from '$lib/server/db';
import { ask } from '$lib/server/openai.js';

export const load = async ({ params }) => {
	const { id } = params;

	const { data: profileData } = await supabase.from('profile').select('*').eq('id', id);

	const { data: logData } = await supabase.from('logs').select('*').eq('patient_id', id);
	const { data: medicalData } = await supabase
		.from('medical_history')
		.select('*')
		.eq('patient_id', id);
	const { data: prescriptionData } = await supabase
		.from('prescriptions')
		.select('*')
		.eq('patient_id', id);

	console.log({
		profile: profileData[0],
		logs: logData,
		medical: medicalData,
		prescriptions: prescriptionData
	});

	return {
		profile: profileData[0],
		logs: logData,
		medical: medicalData,
		prescriptions: prescriptionData
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = formData.get('data');
		const prompt = formData.get('prompt');
		await ask(prompt.toString(), data);
	}
};
