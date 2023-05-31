import React from 'react';
import ExampleButton from '../components/exampleButton';

export default {
  title: 'Component/Button',
  component: ExampleButton,
  argsTypes: { onClick: { action: 'handleSignIn' } },
};
const Template = (args) => <ExampleButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Sign in',
  backgroundColor: 'blue',
};