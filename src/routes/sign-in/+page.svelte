<script lang="ts">
	import { Button, Input, Label, Link } from '@emitra-labs/ui';
	import { createForm } from 'felte'
	import { validator } from '@felte/validator-yup';
	import { object, string, type InferType } from 'yup';
	import axios from 'axios';

	const schema = object({
		email: string().email('Must be a valid email').required('This field is required'),
		password: string().required('This field is required'),
	})

	const { form, errors } = createForm<InferType<typeof schema>>({
		extend: validator({ schema }),
		onSubmit: async (values) => {
			try {
				await axios.post('/api/sign-in', values);
			} catch (err: any) {
				let errMessage = 'Unknown error';

				if (axios.isAxiosError(err) && err.response) {
					errMessage = err.response.data.error;
				}

				return alert(errMessage);
			}

			window.location.reload();
		}
	})
</script>

<div class="h-full flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold mb-2.5">Welcome Back</h1>
	<p class="dimmed mb-9">Let's continue your journey with us.</p>

	<form class="w-full max-w-72" use:form>
		<div class="mb-6">
			<Label for="email">Email</Label>
			<Input id="email" name="email" placeholder="Your email address" type="email" hasError={Boolean($errors.email)} />
			{#if $errors.email}
				<p class="text-red-600 text-sm mt-1.5">{$errors.email}</p>
			{/if}
		</div>
		<div class="mb-7">
			<Label for="password" class="flex justify-between items-start">
				Password
				<Link href="#">Forgot password?</Link>
			</Label>
			<Input id="password" name="password" placeholder="Your password" type="password" hasError={Boolean($errors.password)} />
			{#if $errors.password}
				<p class="text-red-600 text-sm mt-1.5">{$errors.password}</p>
			{/if}
		</div>

		<Button class="w-full" type="submit" variant="primary">Sign in</Button>

		<p class="dimmed mt-7 text-center">
			Don't have an account? <Link href="#">Sign up</Link>
		</p>
	</form>
</div>
