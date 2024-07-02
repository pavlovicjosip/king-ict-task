import Button from 'react-bootstrap/Button';

export function KingButton(handleSubmit, variant) {
	return (
		<Button as="a" variant={variant} handleSubmit={() => handleSubmit()}>
			Button as lin
		</Button>
	);
}
