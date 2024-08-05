<script lang="ts">
	import { Button, Input, Label, Link } from '@emitra-labs/ui';

	const handleSubmit = () => {
		console.log('Submitted!');
	};
</script>

<div class="h-full flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold mb-2.5">Welcome Back</h1>
	<p class="dimmed mb-9">Let's continue your journey with us.</p>

	<form class="w-full max-w-72" on:submit={handleSubmit}>
		<div class="mb-6">
			<Label for="email">Email</Label>
			<Input id="email" placeholder="Your email address" />
		</div>
		<div class="mb-7">
			<Label for="password" class="flex justify-between items-start">
				Password
				<Link href="#">Forgot password?</Link>
			</Label>
			<Input id="password" placeholder="Your password" type="password" />
		</div>

		<Button class="w-full" type="submit" variant="primary">Sign in</Button>

		<p class="dimmed mt-7 text-center">
			Don't have an account? <Link href="#">Sign up</Link>
		</p>
	</form>
</div>
