import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { stripe } from './stripe.ts';

export const createOrRetrieveProfile = async (req: Request) => {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

		if (!user) throw new Error('No user found');

    const { data: profile, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (error || !profile) throw new Error("Profile not found");
    
    if (profile.stripe_customer_id) {
      return profile.stripe_customer_id;
    }
    console.log("Creating stripe customer...")
    const customer = await stripe.customers.create({
      name: profile.username,
      email: user.email,
      metadata: { 
        uid: user.id,
        username: profile.username
      },
    });
    console.log(`New customer "${customer.id}" created for user "${user.id}"`);

    await supabaseClient
      .from("profiles")
      .update({ stripe_customer_id: customer.id })
      .eq("id", user.id);

    return customer.id;
};