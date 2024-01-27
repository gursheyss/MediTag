import { supabase } from '$lib/server/db';

export const load = async ({ params }) => {
	const id = params.id;
	const { data, error } = await supabase.from('profile').select('*').eq('id', id);
	console.log(data, error);
	return {
		profile: data[0]
	};
};
